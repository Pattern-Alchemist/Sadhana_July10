import { describe, it, expect } from "vitest";
import { YANTRAS, getYantraBySlug, type YantraMeta } from "@/lib/yantra-data";

/**
 * Tests for the yantra data integrity.
 * Ensures every yantra is well-formed and the SVG file references are valid.
 */

describe("YANTRAS data integrity", () => {
  it("has at least 12 yantras", () => {
    expect(YANTRAS.length).toBeGreaterThanOrEqual(12);
  });

  it("every yantra has a unique slug", () => {
    const slugs = YANTRAS.map((y) => y.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every yantra has a file path starting with /yantras/", () => {
    for (const y of YANTRAS) {
      expect(y.file).toMatch(/^\/yantras\/.+\.svg$/);
    }
  });

  it("every yantra has a non-empty title", () => {
    for (const y of YANTRAS) {
      expect(y.title).toBeTruthy();
    }
  });

  it("every yantra has a valid caution level", () => {
    for (const y of YANTRAS) {
      expect(["high", "moderate"]).toContain(y.caution);
    }
  });

  it("every yantra has a complete bīja breakdown", () => {
    for (const y of YANTRAS) {
      expect(y.bijaBreakdown).toBeDefined();
      expect(y.bijaBreakdown.east).toBeDefined();
      expect(y.bijaBreakdown.south).toBeDefined();
      expect(y.bijaBreakdown.west).toBeDefined();
      expect(y.bijaBreakdown.north).toBeDefined();
      expect(y.bijaBreakdown.center).toBeDefined();
    }
  });

  it("every yantra references a valid siddhi slug", () => {
    for (const y of YANTRAS) {
      expect(y.siddhiSlug).toBeTruthy();
      expect(y.siddhiName).toBeTruthy();
    }
  });
});

describe("getYantraBySlug", () => {
  it("returns the yantra for a known slug", () => {
    const y = getYantraBySlug("sri-cakra");
    expect(y).toBeDefined();
    expect(y?.title).toBe("Śrī Cakra");
  });

  it("returns undefined for an unknown slug", () => {
    const y = getYantraBySlug("nonexistent-yantra");
    expect(y).toBeUndefined();
  });
});
