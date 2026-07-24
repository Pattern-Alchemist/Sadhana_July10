# RFC-001: RAG-Grounded Archivist (Moonshot 4.1)

| Field | Value |
| --- | --- |
| **Status** | Accepted — Phase A implemented; synthesizer ships flag-gated per §8 |
| **Date** | 2026-07-24 |
| **Sprint** | Sprint 5–6 (Moonshots) — item 4.1 of `PROJECT_MAXIMIZER_REPORT.md` |
| **Author** | Pattern-Alchemist / Arena agent session |
| **Affects** | `app/api/archivist/*`, `components/Archivist.tsx`, `scripts/generate_embeddings.py`, `db/schema.ts`, `docs/` |

---

## 1. Summary

The Archivist today is a **retrieval-only** system: it returns ranked pointers to
archive folios and deliberately never synthesizes practice prose (this contract is
embedded in the code: *"ranked catalogue pointers, never synthesised practice prose"* —
`app/api/archivist/semantic/route.ts`). This RFC specifies how the Archivist evolves
into a **retrieval-augmented, citation-constrained synthesis system**: natural-language
answers composed *only* from retrieved archive passages, with mandatory per-claim
citations, hard refusal when grounding is insufficient, and strict cost ceilings that
keep the project inside its austerity budget.

Scope discipline: the retrieval substrate (Phase A) is **already shipped**. This RFC's
new work is the synthesis layer, the citation validator, the cost governor, and their
rollout gates.

---

## 2. Current state (what exists in the tree today)

### 2.1 Keyword archivist — `app/api/archivist/route.ts` (POST)
Weighted SQL/text scoring over the `siddhis` corpus. No external calls, no cost, and
fully offline-compatible (results land in the SW runtime cache). This is the
**permanent fallback of last resort** for every degradation path in this RFC.

### 2.2 Semantic archivist — `app/api/archivist/semantic/route.ts` (POST)
Shipped in Sprint 3:

1. Client sends `{ "query": "<natural language>" }` (an optional raw `embedding`
   remains as a documented test/debug escape hatch only).
2. Server generates the **query embedding itself** with the OpenAI embeddings API
   (`OPENAI_EMBEDDING_MODEL`, default `text-embedding-3-small`, 1536 dims). The API
   key never leaves the server.
3. pgvector cosine retrieval:
   ```sql
   SELECT slug, name, sanskrit, category, summary,
          embedding <=> $q::vector AS distance
   FROM siddhis
   WHERE embedding IS NOT NULL
   ORDER BY embedding <=> $q::vector
   LIMIT 12;
   ```
   `<=>` is pgvector's cosine-distance operator; the app maps distance → similarity
   via `max(0, min(1, 1 - distance))` and reports it as a 0–100 score.
4. Graceful degradation with explicit error codes:
   `embedding_provider_unavailable` (503), `pgvector_unavailable` (503), generic 500 —
   each instructing callers to fall back to `/api/archivist` keyword search.

### 2.3 Corpus embedding pipeline — `scripts/generate_embeddings.py`
Build-time script (`pnpm knowledge:embed`): reads all siddhis via `DATABASE_URL`,
concatenates `name + sanskrit + summary + description + primary_mantra` per row,
calls the embeddings API in batches of 100, and writes pgvector literals into
`siddhis.embedding vector(1536)`. Requires `CREATE EXTENSION vector` on the database.
It never runs at request time.

### 2.4 UI — `components/Archivist.tsx`
"Deep search" toggle switches the client between `/api/archivist` (keyword) and
`/api/archivist/semantic` (pgvector). Both render the same *pointer card* UI.

---

## 3. Problem

Retrieval pointers alone force users to read whole folios to answer narrow questions
("which siddhis mention kechari mudra warnings?") — the exact friction the Archivist
exists to remove. But naive LLM Q&A over this corpus is dangerous:

- **Hallucinated practice guidance.** Invented mantra counts, breath ratios, or
  contraindications in a contemplative-practice context can cause real harm.
- **Source drift.** The archive's epistemic value is that every claim traces to a
  folio (and from there to a manuscript/evidence source). Synthesis must not break
  that chain.
- **Cost exposure.** An LLM-backed endpoint on a public site can burn budget quickly
  without explicit governors.

