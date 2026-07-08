import { describe, it, expect } from "vitest";
import { READER_ENTRIES, getReaderEntry } from "@/lib/reader-data";

/**
 * Tests for the Sanskrit reader data integrity.
 */

describe("READER_ENTRIES data integrity", () => {
  it("has at least 3 entries", () => {
    expect(READER_ENTRIES.length).toBeGreaterThanOrEqual(3);
  });

  it("every entry has a unique slug", () => {
    const slugs = READER_ENTRIES.map((e) => e.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every entry has non-empty Devanagari, IAST, and English", () => {
    for (const e of READER_ENTRIES) {
      expect(e.devanagari).toBeTruthy();
      expect(e.iast).toBeTruthy();
      expect(e.english).toBeTruthy();
    }
  });

  it("every entry has at least one word-by-word entry", () => {
    for (const e of READER_ENTRIES) {
      expect(e.wordByWord.length).toBeGreaterThan(0);
    }
  });

  it("every word-by-word entry has devanagari, iast, and analysis", () => {
    for (const e of READER_ENTRIES) {
      for (const w of e.wordByWord) {
        expect(w.devanagari).toBeTruthy();
        expect(w.iast).toBeTruthy();
        expect(w.analysis).toBeTruthy();
      }
    }
  });

  it("every entry has a source citation", () => {
    for (const e of READER_ENTRIES) {
      expect(e.source).toBeTruthy();
    }
  });
});

describe("getReaderEntry", () => {
  it("returns the entry for a known slug", () => {
    const e = getReaderEntry("mahamrityunjaya-verse");
    expect(e).toBeDefined();
    expect(e?.title).toBe("Mahāmṛtyuñjaya Mantra");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getReaderEntry("nonexistent")).toBeUndefined();
  });
});
