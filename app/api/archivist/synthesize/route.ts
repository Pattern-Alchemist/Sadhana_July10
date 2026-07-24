import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb, type Database } from "@/db";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import {
  EmbeddingProviderError,
  generateQueryEmbedding,
  retrieveSemanticHits,
  type SemanticHit,
} from "@/lib/embeddings";
import {
  ARCHIVIST_SYSTEM_PROMPT,
  CHARS_PER_TOKEN,
  INSUFFICIENT_GROUNDING,
  SYNTH_SIMILARITY_FLOOR,
  SYNTH_TOP_K,
  buildContextPack,
  buildUserPrompt,
  consumeRateWindow,
  ledgerDeductionUsd,
  validateDraftCitations,
  type RateWindow,
} from "@/lib/archivist-synthesis";
import { getSiteUrl } from "@/lib/seo";

/**
 * Archivist synthesis endpoint — RFC-001 Phase C (Moonshot 4.1).
 * ==============================================================
 *
 * Natural-language, citation-constrained synthesis over the retrieved siddhi
 * corpus. Ships dark: `ARCHIVIST_SYNTHESIS_ENABLED=true` is required before
 * anything here runs (default off, §8 rollout "ships dark").
 *
 * Fallback ladder (RFC §5.5): disabled → F1/F2 embedding provider → F3
 * pgvector → F5 similarity floor → model timeout/error → §5.4 citation
 * validator → hard refusal. Every degraded mode returns the raw retrieval
 * hits with `synthesis: false`; the zero-cost keyword route
 * (`/api/archivist`) never depends on any of this.
 *
 * Cost governor (RFC §5.6): hard monthly ceiling (default $5) backed by the
 * self-healing `archivist_cost_ledger` table; deductions are estimates × 2.
 *
 * Rate limiting: fixed-window per-IP, best-effort per instance (10/min);
 * the platform edge limiter remains the strong control.
 */

export const dynamic = "force-dynamic";

const OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_SYNTH_MODEL = "gpt-4o-mini";
const SYNTH_MAX_OUTPUT_TOKENS = 400;
const SYNTH_TIMEOUT_MS = 20_000;
const RATE_LIMIT_PER_MINUTE = 10;
const RATE_WINDOW_MS = 60_000;

/** Module-level, best-effort per-instance rate window (RFC §6 note). */
const rateWindow: RateWindow = new Map();

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: unknown } }>;
  usage?: { prompt_tokens?: number; completion_tokens?: number };
  error?: { message?: string };
}

// ---------------------------------------------------------------------------
// Cost ledger (self-healing, mirroring lib/bootstrap's ensure* pattern)
// ---------------------------------------------------------------------------

let ledgerReady: Promise<void> | null = null;

function ensureCostLedger(db: Database): Promise<void> {
  if (!ledgerReady) {
    ledgerReady = db
      .execute(sql`
        CREATE TABLE IF NOT EXISTS archivist_cost_ledger (
          month TEXT PRIMARY KEY,
          usd NUMERIC(10,6) NOT NULL DEFAULT 0
        );
      `)
      .then(() => undefined)
      .catch((err) => {
        // Never wedge the endpoint on ledger DDL — log and let the governor
        // degrade to its "cannot read spend" branch below.
        console.error("[archivist/synthesize] ledger DDL failed:", err);
        ledgerReady = null;
      });
  }
  return ledgerReady;
}

async function getMonthSpendUsd(db: Database, month: string): Promise<number> {
  const rows = await db.execute(
    sql`SELECT usd FROM archivist_cost_ledger WHERE month = ${month};`,
  );
  const raw = rows.rows[0]?.usd;
  const spend = Number(raw ?? 0);
  return Number.isFinite(spend) ? spend : 0;
}

async function deductMonthSpend(db: Database, month: string, usd: number): Promise<void> {
  await db.execute(sql`
    INSERT INTO archivist_cost_ledger (month, usd) VALUES (${month}, ${usd})
    ON CONFLICT (month) DO UPDATE SET usd = archivist_cost_ledger.usd + ${usd};
  `);
}

// ---------------------------------------------------------------------------
// LLM call
// ---------------------------------------------------------------------------

async function callSynthesisModel(
  query: string,
  passagesText: string,
): Promise<{ draft: string; promptTokens: number; completionTokens: number }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new EmbeddingProviderError(
      "Synthesis is not configured on this deployment (OPENAI_API_KEY unset).",
    );
  }

  const model = process.env.OPENAI_SYNTH_MODEL ?? DEFAULT_SYNTH_MODEL;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SYNTH_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_CHAT_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: SYNTH_MAX_OUTPUT_TOKENS,
        messages: [
          { role: "system", content: ARCHIVIST_SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(query, passagesText) },
        ],
      }),
    });

    const payload = (await response.json().catch(() => ({}))) as ChatCompletionResponse;
    if (!response.ok) {
      throw new Error(`Synthesis provider rejected the request (${response.status}): ${payload.error?.message ?? "unknown error"}`);
    }

    const draft = String(payload.choices?.[0]?.message?.content ?? "").trim();
    if (!draft) throw new Error("Synthesis provider returned an empty draft.");

    return {
      draft,
      promptTokens: Number(payload.usage?.prompt_tokens ?? 0),
      completionTokens: Number(payload.usage?.completion_tokens ?? 0),
    };
  } finally {
    clearTimeout(timeout);
  }
}