So the goal is not "add an LLM". It is "answer in natural language **without ever
speaking beyond the retrieved record**, at a predictable, capped cost".

---

## 4. Goals / Non-goals

### Goals
- G1. Natural-language answers synthesized **only** from rows retrieved in the same
  request; every answer sentence carries at least one folio citation (`/siddhi/<slug>`).
- G2. Hard refusal ("The archive does not say…") when retrieval is empty or below the
  similarity floor — never synthesize from model prior knowledge.
- G3. Seven-layer fallback ladder; `archivist` keyword search survives every failure.
- G4. Hard monthly cost ceiling enforced server-side (default **$5/month**), with the
  endpoint degrading to retrieval-only once tripped.
- G5. Zero new client-side secrets; all provider calls remain server-side.

### Non-goals
- Fine-tuning or custom embedding models (cost ≠ benefit at this corpus size).
- Cross-encoder re-ranking (revisit only if retrieval QA metrics demand it).
- Conversational multi-turn memory (each request is stateless by design — no user
  data retention, matching the project's security posture).
- Streaming responses in Phase C (deferred to Phase D).

---

## 5. Architecture

```
            ┌────────────────────────────── Phase A (shipped) ──────────────────────────────┐
            │                                                                               │
  corpus    │  scripts/generate_embeddings.py ──batch of 100──▶ siddhis.embedding vector(1536)│
            │                                                                               │
  query ────┼──▶ /api/archivist/semantic ──▶ OpenAI embed(query) ──▶ pgvector <=> top-12    │
            │                                                              │                │
            └──────────────────────────────────────────────────────────────┼────────────────┘
                                                                           ▼
            ┌──────────────── Phase C (this RFC, flag-gated) ────────────────┐
            │                  /api/archivist/synthesize                    │
            │  retrieved rows ─▶ context pack (≤8 passages, ≤150 tok each)   │
            │                        │                                      │
            │                        ▼                                      │
            │  system: "answer ONLY from the passages; cite [slug] per claim;│
            │         refuse if passages insufficient"                      │
            │                        │                                      │
            │                        ▼                                      │
            │  OPENAI_SYNTH_MODEL (default: gpt-4o-mini) ─▶ draft answer    │
            │                        │                                      │
            │                        ▼                                      │
            │  citation validator (§5.4) ──fail──▶ retrieval-only fallback  │
            │                        │ pass                                  │
            │                        ▼                                      │
            │  { answer, citations[], retrieved[], cost_usd_est }           │
            └───────────────────────────────────────────────────────────────┘
```

### 5.1 Corpus embedding flow (build-time — unchanged)
Runs release-time or via manual CI dispatch (Sprint 3 follow-up item), never at
request time. Re-embedding is content-change-triggered only; the corpus is ~55 siddhis
so a full re-run is ~25 k tokens and effectively free (§6).

### 5.2 Query-time retrieval (existing substrate — reused as-is)
The synthesis endpoint embeds the query and retrieves through the **same code path**
as `/api/archivist/semantic` (shared helper extraction planned in Phase C refactor),
but with two synthesis-specific changes:

- **Top-k = 8** (vs. 12 for search): synthesis context is tighter and cheaper; the top
  hits dominate answer quality.
- **Similarity floor `sim ≥ 0.32`** (cosine). Below the floor → G2 refusal path.
  The floor must be re-calibrated against a 20-query eval set before the flag flips on.

**Indexing.** At ~55 rows a sequential scan is already faster than any index setup.
When the corpus passes **~50 000 embedded rows**, add (pgvector ≥ 0.7):

```sql
CREATE INDEX CONCURRENTLY siddhis_embedding_hnsw_idx
  ON siddhis USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
-- query-time: SET hnsw.ef_search = 40;
```

This is deliberately **not** part of Phase C — an index nobody measures is inventory.

### 5.3 Synthesis endpoint — `POST /api/archivist/synthesize`
```jsonc
// request
{ "query": "which siddhis warn about kechari mudra?" }
// response 200
{
  "answer": "…grounded prose… [vajroli-mudra] …",
  "citations": [ { "slug": "vajroli-mudra", "url": "/siddhi/vajroli-mudra",
                   "name": "Vajroli Mudra", "score": 84 } ],
  "retrieved": 8,
  "synthesis": true,
  "cost_usd_est": 0.00037
}
// refusal 200 (insufficient grounding)
{ "answer": null, "citations": [], "retrieved": 3,
  "synthesis": false,
  "note": "The archive does not hold enough grounded material to answer that. See the closest folios below.",
  "results": [ /* raw semantic hits instead */ ] }
```

The system prompt passed to the model is fixed (versioned in `lib/archivist-synthesis.ts`):

> You are the AstroKalki Archivist. Answer the question using ONLY the numbered
> archive passages below. Cite every claim inline with the passage's slug in
> brackets, e.g. [vajroli-mudra]. If the passages do not contain the answer, reply
> exactly: `INSUFFICIENT_GROUNDING`. Never invent mantras, counts, durations,
> warnings, or ritual steps. Never address the user directly.

### 5.4 Citation validator
Deterministic post-processor between the model and the response — no second LLM call:

1. Split the draft into sentences.
2. Every sentence **must** contain ≥1 `[slug]` whose slug ∈ retrieved set.
   Sentences failing this are dropped (not regenerated).
3. If ≥60 % of sentences survive, return the survivors; otherwise treat as failure →
   retrieval-only fallback (§5.5 F6).
4. Literal `INSUFFICIENT_GROUNDING` from the model → refusal path (G2).

This gives a hard, auditable guarantee: **nothing reaches the client that is not tied
to a retrieved folio** — at zero marginal model cost.

### 5.5 Fallback safety ladder

| # | Failure | Behaviour |
| --- | --- | --- |
| F1 | `OPENAI_API_KEY` unset | `/api/archivist/semantic` → 503 `embedding_provider_unavailable` (shipped); synthesize returns 503 with keyword pointer |
| F2 | Embedding provider error/timeout (8 s) | as F1 |
| F3 | pgvector extension/column missing | 503 `pgvector_unavailable` → keyword search (shipped) |
| F4 | Empty result set | refusal + "run embeddings script" note (shipped) |
| F5 | Top similarity below 0.32 floor | G2 refusal, return raw hits |
| F6 | Model error, timeout (20 s), or validator failure | return raw hits, `synthesis: false`, `note` explains degraded mode |
| F7 | Monthly budget governor tripped | 429 `budget_exceeded`, UI silently hides the toggle until reset |

The stateless keyword route `/api/archivist` has **no** dependency on any provider and
remains the default, zero-cost path forever.

### 5.6 Cost governor — server-side, env-driven
```bash
ARCHIVIST_SYNTHESIS_ENABLED=false        # master kill switch (default off)
ARCHIVIST_SYNTH_MONTHLY_BUDGET_USD=5     # hard ceiling
```
A tiny `archivist_cost_ledger` table (phase C DDL: `month char(7) PK, usd numeric(10,6)`)
accumulates `cost_usd_est` per call. Before each synthesis the governor checks the
running month total; over-budget → F7. The estimate is computed from
response-token × output-rate + prompt-token × input-rate at deploy-pinned prices,
with a 2× safety multiplier applied to the deductible to absorb price drift (and a
comment in `.env.example` saying exactly where to update the pinned rates).

### 5.7 UI
`/archivist` gains a **"Ask the Custodian"** synthesis toggle, visible only when
`NEXT_PUBLIC_ARCHIVIST_SYNTHESIS=1`. Answers render citations as folio links; refusal
and degraded states reuse the existing pointer-card list. The base search UX never
changes.

---

## 6. Cost model (austerity budget analysis)

Units: provider list prices as of writing (2026-07). **Verify against the provider's
current pricing page before enabling the flag**; the governor's 2× multiplier (§5.6)
exists precisely to absorb drift.

### One-off / build-time
| Item | Assumption | Tokens | Model | Cost |
| --- | --- | --- | --- | --- |
| Corpus embedding | 55 siddhis × ~450 tok | ~24 750 | text-embedding-3-small @ $0.02/1M | **$0.0005** |
| Full re-embed per content release | same | ~25 000 | same | ~$0.0005/release |

### Per-query runtime
| Item | Assumption | Cost/query |
| --- | --- | --- |
| Query embedding | ~60 tok @ $0.02/1M | $0.0000012 (negligible) |
| Synthesis input | ~350 tok context pack (8 × ≤150 tok passages, truncated) + ~250 tok system | 600 tok @ $0.15/1M = $0.000090 |
| Synthesis output | ~250 tok @ $0.60/1M (gpt-4o-mini) | $0.000150 |
| **Total** | | **≈ $0.00024** |

(With the 2× governor multiplier, ledger deduction ≈ $0.00048 per call.)

### Monthly by traffic tier
| Tier | Synthesis calls/mo | Ledger deduction | vs. default $5 ceiling |
| --- | --- | --- | --- |
| Hobby | 500 | ~$0.24 | 5 % |
| Community | 10 000 | ~$4.80 | 96 % — governor engages near limit |
| Spike/abuse | >10 400 | hard-stopped at 10 400 calls | ceiling enforced by F7 |

Additional, stronger lever available from day one: **Cloudflare/Vercel edge rate
limiting** (10 req/min/IP) on `/api/archivist/synthesize`. Embedded-query costs for the
base semantic route are excluded from the governor because they are ≈ $0.012 per 10 k
queries — two orders of magnitude beneath the ceiling.

### Hard outcome
Worst-case monthly spend with the flag on: **≤ $5** (governor); with the flag off:
**$0**. The retrieval-only deployments (keyword + semantic search) stay at
≈ **$0.01–0.05/month** at community scale.

---

## 7. Safety & content policy

- The synthesizer may never introduce mantras, durations, sequences, dietary or
  bodily practice detail not present verbatim in retrieved passages (enforced by §5.4,
  restated in the system prompt).
- Caution-rated folios surface their `warnings` field verbatim above the synthesized
  answer; the model is instructed to repeat warnings, never soften them.
- No user query logging beyond the cost ledger row and standard request logs — in line
  with the project's no-personal-data posture (`docs/ARCHITECTURE.md`).
- The two `caution_level: high` knowledge-archive PDFs remain out of the browsing UI
  and out of the retrieval corpus for synthesis (retrieval spans `siddhis` only in
  Phase C; extending to `manuscripts` is a Phase D decision requiring its own
  caution review).

---

## 8. Rollout

| Phase | Content | State |
| --- | --- | --- |
| **A** | pgvector semantic route, server-side query embeddings, embeddings script + npm wrapper, "Deep search" toggle | ✅ shipped (Sprint 3) |
| **B** | This RFC; cost-model sign-off; env documentation in `.env.example` | ✅ this document |
| **C** | `/api/archivist/synthesize` + citation validator + cost ledger/governor + UI toggle; all behind `ARCHIVIST_SYNTHESIS_ENABLED`; 20-query eval set to calibrate the 0.32 floor | next sprint, flag-gated |
| **D** | HNSW index (only if corpus > 50 k rows), streaming, `manuscripts` corpus review, eval harness in CI | future |

Phase C ships dark: code lands behind the flag, ops enables `OPENAI_API_KEY` +
`ARCHIVIST_SYNTHESIS_ENABLED` only after the eval set confirms the refusal floor.

---

## 9. Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Client-side embeddings (browser calls provider) | Exposes API key; violates G5. Never acceptable. |
| Cross-encoder re-rank of top-12 before synthesis | +1 model call per query for marginal gain at 55-row corpus; revisit at scale. |
| Fine-tuned small model, self-hosted | Ops cost ≫ API cost at this traffic; citation enforcement harder, not easier. |
| Full prompt-RAG without validator | Fails G1/G2 — post-hoc validator is the safety crux of the design. |
| Pre-computed Q&A cache for popular queries | Good Phase D optimization; premature now, and cache invalidation on corpus edits adds risk. |

---

## 10. Open questions

1. Exact similarity floor (0.32 placeholder) — calibrate with the Phase C eval set.
2. Should refusal copy soften ("The Custodian is silent…") vs. stay clinical?
3. Ledger deduplication: identical (normalized) queries within 24 h — serve the
   cached answer? Cheap to add later, not required for safety.
4. Phase D: inclusion criteria for `manuscripts` and reader corpora in synthesis
   retrieval, given caution ratings.
