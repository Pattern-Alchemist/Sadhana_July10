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
