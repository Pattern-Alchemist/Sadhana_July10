# Project Overview

## What AstroKalki Is

AstroKalki is a digital archive of Indic contemplative heritage, presented with the visual restraint of a museum and the epistemic discipline of scholarship. The application catalogues *siddhis* (contemplative practices and attainments), *manuscripts* (primary source texts), *schools* (traditions of thought), *lineages* (transmission chains), and *cosmology* (real-time planetary positions). It is built as a Next.js 16 application backed by PostgreSQL and Drizzle ORM, with a Tailwind v4 design system using a deliberately narrow palette of obsidian, gold, and ivory.

The project is not a guru's platform. It does not prescribe practices, guarantee outcomes, or claim authority. Instead it functions as an **objective custodian**: it points to sources, rates confidence, and leaves interpretation to the reader. This framing is enforced throughout the codebase — every siddhi has an `authenticityScore`, every practice has `warnings`, and the homepage itself declares that "truth is never hidden; it is only buried beneath illusion."

## Who It Is For

The primary audiences are students of Indic philosophy, scholars of religion, yoga and tantra practitioners seeking textual grounding, and developers building similar cultural-heritage archives. Secondary audiences include AI agents — the project is structured to be navigable by coding assistants, with persistent context files in `ai-context/` and a complete documentation suite in `docs/`. The Arena-ready export of this repository is specifically designed so that any AI agent can understand the project's intent, architecture, and content within a single context window.

## The Seven Disciplines

AstroKalki is organised around seven pillars, each implemented as a dedicated route and supporting components:

1. **Evidence Panels** — Every siddhi folio surfaces its source citations with a confidence rating, separating textual attestation from modern interpretation. The `evidence_sources` table records each citation's kind, URL, and notes.

2. **Codex Library** — Primary manuscripts (Upaniṣads, Tantras, Yoga corpus) are catalogued like museum holdings, with `catalog_number`, `condition_rating`, `folios`, and `source_url` fields. The `/manuscripts` route exposes this catalogue.

3. **The Custodian** — An objective librarian that searches across siddhis and manuscripts. Implemented as a POST endpoint at `/api/archivist` with a weighted-field ranking algorithm; the UI refuses to prescribe, only to point.

4. **Comparative Matrix** — Five traditions (Vedānta, Sāṃkhya, Yoga, Tantra, Bhakti) read against a single set of concepts. The `/comparative` route renders this matrix from `src/lib/comparative.ts`.

5. **Living Cosmology** — Planetary longitudes computed for the present moment using Paul Schlyter's simplified Keplerian elements (J2000 epoch), with the Lahiri ayanamsa applied for sidereal (Vedic) values. Accuracy is contemplative / educational, not ephemeris-grade.

6. **Transmission Maps** — Branching lineages showing how teachings are said to move, rendered from `src/lib/lineage.ts` on the `/lineage` route.

7. **Dual Lens** — A scholar / practitioner epistemic toggle (the `useEpistemicLens` hook) that lets the same archive be read with two different framings without duplicating content.

## What Makes This Project Distinctive

Three properties distinguish AstroKalki from generic content archives. First, **epistemic discipline**: the schema itself enforces the separation of source text from interpretation via the `evidence_sources` table and the `authenticity_score` field. Second, **self-healing schema**: `src/lib/bootstrap.ts` mirrors `src/db/schema.ts` as idempotent `CREATE TABLE IF NOT EXISTS` statements, so the app functions against a freshly reset database without manual migration. Third, **real-time cosmology**: rather than hard-coding planetary positions, the project computes them on every request from first-principles Keplerian elements, making the `/cosmos` route genuinely "living."

## Current State

The repository as exported contains a working Next.js 16 application with thirteen React components, eleven page routes, three API routes, five database tables, and a seed corpus of approximately thirty-two siddhis, eleven manuscripts, and a small set of schools, evidence sources, and reflections. The four Tantra PDFs supplied alongside the code have been extracted, chunked, and indexed into a SQLite FTS5 database for offline retrieval — see `docs/KNOWLEDGE_ARCHIVE.md` for the structure. The application is feature-complete for read-only browsing; authentication, user accounts, and write-side moderation are future work documented in `docs/ROADMAP.md`.
