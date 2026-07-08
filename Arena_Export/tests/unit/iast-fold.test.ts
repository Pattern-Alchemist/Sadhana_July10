import { describe, it, expect } from "vitest";

/**
 * Tests for the IAST-fold function used in slug generation.
 *
 * This function lives in scripts/build_knowledge_archive.py (Python), but
 * the same logic is needed at runtime for the knowledge-search endpoint.
 * Here we test the TypeScript port of the same logic.
 */

const IAST_FOLD: Record<string, string> = {
  "ā": "a", "á": "a", "à": "a", "â": "a", "Ā": "A", "Á": "A", "À": "A", "Â": "A",
  "ī": "i", "í": "i", "ì": "i", "î": "i", "Ī": "I", "Í": "I", "Ì": "I", "Î": "I",
  "ū": "u", "ú": "u", "ù": "u", "û": "u", "Ū": "U", "Ú": "U", "Ù": "U", "Û": "U",
  "ṛ": "r", "ṝ": "r", "ṙ": "r", "Ṛ": "R", "Ṝ": "R", "Ṙ": "R",
  "ṅ": "n", "ñ": "n", "ṇ": "n", "Ṅ": "N", "Ñ": "N", "Ṇ": "N",
  "ṭ": "t", "ḍ": "d", "Ṭ": "T", "Ḍ": "D",
  "ś": "s", "ṣ": "s", "Ś": "S", "Ṣ": "S",
  "ḥ": "h", "ṃ": "m", "ṁ": "m", "Ḥ": "H", "Ṃ": "M", "Ṁ": "M",
  "—": "-", "–": "-",
  "’": "", "‘": "",
  "“": '"', "”": '"',
};

function foldDiacritics(s: string): string {
  return Array.from(s).map((c) => IAST_FOLD[c] ?? c).join("");
}

function slugify(name: string): string {
  const folded = foldDiacritics(name).toLowerCase();
  return folded.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

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
