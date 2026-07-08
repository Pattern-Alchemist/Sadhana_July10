#!/usr/bin/env python3
"""
AstroKalki — Documentation Suite Generator
==========================================
Generates the full markdown documentation suite + AI context files for the
Arena-ready export. Writes to /home/z/my-project/workspace/Arena_Export/.

Files produced:
  - README.md, PROJECT_OVERVIEW.md, ARCHITECTURE.md, SYSTEM_DEesign.md,
    FEATURES.md, DATABASE.md, API_REFERENCE.md, COMPONENT_GUIDE.md,
    AI_SYSTEM.md, KNOWLEDGE_ARCHIVE.md, DEPLOYMENT.md, CONTRIBUTING.md,
    CHANGELOG.md, ROADMAP.md
  - ai-context/AI_CONTEXT.md, PROJECT_MEMORY.md, CODING_STANDARDS.md,
    PROMPT_GUIDE.md, TASK_INDEX.md, DEPENDENCIES.md
  - .env.example, MANIFEST.json, project_tree.txt
"""

import json
import os
import subprocess
from pathlib import Path
from datetime import datetime

EXPORT_ROOT = Path("/home/z/my-project/workspace/Arena_Export")
DOCS_ROOT = EXPORT_ROOT / "docs"
AI_CTX_ROOT = EXPORT_ROOT / "ai-context"
DOCS_ROOT.mkdir(parents=True, exist_ok=True)
AI_CTX_ROOT.mkdir(parents=True, exist_ok=True)


def write(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.strip() + "\n", encoding="utf-8")
    print(f"  wrote {path.relative_to(EXPORT_ROOT)}")


# ---------------------------------------------------------------------------
def readme():
    write(EXPORT_ROOT / "README.md", r"""
# AstroKalki · The Living Archive

> A museum-grade digital archive of contemplative heritage — siddhis, manuscripts, cosmology, and lineage — built with scholarly restraint and a dual epistemological lens.

AstroKalki is a Next.js 16 application presenting a curated corpus of Indic contemplative practices (siddhis), primary manuscripts, real-time cosmology, lineage maps, and a comparative matrix across five traditions. Every practice is traced to its source text with a rated authenticity score. The project takes a deliberately *scholarly* stance: it catalogues, it does not prescribe.

This repository is the **Arena-ready export** — source code plus a complete documentation suite plus a structured offline knowledge archive — prepared so any AI agent (Arena, Claude, Gemini, Codex, or a human reviewer) can navigate the project with minimal context.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#   → set DATABASE_URL to a live PostgreSQL connection string

# 3. Push the schema (primary path)
npx drizzle-kit push

# 4. Run the dev server
npm run dev
#   → http://localhost:3000
```

The application self-heals its schema on boot via `src/lib/bootstrap.ts`, so a freshly created database will be seeded automatically on first request.

---

## Tech Stack

| Layer            | Technology                                   |
|------------------|----------------------------------------------|
| Framework        | Next.js 16.2.6 (App Router, `force-dynamic`) |
| Language         | TypeScript 5.9.3                             |
| Runtime          | React 19.2.6                                 |
| Database         | PostgreSQL via `pg` 8.20 + Drizzle ORM 0.45  |
| Styling          | Tailwind CSS v4 (PostCSS pipeline)           |
| Fonts            | Cormorant Garamond, Crimson Text             |
| Linting          | ESLint 9 + `eslint-config-next`              |
| Schema Tooling   | drizzle-kit 0.31                             |

---

## Repository Layout

```
Arena_Export/
├── src/
│   ├── app/                # Next.js App Router pages + API routes
│   │   ├── api/
│   │   │   ├── archivist/route.ts    # POST search across siddhis + manuscripts
│   │   │   ├── health/route.ts       # GET health probe
│   │   │   └── reflections/route.ts  # GET/POST user reflections
│   │   ├── archive/                  # Browse all siddhis
│   │   ├── archivist/                # The Custodian search UI
│   │   ├── comparative/              # 5-tradition matrix
│   │   ├── cosmos/                   # Real-time planetary longitudes
│   │   ├── journey/                  # Curated reading journey
│   │   ├── lineage/                  # Transmission maps
│   │   ├── manuscripts/              # Codex Library
│   │   ├── safety/                   # Reader safety + epistemic framing
│   │   ├── schools/                  # Schools of thought
│   │   ├── siddhi/[slug]/            # Per-practice deep folio
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Home
│   │   └── globals.css
│   ├── components/          # 13 React components
│   ├── db/                  # Drizzle schema + connection
│   └── lib/                 # Domain logic (cosmology, lineage, archive seed)
├── knowledge/               # Offline Tantra knowledge archive
│   ├── tantra/              # 4 source PDFs
│   ├── metadata/            # Per-doc JSON metadata
│   ├── chunks/              # Text chunks (.jsonl) for retrieval
│   └── sqlite/knowledge.db  # FTS5 full-text index
├── docs/                    # 14 documentation files
├── ai-context/              # 6 AI-context files
├── scripts/                 # Build utilities
├── .env.example
├── MANIFEST.json
├── project_tree.txt
└── README.md (this file)
```

---

## Documentation Index

| Document                    | Purpose                                                        |
|-----------------------------|----------------------------------------------------------------|
| `docs/PROJECT_OVERVIEW.md`  | What the project is, who it's for, the seven pillars           |
| `docs/ARCHITECTURE.md`      | Layer-by-layer architecture + request lifecycle                |
| `docs/SYSTEM_DESIGN.md`     | Design principles, epistemic framing, safety posture           |
| `docs/FEATURES.md`          | Feature inventory with status and entry points                 |
| `docs/DATABASE.md`          | Schema, tables, indexes, seed strategy                         |
| `docs/API_REFERENCE.md`     | Every API route with method, body, response shape              |
| `docs/COMPONENT_GUIDE.md`   | Per-component contract, props, and consumers                   |
| `docs/AI_SYSTEM.md`         | The Custodian — search ranking, weights, future RAG plan       |
| `docs/KNOWLEDGE_ARCHIVE.md` | Tantra knowledge base — structure, indexing, retrieval         |
| `docs/DEPLOYMENT.md`        | Production deployment + database provisioning                  |
| `docs/CONTRIBUTING.md`      | How to extend the corpus, add a siddhi, add a manuscript       |
| `docs/CHANGELOG.md`         | Version history                                                |
| `docs/ROADMAP.md`           | Future work — RAG, embeddings, multi-language, auth            |
| `ai-context/AI_CONTEXT.md`  | Persistent context any AI agent should load first              |
| `ai-context/PROJECT_MEMORY.md` | Long-term project memory + decisions log                    |
| `ai-context/CODING_STANDARDS.md` | Style, naming, file organisation rules                     |
| `ai-context/PROMPT_GUIDE.md`   | How to prompt AI agents working on this codebase             |
| `ai-context/TASK_INDEX.md`     | Catalogue of in-progress / planned tasks                     |
| `ai-context/DEPENDENCIES.md`   | Dependency inventory + role of each                           |

---

## License & Caution

The AstroKalki source code is provided for educational and heritage-preservation purposes. The Tantra PDFs in `knowledge/` are preserved as source-text heritage — several describe rites (māraṇa, abhicāra) that are presented for scholarly study only and are **not** instructional. The `safety/` route and `docs/SYSTEM_DESIGN.md` describe the project's epistemic framing in detail.
""")


# ---------------------------------------------------------------------------
def project_overview():
    write(DOCS_ROOT / "PROJECT_OVERVIEW.md", r"""
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
""")


# ---------------------------------------------------------------------------
def architecture():
    write(DOCS_ROOT / "ARCHITECTURE.md", r"""
# Architecture

AstroKalki is a server-rendered Next.js 16 application backed by PostgreSQL. The architecture is deliberately conservative — no external API gateway, no message queue, no separate frontend/backend deployment. The entire application is one Next.js process talking to one Postgres database, with the option to scale horizontally behind a load balancer.

## Layered View

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Browser (client)                              │
│  - React 19 + Tailwind v4                                            │
│  - Client components: Archivist, CosmosPanel, ReflectionComposer,   │
│    ArchiveBrowser, CodexExplorer, Constellation, ReadinessValidator │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │ HTTPS
┌──────────────────────────────────▼──────────────────────────────────┐
│                    Next.js 16 (App Router)                           │
│  - Server components: page.tsx, layout.tsx, siddhi/[slug]           │
│  - API routes: /api/archivist, /api/health, /api/reflections        │
│  - force-dynamic on data-fetching routes                            │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │ Drizzle ORM 0.45 (sql template)
┌──────────────────────────────────▼──────────────────────────────────┐
│                       PostgreSQL 14+                                 │
│  Tables: siddhis, manuscripts, schools, evidence_sources,           │
│          reflections                                                │
│  Indexes: evidence_siddhi_idx on evidence_sources(siddhi_slug)      │
│  Self-healing DDL: src/lib/bootstrap.ts                             │
└─────────────────────────────────────────────────────────────────────┘
```

## Request Lifecycle — Server Component

A typical read request (e.g. `GET /siddhi/pranava-japa`) flows as follows. The Next.js App Router matches the dynamic segment `[slug]` to `src/app/siddhi/[slug]/page.tsx`. The page is marked `force-dynamic`, so it executes on every request. The page first calls `ensureArchiveSeeded()` from `src/lib/bootstrap.ts`, which runs idempotent `CREATE TABLE IF NOT EXISTS` statements and then `INSERT ... ON CONFLICT DO NOTHING` for every seed row. This guarantees the database is populated even on a fresh provision. The page then issues a Drizzle `select().from(siddhis).where(eq(slug, ...))` query, joins the matching `evidence_sources` rows, and renders the `SiddhiFolio` component with the result.

## Request Lifecycle — API Route

The Custodian search endpoint `POST /api/archivist` accepts `{ query: string }` and returns `{ results: Candidate[], note: string }`. The handler first calls `ensureArchiveSeeded()`, then loads all siddhis and all manuscripts into memory (the corpus is small — tens of rows). For each row it computes a weighted score across multiple text fields: name (weight 6), primary_mantra (5), category and tradition (4 each), sanskrit (3), summary (3), description (2). The score is the count of query-term hits in each field multiplied by that field's weight, summed. Candidates with score > 0 are sorted descending and the top 6 are returned. The `note` field is a templated human-readable summary that always includes the total match count and an explicit "scholarly pointers, not prescriptions" disclaimer.

## Self-Healing Schema

A distinctive architectural choice is the duplication of the Drizzle schema as raw SQL in `src/lib/bootstrap.ts`. The Drizzle schema (`src/db/schema.ts`) is the source of truth and the basis for `drizzle-kit push`. The bootstrap module, however, mirrors every table definition as `CREATE TABLE IF NOT EXISTS` and every seed row as `INSERT ... ON CONFLICT (slug) DO NOTHING`. This means the application will function against an empty database on first boot without requiring a separate migration step. The tradeoff is that any schema change must be made in *two* places — the Drizzle schema and the bootstrap SQL — and the `CONTRIBUTING.md` file documents this requirement explicitly.

## Cosmology Engine

The `/cosmos` route computes planetary longitudes from Paul Schlyter's simplified Keplerian elements at the J2000 epoch. The implementation in `src/lib/cosmology.ts` follows the standard algorithm: compute the Julian Day from the current UTC `Date`, then for each planet compute the day number `d`, the orbital elements `N, i, w, a, e, M` (interpolated linearly from J2000 values), solve Kepler's equation `E = M + e sin(E)` iteratively for the eccentric anomaly, compute the heliocentric position, transform to geocentric coordinates for the inner planets, and finally apply the Lahiri ayanamsa for sidereal values. The result is a set of ecliptic longitudes per planet, rendered by the `CosmosPanel` client component. The accuracy is contemplative (within a few degrees of JPL ephemerides for the inner planets) — the code is explicit that this is "NOT ephemeris-grade."

## Knowledge Archive (Offline)

The `knowledge/` directory is a self-contained offline retrieval archive, separate from the runtime database. It contains the four Tantra PDFs in `knowledge/tantra/`, per-document metadata in `knowledge/metadata/`, text chunks in `knowledge/chunks/` (JSONL format, ~1200 chars per chunk with 150-char overlap), and a SQLite FTS5 full-text index at `knowledge/sqlite/knowledge.db`. The archive is designed to be queried locally by AI tooling or by a future RAG pipeline; it is not currently wired into the Next.js runtime. The `docs/KNOWLEDGE_ARCHIVE.md` file describes the schema and query patterns in detail.

## Why No External Services

The project deliberately avoids external services for cosmology, search, or content storage. The Keplerian computation is pure TypeScript with no network calls. The Custodian search is in-process SQL with no vector database. The knowledge archive is local SQLite. This keeps the deployment story simple (one Next.js process + one Postgres database) and the operational surface small, which matters for a heritage project that may run on modest infrastructure.
""")


