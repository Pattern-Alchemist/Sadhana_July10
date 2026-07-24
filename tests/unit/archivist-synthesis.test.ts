import { describe, it, expect } from "vitest";
import {
  ARCHIVIST_SYSTEM_PROMPT,
  GOVERNOR_MULTIPLIER,
  INSUFFICIENT_GROUNDING,
  PASSAGE_TOKEN_CAP,
  SYNTH_SIMILARITY_FLOOR,
  SYNTH_TOP_K,
  buildContextPack,
  buildUserPrompt,
  consumeRateWindow,
  estimateSynthesisCostUsd,
  ledgerDeductionUsd,
  splitIntoSentences,
  truncateToTokenCap,
  validateDraftCitations,
  type RateWindow,
} from "@/lib/archivist-synthesis";
import type { SemanticHit } from "@/lib/embeddings";

/**
 * Tests for the RFC-001 Phase C synthesis logic (Moonshot 4.1).
 * All pure functions — no DB, no network.
 */

function hit(slug: string, summary: string, score = 80): SemanticHit {
  return {
    slug,
    name: slug,
    sanskrit: null,
    category: "siddhi",
    summary,
    type: "siddhi",
    reason: "test",
    score,
    distance: 1 - score / 100,
  };
}

describe("constants match the RFC contract", () => {
  it("uses top-k 8 and the 0.32 similarity floor", () => {
    expect(SYNTH_TOP_K).toBe(8);
    expect(SYNTH_SIMILARITY_FLOOR).toBeCloseTo(0.32);
  });

  it("system prompt constrains to passages and mandates slug citations", () => {
    expect(ARCHIVIST_SYSTEM_PROMPT).toContain("ONLY the numbered archive passages");
    expect(ARCHIVIST_SYSTEM_PROMPT).toContain("[vajroli-mudra]");
    expect(ARCHIVIST_SYSTEM_PROMPT).toContain(INSUFFICIENT_GROUNDING);
  });
});

describe("truncateToTokenCap", () => {
  it("keeps short text untouched", () => {
    expect(truncateToTokenCap("short passage", 10)).toBe("short passage");
  });

  it("truncates long text near the cap without cutting mid-word", () => {
    const longText = Array.from({ length: 300 }, (_, i) => `word${i}`).join(" ");
    const out = truncateToTokenCap(longText, 10); // ~40 chars
    expect(out.length).toBeLessThanOrEqual(45);
    expect(out.endsWith("…")).toBe(true);
    expect(out.includes("word1")).toBe(true);
  });

  it("collapses whitespace before measuring", () => {
    expect(truncateToTokenCap("a\n\n  b\t c")).toBe("a b c");
  });
});

describe("buildContextPack", () => {
  it("numbers passages starting at 1 and collects allowed slugs", () => {
    const { passages, passagesText, allowedSlugs } = buildContextPack([
      hit("vajroli-mudra", "First."),
      hit("kechari-mudra", "Second."),
    ]);

    expect(passages[0].index).toBe(1);
    expect(passages[1].index).toBe(2);
    expect(passagesText).toContain("[1] <vajroli-mudra> First.");
    expect(passagesText).toContain("[2] <kechari-mudra> Second.");
    expect(allowedSlugs.has("vajroli-mudra")).toBe(true);
    expect(allowedSlugs.has("unrelated-slug")).toBe(false);
  });

  it("caps each passage at PASSAGE_TOKEN_CAP tokens", () => {
    const big = hit("big", Array.from({ length: 500 }, (_, i) => `t${i}`).join(" "));
    const { passages } = buildContextPack([big]);
    expect(passages[0].text.length).toBeLessThanOrEqual(PASSAGE_TOKEN_CAP * 4 + 5);
  });

  it("user prompt places passages before the question", () => {
    const prompt = buildUserPrompt("which folios warn about kechari?", "[1] <a> text");
    expect(prompt.indexOf("ARCHIVE PASSAGES:")).toBeLessThan(prompt.indexOf("QUESTION:"));
  });
});

describe("splitIntoSentences", () => {
  it("splits on terminal punctuation and keeps citations attached", () => {
    const s = splitIntoSentences("Om is sacred [om-siddhi]. Kechari warns [kechari].");
    expect(s).toEqual(["Om is sacred [om-siddhi].", "Kechari warns [kechari]."]);
  });

  it("splits after bracket citations followed by new sentences", () => {
    const s = splitIntoSentences("First claim [a] Second claim [b]");
    expect(s.length).toBe(2);
  });
});

