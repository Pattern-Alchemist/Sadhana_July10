// AstroKalki Service Worker — offline-first caching for the siddhi corpus
// ========================================================================
// Strategy:
//   - Precache: the homepage, archive, manuscripts, yantras, glossary,
//     reader, and the offline fallback page on install.
//   - Runtime: stale-while-revalidate for siddhi folios, manuscripts, and
//     static assets (yantra SVGs, fonts, CSS).
//   - Network-first for API routes (always try fresh data).
//   - Fallback: if a navigation request fails offline, serve the cached
//     offline page.

const CACHE_VERSION = "astrokalki-v1.8.0";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_URLS = [
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
];

// Install — precache the core navigation routes
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        // Don't fail install if some precache URLs error
        console.warn("[sw] precache partial failure:", err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith("astrokalki-") && !name.startsWith(CACHE_VERSION))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch — routing strategy
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Skip cross-origin requests (fonts, analytics, etc.)
  if (url.origin !== self.location.origin) return;

  // Skip Next.js dev/HMR requests
  if (url.pathname.startsWith("/_next/webpack-hmr")) return;

  // API routes — network-first (always try fresh data)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful GET responses
          if (response.ok) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || Response.error())))
    );
    return;
  }

  // Navigation requests (HTML pages) — network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Fall back to the offline page
          const offline = await caches.match("/offline");
          return offline || caches.match("/");
        })
    );
    return;
  }

  // Static assets (yantras, images, CSS, JS) — stale-while-revalidate
  if (
    url.pathname.startsWith("/yantras/") ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.match(/\.(svg|png|jpg|jpeg|webp|gif|ico|css|js|woff2?)$/)
  ) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkFetch = fetch(request)
          .then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    );
    return;
  }

  // Default — try cache, fall back to network
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
