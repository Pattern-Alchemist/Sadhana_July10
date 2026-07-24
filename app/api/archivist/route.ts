import { getDb } from "@/db";
import { siddhis, manuscripts } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { foldDiacritics } from "@/lib/iast-fold";
import { sql } from "drizzle-orm";
import type { Siddhi, Manuscript } from "@/db/schema";

export const dynamic = "force-dynamic";

interface Candidate {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  type: "siddhi" | "manuscript";
  score: number;
  reason: string;
}

// Corpus caching for JS fallback
let cachedSiddhis: Siddhi[] | null = null;
let cachedManuscripts: Manuscript[] | null = null;

async function getCachedCorpus() {
  if (cachedSiddhis && cachedManuscripts) {
    return { allRows: cachedSiddhis, codexRows: cachedManuscripts };
  }
  const db = getDb();
  const [sRows, mRows] = await Promise.all([
    db.select().from(siddhis),
    db.select().from(manuscripts),
  ]);
  cachedSiddhis = sRows;
  cachedManuscripts = mRows;
  return { allRows: sRows, codexRows: mRows };
}

export async function POST(req: Request) {
  try {
    const db = getDb();
    await ensureArchiveSeeded();
    const body = await req.json().catch(() => ({}));
    const raw = String(body?.query ?? "").trim();
    if (!raw) {
      return Response.json({
        results: [],
        note: "The Custodian awaits a precise inquiry. Name a term, a text, or a contemplative question.",
      });
    }

    const candidates: Candidate[] = [];
    let usedFallback = false;

    // Try Postgres Full-Text Search first (tsvector 'simple' + unaccent —
    // folded on both sides, so diacritic-free queries match IAST content).
    try {
      const siddhiQuery = sql`
        SELECT slug, name, sanskrit, category, summary,
               ts_rank(
                 (setweight(to_tsvector('simple', unaccent(coalesce(name, ''))), 'A') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(primary_mantra, ''))), 'A') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(category, ''))), 'B') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(tradition, ''))), 'B') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(sanskrit, ''))), 'C') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(summary, ''))), 'C') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D')),
                 websearch_to_tsquery('simple', unaccent(${raw}))
               ) AS rank
        FROM siddhis
        WHERE (setweight(to_tsvector('simple', unaccent(coalesce(name, ''))), 'A') ||
               setweight(to_tsvector('simple', unaccent(coalesce(primary_mantra, ''))), 'A') ||
               setweight(to_tsvector('simple', unaccent(coalesce(category, ''))), 'B') ||
               setweight(to_tsvector('simple', unaccent(coalesce(tradition, ''))), 'B') ||
               setweight(to_tsvector('simple', unaccent(coalesce(sanskrit, ''))), 'C') ||
               setweight(to_tsvector('simple', unaccent(coalesce(summary, ''))), 'C') ||
               setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D'))
              @@ websearch_to_tsquery('simple', unaccent(${raw}))
        ORDER BY rank DESC
        LIMIT 10;
      `;

      const manuscriptQuery = sql`
        SELECT slug, title, original_title as sanskrit, tradition as category, description as summary,
               ts_rank(
                 (setweight(to_tsvector('simple', unaccent(coalesce(title, ''))), 'A') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(tradition, ''))), 'B') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(original_title, ''))), 'C') ||
                  setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D')),
                 websearch_to_tsquery('simple', unaccent(${raw}))
               ) AS rank
        FROM manuscripts
        WHERE (setweight(to_tsvector('simple', unaccent(coalesce(title, ''))), 'A') ||
               setweight(to_tsvector('simple', unaccent(coalesce(tradition, ''))), 'B') ||
               setweight(to_tsvector('simple', unaccent(coalesce(original_title, ''))), 'C') ||
               setweight(to_tsvector('simple', unaccent(coalesce(description, ''))), 'D'))
              @@ websearch_to_tsquery('simple', unaccent(${raw}))
        ORDER BY rank DESC
        LIMIT 10;
      `;

      const [sResults, mResults] = await Promise.all([
        db.execute(siddhiQuery),
        db.execute(manuscriptQuery),
      ]);

      for (const row of sResults.rows) {
        const rank = Number(row.rank) || 0;
        candidates.push({
          slug: String(row.slug),
          name: String(row.name),
          sanskrit: row.sanskrit ? String(row.sanskrit) : null,
          category: row.category ? String(row.category) : null,
          summary: row.summary ? String(row.summary) : null,
          type: "siddhi",
          score: Math.min(99, 40 + rank * 100),
          reason: "Matched via archive full-text index.",
        });
      }

      for (const row of mResults.rows) {
        const rank = Number(row.rank) || 0;
        candidates.push({
          slug: String(row.slug),
          name: String(row.title),
          sanskrit: row.sanskrit ? String(row.sanskrit) : null,
          category: row.category ? String(row.category) : null,
          summary: row.summary ? String(row.summary) : null,
          type: "manuscript",
          score: Math.min(99, 38 + rank * 100),
          reason: "Matched in catalogued codex index.",
        });
      }

      if (candidates.length === 0) {
        // Force fallback if no FTS results to be safe (in case query is too complex for tsquery)
        usedFallback = true;
      }
    } catch (dbErr) {
      console.error("[archivist] DB FTS Error, falling back to JS:", dbErr);
      usedFallback = true;
    }

    if (usedFallback && candidates.length === 0) {
      const { allRows, codexRows } = await getCachedCorpus();
      // Fold IAST diacritics on both sides so "siva" matches "Śiva" (T-002).
      const foldedQuery = foldDiacritics(raw).toLowerCase();
      const terms = foldedQuery.split(/[\s,.;:]+/).filter((t) => t.length > 2);
      const textFn = (s: string | null) => foldDiacritics(s ?? "").toLowerCase();

      for (const s of allRows) {
        const fields: Record<string, string> = {
          name: textFn(s.name),
          sanskrit: textFn(s.sanskrit),
          category: textFn(s.category),
          tradition: textFn(s.tradition),
          "primary mantra": textFn(s.primaryMantra),
          summary: textFn(s.summary),
          description: textFn(s.description),
        };
        const weights: Record<string, number> = {
          name: 6,
          "primary mantra": 5,
          category: 4,
          tradition: 4,
          sanskrit: 3,
          summary: 3,
          description: 2,
        };
        let score = 0;
        let where = "";
        for (const [field, val] of Object.entries(fields)) {
          const hits = terms.reduce(
            (acc, t) => acc + (val.includes(t) ? 1 : 0),
            0
          );
          if (hits > 0) {
            score += hits * weights[field];
            if (!where) where = field;
          }
        }
        if (score > 0) {
          candidates.push({
            slug: s.slug,
            name: s.name,
            sanskrit: s.sanskrit,
            category: s.category,
            summary: s.summary,
            type: "siddhi",
            score: Math.min(99, 40 + score * 6),
            reason: where ? `Attested in the ${where}.` : "Relevant to your inquiry.",
          });
        }
      }

      for (const m of codexRows) {
        const fields: Record<string, string> = {
          title: textFn(m.title),
          tradition: textFn(m.tradition),
          "original title": textFn(m.originalTitle),
          description: textFn(m.description),
        };
        const weights: Record<string, number> = {
          title: 6,
          tradition: 4,
          "original title": 3,
          description: 2,
        };
        let score = 0;
        let where = "";
        for (const [field, val] of Object.entries(fields)) {
          const hits = terms.reduce(
            (acc, t) => acc + (val.includes(t) ? 1 : 0),
            0
          );
          if (hits > 0) {
            score += hits * weights[field];
            if (!where) where = field;
          }
        }
        if (score > 0) {
          candidates.push({
            slug: m.slug,
            name: m.title,
            sanskrit: m.originalTitle,
            category: m.tradition,
            summary: m.description,
            type: "manuscript",
            score: Math.min(99, 38 + score * 6),
            reason: where ? `Catalogued as codex; matched in ${where}.` : "Relevant codex.",
          });
        }
      }
    }

    candidates.sort((a, b) => b.score - a.score);
    const top = candidates.slice(0, 6);

    // De-duplicate if needed (sometimes FTS and JS fallback might mix up if logic changes, but here we only use JS if FTS is 0)

    // Get corpus count for note
    const { allRows, codexRows } = await getCachedCorpus();

    const note = top.length
      ? `The Custodian has traced ${candidates.length} relevant record${candidates.length === 1 ? "" : "s"} across ${allRows.length} folios and ${codexRows.length} codices. These are scholarly pointers, not prescriptions — consult each source.`
      : "The Custodian could not trace that thread through the catalogued corpus. Rephrase, or consult the Codex Library directly.";

    return Response.json({ results: top, note });
  } catch (err) {
    console.error("[archivist]", err);
    return Response.json(
      { results: [], note: "The Custodian is momentarily unavailable." },
      { status: 500 }
    );
  }
}
