import type { SemanticHit } from "@/lib/embeddings";

/**
 * Archivist synthesis — pure logic for RFC-001 Phase C.
 * =====================================================
 *
 * Everything here is deterministic and dependency-free so the citation
 * contract can be exhaustively unit-tested (`tests/unit/archivist-synthesis.test.ts`).
 * The route handler (`app/api/archivist/synthesize/route.ts`) is a thin
 * orchestrator over these functions plus the shared embedding substrate.
 *
 * Design anchors (RFC §5):
 *  - Answers are composed ONLY from retrieved passages.
 *  - Every emitted sentence must carry ≥1 citation of a *retrieved* folio
 *    slug; the validator drops anything else — no second LLM call, no mercy.
 *  - Literal `INSUFFICIENT_GROUNDING` from the model is a hard refusal path.
 *  - Costs are ledgered with a 2× safety multiplier over deploy-pinned prices.
 */

/** Retrieval and prompt-shaping constants (RFC §5.2–5.3). */
export const SYNTH_TOP_K = 8;
/** Cosine-similarity floor for the top hit; below this the route refuses (F5). */
export const SYNTH_SIMILARITY_FLOOR = 0.32;
/** Per-passage ~150-token cap keeps the context pack tight and cheap. */
export const PASSAGE_TOKEN_CAP = 150;
/** Validator keeps ≥60 % of sentences or the whole draft is rejected (RFC §5.4). */
export const VALIDATOR_KEPT_RATIO = 0.6;
/** Literal the system prompt instructs the model to emit when ungrounded. */
export const INSUFFICIENT_GROUNDING = "INSUFFICIENT_GROUNDING";
/** ~4 chars/token heuristic — good enough for prompt budgeting, explained here. */
export const CHARS_PER_TOKEN = 4;

export const ARCHIVIST_SYSTEM_PROMPT = `You are the AstroKalki Archivist. Answer the question using ONLY the numbered archive passages below. Cite every claim inline with the passage's slug in brackets, e.g. [vajroli-mudra]. If the passages do not contain the answer, reply exactly: ${INSUFFICIENT_GROUNDING}. Never invent mantras, counts, durations, warnings, or ritual steps. Never address the user directly.`;

/**
 * Deploy-pinned provider prices for the cost ledger (RFC §5.6).
 * Verify against the provider's current pricing page when enabling the flag;
 * GOVERNOR_MULTIPLIER exists to absorb drift between checks.
 */
export const PINNED_PRICES_PER_MTOK = {
  input: 0.15, // gpt-4o-mini input, USD per 1M tokens (pinned 2026-07)
  output: 0.6, // gpt-4o-mini output, USD per 1M tokens (pinned 2026-07)
  embedding: 0.02, // text-embedding-3-small, USD per 1M tokens (pinned 2026-07)
} as const;

/** Safety multiplier applied to every ledger deduction (RFC §5.6). */
export const GOVERNOR_MULTIPLIER = 2;

export interface Passage {
  index: number;
  slug: string;
  text: string;
}

/**
 * Word-boundary character truncation for ~token caps. Exported for tests —
 * keeps each passage near PASSAGE_TOKEN_CAP tokens without cutting mid-word.
 */