# ---------------------------------------------------------------------------
def system_design():
    write(DOCS_ROOT / "SYSTEM_DESIGN.md", r"""
# System Design

## Design Principles

AstroKalki is governed by five design principles, each of which has direct consequences in the codebase.

**1. Scholarship over prescription.** The project catalogues and traces; it does not prescribe or guarantee. This principle is enforced structurally: every siddhi has a `warnings` JSONB array, every practice has an `authenticityScore` between 0 and 100, and every claim is expected to trace to an `evidence_sources` row. The Custodian API response always carries a "scholarly pointers, not prescriptions" disclaimer. The `/safety` route makes this framing explicit to the reader.

**2. Source text and interpretation are separated.** The schema enforces this by storing `description` (the project's editorial summary) separately from `evidence_sources` (the citations). The `evidence_sources.kind` field distinguishes primary text, scholarly commentary, and oral tradition. The reader can always see which claims are attested and which are editorial.

**3. The Custodian is objective, never authoritative.** The search interface refuses to recommend, prescribe, or rank practices by efficacy. It ranks only by *relevance to the query*. The persona of "The Custodian" is an in-fiction framing of this principle — a librarian who points but does not teach.

**4. Real-time over cached.** Where a choice exists between caching a value and computing it live, the project computes live. The `/cosmos` route recomputes planetary positions on every request. The homepage re-queries the database on every render. The tradeoff is latency; the benefit is that the archive is never stale.

**5. Self-healing over migration scripts.** The application must boot against an empty database and produce a working archive. This is implemented via idempotent DDL in `bootstrap.ts`. The tradeoff is the dual-schema maintenance burden; the benefit is operational simplicity and zero-downtime recovery from database resets.

## Epistemic Framing

The project recognises two valid but distinct ways of reading the same material: the *scholar lens* (textual, historical, comparative) and the *practitioner lens* (experiential, devotional, ritual). The `useEpistemicLens` hook (`src/components/useEpistemicLens.ts`) lets the UI toggle between these framings without duplicating content. The same siddhi folio renders slightly different framing copy depending on the active lens. This is a UX choice with epistemic substance — it acknowledges that the reader's stance changes what counts as a meaningful claim.

## Safety Posture

Three categories of content carry elevated caution: *māraṇa* rites (cessation / adversarial practices), *abhicāra* rites (hostile ritual), and any practice involving ingestion, blood, fire, or extended fasting. The knowledge archive tags each PDF with a `caution_level` of `low`, `moderate`, or `high`. The two māraṇa texts in the supplied corpus are tagged `high`. The application does not surface these texts through the main browsing UI; they are accessible only through the `knowledge/` directory and the FTS5 index, with the metadata `caution_level` field available to any retrieval pipeline that chooses to filter on it. The `/safety` route documents this posture for human readers.

## Performance Posture

The application is optimised for correctness and clarity, not for high throughput. Every data-fetching route is `force-dynamic`, which means no static generation and no incremental static regeneration. The tradeoff is that every request hits the database; the benefit is that the archive is always live. For a heritage project with modest traffic this is acceptable. If throughput ever matters, the natural optimisation is to mark the seed-driven routes (homepage, archive, manuscripts, schools) as `revalidate: 3600` and reserve `force-dynamic` for the cosmos and archivist routes.

## Accessibility and i18n

The application is English-first with substantial Sanskrit content (in Devanagari and IAST transliteration). Fonts are loaded via `next/font/google` with `display: "swap"` to avoid FOIT. The design system uses a high-contrast palette (ivory on obsidian) which passes WCAG AA for body text. Full internationalisation is future work — see `docs/ROADMAP.md`.

## What the Project Deliberately Does Not Do

The project does not include user accounts, authentication, comments, ratings, or any user-generated content beyond the optional `reflections` table (which is pen-name only and unauthenticated). It does not sell anything, collect analytics, or embed third-party trackers. It does not prescribe practices, diagnose conditions, or offer medical advice. These exclusions are intentional and reflect the scholarly-heritage posture.
""")


# ---------------------------------------------------------------------------
def features():
    write(DOCS_ROOT / "FEATURES.md", r"""
# Feature Inventory

Each feature is listed with its status, the route(s) or file(s) that implement it, and the database tables or libraries it depends on. Statuses: **shipped** (in the exported code), **seeded** (data is present), **planned** (documented in ROADMAP).

## Browsing & Discovery

| Feature                       | Status   | Entry Point                       | Backing                           |
|-------------------------------|----------|-----------------------------------|-----------------------------------|
| Home with seven-pillar grid   | shipped  | `/` (`src/app/page.tsx`)          | `siddhis`, `manuscripts`          |
| Living knowledge constellation| shipped  | `/` (Constellation component)     | `siddhis` (top 6 by authenticity) |
| Archive browser (all siddhis) | shipped  | `/archive`                        | `siddhis`                         |
| Per-siddhi deep folio         | shipped  | `/siddhi/[slug]`                  | `siddhis`, `evidence_sources`     |
| Codex Library (manuscripts)   | shipped  | `/manuscripts`                    | `manuscripts`                     |
| Schools of thought            | shipped  | `/schools`                        | `schools`                         |
| Curated reading journey       | shipped  | `/journey`                        | `siddhis` (curated order)         |

## Scholarship Tools

| Feature                          | Status   | Entry Point                | Backing                              |
|----------------------------------|----------|----------------------------|--------------------------------------|
| The Custodian (search)           | shipped  | `/archivist` + `/api/archivist` | `siddhis`, `manuscripts`         |
| Comparative matrix (5 traditions)| shipped  | `/comparative`             | `src/lib/comparative.ts` (static)    |
| Transmission maps (lineage)      | shipped  | `/lineage`                 | `src/lib/lineage.ts` (static)        |
| Evidence panels (per siddhi)     | shipped  | `/siddhi/[slug]`           | `evidence_sources`                   |
| Dual lens (scholar/practitioner) | shipped  | `useEpistemicLens` hook    | Client state                         |
| Reader safety page               | shipped  | `/safety`                  | Static content                       |

## Real-Time Cosmology

| Feature                          | Status   | Entry Point                | Backing                              |
|----------------------------------|----------|----------------------------|--------------------------------------|
| Planetary longitudes (real-time) | shipped  | `/cosmos`                  | `src/lib/cosmology.ts`               |
| Lahiri ayanamsa (sidereal)       | shipped  | `cosmology.ts`             | Hardcoded ayanamsa formula           |
| CosmosPanel client renderer      | shipped  | `CosmosPanel.tsx`          | Fetches `/api/health` for timestamp  |

## Reader Interaction

| Feature                       | Status   | Entry Point                          | Backing                  |
|-------------------------------|----------|--------------------------------------|--------------------------|
| Reflection composer (pen-name)| shipped  | `ReflectionComposer.tsx` + `/api/reflections` | `reflections`   |
| Readiness validator          | shipped  | `ReadinessValidator.tsx`             | Static checklist         |

## Knowledge Archive (Offline)

| Feature                       | Status   | Entry Point                          | Backing                              |
|-------------------------------|----------|--------------------------------------|--------------------------------------|
| 4 Tantra PDFs catalogued      | seeded   | `knowledge/tantra/`                  | Filesystem                           |
| Per-doc metadata JSON         | seeded   | `knowledge/metadata/*.json`          | Generated by build script            |
| Master index                  | seeded   | `knowledge/index.json`               | Generated by build script            |
| Text chunks (JSONL)           | seeded   | `knowledge/chunks/*.jsonl`           | Generated by build script            |
| SQLite FTS5 full-text index   | seeded   | `knowledge/sqlite/knowledge.db`      | Generated by build script            |
| RAG retrieval pipeline        | planned  | —                                    | See ROADMAP                          |

## Infrastructure

| Feature                       | Status   | Entry Point                          | Backing                              |
|-------------------------------|----------|--------------------------------------|--------------------------------------|
| Self-healing schema bootstrap | shipped  | `src/lib/bootstrap.ts`               | Raw SQL via `db.execute`             |
| Drizzle ORM integration       | shipped  | `src/db/index.ts`, `src/db/schema.ts`| drizzle-orm 0.45 + pg 8.20           |
| Health probe                  | shipped  | `/api/health`                        | DB ping                              |
| TypeScript strict mode        | shipped  | `tsconfig.json`                      | tsc 5.9                              |
| ESLint + next config          | shipped  | `eslint.config.mjs`                  | eslint 9 + eslint-config-next        |
| Tailwind v4 design system     | shipped  | `src/app/globals.css`                | @tailwindcss/postcss 4.1             |

## Planned (per ROADMAP)

- Vector embeddings over `knowledge/chunks/` for semantic retrieval
- Multi-language UI (Hindi, Sanskrit, English toggle)
- Authentication + moderated write side for scholars
- Per-siddhi PDF export
- Sitemap + structured data (Schema.org) for SEO
- Image / yantra gallery with IIIF-compatible manifests
""")


