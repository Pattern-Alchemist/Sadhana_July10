import { db } from "@/db";
import { siddhis, manuscripts } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";

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

export async function POST(req: Request) {
  try {
    await ensureArchiveSeeded();
    const body = await req.json().catch(() => ({}));
    const raw = String(body?.query ?? "").trim().toLowerCase();
    if (!raw) {
      return Response.json({
        results: [],
        note: "The Custodian awaits a precise inquiry. Name a term, a text, or a contemplative question.",
      });
    }

    const terms = raw.split(/[\s,.;:]+/).filter((t) => t.length > 2);
    const text = (s: string | null) => (s ?? "").toLowerCase();

    const allRows = await db.select().from(siddhis);
    const codexRows = await db.select().from(manuscripts);

    const candidates: Candidate[] = [];

    for (const s of allRows) {
      const fields: Record<string, string> = {
        name: text(s.name),
        sanskrit: text(s.sanskrit),
        category: text(s.category),
        tradition: text(s.tradition),
        "primary mantra": text(s.primaryMantra),
        summary: text(s.summary),
        description: text(s.description),
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
        title: text(m.title),
        tradition: text(m.tradition),
        "original title": text(m.originalTitle),
        description: text(m.description),
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

    candidates.sort((a, b) => b.score - a.score);
    const top = candidates.slice(0, 6);

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
