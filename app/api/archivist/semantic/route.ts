import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import {
  EmbeddingProviderError,
  generateQueryEmbedding,
  parseEmbedding,
  retrieveSemanticHits,
  DEFAULT_EMBEDDING_MODEL,
} from "@/lib/embeddings";

/**
 * Semantic search endpoint — pgvector-based embedding retrieval.
 *
 * The client sends only natural-language text (`query`). This route generates
 * the query embedding server-side with the same OpenAI embedding model used by
 * scripts/generate_embeddings.py, then runs cosine similarity (`<=>`) against
 * the siddhis.embedding pgvector column via the shared helpers in
 * `lib/embeddings.ts` (RFC-001 Phase C refactor).
 *
 * It falls back gracefully if the embedding provider is not configured,
 * pgvector is not installed, or the embedding column is missing — callers get a
 * clear note and can continue using /api/archivist for keyword search.
 *
 * Output contract: ranked catalogue pointers, never synthesised practice prose.
 */

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
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

    // pgvector cosine-similarity query (top 12 for search display).
    // The siddhis.embedding column must exist (added by the embedding script).
    try {
      const hits = await retrieveSemanticHits(db, queryEmbedding, 12);

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
    setup: `Set OPENAI_API_KEY (and optional OPENAI_EMBEDDING_MODEL, default ${DEFAULT_EMBEDDING_MODEL}), then run scripts/generate_embeddings.py to populate the siddhis.embedding column.`,
  });
}