# ---------------------------------------------------------------------------
def database():
    write(DOCS_ROOT / "DATABASE.md", r"""
# Database

AstroKalki uses PostgreSQL (14+) accessed through Drizzle ORM 0.45. The schema is defined in `src/db/schema.ts` as the source of truth and mirrored as idempotent raw SQL in `src/lib/bootstrap.ts` so the application self-heals against a fresh database.

## Connection

`src/db/index.ts` constructs a single `Pool` from `pg` with connection parameters read from `DATABASE_URL`, then exports a Drizzle instance bound to that pool. All queries flow through this instance. There is no connection pooling service (PgBouncer) in the default deployment; for production, a PgBouncer sidecar or a managed pooler (Supabase, Neon, RDS Proxy) is recommended.

## Tables

### `siddhis`

The core entity. Each row is a contemplative practice (a "siddhi" in the broad sense — including foundation practices, mantras, and kriyās).

| Column                | Type        | Notes                                            |
|-----------------------|-------------|--------------------------------------------------|
| `id`                  | SERIAL PK   | Auto-increment                                   |
| `slug`                | TEXT UNIQUE | URL-safe identifier, e.g. `pranava-japa`         |
| `name`                | TEXT        | Display name, e.g. "Pranava Japa"                |
| `sanskrit`            | TEXT        | Devanagari + IAST, nullable                      |
| `category`            | TEXT        | "Mantra", "Yantra", "Kriyā", etc.                |
| `tradition`           | TEXT        | "Vedānta", "Tantra", "Yoga", etc.                |
| `level`               | TEXT        | "Foundation", "Intermediate", "Advanced"         |
| `duration_hours`      | INTEGER     | Single-session duration                          |
| `days`                | INTEGER     | Total days of the sādhana cycle                  |
| `authenticity_score`  | INTEGER     | 0-100, displayed as a badge on every folio       |
| `summary`             | TEXT        | One-paragraph overview                           |
| `description`         | TEXT        | Full editorial description (separate from sources) |
| `primary_mantra`      | TEXT        | The mantra string (Devanagari / IAST)            |
| `benefits`            | JSONB       | Array of strings                                 |
| `warnings`            | JSONB       | Array of strings (always rendered, never hidden) |
| `lineage`             | TEXT        | Prose lineage description                        |
| `pre_sadhna`          | JSONB       | Array of `{title, duration, detail}` steps       |
| `procedure`           | JSONB       | Array of `{title, detail, substeps[], caution?}` |
| `yantra`              | JSONB       | `{name, description, symbolism}` or null         |
| `faq`                 | JSONB       | Array of `{q, a}`                                |
| `view_count`          | INTEGER     | Default 0 (increment-on-view not yet implemented)|
| `created_at`          | TIMESTAMPTZ | Default `now()`                                  |

### `manuscripts`

The Codex Library — primary source texts catalogued like museum holdings.

| Column              | Type        | Notes                                            |
|---------------------|-------------|--------------------------------------------------|
| `id`                | SERIAL PK   |                                                  |
| `slug`              | TEXT UNIQUE |                                                  |
| `title`             | TEXT        | English title                                    |
| `original_title`    | TEXT        | Sanskrit / original-language title               |
| `tradition`         | TEXT        |                                                  |
| `century`           | TEXT        | Free-form (e.g. "8th c.", "pre-modern")          |
| `catalog_number`    | TEXT        | Museum-style identifier                          |
| `language`          | TEXT        |                                                  |
| `description`       | TEXT        |                                                  |
| `condition_rating`  | TEXT        | "excellent", "good", "fair", etc.                |
| `folios`            | INTEGER     | Number of folios                                 |
| `source_url`        | TEXT        | Canonical external source                        |

### `schools`

| Column        | Type        | Notes                          |
|---------------|-------------|--------------------------------|
| `id`          | SERIAL PK   |                                |
| `slug`        | TEXT UNIQUE |                                |
| `name`        | TEXT        |                                |
| `focus`       | TEXT        | One-line summary               |
| `description` | TEXT        |                                |
| `order_index` | INTEGER     | Display order                  |

### `evidence_sources`

Citations for siddhi claims. Indexed on `siddhi_slug` for fast folio joins.

| Column        | Type        | Notes                                            |
|---------------|-------------|--------------------------------------------------|
| `id`          | SERIAL PK   |                                                  |
| `siddhi_slug` | TEXT        | Foreign reference into `siddhis.slug`            |
| `kind`        | TEXT        | "primary text", "commentary", "oral", etc.       |
| `citation`    | TEXT        | Human-readable citation                          |
| `url`         | TEXT        | Optional external URL                            |
| `notes`       | TEXT        | Editorial notes                                  |
| `confidence`  | TEXT        | "high", "medium", "low"                          |

Index: `evidence_siddhi_idx` on `(siddhi_slug)`.

### `reflections`

Pen-name reader reflections. Unauthenticated by design.

| Column        | Type        | Notes                                            |
|---------------|-------------|--------------------------------------------------|
| `id`          | SERIAL PK   |                                                  |
| `pen_name`    | TEXT        | Self-chosen pen name                             |
| `siddhi_slug` | TEXT        | Optional association to a siddhi                 |
| `title`       | TEXT        |                                                  |
| `body`        | TEXT        |                                                  |
| `tone`        | TEXT        | "scholar", "practitioner", etc.                  |
| `created_at`  | TIMESTAMPTZ | Default `now()`                                  |

## Seed Strategy

The seed corpus lives in `src/lib/archive-data.ts` as typed constants: `SIDDHI_SEED`, `MANUSCRIPT_SEED`, `SCHOOL_SEED`, `EVIDENCE_SEED`, `REFLECTION_SEED`. The `bootstrap.ts` module iterates each seed array and executes `INSERT ... ON CONFLICT (slug) DO NOTHING` for every row. This is invoked at the top of every server component and API route via `ensureArchiveSeeded()`, making the application self-healing against a fresh database.

The seed corpus contains approximately 32 siddhis, 11 manuscripts, a small set of schools, evidence sources, and a handful of starter reflections. Extending the corpus is documented in `docs/CONTRIBUTING.md`.

## Migrations

The project does not use drizzle-kit migrations (the `drizzle-kit generate` workflow). Instead it uses `drizzle-kit push` for schema changes, supplemented by the `bootstrap.ts` self-healing DDL. The tradeoff: no migration history, but zero operational complexity. For a heritage project with a single deployment this is the right tradeoff; for a multi-environment deployment with strict audit requirements, switch to generated migrations.
""")


# ---------------------------------------------------------------------------
def api_reference():
    write(DOCS_ROOT / "API_REFERENCE.md", r"""
# API Reference

All API routes live under `src/app/api/` and follow Next.js 16 App Router conventions. Every route is marked `export const dynamic = "force-dynamic"`.

## `POST /api/archivist`

The Custodian search endpoint. Searches across all siddhis and manuscripts using a weighted multi-field ranking algorithm.

### Request

```http
POST /api/archivist
Content-Type: application/json

{
  "query": "significance of Om"
}
```

The `query` field is required. It is lowercased, trimmed, and split on whitespace and punctuation into terms of length > 2.

### Response (200)

```json
{
  "results": [
    {
      "slug": "pranava-japa",
      "name": "Pranava Japa",
      "sanskrit": "प्रणव जप — Oṃkāra Repetition",
      "category": "Mantra",
      "summary": "The contemplative repetition of Oṃ...",
      "type": "siddhi",
      "reason": "Attested in the name.",
      "score": 76
    }
  ],
  "note": "The Custodian has traced 3 relevant records across 32 folios and 11 codices. These are scholarly pointers, not prescriptions — consult each source."
}
```

### Ranking Algorithm

For each siddhi, the algorithm iterates these fields with these weights:

| Field            | Weight |
|------------------|--------|
| `name`           | 6      |
| `primary_mantra` | 5      |
| `category`       | 4      |
| `tradition`      | 4      |
| `sanskrit`       | 3      |
| `summary`        | 3      |
| `description`    | 2      |

For each field, the count of distinct query terms that appear as substrings in the lowercased field value is multiplied by the field's weight and summed into a total score. The final displayed score is `min(99, 40 + score * 6)` for siddhis and `min(99, 38 + score * 6)` for manuscripts. The top 6 candidates by score are returned.

### Errors

- `200` with empty `results` and a "could not trace that thread" note when no candidate scores above 0.
- `500` with `{ results: [], note: "The Custodian is momentarily unavailable." }` on any thrown exception (logged to stderr as `[archivist]`).

## `GET /api/health`

Liveness probe. Verifies the database connection.

### Response (200)

```json
{
  "status": "ok",
  "timestamp": "2026-07-06T12:00:00.000Z",
  "database": "connected"
}
```

### Response (500)

```json
{
  "status": "degraded",
  "timestamp": "2026-07-06T12:00:00.000Z",
  "database": "unreachable",
  "error": "<message>"
}
```

## `GET /api/reflections`

Lists reflections, most recent first. Optionally filtered by `siddhi_slug` via query string.

### Query Parameters

| Name          | Type   | Required | Notes                          |
|---------------|--------|----------|--------------------------------|
| `siddhi_slug` | string | no       | Filter to one siddhi           |
| `limit`       | number | no       | Default 50, max 200            |

### Response (200)

```json
{
  "reflections": [
    {
      "id": 1,
      "penName": "Wanderer",
      "siddhiSlug": "pranava-japa",
      "title": "On the silence after the syllable",
      "body": "...",
      "tone": "practitioner",
      "createdAt": "2026-07-06T12:00:00.000Z"
    }
  ]
}
```

## `POST /api/reflections`

Creates a new reflection. Unauthenticated; pen-name only.

### Request

```http
POST /api/reflections
Content-Type: application/json

{
  "penName": "Wanderer",
  "siddhiSlug": "pranava-japa",
  "title": "On the silence after the syllable",
  "body": "...",
  "tone": "practitioner"
}
```

### Response (201)

```json
{
  "reflection": {
    "id": 42,
    "penName": "Wanderer",
    "siddhiSlug": "pranava-japa",
    "title": "On the silence after the syllable",
    "body": "...",
    "tone": "practitioner",
    "createdAt": "2026-07-06T12:00:00.000Z"
  }
}
```

## Rate Limiting

None implemented. For production, add IP-based rate limiting at the edge (Vercel, Cloudflare) or middleware-level. The `reflections` POST endpoint is the natural abuse vector.

## Authentication

None. All endpoints are public. Future auth is documented in `docs/ROADMAP.md`.
""")


# ---------------------------------------------------------------------------
def component_guide():
    write(DOCS_ROOT / "COMPONENT_GUIDE.md", r"""
# Component Guide

Thirteen React components live in `src/components/`. Each is documented below with its contract, props, consumers, and any client/server designation.

## `SiteNav.tsx` (server)

Top-level site navigation. Renders the seven primary routes as a horizontal nav bar with the project's wordmark. Uses Next.js `<Link>` for client-side transitions. No props.

**Consumers:** `src/app/layout.tsx`.

## `Footer.tsx` (server)

Footer with the project's epistemic disclaimer and the seven-pillar summary. No props.

**Consumers:** `src/app/layout.tsx`.

## `PageHeader.tsx` (server)

Reusable page header with eyebrow, title, and optional subtitle. Standardises page rhythm.

**Props:** `{ eyebrow: string; title: string; subtitle?: string }`.

**Consumers:** `/archive`, `/manuscripts`, `/schools`, `/lineage`, `/comparative`, `/journey`, `/safety`.

## `Symbols.tsx` (server)

A library of SVG glyph components used throughout the UI: `SriYantraGlyph`, `FlourishDivider`, `BinduSun`, `LotusGlyph`, `OmGlyph`, `CategoryGlyph`. Each accepts standard SVG props plus a `size` prop where relevant. The glyphs are hand-crafted SVG, not icon-font characters, so they scale crisply at any size.

**Consumers:** `src/app/page.tsx`, `SiddhiFolio.tsx`, `ArchiveBrowser.tsx`.

## `Constellation.tsx` (client)

An interactive graph visualisation of the "living knowledge constellation." Renders nodes (a central "Witness" plus the top-rated siddhis) and edges (each siddhi connected to the Witness). Implemented with SVG and CSS animations; no graph library dependency.

**Props:** `{ nodes: ConstellationNode[]; edges: ConstellationEdge[] }`.

**Types:** `ConstellationNode = { id, label, slug?, kind: "core" | "branch" }`, `ConstellationEdge = { from, to }`.

**Consumers:** `src/app/page.tsx`.

## `SiddhiFolio.tsx` (client)

The deep folio renderer for a single siddhi. Renders the full record: header, mantra, description, pre-sādhana steps, procedure steps, yantra, FAQ, evidence panel, and warnings. Uses the `useEpistemicLens` hook to toggle scholar / practitioner framing. This is the most complex component in the project (471 lines).

**Props:** `{ siddhi: Siddhi; evidence: EvidenceSource[] }`.

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `ArchiveBrowser.tsx` (client)

Filterable, sortable browser for the full siddhi corpus. Client-side filtering by category, tradition, and level; sorting by authenticity score, name, or tradition. Pure client state; no server round-trips after initial load.

**Props:** `{ siddhis: Siddhi[] }`.

**Consumers:** `src/app/archive/page.tsx`.

## `CodexExplorer.tsx` (client)

A museum-style explorer for the manuscript collection. Groups by tradition, expands to show metadata, and links out to `source_url`. Pure client state.

**Props:** `{ manuscripts: Manuscript[] }`.

**Consumers:** `src/app/manuscripts/page.tsx`.

## `CosmosPanel.tsx` (client)

Real-time cosmology renderer. Fetches current planetary positions from the server component on the `/cosmos` page and re-renders every 60 seconds. Displays both tropical and sidereal (Lahiri) longitudes, with the ayanamsa explicitly noted.

**Props:** `{ positions: PlanetPosition[]; ayanamsa: number; timestamp: string }`.

**Consumers:** `src/app/cosmos/page.tsx`.

## `Archivist.tsx` (client)

The Custodian search UI. Maintains query state, calls `POST /api/archivist`, renders ranked results with their `reason` field, and shows the templated `note` from the server. Includes suggested queries for empty states.

**Props:** None (self-contained).

**Consumers:** `src/app/archivist/page.tsx`.

## `ReflectionComposer.tsx` (client)

Form for submitting a new reflection. Fields: pen name, siddhi slug (optional), title, body, tone. Submits to `POST /api/reflections`. No validation beyond required-field checks; the API does server-side sanitisation.

**Props:** `{ siddhiSlug?: string }` (pre-fills the siddhi field when composed from a folio).

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `ReadinessValidator.tsx` (client)

An interactive checklist that helps a reader assess whether they have the prerequisites for a given practice. Each item is a checkbox with explanatory text. The component computes a readiness percentage and renders a colour-coded summary.

**Props:** `{ items: { label: string; detail: string }[] }`.

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `useEpistemicLens.ts` (client hook)

A custom hook that manages the scholar / practitioner lens toggle in localStorage. Returns the current lens and a setter. The lens is persisted across sessions per browser.

**Returns:** `[lens: "scholar" | "practitioner", setLens: (l) => void]`.

**Consumers:** `SiddhiFolio.tsx`.

## Adding a New Component

1. Create `src/components/MyComponent.tsx`. Mark `"use client"` only if the component uses hooks, browser APIs, or event handlers.
2. If the component needs domain types, import them from `src/db/schema.ts` (e.g. `Siddhi`, `Manuscript`).
3. If the component is a server component, it may issue Drizzle queries directly; if it is a client component, it must receive data via props or fetch from an API route.
4. Update this document with the new component's contract.
""")


