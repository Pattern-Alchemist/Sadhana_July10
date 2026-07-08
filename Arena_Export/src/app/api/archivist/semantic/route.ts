import { NextResponse } from "next/server";
import { db } from "@/db";
import { siddhis } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { sql } from "drizzle-orm";

/**
 * Semantic search endpoint — pgvector-based embedding retrieval.
 *
 * Uses cosine similarity (`<=>` operator) against an `embedding` column
 * on the siddhis table. The embedding is generated at seed time by a
 * build-time script (scripts/generate_embeddings.py) using a local or
 * hosted embedding model.
 *
 * Falls back gracefully if pgvector is not installed or the embedding
 * column is missing — returns a 503 with a helpful message rather than
 * crashing. The runtime text-search endpoint (/api/archivist) remains
 * available as the primary search mechanism.
 *
 * Output contract: same pointer-only format as /api/archivist — ranked
 * pointers to catalogue entries, never synthesised prose.
 */

export const dynamic = "force-dynamic";

interface SemanticHit {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  score: number;
  distance: number;
}

export async function POST(req: Request) {
  try {
    await ensureArchiveSeeded();

    const body = await req.json().catch(() => ({}));
    const query = String(body?.query ?? "").trim();
    if (!query) {
      return NextResponse.json({
        results: [],
        note: "The Custodian awaits a precise inquiry.",
        total: 0,
      });
    }

    // Generate the query embedding. In production this would call the
    // same embedding model used at seed time. Here we accept the embedding
    // directly in the request body (for testing) or fall back.
    const queryEmbedding: number[] | null = body?.embedding ?? null;

    if (!queryEmbedding || !Array.isArray(queryEmbedding) || queryEmbedding.length === 0) {
      return NextResponse.json({
        results: [],
        note: "Semantic search requires a query embedding. Use /api/archivist for text search, or generate an embedding for the query and pass it in the `embedding` field.",
        total: 0,
        query,
      }, { status: 200 });  // 200 with empty results — not an error, just unsupported
    }

    // Try the pgvector cosine-similarity query.
    // The siddhis.embedding column must exist (added by migration).
    try {
      const vectorLiteral = `[${queryEmbedding.join(",")}]`;
      const rows = await db.execute(sql`
        SELECT slug, name, sanskrit, category, summary,
               embedding <=> ${vectorLiteral}::vector AS distance
        FROM siddhis
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> ${vectorLiteral}::vector
        LIMIT 12;
      `);

      const hits: SemanticHit[] = (rows.rows as any[]).map((r) => ({
        slug: r.slug,
        name: r.name,
        sanskrit: r.sanskrit,
        category: r.category,
        summary: r.summary,
        distance: r.distance,
        score: 1 - r.distance,  // cosine distance → similarity score
      }));

      const note = hits.length
        ? `The Custodian traced ${hits.length} semantically related folios via pgvector cosine similarity. These are scholarly pointers, not prescriptions.`
        : "No semantic matches found. The embedding column may be empty — run scripts/generate_embeddings.py to populate it.";

      return NextResponse.json({
        results: hits,
        note,
        total: hits.length,
        query,
        search_type: "semantic",
      });
    } catch (pgErr: any) {
      // pgvector not installed, or embedding column missing
      console.error("[archivist/semantic] pgvector query failed:", pgErr?.message);
      return NextResponse.json({
        results: [],
        note: "Semantic search is not available on this deployment. pgvector may not be installed, or the siddhis.embedding column may not exist. Use /api/archivist for text search.",
        total: 0,
        query,
        search_type: "semantic",
        error: "pgvector_unavailable",
      }, { status: 503 });
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
 * GET — discovery endpoint. Returns whether semantic search is available
 * on this deployment, plus instructions for generating embeddings.
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/archivist/semantic",
    method: "POST",
    description: "pgvector-based semantic search across the siddhi corpus. Returns ranked pointers (not synthesised prose).",
    request_shape: {
      query: "string — the search query",
      embedding: "number[] — the query's embedding vector (same model as seed-time embeddings)",
    },
    response_shape: {
      results: "SemanticHit[] — ranked by cosine similarity",
      note: "string — templated summary",
      total: "number",
      search_type: "'semantic'",
    },
    fallback: "Use /api/archivist (POST) for weighted text search — no embeddings required.",
    setup: "Run scripts/generate_embeddings.py to populate the siddhis.embedding column at seed time.",
  });
}
