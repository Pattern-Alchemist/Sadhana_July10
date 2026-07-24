# Changelog

All notable changes to AstroKalki are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] — 2026-07-06

### Added

- Initial Arena-ready export of the AstroKalki project.
- Full Next.js 16 application source: 13 React components, 11 page routes, 3 API routes.
- Five-table PostgreSQL schema (`siddhis`, `manuscripts`, `schools`, `evidence_sources`, `reflections`) defined in Drizzle ORM and mirrored as self-healing raw SQL in `bootstrap.ts`.
- Seed corpus of approximately 32 siddhis, 11 manuscripts, and supporting schools, evidence sources, and reflections in `src/lib/archive-data.ts`.
- Real-time cosmology engine in `src/lib/cosmology.ts` implementing Paul Schlyter's simplified Keplerian elements at the J2000 epoch, with the Lahiri ayanamsa for sidereal values.
- The Custodian weighted multi-field search endpoint at `POST /api/archivist`.
- Health probe at `GET /api/health`.
- Reflections API at `GET/POST /api/reflections` (unauthenticated, pen-name only).
- Museum-grade design system in `src/app/globals.css` using Tailwind CSS v4 with the obsidian/gold/ivory palette and Cormorant Garamond + Crimson Text typography.
- Dual-lens epistemic toggle via the `useEpistemicLens` client hook.
- Reader safety route at `/safety` documenting the project's epistemic posture.
- Knowledge archive built from four supplied Tantra PDFs:
  - `Agni Māraṇa Tantra` (caution: high)
  - `Nimbu Mantra Siddhi Sādhana Manual` (caution: moderate)
  - `Sādhanās and Kriyās Collected` (caution: moderate)
  - `Vīrudha-Āhāra Māraṇa — The Energetic Food Poison Curse` (caution: high)
- 101 text chunks across the four PDFs, with a SQLite FTS5 full-text index at `knowledge/sqlite/knowledge.db` using the `unicode61 remove_diacritics 2` tokenizer for IAST-aware search.
- Complete documentation suite: README, PROJECT_OVERVIEW, ARCHITECTURE, SYSTEM_DESIGN, FEATURES, DATABASE, API_REFERENCE, COMPONENT_GUIDE, AI_SYSTEM, KNOWLEDGE_ARCHIVE, DEPLOYMENT, CONTRIBUTING, CHANGELOG, ROADMAP.
- AI context files: AI_CONTEXT, PROJECT_MEMORY, CODING_STANDARDS, PROMPT_GUIDE, TASK_INDEX, DEPENDENCIES.
- `.env.example`, `MANIFEST.json`, `project_tree.txt` for environment and structural reference.

### Known Limitations

- The Custodian search does not perform stemming or diacritic folding at runtime (the offline FTS5 index does, but the runtime SQL search does not).
- No authentication; the reflections endpoint is unauthenticated and pen-name only.
- No vector embeddings; semantic retrieval over the knowledge archive is future work.
- The `/cosmos` route is contemplative-grade, not ephemeris-grade; planetary longitudes may differ from JPL values by a few degrees for the inner planets.
- No automated tests; the project relies on TypeScript strict mode and ESLint for correctness guarantees.
- No internationalisation; the UI is English-first with substantial Sanskrit content.

### Security Posture

- The application stores no user credentials and no personal data beyond self-chosen pen names.
- The `DATABASE_URL` is the only secret; it must not be committed.
- The `.env.example` file documents the required environment variables without exposing live values.
- The knowledge archive's two `caution_level: high` PDFs are not surfaced through the main browsing UI; they are accessible only through the `knowledge/` directory and FTS5 index.

## [Unreleased]

### Added — Sprint 6 Moonshots (2026-07-24)

- **Moonshot 4.1 — RAG Archivist RFC**: `docs/RFC_RAG_ARCHIVIST.md` specifies the
  complete retrieval-augmented synthesis architecture on top of the shipped pgvector
  semantic substrate — embedding flow, cosine retrieval with similarity floor,
  seven-layer fallback ladder, deterministic citation validator, and a hard
  $5/month cost governor. Synthesis endpoint ships flag-gated next sprint (Phase C).
- **Moonshot 4.3 — Force Precache**: `/offline` gains a user-triggered button
  (`components/ForcePrecache.tsx` + `lib/offline-precache.ts`) that dynamically
  resolves the service worker's static cache via `caches.open()` and proactively
  stores all 60 core + practice top-level routes with live progress, letting
  practitioners prepare for fully offline retreats.
- **Moonshot 4.4 — Atom content feed**: RFC 4287 feed at `/feed.xml`
  (`app/feed.xml/route.ts` + pure `lib/feed.ts`) traversing the `siddhis` and
  `manuscripts` tables; hourly revalidation, valid zero-entry fallback on DB outage,
  and `<link rel="alternate">` discovery in the root layout for podcast/YouTube
  content pipelines.
- Tests: `tests/unit/feed.test.ts` and `tests/unit/offline-precache.test.ts`
  (+18 unit tests).

Planned changes are tracked in `docs/ROADMAP.md` and `ai-context/TASK_INDEX.md`.