export function truncateToTokenCap(text: string, tokenCap = PASSAGE_TOKEN_CAP): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  const charCap = tokenCap * CHARS_PER_TOKEN;
  if (normalized.length <= charCap) return normalized;

  const slice = normalized.slice(0, charCap);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > charCap * 0.6 ? lastSpace : slice.length).trimEnd()}…`;
}

/**
 * Build the numbered context pack from retrieved hits (top-k already applied
 * by the caller). Uses only fields the retrieval substrate already returns —
 * no second corpus fetch (RFC §5.2).
 */
export function buildContextPack(hits: readonly SemanticHit[]): {
  passages: Passage[];
  passagesText: string;
  allowedSlugs: ReadonlySet<string>;
} {
  const passages: Passage[] = hits.map((hit, i) => ({
    index: i + 1,
    slug: hit.slug,
    text: truncateToTokenCap(hit.summary ?? ""),
  }));

  const passagesText = passages
    .map((p) => `[${p.index}] <${p.slug}> ${p.text}`)
    .join("\n\n");

  return {
    passages,
    passagesText,
    allowedSlugs: new Set(passages.map((p) => p.slug)),
  };
}

/** The user-turn prompt: numbered passages first, question last. */
export function buildUserPrompt(query: string, passagesText: string): string {
  return `ARCHIVE PASSAGES:\n${passagesText}\n\nQUESTION: ${query}`;
}

export interface DraftValidation {
  /** ok → serve finalAnswer; degraded → fall back to raw hits; insufficient → hard refusal. */
  verdict: "ok" | "degraded" | "insufficient";
  finalAnswer: string | null;
  keptSentences: number;
  droppedSentences: number;
  keptRatio: number;
}

/** Slug-shaped bracket citations, e.g. [vajroli-mudra]. */
const CITATION_RE = /\[([a-z0-9][a-z0-9-]*[a-z0-9])\]/g;

/**
 * Split a draft into sentences on terminal punctuation or Sanskrit danda (॥),
 * keeping bracket citations attached to their sentence.
 */
export function splitIntoSentences(draft: string): string[] {
  return draft
    .split(/(?<=[.!?॥])\s+|(?<=\])\s+(?=[A-ZĀ-Ḥ])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * RFC §5.4 citation validator. Deterministic — no second LLM call.
 *
 * - Exact `INSUFFICIENT_GROUNDING` ⇒ verdict "insufficient" (the model itself
 *   found no grounding; the route returns the raw hits instead).
 * - Every other sentence survives only if it cites ≥1 slug from the retrieved
 *   set. Unknown slugs are treated as uncited (they would cite nothing real).
 * - If nothing survives ⇒ "insufficient"; fewer than 60 % survive ⇒
 *   "degraded" (validator failure; route falls back to raw hits).
 */
export function validateDraftCitations(
  draft: string,
  allowedSlugs: ReadonlySet<string>,
): DraftValidation {
  const trimmed = draft.trim();
  if (trimmed === INSUFFICIENT_GROUNDING) {
    return {
      verdict: "insufficient",
      finalAnswer: null,
      keptSentences: 0,
      droppedSentences: 0,
      keptRatio: 0,
    };
  }

  const sentences = splitIntoSentences(trimmed);
  if (sentences.length === 0) {
    return {
      verdict: "insufficient",
      finalAnswer: null,
      keptSentences: 0,
      droppedSentences: 0,
      keptRatio: 0,
    };
  }

  const kept = sentences.filter((sentence) => {
    const cited = Array.from(sentence.matchAll(CITATION_RE), (m) => m[1]);
    return cited.some((slug) => allowedSlugs.has(slug));
  });

  const keptRatio = kept.length / sentences.length;

  if (kept.length === 0) {
    return {
      verdict: "insufficient",
      finalAnswer: null,
      keptSentences: 0,
      droppedSentences: sentences.length,
      keptRatio: 0,
    };
  }

  if (keptRatio < VALIDATOR_KEPT_RATIO) {
    return {
      verdict: "degraded",
      finalAnswer: null,
      keptSentences: kept.length,
      droppedSentences: sentences.length - kept.length,
      keptRatio,
    };
  }

  return {
    verdict: "ok",
    finalAnswer: kept.join(" "),
    keptSentences: kept.length,
    droppedSentences: sentences.length - kept.length,
    keptRatio,
  };
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  embeddingTokens: number;
}

/**
 * Estimated USD cost of one synthesis call, computed from provider token
 * usage against deploy-pinned prices. The ledger applies GOVERNOR_MULTIPLIER
 * on top so price drift between verification dates cannot silently overrun
 * the budget (RFC §6).
 */
export function estimateSynthesisCostUsd(usage: TokenUsage): number {
  const input =
    (usage.promptTokens / 1_000_000) * PINNED_PRICES_PER_MTOK.input;
  const output =
    (usage.completionTokens / 1_000_000) * PINNED_PRICES_PER_MTOK.output;
  const embedding =
    (usage.embeddingTokens / 1_000_000) * PINNED_PRICES_PER_MTOK.embedding;
  return input + output + embedding;
}

/** What the cost ledger deducts per call (estimate × safety multiplier). */
export function ledgerDeductionUsd(usage: TokenUsage): number {
  return estimateSynthesisCostUsd(usage) * GOVERNOR_MULTIPLIER;
}

export type RateWindow = Map<string, { windowStart: number; count: number }>;

/**
 * Fixed-window rate limiter, injected with time for testability. The route
 * keeps a module-level RateWindow per server instance (best-effort; the edge
 * platform's per-IP limiting remains the strong control — RFC §6).
 *
 * Returns true when the request may proceed; false when over the limit.
 */
export function consumeRateWindow(
  window: RateWindow,
  key: string,
  now: number,
  limit: number,
  windowMs: number,
): boolean {
  const entry = window.get(key);
  if (!entry || now - entry.windowStart >= windowMs) {
    window.set(key, { windowStart: now, count: 1 });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
