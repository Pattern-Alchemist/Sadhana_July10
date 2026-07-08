# Coding Standards

These standards apply to all code committed to AstroKalki. They are enforced by ESLint and TypeScript strict mode where possible, and by code review where not.

## TypeScript

- **Strict mode is on.** `strict: true` in `tsconfig.json`. No `any` without a `// eslint-disable-next-line` comment justifying it.
- **Prefer types over interfaces** for object shapes. Use interfaces only when you need declaration merging or extension.
- **Prefer `unknown` over `any`** for values whose type you cannot statically determine. Narrow with type guards.
- **No non-null assertion (`!`)** without a comment. If you must use it, explain why the value cannot be null.
- **Use `as const`** for literal-valued constants.

## Imports

- Use the `@/` path alias for all imports within `src/`. Configure in `tsconfig.json`.
- Order: external packages, then `@/` imports, then relative imports. Within each group, alphabetical.
- No barrel files. Import from the specific module.
- Default exports are fine for Next.js pages and layouts. Named exports for everything else.

## Naming

- **Files:** `kebab-case` for non-component files (`archive-data.ts`), `PascalCase` for component files (`SiddhiFolio.tsx`).
- **Components:** `PascalCase` (`SiddhiFolio`, `CosmosPanel`).
- **Functions and variables:** `camelCase` (`ensureArchiveSeeded`, `textChars`).
- **Types and interfaces:** `PascalCase` (`SiddhiSeed`, `PreSadhnaStep`).
- **Constants:** `UPPER_SNAKE_CASE` for module-level constants (`SIDDHI_SEED`), `camelCase` for local constants.
- **Database columns:** `snake_case` (Drizzle maps these to TypeScript `camelCase` via the `serial("id")` pattern).

## React

- **Server components by default.** Mark `"use client"` only when the component uses hooks, browser APIs, or event handlers.
- **No `useEffect` for data fetching.** Use server components for initial data; use `fetch` from a client `useEffect` only for genuinely client-side refreshes (e.g. `/cosmos` polling).
- **Prefer composition over inheritance.** No class components.
- **Props are typed.** No `React.PropsWithChildren<any>`. Define the props interface explicitly.
- **No inline styles** unless the value is dynamic (e.g. SVG sizes computed from data). Use Tailwind classes for static styling.

## Tailwind CSS v4

- The design system is defined in `src/app/globals.css` under `@theme`. Use the CSS variables (`--color-obsidian`, `--color-gold`, etc.) via Tailwind's arbitrary value syntax (`text-[var(--color-gold)]`).
- Do not introduce new colors outside the `@theme` block. If you need a new color, add it to `@theme` first.
- Use the design system's spacing rhythm. The `content-z`, `folio-card`, `btn-gold`, `btn-ghost`, `badge`, and `tracking-luxe` utility classes are defined in `globals.css`; prefer them over inline equivalents.
- No `@apply` in component files. All `@apply` rules live in `globals.css`.

## Database

- All schema changes go in `src/db/schema.ts` *and* `src/lib/bootstrap.ts`. Both files must be updated in the same commit.
- Use Drizzle's typed table builders (`pgTable`, `serial`, `text`, etc.). Do not write raw SQL in `schema.ts`.
- The bootstrap SQL uses `CREATE TABLE IF NOT EXISTS` and `INSERT ... ON CONFLICT (slug) DO NOTHING`. Preserve this idempotency.
- Indexes are defined in `schema.ts` via the table builder's third argument. Mirror them in the bootstrap SQL.
- No migrations. Use `drizzle-kit push` for local development and let the bootstrap handle fresh provisions.

## API Routes

- Every API route is in `src/app/api/<name>/route.ts`.
- Every API route exports `export const dynamic = "force-dynamic"`.
- Use `Response.json()` for responses. Set explicit status codes.
- Catch all exceptions in a `try/catch`. Log to `console.error` with a `[<route-name>]` prefix. Return a 500 with a user-friendly message.
- No middleware for auth (none exists). If you add middleware, document it in `docs/ARCHITECTURE.md`.

## Components

- Components belong in `src/components/`. No nested component directories unless there is a clear sub-grouping need.
- Each component file exports one default component (or one named hook, for hooks). No multi-export files.
- Document each component's props in `docs/COMPONENT_GUIDE.md` when adding a new component.

## Files

- No `console.log` in committed code. Use `console.error` for errors with a `[module]` prefix.
- No commented-out code. Delete it; git remembers.
- No `TODO` without a linked issue. Use `// TODO(#123): ...` format.
- File headers are optional but encouraged for non-trivial modules. One line describing the module's purpose.

## Git

- Branch names: `<type>/<short-description>` (e.g. `feat/agni-siddhi`, `fix/cosmos-ayanamsa`, `docs/api-reference`).
- Commit messages: imperative mood, ≤ 72 characters for the subject line, blank line, then a body explaining *why* (not *what*).
- No direct commits to `main`. Open a PR.
- Squash merges are preferred for small PRs. Merge commits are fine for PRs that touch multiple concerns.

## What Will Be Rejected in Code Review

- Any change that adds prescription logic (recommending practices based on user input).
- Any change that removes the `warnings` field from a siddhi or softens its prominence in the UI.
- Any change that collapses the `description` / `evidence_sources` distinction.
- Any change that surfaces `caution_level: high` knowledge archive content through the main browsing UI.
- Any change that adds an LLM-generated answer feature.
- Any schema change that updates `schema.ts` without updating `bootstrap.ts`.
- Any commit that includes `.env` or a live `DATABASE_URL`.
- Any `any` type without a justifying comment.
