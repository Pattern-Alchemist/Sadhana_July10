# Sprint 7: Search & RAG Depth — Complete

## Overview

Sprint 7 implements the "Search & RAG depth" tranche selected after Sprint 6:
RFC-001 Phase C (flag-gated synthesis endpoint), Roadmap T-002 diacritic
folding, the tsvector correctness port of `/api/archivist` scoring, and the
manual CI dispatch job for corpus embeddings/docs — plus verification-driven
doc hygiene.

**Delivered:** 2026-07-24
**Verified:** `pnpm lint` (0 errors) · `pnpm typecheck` strict (clean) · `pnpm test` (134 passing, 21 new)

---

## 1. RFC-001 Phase C — `/api/archivist/synthesize` (ships dark)

**Artifacts:**
- `app/api/archivist/synthesize/route.ts` — the orchestrating route handler
- `lib/archivist-synthesis.ts` — pure logic (context packing, §5.4 citation
  validator, cost estimation, rate windows) — exhaustively unit-tested
- `lib/embeddings.ts` — shared embedding/retrieval substrate (extracted from
  the semantic route per RFC §5.2 "shared helper extraction")
- `components/Archivist.tsx` — "Ask the Custodian" mode behind
  `NEXT_PUBLIC_ARCHIVIST_SYNTHESIS`
- `.env.example` — `ARCHIVIST_SYNTHESIS_ENABLED`, `OPENAI_SYNTH_MODEL`,
  `ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD`, `NEXT_PUBLIC_ARCHIVIST_SYNTHESIS`

The gate chain exactly follows the RFC's seven-layer ladder:

1. **Master flag** (`ARCHIVIST_SYNTHESIS_ENABLED`, default off) → 503 `synthesis_disabled`.
2. **Per-IP rate limit** — fixed-window 10/min, best-effort per instance → 429.
3. **Budget governor** — self-healing `archivist_cost_ledger` table
   (`month TEXT PK, usd NUMERIC(10,6)`); hard monthly ceiling
   (default **$5**), deductions = token-usage estimate × 2 safety multiplier.
   Ledger unreadable → **fail closed** (429) — never a silent unlimited endpoint.
4. **Retrieval** — shared `generateQueryEmbedding` (F1/F2) + `retrieveSemanticHits`
   top-8 pgvector cosine (F3), identical substrate to `/api/archivist/semantic`.
5. **Similarity floor** — top-hit cosine `< 0.32` → 200 refusal + raw hits (G2:
   never synthesise from model priors).
6. **Model call** — `gpt-4o-mini` (env-overridable), 20 s timeout, temperature
   0.2, max 400 output tokens. Errors → raw hits + degraded note (F6).
7. **Citation validator (§5.4)** — every emitted sentence must cite ≥1 retrieved
   `[slug]`; unknown slugs count as uncited; ≥60 % of sentences must survive or
   the answer is rejected → raw hits. `INSUFFICIENT_GROUNDING` → hard refusal.

Response contract per RFC §5.3 (`answer`, `citations[]`, `retrieved`,
`synthesis`, `cost_usd_est`); GET discovery endpoint reports the flag state and
governor settings. The zero-cost keyword route remains untouched as the
permanent fallback of last resort.

## 2. T-002 — Diacritic folding in the Custodian

- New shared `lib/iast-fold.ts` (`foldDiacritics`, `slugify`, `IAST_FOLD` map) —
  the utility previously existed only as an inline copy inside
  `tests/unit/iast-fold.test.ts`; the test now exercises the shipped module.
- `/api/archivist` JS scoring tier folds **both** the query and candidate field
  values: "Siva" now matches "Śiva", "Om" matches "Oṃ" — response shape, field
  weights and note template unchanged (per the task's constraints).

## 3. tsvector correctness port of `/api/archivist`

The FTS tier ran on `to_tsvector('english', …)` — wrong for a mixed
Sanskrit/English corpus (English stemming never applied to IAST terms, and
diacritics made "siva" miss "Śiva"). The port now uses:

- **`'simple'` config** (no stemming/stopwords — correct for bilingual corpora), and
- **`unaccent()` folded on both sides** (`to_tsvector('simple', unaccent(field))`
  @@ `websearch_to_tsquery('simple', unaccent($raw))`).

If `unaccent` is unavailable the query throws and the *folded* JS tier takes
over — matching the repo's graceful-degradation contract. Field weights (A/B/C/D
across name, mantra, category, tradition, sanskrit, summary, description) are
unchanged.

## 4. CI dispatch for corpus jobs

`ci-templates/embeddings-docs-dispatch.yml` — `workflow_dispatch`-only workflow
(Actions → "Corpus Embeddings & Docs (Manual)") with a model input and an
optional docs job; secrets `DATABASE_URL` + `OPENAI_API_KEY`. Kept as a template
because the session token lacks GitHub's `workflows` permission — activation is
one `cp` per the updated `ci-templates/README.md`.

## 5. Verified doc hygiene

- `docs/PROJECT_MAXIMIZER_REPORT.md`: Sprint 2 boxes ticked (all four verified
  shipped in-tree: layout OG/Twitter/`metadataBase`, per-route
  `generateMetadata()`, four `opengraph-image.tsx`, sitemap 24 h ISR); the
  remaining two Sprint 3 boxes ticked (this sprint).
- `docs/RFC_RAG_ARCHIVIST.md`: rollout table → Phase C **shipped dark**, with
  the eval-calibration step flagged as the last pre-flag gate.
- `ai-context/TASK_INDEX.md`: T-001 (already shipped) and T-002 (this sprint)
  marked done.

## Files Touched

| File | Change |
| --- | --- |
| `lib/archivist-synthesis.ts` | **new** — pure Phase C logic |
| `app/api/archivist/synthesize/route.ts` | **new** — synthesis endpoint |
| `lib/embeddings.ts` | **new** — shared embedding/retrieval helpers |
| `app/api/archivist/semantic/route.ts` | refactor onto `lib/embeddings.ts` (no behavior change) |
| `lib/iast-fold.ts` | **new** — shared IAST folding utility |
| `app/api/archivist/route.ts` | tsvector `'simple'` + `unaccent`; folded JS fallback |
| `components/Archivist.tsx` | "Ask the Custodian" mode (flag-gated) |
| `tests/unit/archivist-synthesis.test.ts` | **new** — 21 tests |
| `tests/unit/iast-fold.test.ts` | import from `lib/iast-fold` + 2 new cases |
| `ci-templates/embeddings-docs-dispatch.yml` | **new** — manual corpus-jobs workflow |
| `ci-templates/README.md` | activation notes for the dispatch workflow |
| `.env.example` | synthesis env vars documented |
| `docs/RFC_RAG_ARCHIVIST.md`, `docs/PROJECT_MAXIMIZER_REPORT.md`, `docs/CHANGELOG.md`, `ai-context/TASK_INDEX.md` | status/tick updates |
| `docs/SPRINT_7_COMPLETE.md` | **new** — this file |

## Verification

- `pnpm lint` — 0 errors (4 pre-existing hook warnings, unchanged)
- `pnpm typecheck` (strict) — clean
- `pnpm test` — 11 files, **134 tests passing** (113 previous + 21 new)

## Remaining pre-flag gate (by design)

Before flipping `ARCHIVIST_SYNTHESIS_ENABLED=true` on a live deployment: run
the 20-query eval set against the dark endpoint to calibrate the 0.32 refusal
floor (RFC §5.2 / §8), then confirm the deploy-pinned prices in
`lib/archivist-synthesis.ts` against the provider's current page.