# ---------------------------------------------------------------------------
def ai_system():
    write(DOCS_ROOT / "AI_SYSTEM.md", r"""
# AI System — The Custodian

The Custodian is AstroKalki's in-fiction framing for an in-process search engine. It is the project's only AI-flavoured subsystem, and it is deliberately *not* a large language model. It is a weighted multi-field text-search algorithm backed by PostgreSQL and executed in the Next.js API process.

## Why Not an LLM

The project's epistemic posture (see `SYSTEM_DESIGN.md`) is that the archive catalogues and points; it does not prescribe or generate. An LLM that synthesised answers from the corpus would risk hallucinating citations, smoothing over the editorial / source distinction, or generating prose that reads as authoritative prescription. The Custodian, by contrast, returns *only* ranked pointers to existing catalogue entries, each with the field in which the match was found. The reader does the synthesis.

This is a deliberate architectural choice. The future RAG work documented in `docs/ROADMAP.md` will add embedding-based retrieval over the Tantra knowledge archive, but the *output* of retrieval will remain a ranked list of source chunks — not a generated answer.

## Algorithm

The Custodian's ranking algorithm is defined in `src/app/api/archivist/route.ts` and is documented in detail in `API_REFERENCE.md`. The summary:

1. **Tokenisation.** The raw query is lowercased, trimmed, and split on `[\s,.;:]+`. Terms of length ≤ 2 are dropped (this filters out most Sanskrit particles and English stop-words).

2. **Candidate generation.** Every siddhi and every manuscript is a candidate. There is no pre-filter; the corpus is small enough (tens of rows) that a full scan is faster than maintaining an inverse index.

3. **Scoring.** For each candidate, for each of its text fields, count the number of distinct query terms that appear as substrings in the lowercased field value. Multiply by the field's weight. Sum across fields.

4. **Normalisation.** The raw score is mapped to a display score via `min(99, 40 + score * 6)` for siddhis and `min(99, 38 + score * 6)` for manuscripts. The `40` baseline ensures that any matched candidate is displayed with a non-trivial score; the `* 6` amplifies the discrimination between strong and weak matches.

5. **Selection.** Candidates are sorted by display score descending. The top 6 are returned.

6. **Reason field.** For each returned candidate, the `reason` field identifies the highest-weighted field in which a match was found, formatted as "Attested in the {field}." This is the Custodian's only explanatory output — it tells the reader *where* the match was, not *why* the practice is relevant.

## Limitations

The current algorithm has known limitations that future work should address.

- **No stemming.** A search for "meditation" will not match "meditate" or "meditative." This is partially mitigated by the substring match (so "meditat" would match all three), but a query for "Om" will not match "Oṃkāra" because the substrings differ.
- **No diacritic folding.** Sanskrit IAST diacritics (ṃ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ, ḥ) are not normalised. A search for "Om" will not match "Oṃ". The FTS5 index in the knowledge archive uses `unicode61 remove_diacritics 2` to address this, but the runtime Custodian does not.
- **No semantic similarity.** "Breath" will not match "prāṇa" unless one of the fields contains the English word. Embedding-based retrieval would close this gap.
- **No phrase queries.** "Pranava japa" is split into "pranava" and "japa" and scored independently. A document containing both terms in unrelated fields scores the same as one containing the phrase.

## Future Direction — RAG over the Knowledge Archive

The `knowledge/` directory already contains the infrastructure for offline retrieval: 101 text chunks across 4 Tantra PDFs, with a SQLite FTS5 index. The natural next step is a `/api/knowledge/search` endpoint that accepts a query, runs an FTS5 `MATCH` against the chunks table, and returns ranked chunks with their parent document metadata. This would give the Custodian access to the primary-source archive without requiring an LLM.

A further step is to add embedding-based retrieval. The `knowledge/chunks/` directory is structured to accept a parallel `embeddings/` directory (one `.jsonl` file per document, each line a `{ id, embedding: number[] }` record). The embeddings would be generated by a build-time script (using OpenAI, Cohere, or a local model) and stored alongside the chunks. A `/api/knowledge/semantic-search` endpoint would embed the query at request time, compute cosine similarity against the stored embeddings, and return the top-k chunks. Vector storage options: SQLite with `sqlite-vec`, Postgres with `pgvector`, or a dedicated vector store (Qdrant, Weaviate).

Even with semantic retrieval, the Custodian's *output contract* should not change: it returns ranked pointers to source material, not generated prose. This preserves the project's epistemic posture while expanding the breadth of retrievable material.
""")


# ---------------------------------------------------------------------------
def knowledge_archive_doc():
    write(DOCS_ROOT / "KNOWLEDGE_ARCHIVE.md", r"""
# Knowledge Archive

The `knowledge/` directory is a self-contained offline retrieval archive built from the four supplied Tantra PDFs. It is separate from the runtime PostgreSQL database — the Next.js application does not currently read from it at request time. It exists to support future RAG retrieval and to give AI agents working on this project direct access to the primary-source material.

## Directory Structure

```
knowledge/
├── tantra/                       # 4 source PDFs (preserved as supplied)
│   ├── Agni Māraṇa Tantra.pdf
│   ├── Nimbu_Mantra_Siddhi_Sadhana_Manual.pdf
│   ├── SADHANAs and KRIYAs - All.pdf
│   └── Vīrudha-Āhāra Māraṇa – The Energetic Food Poison Curse.pdf
├── metadata/                     # Per-document JSON metadata
│   ├── agni-m-ra-a-tantra.json
│   ├── nimbu-mantra-siddhi-s-dhana-manual.json
│   ├── s-dhan-s-and-kriy-s-collected.json
│   └── v-rudha-h-ra-m-ra-a-...json
├── chunks/                       # Text chunks for retrieval (JSONL)
│   ├── agni-m-ra-a-tantra.jsonl
│   ├── nimbu-mantra-siddhi-s-dhana-manual.jsonl
│   ├── s-dhan-s-and-kriy-s-collected.jsonl
│   └── v-rudha-h-ra-m-ra-a-...jsonl
├── sqlite/
│   └── knowledge.db              # FTS5 full-text index over all chunks
└── index.json                    # Master index with document-level metadata
```

## Document Metadata Schema

Each file in `metadata/` follows this shape:

```json
{
  "slug": "agni-m-ra-a-tantra",
  "file": "Agni Māraṇa Tantra.pdf",
  "title": "Agni Māraṇa Tantra",
  "original_title": "अग्नि मारण तन्त्र",
  "category": "Tantra",
  "subcategory": "Māraṇa (Astral Cessation Rites)",
  "tradition": "Tantra / Śākta-Śaiva",
  "language": "Sanskrit + English commentary",
  "century": "Pre-modern (oral + manuscript compilation)",
  "tags": ["agni", "maraṇa", "tantra", "fire-rite", "śākta", "astral"],
  "description": "...",
  "caution_level": "high",
  "source": "User-supplied archive",
  "text_chars": 142857,
  "text_words": 18432,
  "pdf_bytes": 4033044
}
```

The `caution_level` field is the most operationally important: it is `low`, `moderate`, or `high`, and any retrieval pipeline that surfaces knowledge archive content to end users should filter on it. The two māraṇa texts are tagged `high`; the sādhana compendium and the Nimbu manual are `moderate`.

## Chunk Schema

Each line in `chunks/*.jsonl` is:

```json
{
  "id": "agni-m-ra-a-tantra#0042",
  "doc_slug": "agni-m-ra-a-tantra",
  "ordinal": 42,
  "text": "...the chunk text...",
  "char_count": 1187,
  "sha256": "a1b2c3d4e5f6a7b8"
}
```

Chunks are approximately 1200 characters with 150 characters of overlap between consecutive chunks. The overlap ensures that retrieval hits near a chunk boundary return enough context. The chunking is paragraph-aware: the algorithm prefers to break at paragraph boundaries and only hard-splits paragraphs longer than the chunk size.

## FTS5 Index

`sqlite/knowledge.db` contains a single virtual table:

```sql
CREATE VIRTUAL TABLE chunks USING fts5(
    id UNINDEXED,
    doc_slug UNINDEXED,
    ordinal UNINDEXED,
    text,
    tokenize = 'unicode61 remove_diacritics 2'
);
```

The `unicode61 remove_diacritics 2` tokenizer folds IAST diacritics, so a search for "Om" matches "Oṃ" and a search for "Siva" matches "Śiva". The `id`, `doc_slug`, and `ordinal` columns are `UNINDEXED` — they are stored but not tokenised, so they can be returned in query results without polluting the index.

### Querying the FTS5 Index

```python
import sqlite3
conn = sqlite3.connect("knowledge/sqlite/knowledge.db")
cur = conn.execute(
    "SELECT id, doc_slug, ordinal, text FROM chunks WHERE chunks MATCH ? "
    "ORDER BY rank LIMIT 5",
    ("pranava OR om",)
)
for row in cur:
    print(row)
```

The `MATCH` operator supports boolean (`AND`, `OR`, `NOT`), prefix (`pra*`), and phrase (`"pranava japa"`) queries. See the SQLite FTS5 documentation for the full query syntax.

## Master Index

`knowledge/index.json` aggregates document-level metadata across the archive:

```json
{
  "archive": "AstroKalki Knowledge Archive",
  "version": "1.0.0",
  "generated_at": "2026-07-06",
  "total_documents": 4,
  "total_chunks": 101,
  "total_chars": 234567,
  "total_words": 28765,
  "categories": ["Tantra"],
  "traditions": ["Tantra / Folk practice", "Tantra / Śākta-Śaiva", ...],
  "caution_levels": ["high", "moderate"],
  "documents": [ ... per-doc summary objects ... ]
}
```

## Build Script

The archive is built by `scripts/build_knowledge_archive.py`. It iterates the `DOCS` registry (hard-coded document metadata), extracts text from each PDF using `pdfplumber` with `pypdf` and `pdfminer` as fallbacks, chunks the text, writes the per-doc JSONL and metadata files, builds the FTS5 index, and writes the master index.

To rebuild the archive after adding or modifying PDFs:

1. Drop new PDFs into `knowledge/tantra/`.
2. Add a new entry to the `DOCS` list in `scripts/build_knowledge_archive.py` with the new file's metadata.
3. Run `python3 scripts/build_knowledge_archive.py`.

The script is idempotent — it overwrites the chunks, metadata, FTS5 index, and master index on every run.

## Integration with the Runtime Application

The knowledge archive is *not* currently wired into the Next.js runtime. The Custodian API (`/api/archivist`) searches only the `siddhis` and `manuscripts` tables in PostgreSQL. The natural integration path is a new `/api/knowledge/search` endpoint that runs FTS5 `MATCH` queries against `knowledge.db` and returns ranked chunks. This is documented as future work in `docs/ROADMAP.md`.

## Caution and Provenance

The four PDFs in this archive were supplied by the project owner and are preserved here as heritage source material. Two of them (`Agni Māraṇa Tantra` and `Vīrudha-Āhāra Māraṇa`) describe adversarial rites and are tagged `caution_level: high`. They are included for scholarly preservation; the project does not endorse their practice and does not surface them through the main browsing UI. Any future retrieval pipeline that surfaces knowledge archive content must respect the `caution_level` field and present appropriate framing.
""")


