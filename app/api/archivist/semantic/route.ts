import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { sql } from "drizzle-orm";

/**
 * Semantic search endpoint — pgvector-based embedding retrieval.
 *
 * The client sends only natural-language text (`query`). This route generates
 * the query embedding server-side with the same OpenAI embedding model used by
 * scripts/generate_embeddings.py, then runs cosine similarity (`<=>`) against
 * the siddhis.embedding pgvector column.
 *
 * It falls back gracefully if the embedding provider is not configured,
 * pgvector is not installed, or the embedding column is missing — callers get a
 * clear note and can continue using /api/archivist for keyword search.
 *
 * Output contract: ranked catalogue pointers, never synthesised practice prose.
 */

export const dynamic = "force-dynamic";

const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";
const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";

interface SemanticHit {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  type: "siddhi";
  reason: string;
  score: number;
  distance: number;
}

interface PgVectorRow {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  distance: number | string;
}

interface OpenAIEmbeddingResponse {
  data?: Array<{
    embedding?: unknown;
  }>;
  error?: {
    message?: string;
  };
}

class EmbeddingProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbeddingProviderError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseEmbedding(value: unknown): number[] | null {
  if (!Array.isArray(value)) return null;

  const embedding = value.map((item) => Number(item));
  if (embedding.length === 0 || embedding.some((item) => !Number.isFinite(item))) {
    return null;
  }

  return embedding;
}

async function generateQueryEmbedding(query: string): Promise<number[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new EmbeddingProviderError(
      "Semantic search is not configured on this deployment. Set OPENAI_API_KEY, or use /api/archivist for keyword search."
    );
  }

  const model = process.env.OPENAI_EMBEDDING_MODEL ?? DEFAULT_EMBEDDING_MODEL;
  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: query,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as OpenAIEmbeddingResponse;

  if (!response.ok) {
    const providerMessage = payload.error?.message ? ` (${payload.error.message})` : "";
    throw new EmbeddingProviderError(
      `The embedding provider rejected the query${providerMessage}. Use /api/archivist for keyword search.`
    );
  }

  const embedding = parseEmbedding(payload.data?.[0]?.embedding);
  if (!embedding) {
    throw new EmbeddingProviderError(
      "The embedding provider returned an unusable vector. Use /api/archivist for keyword search."
    );
  }

  return embedding;
}

function vectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}

function similarityFromDistance(distanceValue: number | string): number {
  const distance = Number(distanceValue);
  if (!Number.isFinite(distance)) return 0;
  return Math.max(0, Math.min(1, 1 - distance));
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    await ensureArchiveSeeded();

    const parsedBody = await req.json().catch(() => ({}));
    const body = isRecord(parsedBody) ? parsedBody : {};
    const query = String(body.query ?? "").trim();
    if (!query) {
      return NextResponse.json({
        results: [],
        note: "The Custodian awaits a precise inquiry.",
        total: 0,
      });
    }

    // Optional test/debug escape hatch: callers may still pass a known-good
    // embedding, but production clients only need to send `query`.
    let queryEmbedding = parseEmbedding(body.embedding);
    if (!queryEmbedding) {
      try {
        queryEmbedding = await generateQueryEmbedding(query);
      } catch (embeddingErr) {
        const message =
          embeddingErr instanceof EmbeddingProviderError
            ? embeddingErr.message
            : "Semantic search could not generate a query embedding. Use /api/archivist for keyword search.";

        return NextResponse.json(
          {
            results: [],
            note: message,
            total: 0,
            query,
            search_type: "semantic",
            error: "embedding_provider_unavailable",
          },
          { status: 503 }
        );
      }
    }

    // Try the pgvector cosine-similarity query.
    // The siddhis.embedding column must exist (added by the embedding script).
    try {
      const vector = vectorLiteral(queryEmbedding);
      const rows = await db.execute(sql`
        SELECT slug, name, sanskrit, category, summary,
               embedding <=> ${vector}::vector AS distance
        FROM siddhis
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> ${vector}::vector
        LIMIT 12;
      `);

      const hits: SemanticHit[] = (rows.rows as unknown as PgVectorRow[]).map((row) => {
        const distance = Number(row.distance);
        return {
          slug: row.slug,
          name: row.name,
          sanskrit: row.sanskrit,
          category: row.category,
          summary: row.summary,
          type: "siddhi",
          reason: "Semantic proximity in the embedded siddhi corpus.",
          distance,
          score: Math.round(similarityFromDistance(distance) * 100),
        };
      });

      const note = hits.length
        ? `The Custodian traced ${hits.length} semantically related folio${hits.length === 1 ? "" : "s"} via pgvector cosine similarity. These are scholarly pointers, not prescriptions.`
        : "No semantic matches found. The embedding column may be empty — run scripts/generate_embeddings.py to populate it.";

      return NextResponse.json({
        results: hits,
        note,
        total: hits.length,
        query,
        search_type: "semantic",
      });
    } catch (pgErr) {
      // pgvector not installed, or embedding column missing.
      console.error(
        "[archivist/semantic] pgvector query failed:",
        pgErr instanceof Error ? pgErr.message : pgErr
      );
      return NextResponse.json(
        {
          results: [],
          note: "Semantic search is not available on this deployment. pgvector may not be installed, or the siddhis.embedding column may not exist. Use /api/archivist for text search.",
          total: 0,
          query,
          search_type: "semantic",
          error: "pgvector_unavailable",
        },
        { status: 503 }
      );
    }
  } catch (err) {
    console.error("[archivist/semantic]", err);
    return NextResponse.json(
      {
        results: [],
        note: "The semantic search is momentarily unavailable.",
        total: 0,
      },
      { status: 500 }
    );
  }
}

/**
 * GET — discovery endpoint. Returns how to call semantic search on this
 * deployment, plus setup notes for the embedding provider and pgvector corpus.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/archivist/semantic",
    method: "POST",
    description:
      "pgvector-based semantic search across the siddhi corpus. Send natural-language text; the server generates the query embedding and returns ranked pointers (not synthesised prose).",
    request_shape: {
      query: "string — the search query",
      embedding:
        "number[] — optional test/debug override; production clients should omit this and let the server embed `query`.",
    },
    response_shape: {
      results: "SemanticHit[] — ranked by cosine similarity",
      note: "string — templated summary",
      total: "number",
      search_type: "'semantic'",
    },
    fallback: "Use /api/archivist (POST) for weighted text search — no embeddings required.",
    setup:
      "Set OPENAI_API_KEY (and optional OPENAI_EMBEDDING_MODEL), then run scripts/generate_embeddings.py to populate the siddhis.embedding column.",
  });
}
