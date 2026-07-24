import { describe, it, expect } from "vitest";
import {
  FALLBACK_STATIC_CACHE,
  OFFLINE_CORE_ROUTES,
  OFFLINE_PRACTICE_ROUTES,
  PRECACHE_ROUTE_LIST,
  SW_CACHE_PREFIX,
  STATIC_CACHE_SUFFIX,
  resolveStaticCacheName,
} from "@/lib/offline-precache";

/**
 * Tests for the Force Precache manifest (Moonshot 4.3).
 */

describe("OFFLINE_CORE_ROUTES", () => {
  it("mirrors the service worker precache list (public/sw.js PRECACHE_URLS)", () => {
    // If sw.js PRECACHE_URLS changes, update OFFLINE_CORE_ROUTES with it.
    expect(OFFLINE_CORE_ROUTES).toEqual([
      "/",
      "/archive",
      "/manuscripts",
      "/yantras",
      "/reader",
      "/glossary",
      "/tags",
      "/knowledge",
      "/lineage",
      "/safety",
      "/schools",
      "/offline",
    ]);
  });
});

describe("PRECACHE_ROUTE_LIST integrity", () => {
  it("contains every core and practice route, core first", () => {
    expect(PRECACHE_ROUTE_LIST.length).toBe(
      OFFLINE_CORE_ROUTES.length + OFFLINE_PRACTICE_ROUTES.length,
    );
    expect(PRECACHE_ROUTE_LIST.slice(0, OFFLINE_CORE_ROUTES.length)).toEqual(
      OFFLINE_CORE_ROUTES,
    );
  });

  it("has enough routes to cover a full retreat toolkit", () => {
    expect(PRECACHE_ROUTE_LIST.length).toBeGreaterThanOrEqual(50);
  });

  it("every route is unique", () => {
    const unique = new Set(PRECACHE_ROUTE_LIST);
    expect(unique.size).toBe(PRECACHE_ROUTE_LIST.length);
  });

  it("every route is an absolute path with no dynamic segments", () => {
    for (const route of PRECACHE_ROUTE_LIST) {
      expect(route.startsWith("/")).toBe(true);
      expect(route).not.toMatch(/[\[\]]/);
      expect(route).not.toContain(" ");
    }
  });

  it("includes the offline fallback page itself", () => {
    expect(PRECACHE_ROUTE_LIST).toContain("/offline");
  });
});

describe("resolveStaticCacheName", () => {
  it("returns the fallback versioned cache when no SW cache exists yet", () => {
    expect(resolveStaticCacheName([])).toBe(FALLBACK_STATIC_CACHE);
    expect(resolveStaticCacheName(["unrelated-cache"])).toBe(
      FALLBACK_STATIC_CACHE,
    );
  });

  it("picks the astro kalki static cache and ignores runtime caches", () => {
    const keys = [
      "astrokalki-v1.8.0-runtime",
      "astrokalki-v1.8.0-static",
      "other-app-static",
    ];
    expect(resolveStaticCacheName(keys)).toBe("astrokalki-v1.8.0-static");
  });

  it("prefers the newest generation when several static caches exist", () => {
    const keys = ["astrokalki-v1.7.0-static", "astrokalki-v1.8.0-static"];
    expect(resolveStaticCacheName(keys)).toBe("astrokalki-v1.8.0-static");
  });

  it("fallback constant keeps the documented prefix/suffix contract", () => {
    expect(FALLBACK_STATIC_CACHE.startsWith(SW_CACHE_PREFIX)).toBe(true);
    expect(FALLBACK_STATIC_CACHE.endsWith(STATIC_CACHE_SUFFIX)).toBe(true);
  });
});