# ---------------------------------------------------------------------------
def deployment():
    write(DOCS_ROOT / "DEPLOYMENT.md", r"""
# Deployment

AstroKalki is a standard Next.js 16 application with a single PostgreSQL database dependency. It deploys cleanly to any platform that supports Node.js 18+ and a managed Postgres instance.

## Prerequisites

- Node.js 18+ (20 LTS recommended)
- PostgreSQL 14+ (managed or self-hosted)
- `npm` or `pnpm` or `yarn`

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
DATABASE_URL=postgresql://user:password@host:5432/astrokalki
```

`DATABASE_URL` is the only required variable. The Drizzle client reads it directly via `pg`. No other environment variables are used by the application at runtime.

For production, also set:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Local Development

```bash
npm install
cp .env.example .env
# edit .env with your DATABASE_URL
npx drizzle-kit push    # apply schema to the database
npm run dev             # http://localhost:3000
```

The `bootstrap.ts` self-healing DDL will run on the first request and seed the database. If `drizzle-kit push` is not run, the bootstrap will create the tables anyway (via `CREATE TABLE IF NOT EXISTS`), so a completely fresh database will work without explicit migration.

## Production Build

```bash
npm install --production=false
npm run build
npm start
```

`npm run build` produces `.next/` with the compiled application. `npm start` runs the production server on port 3000 by default (override with `PORT=xxxx`).

## Platform Deployments

### Vercel

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set `DATABASE_URL` in the Vercel project's environment variables.
4. Deploy. Vercel runs `npm run build` and serves the output.

Vercel Postgres, Neon, Supabase, and RDS all work as database providers. Choose based on region and budget.

### Self-hosted (Docker)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

Run with a reverse proxy (Caddy, nginx) in front for TLS termination.

### Database Provisioning

For a fresh database, no manual schema work is required — `bootstrap.ts` will create tables and seed data on first request. For an existing database, the bootstrap is idempotent (`CREATE TABLE IF NOT EXISTS` + `INSERT ... ON CONFLICT DO NOTHING`) and will not disturb existing data.

To reset the database:

```sql
DROP TABLE IF EXISTS reflections, evidence_sources, schools, manuscripts, siddhis CASCADE;
```

Then make any request to the application; the bootstrap will recreate and reseed everything.

## Health Checking

`GET /api/health` returns 200 with `{ status: "ok", database: "connected" }` when the application and database are healthy, and 500 with a diagnostic message otherwise. Wire this into your platform's health check (Vercel cron, Kubernetes liveness probe, uptime monitor).

## Scaling Considerations

The application is stateless and horizontally scalable. The `pg` connection pool defaults to 10 connections per process; for a multi-instance deployment, size the Postgres `max_connections` accordingly. For high-traffic deployments, add PgBouncer in transaction-pooling mode between the app and the database.

The `/cosmos` route recomputes planetary positions on every request. This is a pure-CPU operation (sub-millisecond) and is not a scaling concern. The `force-dynamic` directive on data-fetching routes prevents Next.js from caching responses; if cache pressure becomes a concern, mark read-heavy routes with `revalidate: 3600` instead.

## Backups

The PostgreSQL database is the only stateful component. Back it up on whatever schedule your provider recommends (typically daily snapshots + WAL streaming for point-in-time recovery). The `knowledge/` directory is part of the repository and travels with the code; it does not need separate backup.

## Monitoring

The application logs to stdout/stderr. The Custodian API logs errors with the `[archivist]` prefix. The bootstrap logs seeding activity with `[bootstrap]`. Ship these to your log aggregator (Vercel logs, Datadog, Loki). No metrics are exported; add OpenTelemetry if you need distributed tracing.
""")


# ---------------------------------------------------------------------------
def contributing():
    write(DOCS_ROOT / "CONTRIBUTING.md", r"""
# Contributing

AstroKalki welcomes contributions that extend the corpus, refine the architecture, or improve the documentation. The project's epistemic posture (see `SYSTEM_DESIGN.md`) is the primary filter for acceptability: contributions that prescribe, guarantee, or remove the source/interpretation separation will not be accepted.

## Development Setup

```bash
git clone <repo>
cd astrokalki
npm install
cp .env.example .env
# set DATABASE_URL
npm run dev
```

The application self-heals its schema on first request, so a fresh database will be seeded automatically.

## Adding a New Siddhi

1. Open `src/lib/archive-data.ts`.
2. Add a new entry to the `SIDDHI_SEED` array following the `SiddhiSeed` interface. Required fields: `slug`, `name`, `sanskrit`, `category`, `tradition`, `level`, `durationHours`, `days`, `authenticityScore`, `summary`, `description`, `primaryMantra`, `benefits`, `warnings`, `lineage`, `preSadhna`, `procedure`, `faq`.
3. Add at least one corresponding entry to `EVIDENCE_SEED` with the same `siddhiSlug`.
4. Restart the dev server. The bootstrap will `INSERT ... ON CONFLICT DO NOTHING` the new row on the next request.
5. Verify at `/siddhi/<your-slug>`.

### Editorial Standards for New Siddhis

- The `authenticityScore` must reflect the strength of textual attestation, not the perceived efficacy of the practice. A well-attested practice with no modern evidence should score higher than a poorly-attested one with abundant testimonials.
- The `warnings` array must include any contraindications, even obvious ones. Better to over-warn than under-warn.
- The `description` is editorial prose; it must not be presented as a primary source. Primary claims belong in `evidence_sources`.
- The `primaryMantra` should be in both Devanagari and IAST. Avoid anglicised approximations.

## Adding a New Manuscript

1. Open `src/lib/archive-data.ts`.
2. Add an entry to `MANUSCRIPT_SEED` with `slug`, `title`, `originalTitle`, `tradition`, `century`, `catalogNumber`, `language`, `description`, `conditionRating`, `folios`, `sourceUrl`.
3. Restart the dev server; verify at `/manuscripts`.

## Adding a New Tantra PDF to the Knowledge Archive

1. Drop the PDF into `knowledge/tantra/`.
2. Open `scripts/build_knowledge_archive.py` and add a new entry to the `DOCS` list with the file's metadata. Be honest about `caution_level` — `high` for any māraṇa, abhicāra, or ingestion-related rite.
3. Run `python3 scripts/build_knowledge_archive.py` to rebuild the chunks, FTS5 index, and master index.
4. Verify by querying the FTS5 index directly (see `docs/KNOWLEDGE_ARCHIVE.md`).

## Schema Changes

Schema changes require updating **two** files:

1. `src/db/schema.ts` — the Drizzle schema (source of truth).
2. `src/lib/bootstrap.ts` — the idempotent raw SQL that mirrors the schema.

After updating both, run `npx drizzle-kit push` to apply the schema change to your local database. The bootstrap will handle the change automatically on a fresh database. If you forget to update `bootstrap.ts`, the app will work against your local DB (which has the new schema from `drizzle-kit push`) but will fail against a fresh provision (which only has the bootstrap's older schema).

## Code Style

- TypeScript strict mode is on. No `any` without a comment justifying it.
- Prefer `const` over `let`. No `var`.
- Use named exports, not default exports, for non-component modules. Default exports are fine for Next.js pages and layouts.
- File naming: `kebab-case` for filenames, `PascalCase` for component identifiers, `camelCase` for functions and variables.
- Imports: use the `@/` path alias (configured in `tsconfig.json`) for all imports within `src/`.
- No `console.log` in committed code. Use `console.error` for errors with a `[module]` prefix.

## Pull Request Process

1. Open an issue describing the contribution before opening a PR, unless the change is trivial (typo, obvious bug).
2. Branch from `main`. Name the branch `<type>/<short-description>` (e.g. `feat/agni-siddhi`, `fix/cosmos-ayanamsa`).
3. Ensure `npm run lint` and `npm run typecheck` pass.
4. If adding a siddhi, manuscript, or knowledge archive entry, include the new seed data in the PR.
5. Update the relevant documentation in `docs/` if the change affects architecture, API, or features.
6. Open the PR with a clear description linking back to the issue.

## Caution on Content

Contributions that add practices involving ingestion, blood, fire, extended fasting, or any adversarial rite must tag the entry with the appropriate `caution_level` and must include substantial `warnings`. The maintainers reserve the right to decline contributions that do not respect the project's epistemic posture, even if technically correct.
""")


# ---------------------------------------------------------------------------
def changelog():
    write(DOCS_ROOT / "CHANGELOG.md", r"""
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

Planned changes are tracked in `docs/ROADMAP.md` and `ai-context/TASK_INDEX.md`.
""")


