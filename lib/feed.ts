/**
 * Atom feed generation (Moonshot 4.4 — content-loop RSS/Atom).
 * ============================================================
 *
 * Pure, dependency-free Atom 1.0 (RFC 4287) serialization for the AstroKalki
 * corpus. The `/feed.xml` route handler injects freshly-queried rows from the
 * `siddhis` and `manuscripts` tables; everything here stays pure so the XML
 * contract is unit-tested in `tests/unit/feed.test.ts`.
 *
 * The feed is the content-loop distribution channel: any podcast player,
 * RSS reader, or YouTube content pipeline (e.g. a scheduled poller that turns
 * new entries into narration scripts) can subscribe to `/feed.xml`.
 */

export const FEED_CONTENT_TYPE = "application/atom+xml; charset=utf-8";
export const FEED_PATH = "/feed.xml";

export interface FeedEntry {
  /** Stable globally-unique entry id — the absolute entry URL. */
  id: string;
  title: string;
  /** Absolute URL of the entry on the site. */
  url: string;
  updated: Date;
  summary?: string | null;
  category?: string | null;
}

export interface AtomFeedOptions {
  title: string;
  subtitle: string;
  /** Absolute site origin, without trailing slash (from `getSiteUrl()`). */
  siteUrl: string;
  /** Timestamp for the feed-level <updated> element. */
  updated: Date;
  entries: readonly FeedEntry[];
}

/** Escape the five XML special characters for text and attribute contexts. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderEntry(entry: FeedEntry): string {
  const lines: string[] = [
    "  <entry>",
    `    <title>${escapeXml(entry.title)}</title>`,
    `    <id>${escapeXml(entry.id)}</id>`,
    `    <link href="${escapeXml(entry.url)}" rel="alternate"/>`,
    `    <updated>${entry.updated.toISOString()}</updated>`,
  ];

  if (entry.summary) {
    lines.push(`    <summary>${escapeXml(entry.summary)}</summary>`);
  }
  if (entry.category) {
    lines.push(`    <category term="${escapeXml(entry.category)}"/>`);
  }

  lines.push("  </entry>");
  return lines.join("\n");
}

/**
 * Serialize a complete Atom 1.0 feed document. Entries are expected to be
 * pre-sorted by the caller (the route sorts most-recently-updated first).
 */
export function buildAtomFeed(options: AtomFeedOptions): string {
  const { title, subtitle, siteUrl, updated, entries } = options;
  const feedUrl = `${siteUrl}${FEED_PATH}`;
  // Feed <updated> must reflect the newest entry even when the caller's
  // timestamp is older (e.g. DB fallback serving a warm cache).
  const newestEntry = entries.reduce<Date | null>(
    (acc, entry) => (acc === null || entry.updated > acc ? entry.updated : acc),
    null,
  );
  const feedUpdated = newestEntry !== null && newestEntry > updated ? newestEntry : updated;

  const header = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(title)}</title>`,
    `  <subtitle>${escapeXml(subtitle)}</subtitle>`,
    `  <id>${escapeXml(`${siteUrl}/`)}</id>`,
    `  <link href="${escapeXml(`${siteUrl}/`)}" rel="alternate"/>`,
    `  <link href="${escapeXml(feedUrl)}" rel="self" type="application/atom+xml"/>`,
    `  <updated>${feedUpdated.toISOString()}</updated>`,
    "  <author>",
    "    <name>AstroKalki · The Living Archive</name>",
    `    <uri>${escapeXml(`${siteUrl}/`)}</uri>`,
    "  </author>",
  ];

  const body = entries.map(renderEntry);
  return [...header, ...body, "</feed>", ""].join("\n");
}
