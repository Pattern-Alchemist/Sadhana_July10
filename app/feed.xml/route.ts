import { getDb } from "@/db";
import { manuscripts, siddhis } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { buildAtomFeed, FEED_CONTENT_TYPE, type FeedEntry } from "@/lib/feed";
import { getSiteUrl, truncateDescription } from "@/lib/seo";

/**
 * Content-loop Atom feed (Moonshot 4.4).
 *
 * Traverses the `siddhis` and `manuscripts` tables and emits RFC 4287 Atom,
 * suitable for podcast clients, RSS readers, and scheduled YouTube content
 * pipelines that poll for new archive entries.
 *
 * Mirrors the sitemap's resilience contract: if Postgres is unreachable the
 * feed still responds 200 with a valid (zero-entry) feed document rather than
 * 500ing, so external subscribers never see a hard outage.
 */

export const revalidate = 3600; // refresh hourly; corpus changes are rare

const FEED_TITLE = "AstroKalki — The Living Archive";
const FEED_SUBTITLE =
  "Siddhi folios, manuscripts, and contemplative heritage from the AstroKalki living archive.";
/** Atom feeds conventionally cap around the most recent entries; the corpus
 *  is small, but keep an explicit ceiling for future growth. */
const MAX_ENTRIES = 100;

export async function GET() {
  const siteUrl = getSiteUrl();
  const generatedAt = new Date();
  const entries: FeedEntry[] = [];

  try {
    const db = getDb();
    await ensureArchiveSeeded();

    const [siddhiRows, manuscriptRows] = await Promise.all([
      db.select().from(siddhis),
      db.select().from(manuscripts),
    ]);

    for (const s of siddhiRows) {
      entries.push({
        id: `${siteUrl}/siddhi/${s.slug}`,
        title: s.name,
        url: `${siteUrl}/siddhi/${s.slug}`,
        updated: s.createdAt ?? generatedAt,
        summary: truncateDescription(s.summary ?? s.description, 280) || null,
        category: s.category ?? "siddhi",
      });
    }

    for (const m of manuscriptRows) {
      entries.push({
        id: `${siteUrl}/manuscripts/${m.slug}`,
        title: m.title,
        url: `${siteUrl}/manuscripts/${m.slug}`,
        // manuscripts have no created_at column in the canonical schema —
        // treat cataloguing time as the feed generation time.
        updated: generatedAt,
        summary:
          truncateDescription(m.description ?? m.originalTitle, 280) || null,
        category: m.tradition ?? "manuscript",
      });
    }

    // Most recently updated first — what feed readers expect.
    entries.sort((a, b) => b.updated.getTime() - a.updated.getTime());
  } catch (error) {
    console.error("feed.xml DB fallback:", error);
    // Deliberately continue with zero entries: a valid empty feed keeps
    // subscribers connected through a transient database outage.
  }

  const xml = buildAtomFeed({
    title: FEED_TITLE,
    subtitle: FEED_SUBTITLE,
    siteUrl,
    updated: generatedAt,
    entries: entries.slice(0, MAX_ENTRIES),
  });

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": FEED_CONTENT_TYPE,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
