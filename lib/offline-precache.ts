/**
 * Offline Precache — user-triggered "Force Precache" support for retreat mode.
 * ============================================================================
 *
 * The service worker (`public/sw.js`) already precaches a small set of core
 * navigation routes on install. That is enough to keep the archive *reachable*
 * offline, but not enough for a multi-week retreat where a practitioner wants
 * the practice tools (japa counter, breath pacer, timer, reader, yantras, …)
 * available without ever touching the network again.
 *
 * This module backs the Force Precache button on `/offline`. It talks to the
 * same Cache Storage the service worker owns (`caches.open()`), so everything
 * it stores is served by the exact same SW fetch strategy afterwards.
 *
 * Design notes:
 *  - The static cache name is resolved *dynamically* from `caches.keys()` so
 *    this code never drifts out of sync when `CACHE_VERSION` in `public/sw.js`
 *    is bumped. The versioned fallback constant is only used when the SW has
 *    not created any static cache yet (first visit / SW unsupported).
 *  - Routes are cached one-by-one (not `cache.addAll`) so a single failing
 *    route (e.g. a page that errors at request time) never aborts the batch —
 *    failures are collected and surfaced to the user instead.
 */

export const SW_CACHE_PREFIX = "astrokalki-";
export const STATIC_CACHE_SUFFIX = "-static";

/**
 * Keep in sync with `CACHE_VERSION` in `public/sw.js`. Only used when no
 * existing astro kalki static cache can be found in Cache Storage.
 */
export const FALLBACK_STATIC_CACHE = "astrokalki-v1.8.0-static";

/**
 * Core corpus routes — mirrors `PRECACHE_URLS` in `public/sw.js` exactly.
 * These are the routes the SW precaches on install; Force Precache re-warms
 * them so they are guaranteed fresh before a retreat.
 */
export const OFFLINE_CORE_ROUTES: readonly string[] = [
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
] as const;

/**
 * Expanded practice & reference routes — every remaining top-level static
 * route in `app/` (dynamic `[slug]` routes are cached lazily at runtime by
 * the SW's stale-while-revalidate strategy, so they are excluded here).
 */
export const OFFLINE_PRACTICE_ROUTES: readonly string[] = [
  "/ambience",
  "/archivist",
  "/breath",
  "/breath-magic",
  "/calculator",
  "/calendar",
  "/certificate",
  "/chakra-scanner",
  "/comparative",
  "/cosmos",
  "/crisis",
  "/curriculum",
  "/cycles",
  "/deity",
  "/dependencies",
  "/dreams",
  "/energetics",
  "/export",
  "/fasting",
  "/flashcards",
  "/healing",
  "/heatmap",
  "/insights",
  "/japa",
  "/journal",
  "/journey",
  "/mantra-vault",
  "/materials",
  "/metronome",
  "/nyasa-visualizer",
  "/oracle",
  "/parampara",
  "/preta-work",
  "/protection",
  "/purification",
  "/quotes",
  "/recorder",
  "/ritual",
  "/sacred-timeline",
  "/sankalpa",
  "/seasonal",
  "/sessions",
  "/smashana",
  "/timer",
  "/wisdom",
  "/yantra-3d",
  "/yantra-builder",
  "/yantra-meditation",
] as const;

/** Full Force Precache manifest: core corpus first, then practice routes. */
export const PRECACHE_ROUTE_LIST: readonly string[] = [
  ...OFFLINE_CORE_ROUTES,
  ...OFFLINE_PRACTICE_ROUTES,
] as const;

/**
 * Pick the service worker's live static cache name out of `caches.keys()`.
 * Pure — unit tested directly. When several generations are present (e.g. an
 * old version pending activation cleanup) the last match wins, which in
 * practice is the newest because the SW creates the new cache on install
 * before deleting old ones on activate.
 */
export function resolveStaticCacheName(existingKeys: readonly string[]): string {
  const candidates = existingKeys.filter(
    (name) => name.startsWith(SW_CACHE_PREFIX) && name.endsWith(STATIC_CACHE_SUFFIX),
  );
  if (candidates.length === 0) return FALLBACK_STATIC_CACHE;
  return candidates[candidates.length - 1];
}

export interface PrecacheProgress {
  completed: number;
  total: number;
  current: string;
  failures: readonly string[];
}

export interface PrecacheResult {
  cacheName: string;
  cached: number;
  failed: readonly string[];
  total: number;
}

/**
 * Whether the Cache Storage API is usable from this browsing context.
 */
export function isPrecacheSupported(): boolean {
  return typeof window !== "undefined" && typeof caches !== "undefined";
}

/**
 * Open the live SW static cache and store every manifest route, sequentially.
 * Per-route failures are tolerated and reported; the caller gets progress
 * callbacks suitable for live UI updates.
 */
export async function precacheAllRoutes(
  onProgress?: (progress: PrecacheProgress) => void,
): Promise<PrecacheResult> {
  if (!isPrecacheSupported()) {
    throw new Error("Cache Storage API is not available in this browser.");
  }

  const keys = await caches.keys();
  const cacheName = resolveStaticCacheName(keys);
  const cache = await caches.open(cacheName);

  const total = PRECACHE_ROUTE_LIST.length;
  const failures: string[] = [];
  let completed = 0;

  for (const route of PRECACHE_ROUTE_LIST) {
    try {
      // `cache.add` fetches + stores the route's shell; the SW runtime cache
      // picks up its static assets automatically on first navigation.
      await cache.add(new Request(route, { credentials: "same-origin" }));
    } catch {
      failures.push(route);
    }
    completed += 1;
    onProgress?.({ completed, total, current: route, failures: [...failures] });
  }

  return { cacheName, cached: total - failures.length, failed: failures, total };
}