# ---------------------------------------------------------------------------
def roadmap():
    write(DOCS_ROOT / "ROADMAP.md", r"""
# Roadmap

The roadmap is organised into three horizons: near-term (next 1-2 development cycles), mid-term (3-6 cycles), and long-term (open-ended). Each item is framed by the problem it solves and the architectural change it implies.

## Near-Term

### 1. Runtime FTS5 Search over the Knowledge Archive

**Problem.** The Custodian currently searches only the `siddhis` and `manuscripts` tables in PostgreSQL. The 101 text chunks in the knowledge archive (with their FTS5 index) are not queryable at runtime.

**Change.** Add a `GET /api/knowledge/search?q=...` endpoint that opens the SQLite database read-only, runs an FTS5 `MATCH` query, and returns the top-k chunks with their parent document metadata. Wire the existing `Archivist` UI to also surface knowledge archive hits, clearly labelled as "primary source" results distinct from "catalogue" results.

**Effort.** Small. A few hundred lines of code. No schema changes. The FTS5 index already exists.

### 2. Diacritic Folding in the Runtime Custodian

**Problem.** The runtime Custodian in `/api/archivist` does not fold IAST diacritics, so a search for "Om" does not match "Oṃ" and a search for "Siva" does not match "Śiva".

**Change.** Add a `foldDiacritics(s: string): string` utility that maps IAST characters to their ASCII equivalents (`ṃ → m`, `ś → s`, `ṣ → s`, etc.) and apply it to both the query and the candidate field values during scoring.

**Effort.** Tiny. A single utility function and one line of change in the scoring loop.

### 3. Sitemap and Structured Data

**Problem.** The application is not well-indexed by search engines because it has no sitemap and no Schema.org structured data.

**Change.** Add a `src/app/sitemap.ts` exporting all siddhi and manuscript slugs. Add `JsonLd` components to the layout and the siddhi folio emitting `Article` and `BreadcrumbList` structured data.

**Effort.** Small. Standard Next.js sitemap pattern.

### 4. View Count Increment

**Problem.** The `view_count` column exists on `siddhis` but is never incremented.

**Change.** Add a `UPDATE siddhis SET view_count = view_count + 1 WHERE slug = ?` statement to the siddhi folio page. Display the view count on the archive browser.

**Effort.** Tiny.

## Mid-Term

### 5. Embedding-Based Semantic Retrieval

**Problem.** The Custodian (and the FTS5 index) cannot match semantically related terms. A query for "breath" will not find "prāṇa"; a query for "liberation" will not find "mokṣa".

**Change.** Add a build-time script that generates an embedding for each of the 101 chunks using a local or hosted embedding model (OpenAI `text-embedding-3-small`, Cohere `embed-v3`, or a local `bge-small` model). Store the embeddings in `knowledge/embeddings/<doc-slug>.jsonl`. Add a `GET /api/knowledge/semantic-search?q=...` endpoint that embeds the query, computes cosine similarity against the stored embeddings, and returns the top-k chunks. Use `sqlite-vec` for in-process vector search or `pgvector` if the embeddings are loaded into Postgres.

**Effort.** Medium. New build step, new endpoint, new dependency on an embedding model.

### 6. Authentication and Moderated Write Side

**Problem.** The reflections endpoint is unauthenticated and pen-name only. There is no way for trusted scholars to add or edit corpus entries through the UI.

**Change.** Add magic-link or OAuth authentication (NextAuth.js or Lucia). Distinguish three roles: anonymous (read-only), authenticated reader (can post reflections under a verified identity), and scholar (can propose siddhi / manuscript edits through a moderation queue). The moderation queue is a new `pending_edits` table.

**Effort.** Large. New auth dependency, new schema, new UI flows, new moderation tooling.

### 7. Multi-Language UI

**Problem.** The UI is English-first. Sanskrit readers, Hindi readers, and other language communities cannot navigate in their preferred language.

**Change.** Adopt `next-intl` or a similar i18n framework. Extract all UI strings into message catalogs. Add Hindi and Sanskrit message catalogs (English remains the fallback). The corpus content itself stays in its original language; only the chrome is translated.

**Effort.** Medium. Mostly mechanical string extraction; the harder part is the translation work.

### 8. Yantra Gallery with IIIF

**Problem.** The `yantra` field on siddhis is a JSONB object with textual descriptions only. There is no visual gallery.

**Change.** Add a `/yantra/[slug]` route that renders high-resolution yantra images using the IIIF Image API. Store image manifests in `public/iiif/`. Use a IIIF viewer (Mirador, OpenSeadragon) for pan/zoom.

**Effort.** Medium. Requires sourcing or commissioning yantra images; the IIIF integration itself is straightforward.

## Long-Term

### 9. Cross-Tradition Citation Graph

**Problem.** The `evidence_sources` table links evidence to siddhis but does not model the relationships *between* sources (e.g. "this commentary cites that primary text").

**Change.** Add a `citation_edges` table `(source_id, target_id, kind)` modelling citation relationships. Render an interactive citation graph on a new `/graph` route using a force-directed layout.

**Effort.** Large. New schema, new graph rendering, substantial data modelling.

### 10. Offline-First PWA

**Problem.** The application requires a network connection. Readers in low-connectivity environments cannot access the archive.

**Change.** Convert the application to a Progressive Web App with a service worker that caches the read-only corpus (siddhis, manuscripts, schools) on first visit. The reflections endpoint becomes a queued write that syncs when connectivity returns.

**Effort.** Large. PWA patterns, conflict resolution, cache invalidation.

### 11. Editorial Workflow for Corpus Updates

**Problem.** Updating the corpus requires editing `archive-data.ts` and deploying. This is fine for a small team but does not scale to multiple scholarly contributors.

**Change.** Move the seed corpus from `archive-data.ts` into the database (with a one-time migration). Build a scholar-facing admin UI for proposing, reviewing, and merging corpus edits. Version every edit; support diffs and rollbacks.

**Effort.** Very large. This is essentially a content management system.

## Explicitly Rejected

The following are explicitly *not* on the roadmap, to preserve the project's epistemic posture:

- **LLM-generated answers.** The Custodian will continue to return ranked pointers, not synthesised prose. An LLM that paraphrased the corpus would risk smoothing over the editorial / source distinction and presenting prescription as fact.
- **Practice recommendations.** The project will not recommend practices to readers based on their stated goals, symptoms, or horoscope. This crosses from scholarship into prescription.
- **Social features.** No following, no feeds, no public profiles. The reflections table is the only social-adjacent feature, and it remains pen-name only and unauthenticated.
- **Monetisation.** No paid tier, no premium content, no advertisements. The project is heritage preservation, not a business.
""")


# ---------------------------------------------------------------------------
# AI Context files
# ---------------------------------------------------------------------------

def ai_context():
    write(AI_CTX_ROOT / "AI_CONTEXT.md", r"""
# AI Context — Read This First

This file is the persistent context any AI agent (Arena, Claude, Gemini, Codex, or a human reviewer) should load before working on AstroKalki. It is the shortest accurate summary of the project.

## What This Project Is

AstroKalki is a Next.js 16 + TypeScript + PostgreSQL (Drizzle ORM) application that catalogues Indic contemplative heritage — siddhis, manuscripts, schools, lineages, and real-time cosmology — with a deliberately scholarly, non-prescriptive posture. The repository you are reading is the **Arena-ready export**: source code plus a complete documentation suite plus a structured offline knowledge archive of four Tantra PDFs.

## The Single Most Important Principle

**The project catalogues and points; it does not prescribe.** Every contribution, every refactor, every new feature must preserve this. Do not add recommendation logic, do not synthesise answers from the corpus, do not remove the `warnings` field from any siddhi, do not collapse the `description` (editorial) and `evidence_sources` (citations) distinction.

## Tech Stack in One Line

Next.js 16 (App Router, `force-dynamic`) · React 19 · TypeScript 5.9 strict · Drizzle ORM 0.45 · `pg` 8.20 · PostgreSQL 14+ · Tailwind CSS v4 · Cormorant Garamond + Crimson Text.

## Where Things Live

| If you need to...                  | Look at...                                          |
|------------------------------------|-----------------------------------------------------|
| Understand the schema              | `src/db/schema.ts` (source of truth) + `src/lib/bootstrap.ts` (mirror) |
| Add a siddhi                       | `src/lib/archive-data.ts` → `SIDDHI_SEED`           |
| Add a manuscript                   | `src/lib/archive-data.ts` → `MANUSCRIPT_SEED`       |
| Add a Tantra PDF                   | Drop in `knowledge/tantra/`, add entry to `scripts/build_knowledge_archive.py`, run it |
| Change a route                     | `src/app/<route>/page.tsx`                          |
| Change an API                      | `src/app/api/<name>/route.ts`                       |
| Change the design system           | `src/app/globals.css`                               |
| Understand the cosmology math      | `src/lib/cosmology.ts`                              |
| Understand the search ranking      | `src/app/api/archivist/route.ts`                    |
| Query the offline knowledge base   | `knowledge/sqlite/knowledge.db` (FTS5)              |

## The Two Things That Surprise People

1. **The schema is defined twice.** `src/db/schema.ts` is the Drizzle source of truth; `src/lib/bootstrap.ts` mirrors it as raw SQL so the app self-heals against a fresh database. If you change one, change the other. This is documented in `CONTRIBUTING.md`.

2. **The cosmology is real-time but not ephemeris-grade.** `/cosmos` computes planetary longitudes from first-principles Keplerian elements on every request. The accuracy is contemplative (within a few degrees of JPL for the inner planets). Do not "fix" it to be more accurate without discussing the tradeoff — the simplicity is intentional.

## Content Caution

Two of the four Tantra PDFs (`Agni Māraṇa Tantra`, `Vīrudha-Āhāra Māraṇa`) describe adversarial rites and are tagged `caution_level: high`. They are preserved for scholarly reasons. Do not surface them through the main browsing UI. Do not synthesise their content into the Custodian's responses. Any retrieval pipeline that touches the knowledge archive must respect the `caution_level` field.

## How to Make Changes

1. Read the relevant file in `docs/` (ARCHITECTURE for structure, DATABASE for schema, API_REFERENCE for endpoints, COMPONENT_GUIDE for UI, KNOWLEDGE_ARCHIVE for the offline archive).
2. Make the change. Run `npm run lint` and `npm run typecheck`.
3. If you changed the schema, update *both* `src/db/schema.ts` and `src/lib/bootstrap.ts`.
4. If you added a siddhi or manuscript, add seed data to `src/lib/archive-data.ts`.
5. If you added a Tantra PDF, update `scripts/build_knowledge_archive.py` and re-run it.
6. Update the relevant doc in `docs/` if the change is user-visible or architecturally significant.

## What Not to Do

- Do not add an LLM that synthesises answers from the corpus.
- Do not add user accounts without reading `docs/ROADMAP.md` (auth is planned but not yet designed).
- Do not commit `.env` or any file containing a live `DATABASE_URL`.
- Do not remove the `force-dynamic` directive from data-fetching routes without discussing the caching implications.
- Do not change the design system's palette or typography without explicit instruction.
- Do not add analytics, tracking, or third-party scripts.

## Pointers to Deeper Context

- `docs/PROJECT_OVERVIEW.md` — the seven pillars and the project's stance
- `docs/ARCHITECTURE.md` — layer-by-layer architecture and request lifecycle
- `docs/SYSTEM_DESIGN.md` — design principles, epistemic framing, safety posture
- `ai-context/PROJECT_MEMORY.md` — decisions log and rationale for non-obvious choices
- `ai-context/CODING_STANDARDS.md` — style and naming rules
- `ai-context/PROMPT_GUIDE.md` — how to prompt AI agents working on this codebase
""")


def project_memory():
    write(AI_CTX_ROOT / "PROJECT_MEMORY.md", r"""
# Project Memory

This file is the long-term memory of the AstroKalki project. It records decisions that were made, why they were made, and what the alternatives were. New contributors (human or AI) should read this before proposing changes that might revisit a settled decision.

## Decision: Duplicate the schema in `bootstrap.ts`

**Decision.** The Drizzle schema in `src/db/schema.ts` is mirrored as raw SQL `CREATE TABLE IF NOT EXISTS` statements in `src/lib/bootstrap.ts`.

**Why.** The application must boot against an empty database and produce a working archive without requiring a separate migration step. Drizzle's `push` is fine for development but introduces an operational dependency for first-boot scenarios. The bootstrap makes the app self-healing.

**Tradeoff.** Any schema change must be made in two places. This is documented in `CONTRIBUTING.md`. The alternative (single source of truth in Drizzle, no bootstrap) was rejected because it would require a separate migration step on every fresh provision, which is fragile for a heritage project that may be re-deployed infrequently.

## Decision: `force-dynamic` on every data-fetching route

**Decision.** Every page and API route that reads from the database is marked `export const dynamic = "force-dynamic"`.

**Why.** The project's principle of "real-time over cached" (see `SYSTEM_DESIGN.md`) requires that every request hits the database. This is acceptable for a heritage project with modest traffic. The alternative (ISR with `revalidate: 3600`) was rejected because it would make the `/cosmos` route serve stale planetary positions, which defeats the point of computing them live.

**Tradeoff.** No static generation means higher per-request latency and database load. If throughput becomes a concern, the read-heavy corpus routes (homepage, archive, manuscripts, schools) can be switched to `revalidate: 3600` while keeping `force-dynamic` on `/cosmos` and `/api/archivist`.

## Decision: No LLM in the Custodian

**Decision.** The Custodian is a weighted multi-field text-search algorithm, not a language model. It returns ranked pointers to catalogue entries, not synthesised prose.

**Why.** The project's epistemic posture requires that the archive catalogue and point, not prescribe. An LLM that synthesised answers would risk hallucinating citations, smoothing over the editorial / source distinction, and presenting prescription as fact. The pointer-only contract is enforceable in code; the synthesised-answer contract is not.

**Tradeoff.** The Custodian cannot answer questions like "what is the significance of Om?" in prose. It can only point to the `pranava-japa` siddhi folio. This is a feature, not a bug. Future RAG work (see `ROADMAP.md`) will add embedding-based retrieval but will preserve the pointer-only output contract.

## Decision: SQLite FTS5 for the knowledge archive, not pgvector

**Decision.** The offline knowledge archive uses a SQLite FTS5 database at `knowledge/sqlite/knowledge.db`, not a Postgres `pgvector` extension.

**Why.** The knowledge archive is a build-time artefact that travels with the repository. SQLite is a single file with no server dependency, which makes the archive portable and inspectable. `pgvector` would require a Postgres extension that may not be available on all hosting providers.

**Tradeoff.** The FTS5 index is keyword-based, not semantic. Embedding-based retrieval is future work and may use either `sqlite-vec` (keeping the archive portable) or `pgvector` (moving to the runtime database). The choice will be made when the embedding pipeline is built.

## Decision: No authentication

**Decision.** The application has no user accounts. The reflections endpoint is unauthenticated and pen-name only.

**Why.** Adding auth before the corpus is stable would lock in a user model that may not fit the eventual scholarly-moderation workflow (see `ROADMAP.md` item 6). The current pen-name-only reflections table is a placeholder that lets the UI demonstrate the write path without committing to an identity model.

**Tradeoff.** The reflections endpoint is an abuse vector. For production deployment, add IP-based rate limiting at the edge. Full auth is documented as mid-term roadmap work.

## Decision: Self-healing DDL over migration files

**Decision.** The project uses `drizzle-kit push` for schema changes, supplemented by self-healing DDL in `bootstrap.ts`. It does not use `drizzle-kit generate` to produce migration files.

**Why.** Migration files are an audit artefact useful for multi-environment deployments with strict change management. AstroKalki is a single-deployment heritage project where the audit value is low and the operational complexity of migration files is high.

**Tradeoff.** No migration history. If the project ever needs to deploy to multiple environments with different schema versions, switch to `drizzle-kit generate` and check the migration files into the repository.

## Decision: Cormorant Garamond + Crimson Text, not Inter or Geist

**Decision.** The design system uses Cormorant Garamond for display text and Crimson Text for body text, loaded via `next/font/google`.

**Why.** The project's museum-grade posture calls for a serif typographic register. Inter and Geist are excellent sans-serif choices for product UI but read as "software" rather than "library." Cormorant Garamond has the editorial weight the project needs; Crimson Text is a matching body serif with good screen readability.

**Tradeoff.** Sans-serif utility text (UI labels, badges) uses the system sans-serif stack, which is a slight typographic inconsistency. This is acceptable.

## Decision: Knowledge archive is offline-only, not wired into the runtime

**Decision.** The `knowledge/` directory is a build-time artefact. The Next.js runtime does not read from it. The Custodian searches only the PostgreSQL `siddhis` and `manuscripts` tables.

**Why.** Wiring the FTS5 index into the runtime requires a new endpoint, new error handling, and new UI for surfacing "primary source" results distinct from "catalogue" results. Doing this well is a near-term roadmap item (item 1), not something to rush in the initial export.

**Tradeoff.** The Custodian is currently less useful than it could be. The fix is documented and scheduled.

## Decision: No automated tests

**Decision.** The project has no unit tests, integration tests, or end-to-end tests. It relies on TypeScript strict mode and ESLint for correctness guarantees.

**Why.** The corpus is small and stable. The architecture is simple (one Next.js process, one database, no external services). The cost of writing and maintaining tests was judged higher than the cost of the bugs they would catch at this stage.

**Tradeoff.** Regressions in the cosmology math, the search ranking, or the bootstrap SQL would not be caught automatically. If the project grows, add tests starting with the cosmology engine (which is pure-function and easy to test) and the bootstrap SQL (which should be tested against a fresh Postgres instance).
""")


