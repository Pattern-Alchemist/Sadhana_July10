import { sql } from "drizzle-orm";
import type { Database } from "@/db";

/**
 * Shared server-side embedding + pgvector retrieval helpers.
 * ===========================================================
 *
 * Extracted from `app/api/archivist/semantic/route.ts` (RFC-001 Phase C
 * refactor, §5.2) so both the semantic search route and the Phase C synthesis
 * route (`/api/archivist/synthesize`) embed queries and retrieve through one
 * code path.
 *
 * The API key never leaves the server. Callers handle
 * `EmbeddingProviderError` themselves (each route maps it to its own
 * fallback contract — see the RFC's seven-layer ladder).
 */

export const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";
export const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";

export interface SemanticHit {
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

export interface PgVectorRow {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  distance: number | string;
}

export interface OpenAIEmbeddingResponse {
  data?: Array<{
    embedding?: unknown;
  }>;
  error?: {
    message?: string;
  };
}

export class EmbeddingProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EmbeddingProviderError";
  }
}

export function parseEmbedding(value: unknown): number[] | null {
  if (!Array.isArray(value)) return null;

  const embedding = value.map((item) => Number(item));
  if (embedding.length === 0 || embedding.some((item) => !Number.isFinite(item))) {
    return null;
  }

  return embedding;
}

/**
 * Embed a natural-language query server-side with the configured model
 * (default `text-embedding-3-small`, 1536 dims — matching the build-time
 * corpus embeddings written by scripts/generate_embeddings.py).
 */
export async function generateQueryEmbedding(query: string): Promise<number[]> {
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

export function vectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}

export function similarityFromDistance(distanceValue: number | string): number {
  const distance = Number(distanceValue);
  if (!Number.isFinite(distance)) return 0;
  return Math.max(0, Math.min(1, 1 - distance));
}

/**
 * pgvector cosine (`<=>`) top-k retrieval over the embedded siddhi corpus.
 * Throws if pgvector / the `siddhis.embedding` column is unavailable — callers
 * map that failure to their own degradation contract (F3 in the RFC ladder).
 */
export async function retrieveSemanticHits(
  db: Database,
  queryEmbedding: number[],
  topK = 12,
): Promise<SemanticHit[]> {
  const vector = vectorLiteral(queryEmbedding);
  const rows = await db.execute(sql`
    SELECT slug, name, sanskrit, category, summary,
           embedding <=> ${vector}::vector AS distance
    FROM siddhis
    WHERE embedding IS NOT NULL
    ORDER BY embedding <=> ${vector}::vector
    LIMIT ${topK};
  `);

  return (rows.rows as unknown as PgVectorRow[]).map((row) => {
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
}
