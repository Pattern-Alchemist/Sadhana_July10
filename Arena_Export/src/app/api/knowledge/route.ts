import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Knowledge archive search endpoint.
 *
 * Queries the offline SQLite FTS5 index at knowledge/sqlite/knowledge.db.
 * Returns ranked chunks with parent document metadata. Pointer-only —
 * never synthesises an answer.
 *
 * The knowledge archive is built at deploy time by scripts/build_knowledge_archive.py
 * from the PDFs and Markdown files in knowledge/tantra/.
 */

export const dynamic = "force-dynamic";

const DB_PATH = join(process.cwd(), "knowledge", "sqlite", "knowledge.db");
const INDEX_PATH = join(process.cwd(), "knowledge", "index.json");

interface KnowledgeDocMeta {
  slug: string;
  kind: string;
  title: string;
  original_title: string;
  category: string;
  subcategory: string;
  tradition: string;
  tags: string[];
  caution_level: "high" | "moderate" | "low";
  file: string;
  description: string;
  chunk_count: number;
  text_chars: number;
  text_words: number;
}

interface KnowledgeIndex {
  archive: string;
  version: string;
  total_documents: number;
  total_chunks: number;
  documents: KnowledgeDocMeta[];
}

interface ChunkRow {
  id: string;
  doc_slug: string;
  ordinal: number;
  text: string;
  rank: number;
}

interface SearchHit {
  id: string;
  doc_slug: string;
  ordinal: number;
  text: string;
  snippet: string;
  score: number;
  document: KnowledgeDocMeta;
}

let cachedIndex: KnowledgeIndex | null = null;

function loadIndex(): KnowledgeIndex | null {
  if (cachedIndex) return cachedIndex;
  try {
    const raw = readFileSync(INDEX_PATH, "utf-8");
    cachedIndex = JSON.parse(raw) as KnowledgeIndex;
    return cachedIndex;
  } catch {
    return null;
  }
}

function buildSnippet(text: string, maxLen: number = 280): string {
  if (text.length <= maxLen) return text.trim();
  return text.slice(0, maxLen).trim() + "…";
}

/**
 * Sanitises the query for FTS5. FTS5 MATCH has special syntax (AND, OR, NOT,
 * prefix*, "phrase"); we escape bare punctuation but allow quoted phrases.
 */
function buildMatchQuery(q: string): string {
  const trimmed = q.trim();
  if (!trimmed) return "";
  if (/^"[^"]*"$/.test(trimmed)) return trimmed;
  const terms = trimmed
    .split(/[\s,;:]+/)
    .filter((t) => t.length > 1)
    .map((t) => `"${t.replace(/"/g, "")}"`);
  return terms.join(" ");
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") ?? "";
    const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "10", 10), 50);
    const offset = Math.max(parseInt(url.searchParams.get("offset") ?? "0", 10), 0);
    const includeHighCaution = url.searchParams.get("include_high_caution") !== "false";

    const index = loadIndex();
    if (!index) {
      return NextResponse.json(
        {
          results: [],
          note: "The knowledge archive is not currently available on this deployment.",
          total: 0,
        },
        { status: 503 }
      );
    }

    const matchQuery = buildMatchQuery(q);
    if (!matchQuery) {
      return NextResponse.json({
        results: [],
        note: "The Custodian awaits a precise inquiry. Name a term, a text, a mantra, or a contemplative question.",
        total: 0,
        archive_stats: {
          total_documents: index.total_documents,
          total_chunks: index.total_chunks,
        },
      });
    }

    let db: Database.Database;
    try {
      db = new Database(DB_PATH, { readonly: true, fileMustExist: true });
    } catch {
      return NextResponse.json(
        {
          results: [],
          note: "The knowledge archive index could not be opened. It may not have been built during deployment.",
          total: 0,
        },
        { status: 503 }
      );
    }

    let rows: ChunkRow[] = [];
    try {
      const stmt = db.prepare(`
        SELECT id, doc_slug, ordinal, text, rank
        FROM chunks
        WHERE chunks MATCH ?
        ORDER BY rank
        LIMIT ? OFFSET ?
      `);
      rows = stmt.all(matchQuery, limit, offset) as ChunkRow[];
    } catch (err) {
      db.close();
      return NextResponse.json(
        {
          results: [],
          note: "The search query could not be parsed. Try simpler terms.",
          total: 0,
          query: q,
        },
        { status: 400 }
      );
    }

    let total = 0;
    try {
      const countStmt = db.prepare(`
        SELECT COUNT(*) AS n FROM chunks WHERE chunks MATCH ?
      `);
      total = (countStmt.get(matchQuery) as { n: number }).n;
    } catch {
      // fall through with total = 0
    }
    db.close();

    const docMap = new Map<string, KnowledgeDocMeta>();
    for (const d of index.documents) docMap.set(d.slug, d);

    const hits: SearchHit[] = [];
    for (const row of rows) {
      const doc = docMap.get(row.doc_slug);
      if (!doc) continue;
      if (!includeHighCaution && doc.caution_level === "high") continue;
      hits.push({
        id: row.id,
        doc_slug: row.doc_slug,
        ordinal: row.ordinal,
        text: row.text,
        snippet: buildSnippet(row.text),
        score: -row.rank,
        document: {
          slug: doc.slug,
          kind: doc.kind,
          title: doc.title,
          original_title: doc.original_title,
          category: doc.category,
          subcategory: doc.subcategory,
          tradition: doc.tradition,
          tags: doc.tags,
          caution_level: doc.caution_level,
          file: doc.file,
          description: doc.description,
          chunk_count: doc.chunk_count,
          text_chars: doc.text_chars,
          text_words: doc.text_words,
        },
      });
    }

    const note = hits.length
      ? `The Custodian traced ${total} matching passage${total === 1 ? "" : "s"} across ${index.total_documents} source documents. These are scholarly pointers to primary-source material — consult each source directly. ${hits.some((h) => h.document.caution_level === "high") ? "Some results are tagged high-caution; read the framing carefully." : ""}`.trim()
      : "The Custodian could not trace that thread through the source corpus. Rephrase with simpler terms, or browse the archive directly.";

    return NextResponse.json({
      results: hits,
      note,
      total,
      query: q,
      offset,
      limit,
      archive_stats: {
        total_documents: index.total_documents,
        total_chunks: index.total_chunks,
      },
    });
  } catch (err) {
    console.error("[knowledge/search]", err);
    return NextResponse.json(
      {
        results: [],
        note: "The knowledge archive search is momentarily unavailable.",
        total: 0,
      },
      { status: 500 }
    );
  }
}