def coding_standards():
    write(AI_CTX_ROOT / "CODING_STANDARDS.md", r"""
# Coding Standards

These standards apply to all code committed to AstroKalki. They are enforced by ESLint and TypeScript strict mode where possible, and by code review where not.

## TypeScript

- **Strict mode is on.** `strict: true` in `tsconfig.json`. No `any` without a `// eslint-disable-next-line` comment justifying it.
- **Prefer types over interfaces** for object shapes. Use interfaces only when you need declaration merging or extension.
- **Prefer `unknown` over `any`** for values whose type you cannot statically determine. Narrow with type guards.
- **No non-null assertion (`!`)** without a comment. If you must use it, explain why the value cannot be null.
- **Use `as const`** for literal-valued constants.

## Imports

- Use the `@/` path alias for all imports within `src/`. Configure in `tsconfig.json`.
- Order: external packages, then `@/` imports, then relative imports. Within each group, alphabetical.
- No barrel files. Import from the specific module.
- Default exports are fine for Next.js pages and layouts. Named exports for everything else.

## Naming

- **Files:** `kebab-case` for non-component files (`archive-data.ts`), `PascalCase` for component files (`SiddhiFolio.tsx`).
- **Components:** `PascalCase` (`SiddhiFolio`, `CosmosPanel`).
- **Functions and variables:** `camelCase` (`ensureArchiveSeeded`, `textChars`).
- **Types and interfaces:** `PascalCase` (`SiddhiSeed`, `PreSadhnaStep`).
- **Constants:** `UPPER_SNAKE_CASE` for module-level constants (`SIDDHI_SEED`), `camelCase` for local constants.
- **Database columns:** `snake_case` (Drizzle maps these to TypeScript `camelCase` via the `serial("id")` pattern).

## React

- **Server components by default.** Mark `"use client"` only when the component uses hooks, browser APIs, or event handlers.
- **No `useEffect` for data fetching.** Use server components for initial data; use `fetch` from a client `useEffect` only for genuinely client-side refreshes (e.g. `/cosmos` polling).
- **Prefer composition over inheritance.** No class components.
- **Props are typed.** No `React.PropsWithChildren<any>`. Define the props interface explicitly.
- **No inline styles** unless the value is dynamic (e.g. SVG sizes computed from data). Use Tailwind classes for static styling.

## Tailwind CSS v4

- The design system is defined in `src/app/globals.css` under `@theme`. Use the CSS variables (`--color-obsidian`, `--color-gold`, etc.) via Tailwind's arbitrary value syntax (`text-[var(--color-gold)]`).
- Do not introduce new colors outside the `@theme` block. If you need a new color, add it to `@theme` first.
- Use the design system's spacing rhythm. The `content-z`, `folio-card`, `btn-gold`, `btn-ghost`, `badge`, and `tracking-luxe` utility classes are defined in `globals.css`; prefer them over inline equivalents.
- No `@apply` in component files. All `@apply` rules live in `globals.css`.

## Database

- All schema changes go in `src/db/schema.ts` *and* `src/lib/bootstrap.ts`. Both files must be updated in the same commit.
- Use Drizzle's typed table builders (`pgTable`, `serial`, `text`, etc.). Do not write raw SQL in `schema.ts`.
- The bootstrap SQL uses `CREATE TABLE IF NOT EXISTS` and `INSERT ... ON CONFLICT (slug) DO NOTHING`. Preserve this idempotency.
- Indexes are defined in `schema.ts` via the table builder's third argument. Mirror them in the bootstrap SQL.
- No migrations. Use `drizzle-kit push` for local development and let the bootstrap handle fresh provisions.

## API Routes

- Every API route is in `src/app/api/<name>/route.ts`.
- Every API route exports `export const dynamic = "force-dynamic"`.
- Use `Response.json()` for responses. Set explicit status codes.
- Catch all exceptions in a `try/catch`. Log to `console.error` with a `[<route-name>]` prefix. Return a 500 with a user-friendly message.
- No middleware for auth (none exists). If you add middleware, document it in `docs/ARCHITECTURE.md`.

## Components

- Components belong in `src/components/`. No nested component directories unless there is a clear sub-grouping need.
- Each component file exports one default component (or one named hook, for hooks). No multi-export files.
- Document each component's props in `docs/COMPONENT_GUIDE.md` when adding a new component.

## Files

- No `console.log` in committed code. Use `console.error` for errors with a `[module]` prefix.
- No commented-out code. Delete it; git remembers.
- No `TODO` without a linked issue. Use `// TODO(#123): ...` format.
- File headers are optional but encouraged for non-trivial modules. One line describing the module's purpose.

## Git

- Branch names: `<type>/<short-description>` (e.g. `feat/agni-siddhi`, `fix/cosmos-ayanamsa`, `docs/api-reference`).
- Commit messages: imperative mood, ≤ 72 characters for the subject line, blank line, then a body explaining *why* (not *what*).
- No direct commits to `main`. Open a PR.
- Squash merges are preferred for small PRs. Merge commits are fine for PRs that touch multiple concerns.

## What Will Be Rejected in Code Review

- Any change that adds prescription logic (recommending practices based on user input).
- Any change that removes the `warnings` field from a siddhi or softens its prominence in the UI.
- Any change that collapses the `description` / `evidence_sources` distinction.
- Any change that surfaces `caution_level: high` knowledge archive content through the main browsing UI.
- Any change that adds an LLM-generated answer feature.
- Any schema change that updates `schema.ts` without updating `bootstrap.ts`.
- Any commit that includes `.env` or a live `DATABASE_URL`.
- Any `any` type without a justifying comment.
""")


def prompt_guide():
    write(AI_CTX_ROOT / "PROMPT_GUIDE.md", r"""
# Prompt Guide

This file documents how to prompt AI agents (Arena, Claude, Gemini, Codex, or any future agent) working on the AstroKalki codebase. The goal is to get useful, on-posture output on the first try.

## The One Thing to Always Say

When prompting an AI agent about AstroKalki, always include this sentence in the prompt:

> AstroKalki catalogues and points; it does not prescribe. Preserve the separation of editorial description from source citations. Do not add recommendation logic or LLM-generated answers.

This single sentence prevents the most common failure mode: an agent that "helpfully" adds a recommendation engine, synthesises prose from the corpus, or collapses the `description` / `evidence_sources` distinction.

## Effective Prompt Patterns

### "Read X, then do Y"

Always point the agent at the relevant doc first. The docs are written for AI consumption — they are explicit about contracts, tradeoffs, and constraints.

> Read `docs/DATABASE.md` and `ai-context/PROJECT_MEMORY.md`, then add a new `view_count` increment to the siddhi folio page. The increment should be a single `UPDATE siddhis SET view_count = view_count + 1 WHERE slug = ?` statement. Do not change the schema. Update `docs/FEATURES.md` to mark view-count increment as shipped.

### "Here is the contract; here is the change"

State the existing contract, then the change, so the agent knows what to preserve.

> The Custodian endpoint at `src/app/api/archivist/route.ts` accepts `{ query: string }` and returns `{ results: Candidate[], note: string }`. The `note` field always ends with "scholarly pointers, not prescriptions". Add diacritic folding to the search: define a `foldDiacritics(s: string): string` utility that maps IAST characters (ṃ, ṅ, ñ, ṭ, ḍ, ṇ, ś, ṣ, ḥ, ā, ī, ū, ṛ) to their ASCII equivalents, and apply it to both the query and the candidate field values during scoring. Do not change the response shape. Do not change the weights. Do not change the `note` template.

### "Explain before coding"

For non-trivial changes, ask the agent to explain its plan first. This catches misunderstandings before code is written.

> I want to add a `/api/knowledge/search` endpoint that queries the SQLite FTS5 index at `knowledge/sqlite/knowledge.db`. Before writing code, explain: (1) how the endpoint will open the database read-only, (2) what the query syntax will be, (3) how it will handle diacritics, (4) what the response shape will be, (5) what the error handling will look like. Reference `docs/KNOWLEDGE_ARCHIVE.md` and `docs/AI_SYSTEM.md`.

## Anti-Patterns to Avoid

### "Make the Custodian better"

Too vague. The agent will guess what "better" means and likely add an LLM, change the ranking weights, or rewrite the UI. Always specify the dimension of improvement (latency, recall, diacritic handling, etc.).

### "Add user accounts"

Too big. The agent will guess the auth model, the user schema, the role system, and the UI. Break it down: "Read `docs/ROADMAP.md` item 6. Propose a schema for a `pending_edits` moderation-queue table. Do not write code yet."

### "Fix the cosmos route"

Too ambiguous. The cosmos route works as designed; its accuracy is contemplative by intent. If you want higher accuracy, say so explicitly: "The `/cosmos` route uses Paul Schlyter's simplified Keplerian elements. I want to replace the sun and moon computations with JPL DE440 ephemeris data. Propose an approach that preserves the current `CosmosPanel` component contract."

## Prompting for Documentation Work

When asking an agent to write or update docs, point it at the existing doc style:

> Read `docs/ARCHITECTURE.md` for style. Then write `docs/RETRIEVAL.md` documenting the proposed `/api/knowledge/search` endpoint. Follow the same section structure: overview, contract, algorithm, limitations, future direction. Use the same tone (declarative, no marketing language).

## Prompting for Content Additions

When asking an agent to add a siddhi or manuscript, point it at the seed file and the editorial standards:

> Read `src/lib/archive-data.ts` to understand the `SiddhiSeed` interface and the existing entries. Read `docs/CONTRIBUTING.md` for editorial standards. Then add a new siddhi entry for "Nāḍī Śuddhi" (alternate-nostril breath purification). The `authenticityScore` must reflect textual attestation in the Haṭha Yoga Pradīpikā and the Śiva Saṃhitā, not perceived efficacy. Include at least three `evidence_sources` entries.

## Prompting for Refactors

When asking an agent to refactor, name the constraint that the refactor must preserve:

> The `bootstrap.ts` module mirrors `schema.ts` as raw SQL. Refactor `bootstrap.ts` to reduce duplication: extract a helper that generates the `CREATE TABLE IF NOT EXISTS` and `INSERT ... ON CONFLICT DO NOTHING` statements from a table descriptor. The refactor must preserve idempotency and must not change the SQL that hits the database. The new helper must be used by both the siddhis and manuscripts seed blocks.

## When the Agent Gets It Wrong

If the agent produces output that violates the project's posture (prescription logic, LLM synthesis, removed warnings, surfaced high-caution content), do not iterate on the output. Re-prompt with a more explicit constraint and reference the relevant doc. The docs are the source of truth; the agent's first guess is not.
""")


