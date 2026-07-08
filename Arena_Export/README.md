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
