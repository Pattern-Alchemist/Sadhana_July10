import { describe, it, expect } from "vitest";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryEntry } from "@/lib/glossary-data";

/**
 * Tests for the glossary data integrity.
 * Ensures every entry is well-formed and the categories are consistent.
 */

describe("GLOSSARY data integrity", () => {
  it("has at least 50 entries", () => {
    expect(GLOSSARY.length).toBeGreaterThanOrEqual(50);
  });

  it("every entry has a non-empty IAST", () => {
    for (const entry of GLOSSARY) {
      expect(entry.iast).toBeTruthy();
      expect(entry.iast.length).toBeGreaterThan(0);
    }
  });

  it("every entry has a non-empty Devanagari", () => {
    for (const entry of GLOSSARY) {
      expect(entry.devanagari).toBeTruthy();
      expect(entry.devanagari.length).toBeGreaterThan(0);
    }
  });

  it("every entry has a non-empty English gloss", () => {
    for (const entry of GLOSSARY) {
      expect(entry.english).toBeTruthy();
      expect(entry.english.length).toBeGreaterThan(10);
    }
  });

  it("every entry has a valid category", () => {
    const validCategories = Object.keys(GLOSSARY_CATEGORIES);
    for (const entry of GLOSSARY) {
      expect(validCategories).toContain(entry.category);
    }
  });

  it("has no duplicate IAST terms", () => {
    const iasts = GLOSSARY.map((e) => e.iast);
    const unique = new Set(iasts);
    expect(unique.size).toBe(iasts.length);
  });

  it("related slugs are non-empty strings if present", () => {
    for (const entry of GLOSSARY) {
      if (entry.related) {
        for (const slug of entry.related) {
          expect(typeof slug).toBe("string");
          expect(slug.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe("GLOSSARY_CATEGORIES", () => {
  it("has 7 categories", () => {
    expect(Object.keys(GLOSSARY_CATEGORIES).length).toBe(7);
  });

  it("every category has a human-readable label", () => {
    for (const [key, label] of Object.entries(GLOSSARY_CATEGORIES)) {
      expect(key).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });
});
