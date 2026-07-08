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
