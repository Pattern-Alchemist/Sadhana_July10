import { describe, it, expect } from "vitest";
import {
  buildAtomFeed,
  escapeXml,
  FEED_CONTENT_TYPE,
  FEED_PATH,
  type FeedEntry,
} from "@/lib/feed";

/**
 * Tests for the Atom feed generator (Moonshot 4.4).
 */

const SITE_URL = "https://astrokalki.example.com";

function makeEntry(overrides: Partial<FeedEntry> = {}): FeedEntry {
  return {
    id: `${SITE_URL}/siddhi/prajna-siddhi`,
    title: "Prajna Siddhi",
    url: `${SITE_URL}/siddhi/prajna-siddhi`,
    updated: new Date("2026-07-01T00:00:00.000Z"),
    summary: "The perfection of discriminating wisdom.",
    category: "siddhi",
    ...overrides,
  };
}

describe("escapeXml", () => {
  it("escapes all five XML special characters", () => {
    expect(escapeXml(`a & b < c > d " e ' f`)).toBe(
      "a &amp; b &lt; c &gt; d &quot; e &apos; f",
    );
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeXml("Vajroli Mudra — kechari — ॐ")).toBe(
      "Vajroli Mudra — kechari — ॐ",
    );
  });
});

describe("buildAtomFeed", () => {
  it("emits a well-formed Atom 1.0 envelope", () => {
    const xml = buildAtomFeed({
      title: "Test Feed",
      subtitle: "Sub",
      siteUrl: SITE_URL,
      updated: new Date("2026-07-24T00:00:00.000Z"),
      entries: [makeEntry()],
    });

    expect(xml.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toBe(true);
    expect(xml).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
    expect(xml).toContain("<title>Test Feed</title>");
    expect(xml).toContain(`<link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/atom+xml"/>`);
    expect(xml.trimEnd().endsWith("</feed>")).toBe(true);
  });

  it("renders one <entry> per item with title, id, link, updated", () => {
    const entries = [
      makeEntry(),
      makeEntry({
        id: `${SITE_URL}/manuscripts/atma-bodha`,
        title: "Atma Bodha",
        url: `${SITE_URL}/manuscripts/atma-bodha`,
        category: "manuscript",
      }),
    ];
    const xml = buildAtomFeed({
      title: "T",
      subtitle: "S",
      siteUrl: SITE_URL,
      updated: new Date("2026-07-24T00:00:00.000Z"),
      entries,
    });

    expect(xml.match(/<entry>/g)?.length).toBe(2);
    expect(xml).toContain(`<link href="${SITE_URL}/siddhi/prajna-siddhi" rel="alternate"/>`);
    expect(xml).toContain("<updated>2026-07-01T00:00:00.000Z</updated>");
    expect(xml).toContain('<category term="manuscript"/>');
  });

  it("XML-escapes hostile characters in titles and summaries", () => {
    const xml = buildAtomFeed({
      title: "T & <Co>",
      subtitle: "S",
      siteUrl: SITE_URL,
      updated: new Date("2026-07-24T00:00:00.000Z"),
      entries: [
        makeEntry({
          title: `<script>alert("xss")</script>`,
          summary: `5 > 3 & 2 < 4`,
        }),
      ],
    });

    expect(xml).not.toContain("<script>");
    expect(xml).toContain("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
    expect(xml).toContain("5 &gt; 3 &amp; 2 &lt; 4");
    expect(xml).toContain("T &amp; &lt;Co&gt;");
  });

  it("feeds with zero entries are still valid documents", () => {
    const xml = buildAtomFeed({
      title: "T",
      subtitle: "S",
      siteUrl: SITE_URL,
      updated: new Date("2026-07-24T00:00:00.000Z"),
      entries: [],
    });

    expect(xml).toContain("<feed");
    expect(xml).not.toContain("<entry>");
    expect(xml.trimEnd().endsWith("</feed>")).toBe(true);
  });

  it("rolls the feed-level <updated> forward to the newest entry", () => {
    const xml = buildAtomFeed({
      title: "T",
      subtitle: "S",
      siteUrl: SITE_URL,
      updated: new Date("2026-07-20T00:00:00.000Z"),
      entries: [makeEntry({ updated: new Date("2026-07-23T12:00:00.000Z") })],
    });

    expect(xml).toContain("<updated>2026-07-23T12:00:00.000Z</updated>");
  });

  it("advertises the Atom content type at the documented path", () => {
    expect(FEED_CONTENT_TYPE).toContain("application/atom+xml");
    expect(FEED_PATH).toBe("/feed.xml");
  });
});
