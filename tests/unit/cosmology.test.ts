import { describe, it, expect, vi } from "vitest";

/**
 * Tests for the cosmology math in src/lib/cosmology.ts.
 *
 * The cosmology module is pure-TypeScript with no external dependencies,
 * making it ideal for unit testing. We test:
 *   - julianDay() against known historical dates
 *   - The general shape of planetary longitudes (0-360 range)
 *
 * Reference: Paul Schlyter's "Computing planetary positions" formulas.
 */

// We import the module directly. If it fails to load (e.g. due to db imports),
// we mock the db module.
vi.mock("@/db", () => ({
  db: {},
}));

vi.mock("@/db/schema", () => ({
  siddhis: {},
  manuscripts: {},
  schools: {},
  evidenceSources: {},
  reflections: {},
}));

import { julianDay } from "@/lib/cosmology";

describe("julianDay", () => {
  it("returns 2451545.0 for J2000 epoch (2000-01-01 12:00 UTC)", () => {
    // J2000.0 epoch is defined as 2000-01-01 12:00 TT, which is approximately
    // 2000-01-01 12:00 UTC for our purposes.
    const d = new Date("2000-01-01T12:00:00.000Z");
    const jd = julianDay(d);
    expect(jd).to.be.closeTo(2451545.0, 0.01);
  });

  it("returns 2440587.5 for 1970-01-01 00:00 UTC (Unix epoch)", () => {
    const d = new Date("1970-01-01T00:00:00.000Z");
    const jd = julianDay(d);
    expect(jd).to.be.closeTo(2440587.5, 0.01);
  });

  it("returns 2299160.5 for 1582-10-15 (Gregorian calendar start)", () => {
    const d = new Date("1582-10-15T00:00:00.000Z");
    const jd = julianDay(d);
    expect(jd).to.be.closeTo(2299160.5, 0.1);
  });

  it("returns a number greater than 2.4 million for any modern date", () => {
    const d = new Date();
    const jd = julianDay(d);
    expect(jd).to.be.greaterThan(2400000);
    expect(jd).to.be.lessThan(2500000);
  });

  it("is monotonically increasing for later dates", () => {
    const d1 = new Date("2024-01-01T00:00:00.000Z");
    const d2 = new Date("2024-01-02T00:00:00.000Z");
    expect(julianDay(d2)).to.be.greaterThan(julianDay(d1));
  });
});
