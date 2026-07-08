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
