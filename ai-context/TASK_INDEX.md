# Task Index

This file catalogues in-progress and planned tasks for AstroKalki. It is the AI agent's task queue. Each task has an ID, a status, a description, and pointers to the relevant docs.

## Statuses

- **proposed** — written down, not yet started
- **in-progress** — actively being worked on
- **blocked** — waiting on a dependency
- **done** — complete

## Near-Term Tasks

### T-001 — Runtime FTS5 search over the knowledge archive

- **Status:** done (shipped as `GET /api/knowledge` over `knowledge/sqlite/knowledge.db`; completed in an earlier sprint, verified 2026-07-24)
- **Priority:** high
- **Description:** Add a `GET /api/knowledge/search?q=...&limit=...` endpoint that opens `knowledge/sqlite/knowledge.db` read-only, runs an FTS5 `MATCH` query against the `chunks` table, and returns the top-k chunks with their parent document metadata. The response shape should be `{ results: Chunk[], note: string }` where `note` is a templated summary consistent with the Custodian's pointer-only posture. Update `docs/API_REFERENCE.md` and `docs/FEATURES.md`.
- **Depends on:** nothing (the FTS5 index already exists).
- **References:** `docs/KNOWLEDGE_ARCHIVE.md`, `docs/AI_SYSTEM.md`, `docs/ROADMAP.md` item 1.

### T-002 — Diacritic folding in the runtime Custodian

- **Status:** done (2026-07-24, Sprint 7) — shared `lib/iast-fold.ts`; JS scoring tier folds both sides, and the Postgres FTS tier was switched to `tsvector 'simple'` + `unaccent`. Response shape, weights and `note` template unchanged.
- **Priority:** high
- **Description:** Define a `foldDiacritics(s: string): string` utility that maps IAST characters to ASCII equivalents. Apply it to both the query and the candidate field values in the scoring loop of `src/app/api/archivist/route.ts`. Do not change the response shape, the weights, or the `note` template.
- **Depends on:** nothing.
- **References:** `docs/AI_SYSTEM.md` (Limitations section), `docs/ROADMAP.md` item 2.

### T-003 — Sitemap and structured data

- **Status:** proposed
- **Priority:** medium
- **Description:** Add `src/app/sitemap.ts` exporting all siddhi and manuscript slugs. Add `JsonLd` components to the layout (emitting `WebSite` and `BreadcrumbList`) and to the siddhi folio (emitting `Article`). Update `docs/FEATURES.md`.
- **Depends on:** nothing.
- **References:** `docs/ROADMAP.md` item 3.

### T-004 — View count increment

- **Status:** proposed
- **Priority:** low
- **Description:** Add `UPDATE siddhis SET view_count = view_count + 1 WHERE slug = ?` to the siddhi folio page. Display the view count on the archive browser. Update `docs/FEATURES.md`.
- **Depends on:** nothing.
- **References:** `docs/ROADMAP.md` item 4.

## Mid-Term Tasks

### T-005 — Embedding-based semantic retrieval

- **Status:** proposed
- **Priority:** medium
- **Description:** Add a build-time script that generates embeddings for each of the 101 chunks in `knowledge/chunks/` using a chosen embedding model. Store embeddings in `knowledge/embeddings/<doc-slug>.jsonl`. Add a `GET /api/knowledge/semantic-search?q=...` endpoint that embeds the query, computes cosine similarity against stored embeddings, and returns the top-k chunks. Use `sqlite-vec` for in-process vector search. The output contract remains pointer-only.
- **Depends on:** T-001 (the runtime FTS5 endpoint provides the architectural template).
- **References:** `docs/AI_SYSTEM.md` (Future Direction section), `docs/ROADMAP.md` item 5.

### T-006 — Authentication and moderated write side

- **Status:** proposed
- **Priority:** medium
- **Description:** Add magic-link or OAuth authentication via NextAuth.js or Lucia. Define three roles: anonymous (read-only), authenticated reader (can post reflections under a verified identity), and scholar (can propose siddhi / manuscript edits through a moderation queue). Add a `pending_edits` table to the schema (and to `bootstrap.ts`). Build a moderation UI.
- **Depends on:** nothing technical, but requires a product decision on the identity model.
- **References:** `docs/ROADMAP.md` item 6.

### T-007 — Multi-language UI

- **Status:** proposed
- **Priority:** low
- **Description:** Adopt `next-intl`. Extract all UI strings into message catalogs. Add Hindi and Sanskrit catalogs. Corpus content stays in its original language.
- **Depends on:** nothing.
- **References:** `docs/ROADMAP.md` item 7.

### T-008 — Yantra gallery with IIIF

- **Status:** proposed
- **Priority:** low
- **Description:** Add a `/yantra/[slug]` route that renders high-resolution yantra images using the IIIF Image API. Store image manifests in `public/iiif/`. Use OpenSeadragon or Mirador for pan/zoom.
- **Depends on:** nothing technical, but requires sourcing or commissioning yantra images.
- **References:** `docs/ROADMAP.md` item 8.

## Long-Term Tasks

### T-009 — Cross-tradition citation graph

- **Status:** proposed
- **Priority:** low
- **Description:** Add a `citation_edges` table `(source_id, target_id, kind)` modelling citation relationships between evidence sources. Render an interactive citation graph on a new `/graph` route using a force-directed layout.
- **Depends on:** substantial data modelling.
- **References:** `docs/ROADMAP.md` item 9.

### T-010 — Offline-first PWA

- **Status:** proposed
- **Priority:** low
- **Description:** Convert the application to a Progressive Web App with a service worker that caches the read-only corpus on first visit. The reflections endpoint becomes a queued write that syncs when connectivity returns.
- **Depends on:** nothing technical, but requires careful cache-invalidation design.
- **References:** `docs/ROADMAP.md` item 10.

### T-011 — Editorial workflow for corpus updates

- **Status:** proposed
- **Priority:** low
- **Description:** Move the seed corpus from `archive-data.ts` into the database (one-time migration). Build a scholar-facing admin UI for proposing, reviewing, and merging corpus edits. Version every edit; support diffs and rollbacks.
- **Depends on:** T-006 (authentication).
- **References:** `docs/ROADMAP.md` item 11.

## Done Tasks

### T-DONE-001 — Arena-ready export

- **Status:** done
- **Description:** Produce the Arena-ready export of the AstroKalki project: cleaned source, complete documentation suite, AI context files, structured knowledge archive with FTS5 index, manifest, env example, project tree. Output to `/home/z/my-project/workspace/Arena_Export/` and zip to `/home/z/my-project/download/Arena_Export.zip`.
- **Completed:** 2026-07-06.
