import { NextResponse } from "next/server";
import Database from "better-sqlite3";
import { readFileSync } from "fs";
import { join } from "path";
import { expandQueryForMorphology, explainAnalysis } from "@/lib/sanskrit-morph";

/**
 * Sanskrit morphological search endpoint.
 *
 * Analyzes the query using a rule-based Sanskrit morphological analyzer
 * (sandhi-aware stemmer), expands to all known inflected forms, and
 * runs an FTS5 MATCH against the knowledge archive.
 *
 * This is the most scholarly search mode — it catches morphological
 * variants that plain keyword search would miss. For example:
 *   - "japa" matches "japati", "japanti", "japet"
 *   - "deva" matches "devaḥ", "devau", "devās", "devāya", "devāt"
 *   - "tantra" matches "tantrāṇi", "tantre", "tantrāṇām"
 *
 * The analyzer is rule-based (not dictionary-based), so it will produce
 * both false positives and false negatives — but the recall improvement
 * over plain substring search is substantial.
 *
 * Output contract: same pointer-only format as /api/knowledge — ranked
 * pointers to source material, never synthesised prose.
 */

export const dynamic = "force-dynamic";

const DB_PATH = join(process.cwd(), "knowledge", "sqlite", "knowledge.db");
const INDEX_PATH = join(process.cwd(), "knowledge", "index.json");

interface ChunkRow {
  id: string;
  doc_slug: string;
  ordinal: number;
  text: string;
  rank: number;
}

interface KnowledgeDocMeta {
  slug: string;
  title: string;
  caution_level: string;
  category: string;
  tradition: string;
  file: string;
}

interface KnowledgeIndex {
  documents: KnowledgeDocMeta[];
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

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") ?? "";
    const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "10", 10), 50);

    if (!q.trim()) {
      return NextResponse.json({
        results: [],
        note: "The morphological analyzer awaits a Sanskrit term, stem, or inflected form.",
        total: 0,
        query: q,
      });
    }

    // Expand the query morphologically
    const matchQuery = expandQueryForMorphology(q);
    const explanation = explainAnalysis(q);

    if (!matchQuery) {
      return NextResponse.json({
        results: [],
        note: "Could not parse the query into Sanskrit morphological terms.",
        total: 0,
        query: q,
        explanation,
      });
    }

    const index = loadIndex();
    if (!index) {
      return NextResponse.json({
        results: [],
        note: "The knowledge archive is not available on this deployment.",
        total: 0,
        query: q,
      }, { status: 503 });
    }

    let db: Database.Database;
    try {
      db = new Database(DB_PATH, { readonly: true, fileMustExist: true });
    } catch {
      return NextResponse.json({
        results: [],
        note: "The knowledge archive index could not be opened.",
        total: 0,
        query: q,
      }, { status: 503 });
    }

    let rows: ChunkRow[] = [];
    let total = 0;
    try {
      const stmt = db.prepare(`
        SELECT id, doc_slug, ordinal, text, rank
        FROM chunks
        WHERE chunks MATCH ?
        ORDER BY rank
        LIMIT ?
      `);
      rows = stmt.all(matchQuery, limit) as ChunkRow[];

      const countStmt = db.prepare(`
        SELECT COUNT(*) AS n FROM chunks WHERE chunks MATCH ?
      `);
      total = (countStmt.get(matchQuery) as { n: number }).n;
    } catch (err) {
      db.close();
      return NextResponse.json({
        results: [],
        note: "The morphological query could not be parsed by FTS5. Try simpler terms.",
        total: 0,
        query: q,
        matchQuery,
        explanation,
      }, { status: 400 });
    }
    db.close();

    const docMap = new Map<string, KnowledgeDocMeta>();
    for (const d of index.documents) docMap.set(d.slug, d);

    const results = rows.map((row) => {
      const doc = docMap.get(row.doc_slug);
      const snippet = row.text.length > 280 ? row.text.slice(0, 280).trim() + "…" : row.text;
      return {
        id: row.id,
        doc_slug: row.doc_slug,
        ordinal: row.ordinal,
        text: row.text,
        snippet,
        score: -row.rank,
        document: doc ?? null,
      };
    });

    const note = results.length
      ? `Morphological search expanded the query to ${matchQuery.split(" OR ").length} term variants across ${total} matching passages. Scholarly pointers to primary-source material.`
      : "No morphological matches found. The analyzer may not have recognized the form — try the root stem or a different case.";

    return NextResponse.json({
      results,
      note,
      total,
      query: q,
      matchQuery,
      explanation,
      search_type: "morphological",
    });
  } catch (err) {
    console.error("[knowledge/morphological]", err);
    return NextResponse.json(
      {
        results: [],
        note: "The morphological search is momentarily unavailable.",
        total: 0,
      },
      { status: 500 }
    );
  }
}
