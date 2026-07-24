# Sprint 6: Moonshots (4.1, 4.3, 4.4) — Complete

## Overview

Sprint 6 closes out the three deferred "Sprint 5–6 Moonshots" from
`docs/PROJECT_MAXIMIZER_REPORT.md`. All deliverables are production-ready, follow the
repo's resilience contract (graceful degradation, zero client secrets), and are fully
covered by lint, `tsc --noEmit` (strict), and the Vitest suite.

**Delivered:** 2026-07-24
**Verified:** `pnpm lint` (0 errors) · `pnpm typecheck` (clean) · `pnpm test` (111 passing, incl. 18 new)

---

## 1. Moonshot 4.1 — RAG-Grounded Archivist (RFC delivered)

**Artifact:** `docs/RFC_RAG_ARCHIVIST.md` (RFC-001, Accepted)

The retrieval substrate the RFC builds on was already shipped in Sprint 3
(`/api/archivist/semantic` — server-side OpenAI `text-embedding-3-small` query
embeddings + pgvector `<=>` cosine retrieval + explicit `embedding_provider_unavailable`
/`pgvector_unavailable` 503 fallbacks; `scripts/generate_embeddings.py` build-time corpus
pipeline exposed as `pnpm knowledge:embed`).

The RFC specifies the remaining synthesis layer end-to-end:

- **Vector embedding flow** — build-time corpus embeddings (`siddhis.embedding
  vector(1536)`, batches of 100, ~25 k tokens ≈ $0.0005 per full re-embed) +
  request-time server-side query embedding (query text never leaves with a client key).
- **pgvector retrieval mechanism** — cosine `<=>` top-k (k=8 for synthesis vs. 12 for
  search), 0.32 similarity floor with hard refusal, and a deferred HNSW index plan
  (`m=16, ef_construction=64`) that activates only past 50 k embedded rows.
- **Fallback safety paths** — a seven-layer ladder (F1–F7) where every failure degrades
  toward the zero-cost `/api/archivist` keyword route; a deterministic citation
  validator (no second LLM call) drops any answer sentence not tied to a retrieved
  folio slug.
- **Cost breakdown** — per-query synthesis ≈ $0.00024 (gpt-4o-mini pinned rates, 2×
  ledger safety multiplier), with an enforced `ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD=5`
  governor backed by an `archivist_cost_ledger` table. Worst-case monthly spend with
  the feature on: **≤ $5**; off: **$0**.

The LLM synthesis endpoint itself ships next sprint behind
`ARCHIVIST_SYNTHESIS_ENABLED` (RFC Phase C), after the 20-query eval set calibrates the
refusal floor.

## 2. Moonshot 4.3 — True Offline Practice Mode (Force Precache)

**Artifacts:**
- `lib/offline-precache.ts` — manifest + helpers (pure, unit-tested)
- `components/ForcePrecache.tsx` — client button with live progress
- `app/offline/page.tsx` — button wired into the offline fallback page

The service worker precaches 12 core navigation routes on install; that keeps the
archive *reachable* but not retreat-ready. The new **Force Precache** button connects
directly to the SW's Cache Storage layer:

1. Resolves the live static cache name dynamically from `caches.keys()`
   (`astrokalki-*-static`) — no drift when `CACHE_VERSION` in `public/sw.js` bumps;
   falls back to the documented versioned name only on first visit.
2. `caches.open()` then walks **60 routes** (12 core corpus + 48 practice/reference
   top-level routes) one-by-one, so a single failing page never aborts the batch —
   failures are collected and reported.
3. Live progress bar + completion summary (`60/60 routes stored in
   astrokalki-v1.8.0-static`); re-runnable ("Re-run Precache") for cache refresh.

Rendered only after mount (SSR-safe), with an explicit unsupported-browser message.

## 3. Moonshot 4.4 — Content-Loop Atom Feed at `/feed.xml`

**Artifacts:**
- `lib/feed.ts` — pure RFC 4287 Atom serializer (unit-tested)
- `app/feed.xml/route.ts` — App Router route handler
- `app/layout.tsx` — `<link rel="alternate" type="application/atom+xml">` discovery

`GET /feed.xml` traverses the `siddhis` and `manuscripts` tables (via the same
`getDb()`/`ensureArchiveSeeded()` pattern as `app/sitemap.ts`), sorts entries
most-recently-updated first (siddhis by `created_at`), caps at 100 entries, hourly
`revalidate = 3600`, and emits `application/atom+xml; charset=utf-8` with
`Cache-Control: public, max-age=3600, stale-while-revalidate=86400`.

Resilience contract: if Postgres is unreachable the feed returns **200 with a valid
zero-entry feed** (never a 500), so podcast players, RSS readers, and scheduled
YouTube content pipelines stay subscribed through transient outages. Feed-level
`<updated>` rolls forward to the newest entry automatically, and all five XML special
characters are escaped (verified hostile-input tests).

## Files Touched

| File | Change |
| --- | --- |
| `docs/RFC_RAG_ARCHIVIST.md` | **new** — RFC-001 (Moonshot 4.1) |
| `lib/feed.ts` | **new** — pure Atom serializer |
| `app/feed.xml/route.ts` | **new** — `/feed.xml` handler |
| `lib/offline-precache.ts` | **new** — precache manifest + helpers |
| `components/ForcePrecache.tsx` | **new** — Force Precache button |
| `app/offline/page.tsx` | wired in `<ForcePrecache />` |
| `app/layout.tsx` | Atom feed discovery link |
| `tests/unit/feed.test.ts` | **new** — 8 feed tests |
| `tests/unit/offline-precache.test.ts` | **new** — 10 precache manifest tests |
| `docs/PROJECT_MAXIMIZER_REPORT.md` | ticked 4.1 / 4.3 / 4.4 with notes |
| `docs/CHANGELOG.md` | Unreleased entries |
| `docs/SPRINT_6_COMPLETE.md` | **new** — this file |

## Verification

- `pnpm lint` — 0 errors (4 pre-existing hook warnings, unchanged)
- `pnpm typecheck` (strict) — clean
- `pnpm test` — 10 files, 111 tests passing (93 baseline + 18 new)
