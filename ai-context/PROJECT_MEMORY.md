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