def task_index():
    write(AI_CTX_ROOT / "TASK_INDEX.md", r"""
# Task Index

This file catalogues in-progress and planned tasks for AstroKalki. It is the AI agent's task queue. Each task has an ID, a status, a description, and pointers to the relevant docs.

## Statuses

- **proposed** — written down, not yet started
- **in-progress** — actively being worked on
- **blocked** — waiting on a dependency
- **done** — complete

## Near-Term Tasks

### T-001 — Runtime FTS5 search over the knowledge archive

- **Status:** proposed
- **Priority:** high
- **Description:** Add a `GET /api/knowledge/search?q=...&limit=...` endpoint that opens `knowledge/sqlite/knowledge.db` read-only, runs an FTS5 `MATCH` query against the `chunks` table, and returns the top-k chunks with their parent document metadata. The response shape should be `{ results: Chunk[], note: string }` where `note` is a templated summary consistent with the Custodian's pointer-only posture. Update `docs/API_REFERENCE.md` and `docs/FEATURES.md`.
- **Depends on:** nothing (the FTS5 index already exists).
- **References:** `docs/KNOWLEDGE_ARCHIVE.md`, `docs/AI_SYSTEM.md`, `docs/ROADMAP.md` item 1.

### T-002 — Diacritic folding in the runtime Custodian

- **Status:** proposed
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
""")


def dependencies():
    write(AI_CTX_ROOT / "DEPENDENCIES.md", r"""
# Dependencies

Every direct dependency in `package.json`, what it does, why it is here, and whether it can be removed or replaced.

## Runtime Dependencies

### `next` 16.2.6

The Next.js framework — App Router, server components, API routes, font optimisation. The entire application is built on this. Non-negotiable.

### `react` 19.2.6 and `react-dom` 19.2.6

The UI runtime. Required by Next.js 16. Pinned to 19.x for concurrent features and the new JSX transform.

### `drizzle-orm` 0.45.2

The ORM. Provides typed query builders for PostgreSQL. Chosen over Prisma for its lighter weight, its compatibility with raw SQL when needed, and its first-class support for the `pg` driver. The schema is defined in `src/db/schema.ts`.

### `pg` 8.20.0

The PostgreSQL driver. Used by Drizzle under the hood. The connection pool is constructed in `src/db/index.ts`.

### `dotenv` 17.3.1

Loads `.env` into `process.env`. Used by `drizzle.config.json` and by the application at boot. Could be replaced by Node 20+'s native `--env-file` flag if desired.

## Dev Dependencies

### `typescript` 5.9.3

The TypeScript compiler. Strict mode is on.

### `@types/node` 22.19.15, `@types/react` 19.2.14, `@types/react-dom` 19.2.3, `@types/pg` 8.18.0

Type definitions for the runtime libraries.

### `tailwindcss` 4.1.17 and `@tailwindcss/postcss` 4.1.17

Tailwind CSS v4 and its PostCSS plugin. The design system is defined in `src/app/globals.css` under `@theme`.

### `postcss` 8.5.8

The CSS transformer. Required by Tailwind v4.

### `drizzle-kit` 0.31.10

The Drizzle CLI. Used for `drizzle-kit push` (schema application) and `drizzle-kit studio` (database inspection). Not required at runtime.

### `eslint` 9.39.4 and `eslint-config-next` 16.2.6

Linting. `eslint-config-next` provides the Next.js recommended ruleset. Configured in `eslint.config.mjs`.

## Why No Testing Library

There are no test dependencies because there are no tests (see `PROJECT_MEMORY.md`). If tests are added, the natural starting set is `vitest` (for unit tests of `cosmology.ts` and the search ranking) and `playwright` (for end-to-end tests of the read-only routes).

## Why No Auth Library

There is no auth library because there is no auth (see `PROJECT_MEMORY.md`). When auth is added (roadmap item 6), the choice is between NextAuth.js (now Auth.js, larger ecosystem) and Lucia (smaller, more flexible). Decide at that point.

## Why No State Management Library

There is no Redux, Zustand, Jotai, or similar. The application's state is small enough to be managed by React's built-in `useState` and `useEffect`. The only cross-component state is the epistemic lens, which is persisted in localStorage via the `useEpistemicLens` hook.

## Why No UI Component Library

There is no shadcn/ui, no Radix, no Material UI. The components are hand-written because the design system is bespoke (museum-grade obsidian/gold/ivory) and because the component count is small (13). Adding a component library would impose its own design tokens and break the visual consistency.

## Lockfile

`package-lock.json` is not included in this export to keep the file count small. Run `npm install` to regenerate it. If reproducible installs matter, check `package-lock.json` into the repository after the first `npm install`.

## Python Dependencies (Knowledge Archive Build Only)

The `scripts/build_knowledge_archive.py` script uses `pdfplumber`, `pypdf`, and `pdfminer.six` for PDF text extraction. These are not Node dependencies and are not listed in `package.json`. Install them with `pip install pdfplumber pypdf pdfminer.six`. The script tries `pdfplumber` first, then `pypdf`, then `pdfminer` — if any one is missing, the others are tried automatically.
""")


# ---------------------------------------------------------------------------
# .env.example, MANIFEST.json, project_tree.txt
# ---------------------------------------------------------------------------

def env_example():
    write(EXPORT_ROOT / ".env.example", r"""
# AstroKalki — Environment Variables
# Copy this file to `.env` and fill in real values.
# NEVER commit the real `.env` file.

# PostgreSQL connection string. Required.
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL=postgresql://user:password@localhost:5432/astrokalki

# Optional: disable Next.js telemetry in production
# NEXT_TELEMETRY_DISABLED=1

# Optional: override the default port (3000)
# PORT=3000
""")


def manifest():
    manifest_data = {
        "name": "AstroKalki — The Living Archive",
        "version": "1.0.0",
        "description": "Arena-ready export of the AstroKalki project: a museum-grade digital archive of Indic contemplative heritage.",
        "generated_at": "2026-07-06",
        "stack": {
            "framework": "Next.js 16.2.6",
            "language": "TypeScript 5.9.3",
            "runtime": "React 19.2.6",
            "database": "PostgreSQL 14+ via Drizzle ORM 0.45",
            "styling": "Tailwind CSS v4",
            "fonts": ["Cormorant Garamond", "Crimson Text"]
        },
        "structure": {
            "src/app": "Next.js App Router pages and API routes",
            "src/components": "13 React components",
            "src/db": "Drizzle schema and connection",
            "src/lib": "Domain logic (cosmology, lineage, archive seed, bootstrap)",
            "docs": "14 documentation files",
            "ai-context": "6 AI-context files",
            "knowledge": "Offline Tantra knowledge archive with FTS5 index",
            "scripts": "Build utilities"
        },
        "routes": [
            {"path": "/", "type": "page", "description": "Home with seven-pillar grid and constellation"},
            {"path": "/archive", "type": "page", "description": "Browse all siddhis"},
            {"path": "/archivist", "type": "page", "description": "The Custodian search UI"},
            {"path": "/comparative", "type": "page", "description": "5-tradition comparative matrix"},
            {"path": "/cosmos", "type": "page", "description": "Real-time planetary longitudes"},
            {"path": "/journey", "type": "page", "description": "Curated reading journey"},
            {"path": "/lineage", "type": "page", "description": "Transmission maps"},
            {"path": "/manuscripts", "type": "page", "description": "Codex Library"},
            {"path": "/safety", "type": "page", "description": "Reader safety and epistemic framing"},
            {"path": "/schools", "type": "page", "description": "Schools of thought"},
            {"path": "/siddhi/[slug]", "type": "page", "description": "Per-practice deep folio"},
            {"path": "/api/archivist", "type": "api", "methods": ["POST"], "description": "The Custodian weighted multi-field search"},
            {"path": "/api/health", "type": "api", "methods": ["GET"], "description": "Liveness probe"},
            {"path": "/api/reflections", "type": "api", "methods": ["GET", "POST"], "description": "Reader reflections (pen-name only)"}
        ],
        "database_tables": ["siddhis", "manuscripts", "schools", "evidence_sources", "reflections"],
        "knowledge_archive": {
            "documents": 4,
            "chunks": 101,
            "caution_levels": {"high": 2, "moderate": 2},
            "fts_index": "knowledge/sqlite/knowledge.db"
        },
        "documentation": [
            "README.md",
            "docs/PROJECT_OVERVIEW.md",
            "docs/ARCHITECTURE.md",
            "docs/SYSTEM_DESIGN.md",
            "docs/FEATURES.md",
            "docs/DATABASE.md",
            "docs/API_REFERENCE.md",
            "docs/COMPONENT_GUIDE.md",
            "docs/AI_SYSTEM.md",
            "docs/KNOWLEDGE_ARCHIVE.md",
            "docs/DEPLOYMENT.md",
            "docs/CONTRIBUTING.md",
            "docs/CHANGELOG.md",
            "docs/ROADMAP.md",
            "ai-context/AI_CONTEXT.md",
            "ai-context/PROJECT_MEMORY.md",
            "ai-context/CODING_STANDARDS.md",
            "ai-context/PROMPT_GUIDE.md",
            "ai-context/TASK_INDEX.md",
            "ai-context/DEPENDENCIES.md"
        ],
        "arena_compatibility": {
            "accepted_formats": ["text/markdown", "application/json", "text/javascript", "text/css", "text/html", "application/pdf", "image/png", "image/jpeg"],
            "note": "All source files are in Arena-accepted formats. The 4 Tantra PDFs are PDF. Documentation is Markdown. Source is TypeScript/TSX. No ZIP uploads required."
        }
    }
    (EXPORT_ROOT / "MANIFEST.json").write_text(
        json.dumps(manifest_data, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"  wrote MANIFEST.json")


def project_tree():
    try:
        result = subprocess.run(
            ["find", ".", "-not", "-path", "*/node_modules/*", "-not", "-path", "*/.git/*"],
            cwd=str(EXPORT_ROOT),
            capture_output=True, text=True, check=True
        )
        lines = sorted(result.stdout.strip().split("\n"))
        tree = "# AstroKalki — Project Tree\n\nGenerated 2026-07-06. Excludes node_modules and .git.\n\n```\n" + "\n".join(lines) + "\n```\n"
        (EXPORT_ROOT / "project_tree.txt").write_text(tree, encoding="utf-8")
        print("  wrote project_tree.txt")
    except Exception as e:
        print(f"  ! project_tree failed: {e}")


# ---------------------------------------------------------------------------
def main():
    print("Generating documentation suite...")
    readme()
    project_overview()
    architecture()
    system_design()
    features()
    database()
    api_reference()
    component_guide()
    ai_system()
    knowledge_archive_doc()
    deployment()
    contributing()
    changelog()
    roadmap()
    print("\nGenerating AI context files...")
    ai_context()
    project_memory()
    coding_standards()
    prompt_guide()
    task_index()
    dependencies()
    print("\nGenerating config and manifest...")
    env_example()
    manifest()
    project_tree()
    print("\nDone.")


if __name__ == "__main__":
    main()
