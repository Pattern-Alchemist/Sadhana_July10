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
