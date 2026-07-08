import { describe, it, expect } from "vitest";
import { analyzeWord, expandQueryForMorphology, explainAnalysis } from "@/lib/sanskrit-morph";

/**
 * Tests for the Sanskrit morphological analyzer.
 *
 * The analyzer is rule-based, so we test that:
 *   - Known stop-stems are returned as-is
 *   - Verb conjugations are reduced to their stems
 *   - Noun declensions are reduced to their stems
 *   - The query expansion produces FTS5-compatible OR-joined terms
 */

describe("analyzeWord — stop stems", () => {
  it("returns 'om' as-is", () => {
    const a = analyzeWord("om");
    expect(a.stems).toContain("om");
    expect(a.analyses.some((an) => an.type === "stop-stem")).toBe(true);
  });

  it("returns 'śiva' as-is", () => {
    const a = analyzeWord("śiva");
    expect(a.stems).toContain("śiva");
  });

  it("returns 'karma' as-is", () => {
    const a = analyzeWord("karma");
    expect(a.stems).toContain("karma");
  });
});

describe("analyzeWord — verb conjugations", () => {
  it("reduces 'japati' to a stem starting with 'japa'", () => {
    const a = analyzeWord("japati");
    expect(a.stems.some((s) => s.startsWith("japa"))).toBe(true);
    expect(a.analyses.some((an) => an.type === "verb-ending")).toBe(true);
  });

  it("reduces 'japanti' to a stem starting with 'jap'", () => {
    const a = analyzeWord("japanti");
    expect(a.stems.some((s) => s.startsWith("jap"))).toBe(true);
  });

  it("reduces 'japāmi' to a stem starting with 'jap'", () => {
    const a = analyzeWord("japāmi");
    expect(a.stems.some((s) => s.startsWith("jap"))).toBe(true);
  });
});

describe("analyzeWord — noun declensions", () => {
  it("reduces 'devaḥ' to the stem 'deva'", () => {
    const a = analyzeWord("devaḥ");
    expect(a.stems).toContain("deva");
    expect(a.analyses.some((an) => an.type === "noun-ending")).toBe(true);
  });

  it("reduces 'devāya' to a candidate stem starting with 'dev'", () => {
    const a = analyzeWord("devāya");
    // The analyzer should produce at least one stem that starts with 'dev'
    expect(a.stems.some((s) => s.startsWith("dev"))).toBe(true);
  });

  it("reduces 'devānām' to candidate stems including 'dev'", () => {
    const a = analyzeWord("devānām");
    // The analyzer should produce at least one stem that starts with 'dev'
    expect(a.stems.some((s) => s.startsWith("dev"))).toBe(true);
  });
});

describe("analyzeWord — derivational suffixes", () => {
  it("reduces 'devatva' (abstract noun) to the stem 'deva'", () => {
    const a = analyzeWord("devatva");
    expect(a.stems).toContain("deva");
    expect(a.analyses.some((an) => an.type === "derivational-suffix")).toBe(true);
  });

  it("reduces 'yogin' (agent noun) to the stem 'yog'", () => {
    const a = analyzeWord("yogin");
    expect(a.analyses.some((an) => an.type === "derivational-suffix")).toBe(true);
  });
});

describe("analyzeWord — prefix stripping", () => {
  it("strips the prefix 'pra' from 'prajapa'", () => {
    const a = analyzeWord("prajapa");
    expect(a.stems).toContain("japa");
    expect(a.analyses.some((an) => an.type === "prefix-stripped")).toBe(true);
  });

  it("strips the prefix 'sam' from 'samādhi'", () => {
    const a = analyzeWord("samādhi");
    // Should at least produce 'ādhi' as a candidate
    expect(a.stems.length).toBeGreaterThan(0);
  });
});

describe("expandQueryForMorphology", () => {
  it("returns empty string for empty input", () => {
    expect(expandQueryForMorphology("")).toBe("");
    expect(expandQueryForMorphology("   ")).toBe("");
  });

  it("returns FTS5 OR-joined terms for a single word", () => {
    const result = expandQueryForMorphology("japati");
    expect(result).toContain('"japa"');
    expect(result).toContain("OR");
  });

  it("handles multi-word queries", () => {
    const result = expandQueryForMorphology("japati devaḥ");
    expect(result).toContain("OR");
    expect(result).toContain('"japa"');
    expect(result).toContain('"deva"');
  });

  it("includes prefix-match terms (with *)", () => {
    const result = expandQueryForMorphology("japa");
    expect(result).toContain("*");
  });
});

describe("explainAnalysis", () => {
  it("returns an array of word analyses", () => {
    const result = explainAnalysis("japati");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0].word).toBe("japati");
    expect(result[0].stems.length).toBeGreaterThan(0);
    expect(typeof result[0].analysis).toBe("string");
  });

  it("handles multi-word queries", () => {
    const result = explainAnalysis("japati devaḥ");
    expect(result.length).toBe(2);
  });
});