// ---------------------------------------------------------------------------
// Response helpers — degraded modes all return the raw hits (RFC §5.5)
// ---------------------------------------------------------------------------

function relationalNote(): string {
  return "The Custodian offers retrieval pointers instead. You can also use /api/archivist for keyword search.";
}

function refusalResponse(hits: SemanticHit[], note: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({
    answer: null,
    citations: [],
    retrieved: hits.length,
    results: hits,
    synthesis: false,
    note,
    ...extra,
  });
}

function citationsFor(hits: SemanticHit[]) {
  const siteUrl = getSiteUrl();
  return hits.map((h) => ({
    slug: h.slug,
    url: `${siteUrl}/siddhi/${h.slug}`,
    name: h.name,
    score: h.score,
  }));
}

// ---------------------------------------------------------------------------
// POST
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  // Gate 1 — master kill switch (RFC §5.6; ships dark per §8 rollout).
  if (process.env.ARCHIVIST_SYNTHESIS_ENABLED !== "true") {
    return NextResponse.json(
      {
        synthesis: false,
        error: "synthesis_disabled",
        note:
          "Synthesis is not enabled on this deployment (RFC-001 Phase C ships flag-gated). Use /api/archivist or /api/archivist/semantic for grounded retrieval pointers.",
      },
      { status: 503 },
    );
  }

  // Gate 2 — per-IP rate limit (best-effort per instance).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!consumeRateWindow(rateWindow, ip, Date.now(), RATE_LIMIT_PER_MINUTE, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        synthesis: false,
        error: "rate_limited",
        note: "Too many synthesis requests from this address. Slow down, or use /api/archivist for zero-cost keyword search.",
      },
      { status: 429 },
    );
  }

  try {
    const db = getDb();
    await ensureArchiveSeeded();

    const parsedBody = await req.json().catch(() => ({}));
    const body =
      typeof parsedBody === "object" && parsedBody !== null
        ? (parsedBody as Record<string, unknown>)
        : {};
    const query = String(body.query ?? "").trim();
    if (!query) {
      return NextResponse.json({
        synthesis: false,
        answer: null,
        citations: [],
        retrieved: 0,
        results: [],
        note: "The Custodian awaits a precise inquiry.",
      });
    }

    // Gate 3 — monthly budget governor (F7). Worst-case monthly spend is
    // capped at ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD (default $5, RFC §6).
    const parsedBudget = Number.parseFloat(process.env.ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD ?? "5");
    const budgetUsd = Number.isFinite(parsedBudget) && parsedBudget > 0 ? parsedBudget : 5;
    const month = new Date().toISOString().slice(0, 7);
    await ensureCostLedger(db);
    try {
      const spent = await getMonthSpendUsd(db, month);
      if (spent >= budgetUsd) {
        return NextResponse.json(
          {
            synthesis: false,
            error: "budget_exceeded",
            note: `The monthly synthesis budget ($${budgetUsd.toFixed(2)}) is exhausted. ${relationalNote()}`,
          },
          { status: 429 },
        );
      }
    } catch (ledgerReadErr) {
      // Ledger unreadable → fail closed. A silent infinite-budget endpoint is
      // the one failure mode the governor exists to prevent (RFC §5.6).
      console.error("[archivist/synthesize] ledger read failed, refusing:", ledgerReadErr);
      return NextResponse.json(
        {
          synthesis: false,
          error: "budget_exceeded",
          note: `The cost governor cannot read its ledger, so synthesis is paused. ${relationalNote()}`,
        },
        { status: 429 },
      );
    }

    // Retrieval — F1/F2 embedding provider, F3 pgvector (RFC §5.2, §5.5).
    let queryEmbedding: number[];
    try {
      queryEmbedding = await generateQueryEmbedding(query);
    } catch (embeddingErr) {
      return NextResponse.json(
        {
          synthesis: false,
          error: "embedding_provider_unavailable",
          note: `${embeddingErr instanceof Error ? embeddingErr.message : "Embedding unavailable."} ${relationalNote()}`,
        },
        { status: 503 },
      );
    }

    let hits: SemanticHit[];
    try {
      hits = await retrieveSemanticHits(db, queryEmbedding, SYNTH_TOP_K);
    } catch (pgErr) {
      console.error(
        "[archivist/synthesize] pgvector query failed:",
        pgErr instanceof Error ? pgErr.message : pgErr,
      );
      return NextResponse.json(
        {
          synthesis: false,
          error: "pgvector_unavailable",
          note: `Semantic retrieval is unavailable on this deployment (pgvector or the siddhis.embedding column may be missing). ${relationalNote()}`,
        },
        { status: 503 },
      );
    }

    // Gate 4 — grounding floor (F5). Never synthesise from model priors (G2).
    const topSimilarity = 1 - (hits[0]?.distance ?? 1);
    if (hits.length === 0 || topSimilarity < SYNTH_SIMILARITY_FLOOR) {
      return refusalResponse(
        hits,
        "The archive does not hold enough grounded material to answer that. Closest folios are shown below.",
      );
    }

    // Synthesis — F6 model errors degrade to retrieval pointers.
    const { passagesText, allowedSlugs } = buildContextPack(hits);
    let draft: string;
    let usage = { promptTokens: 0, completionTokens: 0 };
    try {
      const outcome = await callSynthesisModel(query, passagesText);
      draft = outcome.draft;
      usage = { promptTokens: outcome.promptTokens, completionTokens: outcome.completionTokens };
    } catch (modelErr) {
      console.error("[archivist/synthesize] model call failed:", modelErr);
      return refusalResponse(
        hits,
        `Synthesis is momentarily unavailable (model error or timeout). ${relationalNote()}`,
        { error: "synthesis_model_unavailable" },
      );
    }

    // Cost ledger deduction: estimate × GOVERNOR_MULTIPLIER (RFC §5.6).
    const embeddingTokens = Math.ceil(query.length / CHARS_PER_TOKEN);
    const deduction = ledgerDeductionUsd({ ...usage, embeddingTokens });
    try {
      await deductMonthSpend(db, month, deduction);
    } catch (deductErr) {
      // Non-fatal: the answer is already generated; log loudly for ops.
      console.error("[archivist/synthesize] ledger deduction failed (LOUD):", deductErr);
    }

    // Gate 5 — citation validator (RFC §5.4). Nothing uncited ships.
    const validation = validateDraftCitations(draft, allowedSlugs);
    if (validation.verdict !== "ok" || validation.finalAnswer === null) {
      if (draft.trim() === INSUFFICIENT_GROUNDING || validation.verdict === "insufficient") {
        return refusalResponse(
          hits,
          "The Custodian finds the archive insufficient to answer that responsibly. Closest folios are shown below.",
        );
      }
      return refusalResponse(
        hits,
        `Synthesis could not be verified against the retrieved folios (${validation.droppedSentences} sentence${validation.droppedSentences === 1 ? "" : "s"} lacked valid citations). Showing retrieval pointers instead.`,
        { error: "citation_validation_failed" },
      );
    }

    return NextResponse.json({
      answer: validation.finalAnswer,
      citations: citationsFor(hits),
      retrieved: hits.length,
      synthesis: true,
      cost_usd_est: deduction,
      note: "Every claim above is cited to a retrieved folio — scholarly synthesis, not prescription.",
    });
  } catch (err) {
    console.error("[archivist/synthesize]", err);
    return NextResponse.json(
      { synthesis: false, note: "The Custodian is momentarily unavailable." },
      { status: 500 },
    );
  }
}

