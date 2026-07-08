# Dependencies

Every direct dependency in `package.json`, what it does, why it is here, and whether it can be removed or replaced.

## Runtime Dependencies

### `next` 16.2.6

The Next.js framework — App Router, server components, API routes, font optimisation. The entire application is built on this. Non-negotiable.

### `react` 19.2.6 and `react-dom` 19.2.6

The UI runtime. Required by Next.js 16. Pinned to 19.x for concurrent features and the new JSX transform.

### `drizzle-orm` 0.45.2

The ORM. Provides typed query builders for PostgreSQL. Chosen over Prisma for its lighter weight, its compatibility with raw SQL when needed, and its first-class support for the `pg` driver. The schema is defined in `src/db/schema.ts`.

### `pg` 8.20.0

The PostgreSQL driver. Used by Drizzle under the hood. The connection pool is constructed in `src/db/index.ts`.

### `dotenv` 17.3.1

Loads `.env` into `process.env`. Used by `drizzle.config.json` and by the application at boot. Could be replaced by Node 20+'s native `--env-file` flag if desired.

## Dev Dependencies

### `typescript` 5.9.3

The TypeScript compiler. Strict mode is on.

### `@types/node` 22.19.15, `@types/react` 19.2.14, `@types/react-dom` 19.2.3, `@types/pg` 8.18.0

Type definitions for the runtime libraries.

### `tailwindcss` 4.1.17 and `@tailwindcss/postcss` 4.1.17

Tailwind CSS v4 and its PostCSS plugin. The design system is defined in `src/app/globals.css` under `@theme`.

### `postcss` 8.5.8

The CSS transformer. Required by Tailwind v4.

### `drizzle-kit` 0.31.10

The Drizzle CLI. Used for `drizzle-kit push` (schema application) and `drizzle-kit studio` (database inspection). Not required at runtime.

### `eslint` 9.39.4 and `eslint-config-next` 16.2.6

Linting. `eslint-config-next` provides the Next.js recommended ruleset. Configured in `eslint.config.mjs`.

## Why No Testing Library

There are no test dependencies because there are no tests (see `PROJECT_MEMORY.md`). If tests are added, the natural starting set is `vitest` (for unit tests of `cosmology.ts` and the search ranking) and `playwright` (for end-to-end tests of the read-only routes).

## Why No Auth Library

There is no auth library because there is no auth (see `PROJECT_MEMORY.md`). When auth is added (roadmap item 6), the choice is between NextAuth.js (now Auth.js, larger ecosystem) and Lucia (smaller, more flexible). Decide at that point.

## Why No State Management Library

There is no Redux, Zustand, Jotai, or similar. The application's state is small enough to be managed by React's built-in `useState` and `useEffect`. The only cross-component state is the epistemic lens, which is persisted in localStorage via the `useEpistemicLens` hook.

## Why No UI Component Library

There is no shadcn/ui, no Radix, no Material UI. The components are hand-written because the design system is bespoke (museum-grade obsidian/gold/ivory) and because the component count is small (13). Adding a component library would impose its own design tokens and break the visual consistency.

## Lockfile

`package-lock.json` is not included in this export to keep the file count small. Run `npm install` to regenerate it. If reproducible installs matter, check `package-lock.json` into the repository after the first `npm install`.

## Python Dependencies (Knowledge Archive Build Only)

The `scripts/build_knowledge_archive.py` script uses `pdfplumber`, `pypdf`, and `pdfminer.six` for PDF text extraction. These are not Node dependencies and are not listed in `package.json`. Install them with `pip install pdfplumber pypdf pdfminer.six`. The script tries `pdfplumber` first, then `pypdf`, then `pdfminer` — if any one is missing, the others are tried automatically.
