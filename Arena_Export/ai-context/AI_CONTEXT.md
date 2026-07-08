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