/** GET — discovery endpoint (mirrors /api/archivist/semantic GET). */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/archivist/synthesize",
    method: "POST",
    enabled: process.env.ARCHIVIST_SYNTHESIS_ENABLED === "true",
    description:
      "RFC-001 Phase C — citation-constrained RAG synthesis over the retrieved siddhi corpus. Ships dark: enable with ARCHIVIST_SYNTHESIS_ENABLED=true after the Phase C eval set calibrates the refusal floor.",
    request_shape: { query: "string — a natural-language question" },
    response_shape: {
      answer: "string|null — synthesised prose with inline [slug] citations (null when refused/degraded)",
      citations: "[{slug,url,name,score}] — the retrieved folios used as grounding",
      retrieved: "number of passages retrieved",
      synthesis: "boolean — true only when a validated answer is returned",
      results: "raw SemanticHit[] returned whenever synthesis is false",
      note: "string — plain-language status",
      cost_usd_est: "ledger deduction for this call (estimate × 2 safety multiplier)",
    },
    governors: {
      master_flag: "ARCHIVIST_SYNTHESIS_ENABLED (default off)",
      monthly_budget: "ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD (default 5, hard ceiling)",
      rate_limit: `${RATE_LIMIT_PER_MINUTE}/min/IP (best-effort per instance)`,
      similarity_floor: SYNTH_SIMILARITY_FLOOR,
    },
    fallback: "Every failure mode degrades to retrieval pointers; /api/archivist keyword search is always available and zero-cost.",
  });
}
