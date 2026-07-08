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
