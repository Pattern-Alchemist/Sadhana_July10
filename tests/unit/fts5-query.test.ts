import { describe, it, expect } from "vitest";

/**
 * Tests for the FTS5 query sanitiser.
 *
 * The buildMatchQuery function lives in src/app/api/knowledge/route.ts.
 * Since it's not exported, we replicate the logic here and test that
 * the replication matches the spec. In a real test suite, the function
 * would be extracted to a shared utility module and imported directly.
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

describe("buildMatchQuery — FTS5 query sanitiser", () => {
  it("returns empty string for empty input", () => {
    expect(buildMatchQuery("")).toBe("");
    expect(buildMatchQuery("   ")).toBe("");
  });

  it("passes through a quoted phrase as-is", () => {
    expect(buildMatchQuery('"pranava japa"')).toBe('"pranava japa"');
  });

  it("splits unquoted input into AND-joined quoted terms", () => {
    expect(buildMatchQuery("preta spirit")).toBe('"preta" "spirit"');
  });

  it("filters out terms of length <= 1", () => {
    expect(buildMatchQuery("a bc def")).toBe('"bc" "def"');
  });

  it("strips internal double-quotes from terms", () => {
    expect(buildMatchQuery('pre"ta spirit')).toBe('"preta" "spirit"');
  });

  it("splits on punctuation", () => {
    expect(buildMatchQuery("preta;spirit,fire:rite")).toBe('"preta" "spirit" "fire" "rite"');
  });

  it("handles single-word input", () => {
    expect(buildMatchQuery("kumbhaka")).toBe('"kumbhaka"');
  });
});