describe("validateDraftCitations (RFC §5.4)", () => {
  const allowed = new Set(["vajroli-mudra", "kechari-mudra"]);

  it("passes when every sentence cites a retrieved slug", () => {
    const v = validateDraftCitations(
      "Vajroli is described as an advanced seal [vajroli-mudra]. Kechari warnings appear in [kechari-mudra].",
      allowed,
    );
    expect(v.verdict).toBe("ok");
    expect(v.finalAnswer).toContain("[vajroli-mudra]");
    expect(v.keptRatio).toBe(1);
  });

  it("drops uncited sentences and still passes when ≥60% survive", () => {
    const v = validateDraftCitations(
      "Vajroli is an advanced seal [vajroli-mudra]. Kechari is described as a tongue seal [kechari-mudra]. Both folios ground the warning [vajroli-mudra]. This sentence has no citation.",
      allowed,
    );
    expect(v.verdict).toBe("ok");
    expect(v.droppedSentences).toBe(1);
    expect(v.keptRatio).toBeCloseTo(3 / 4);
    expect(v.finalAnswer).not.toContain("no citation");
    expect(v.finalAnswer).toContain("[vajroli-mudra]");
  });

  it("treats citations of NON-retrieved slugs as uncited", () => {
    const v = validateDraftCitations("The moon governs tides [moon-folklore].", allowed);
    expect(v.verdict).toBe("insufficient");
    expect(v.finalAnswer).toBeNull();
  });

  it("returns degraded when fewer than 60% of sentences survive", () => {
    const v = validateDraftCitations(
      "Kechari is a seal [kechari-mudra]. Uncited claim one. Uncited claim two. Uncited claim three.",
      allowed,
    );
    expect(v.verdict).toBe("degraded");
    expect(v.finalAnswer).toBeNull();
    expect(v.keptRatio).toBeLessThan(0.6);
  });

  it("hard-refuses on the literal INSUFFICIENT_GROUNDING response", () => {
    const v = validateDraftCitations(INSUFFICIENT_GROUNDING, allowed);
    expect(v.verdict).toBe("insufficient");
    expect(v.finalAnswer).toBeNull();
  });

  it("handles an empty draft as insufficient", () => {
    expect(validateDraftCitations("   ", allowed).verdict).toBe("insufficient");
  });
});

describe("cost estimation (RFC §5.6)", () => {
  it("estimates a typical synthesis call at ~$0.00024 with pinned prices", () => {
    const cost = estimateSynthesisCostUsd({
      promptTokens: 600,
      completionTokens: 250,
      embeddingTokens: 60,
    });
    // 600×0.15/1M + 250×0.60/1M + 60×0.02/1M = 0.00009 + 0.00015 + 0.0000012
    expect(cost).toBeCloseTo(0.0002412, 7);
  });

  it("applies the 2× governor multiplier to ledger deductions", () => {
    const usage = { promptTokens: 600, completionTokens: 250, embeddingTokens: 60 };
    expect(ledgerDeductionUsd(usage)).toBeCloseTo(
      estimateSynthesisCostUsd(usage) * GOVERNOR_MULTIPLIER,
      10,
    );
    expect(GOVERNOR_MULTIPLIER).toBe(2);
  });

  it("10,000 monthly calls stay under the default $5 ceiling", () => {
    const usage = { promptTokens: 600, completionTokens: 250, embeddingTokens: 60 };
    expect(ledgerDeductionUsd(usage) * 10_000).toBeLessThan(5);
  });
});

describe("consumeRateWindow", () => {
  it("allows up to the limit within a window then denies", () => {
    const w: RateWindow = new Map();
    const now = 1_000_000;
    for (let i = 0; i < 3; i++) {
      expect(consumeRateWindow(w, "1.2.3.4", now + i, 3, 60_000)).toBe(true);
    }
    expect(consumeRateWindow(w, "1.2.3.4", now + 3, 3, 60_000)).toBe(false);
    // A different IP has its own window.
    expect(consumeRateWindow(w, "5.6.7.8", now + 3, 3, 60_000)).toBe(true);
  });

  it("resets after the window elapses", () => {
    const w: RateWindow = new Map();
    const now = 1_000_000;
    expect(consumeRateWindow(w, "ip", now, 1, 60_000)).toBe(true);
    expect(consumeRateWindow(w, "ip", now + 1, 1, 60_000)).toBe(false);
    expect(consumeRateWindow(w, "ip", now + 60_001, 1, 60_000)).toBe(true);
  });
});
