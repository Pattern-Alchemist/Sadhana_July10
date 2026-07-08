# Component Guide

Thirteen React components live in `src/components/`. Each is documented below with its contract, props, consumers, and any client/server designation.

## `SiteNav.tsx` (server)

Top-level site navigation. Renders the seven primary routes as a horizontal nav bar with the project's wordmark. Uses Next.js `<Link>` for client-side transitions. No props.

**Consumers:** `src/app/layout.tsx`.

## `Footer.tsx` (server)

Footer with the project's epistemic disclaimer and the seven-pillar summary. No props.

**Consumers:** `src/app/layout.tsx`.

## `PageHeader.tsx` (server)

Reusable page header with eyebrow, title, and optional subtitle. Standardises page rhythm.

**Props:** `{ eyebrow: string; title: string; subtitle?: string }`.

**Consumers:** `/archive`, `/manuscripts`, `/schools`, `/lineage`, `/comparative`, `/journey`, `/safety`.

## `Symbols.tsx` (server)

A library of SVG glyph components used throughout the UI: `SriYantraGlyph`, `FlourishDivider`, `BinduSun`, `LotusGlyph`, `OmGlyph`, `CategoryGlyph`. Each accepts standard SVG props plus a `size` prop where relevant. The glyphs are hand-crafted SVG, not icon-font characters, so they scale crisply at any size.

**Consumers:** `src/app/page.tsx`, `SiddhiFolio.tsx`, `ArchiveBrowser.tsx`.

## `Constellation.tsx` (client)

An interactive graph visualisation of the "living knowledge constellation." Renders nodes (a central "Witness" plus the top-rated siddhis) and edges (each siddhi connected to the Witness). Implemented with SVG and CSS animations; no graph library dependency.

**Props:** `{ nodes: ConstellationNode[]; edges: ConstellationEdge[] }`.

**Types:** `ConstellationNode = { id, label, slug?, kind: "core" | "branch" }`, `ConstellationEdge = { from, to }`.

**Consumers:** `src/app/page.tsx`.

## `SiddhiFolio.tsx` (client)

The deep folio renderer for a single siddhi. Renders the full record: header, mantra, description, pre-sādhana steps, procedure steps, yantra, FAQ, evidence panel, and warnings. Uses the `useEpistemicLens` hook to toggle scholar / practitioner framing. This is the most complex component in the project (471 lines).

**Props:** `{ siddhi: Siddhi; evidence: EvidenceSource[] }`.

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `ArchiveBrowser.tsx` (client)

Filterable, sortable browser for the full siddhi corpus. Client-side filtering by category, tradition, and level; sorting by authenticity score, name, or tradition. Pure client state; no server round-trips after initial load.

**Props:** `{ siddhis: Siddhi[] }`.

**Consumers:** `src/app/archive/page.tsx`.

## `CodexExplorer.tsx` (client)

A museum-style explorer for the manuscript collection. Groups by tradition, expands to show metadata, and links out to `source_url`. Pure client state.

**Props:** `{ manuscripts: Manuscript[] }`.

**Consumers:** `src/app/manuscripts/page.tsx`.

## `CosmosPanel.tsx` (client)

Real-time cosmology renderer. Fetches current planetary positions from the server component on the `/cosmos` page and re-renders every 60 seconds. Displays both tropical and sidereal (Lahiri) longitudes, with the ayanamsa explicitly noted.

**Props:** `{ positions: PlanetPosition[]; ayanamsa: number; timestamp: string }`.

**Consumers:** `src/app/cosmos/page.tsx`.

## `Archivist.tsx` (client)

The Custodian search UI. Maintains query state, calls `POST /api/archivist`, renders ranked results with their `reason` field, and shows the templated `note` from the server. Includes suggested queries for empty states.

**Props:** None (self-contained).

**Consumers:** `src/app/archivist/page.tsx`.

## `ReflectionComposer.tsx` (client)

Form for submitting a new reflection. Fields: pen name, siddhi slug (optional), title, body, tone. Submits to `POST /api/reflections`. No validation beyond required-field checks; the API does server-side sanitisation.

**Props:** `{ siddhiSlug?: string }` (pre-fills the siddhi field when composed from a folio).

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `ReadinessValidator.tsx` (client)

An interactive checklist that helps a reader assess whether they have the prerequisites for a given practice. Each item is a checkbox with explanatory text. The component computes a readiness percentage and renders a colour-coded summary.

**Props:** `{ items: { label: string; detail: string }[] }`.

**Consumers:** `src/app/siddhi/[slug]/page.tsx`.

## `useEpistemicLens.ts` (client hook)

A custom hook that manages the scholar / practitioner lens toggle in localStorage. Returns the current lens and a setter. The lens is persisted across sessions per browser.

**Returns:** `[lens: "scholar" | "practitioner", setLens: (l) => void]`.

**Consumers:** `SiddhiFolio.tsx`.

## Adding a New Component

1. Create `src/components/MyComponent.tsx`. Mark `"use client"` only if the component uses hooks, browser APIs, or event handlers.
2. If the component needs domain types, import them from `src/db/schema.ts` (e.g. `Siddhi`, `Manuscript`).
3. If the component is a server component, it may issue Drizzle queries directly; if it is a client component, it must receive data via props or fetch from an API route.
4. Update this document with the new component's contract.
