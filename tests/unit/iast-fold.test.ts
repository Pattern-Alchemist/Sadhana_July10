import { describe, it, expect } from "vitest";
import { foldDiacritics, slugify } from "@/lib/iast-fold";

/**
 * Tests for the shared IAST-fold utility (`lib/iast-fold.ts`).
 *
 * This logic mirrors scripts/build_knowledge_archive.py (Python) and is used
 * at runtime by /api/archivist (JS scoring fallback) so diacritic-free queries
 * match IAST content, e.g. "Siva" → "Śiva".
 */

describe("foldDiacritics — IAST to ASCII folding", () => {
  it("folds ā → a", () => {
    expect(foldDiacritics("ā")).toBe("a");
    expect(foldDiacritics("Māraṇa")).toBe("Marana");
  });

  it("folds ī → i", () => {
    expect(foldDiacritics("ī")).toBe("i");
    expect(foldDiacritics("Sādhanās")).toBe("Sadhanas");
  });

  it("folds ū → u", () => {
    expect(foldDiacritics("ū")).toBe("u");
  });

  it("folds ṛ → r", () => {
    expect(foldDiacritics("ṛ")).toBe("r");
    expect(foldDiacritics("ṛṇa")).toBe("rna");
  });

  it("folds ṅ, ñ, ṇ → n", () => {
    expect(foldDiacritics("ṅ")).toBe("n");
    expect(foldDiacritics("ñ")).toBe("n");
    expect(foldDiacritics("ṇ")).toBe("n");
  });

  it("folds ṭ → t, ḍ → d", () => {
    expect(foldDiacritics("ṭ")).toBe("t");
    expect(foldDiacritics("ḍ")).toBe("d");
  });

  it("folds ś, ṣ → s", () => {
    expect(foldDiacritics("ś")).toBe("s");
    expect(foldDiacritics("ṣ")).toBe("s");
    expect(foldDiacritics("Śiva")).toBe("Siva");
  });

  it("folds ḥ → h, ṃ → m", () => {
    expect(foldDiacritics("ḥ")).toBe("h");
    expect(foldDiacritics("ṃ")).toBe("m");
    expect(foldDiacritics("Oṃ")).toBe("Om");
  });

  it("passes through ASCII unchanged", () => {
    expect(foldDiacritics("AstroKalki")).toBe("AstroKalki");
  });

  it("enables diacritic-free search terms to match IAST field values (T-002)", () => {
    // The archivist JS fallback folds BOTH sides before substring matching.
    const query = foldDiacritics("siva");
    const field = foldDiacritics("Śiva Maheśvara sādhanā").toLowerCase();
    expect(field.includes(query.toLowerCase())).toBe(true);
  });

  it("folds mixed punctuation for slug parity with the Python builder", () => {
    expect(slugify("Māraṇa — Keśava’s Vidhi")).toBe("marana-kesavas-vidhi");
    expect(slugify("  Oṃ  ")).toBe("om");
  });
});

describe("slugify — IAST-aware slug generation", () => {
  it("slugifies a simple name", () => {
    expect(slugify("Pranava Japa")).toBe("pranava-japa");
  });

  it("slugifies an IAST name correctly (no mangled diacritics)", () => {
    expect(slugify("Agni Māraṇa Tantra")).toBe("agni-marana-tantra");
  });

  it("slugifies a name with many diacritics", () => {
    expect(slugify("Vīrudha-Āhāra Māraṇa")).toBe("virudha-ahara-marana");
  });

  it("handles em-dashes and en-dashes", () => {
    expect(slugify("Preta-Siddhi — Field Manual")).toBe("preta-siddhi-field-manual");
  });
});
