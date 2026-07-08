# Roadmap

The roadmap is organised into three horizons: near-term (next 1-2 development cycles), mid-term (3-6 cycles), and long-term (open-ended). Each item is framed by the problem it solves and the architectural change it implies.

## Near-Term

### 1. Runtime FTS5 Search over the Knowledge Archive

**Problem.** The Custodian currently searches only the `siddhis` and `manuscripts` tables in PostgreSQL. The 101 text chunks in the knowledge archive (with their FTS5 index) are not queryable at runtime.

**Change.** Add a `GET /api/knowledge/search?q=...` endpoint that opens the SQLite database read-only, runs an FTS5 `MATCH` query, and returns the top-k chunks with their parent document metadata. Wire the existing `Archivist` UI to also surface knowledge archive hits, clearly labelled as "primary source" results distinct from "catalogue" results.

**Effort.** Small. A few hundred lines of code. No schema changes. The FTS5 index already exists.

### 2. Diacritic Folding in the Runtime Custodian

**Problem.** The runtime Custodian in `/api/archivist` does not fold IAST diacritics, so a search for "Om" does not match "Oṃ" and a search for "Siva" does not match "Śiva".

**Change.** Add a `foldDiacritics(s: string): string` utility that maps IAST characters to their ASCII equivalents (`ṃ → m`, `ś → s`, `ṣ → s`, etc.) and apply it to both the query and the candidate field values during scoring.

**Effort.** Tiny. A single utility function and one line of change in the scoring loop.

### 3. Sitemap and Structured Data

**Problem.** The application is not well-indexed by search engines because it has no sitemap and no Schema.org structured data.

**Change.** Add a `src/app/sitemap.ts` exporting all siddhi and manuscript slugs. Add `JsonLd` components to the layout and the siddhi folio emitting `Article` and `BreadcrumbList` structured data.

**Effort.** Small. Standard Next.js sitemap pattern.

### 4. View Count Increment

**Problem.** The `view_count` column exists on `siddhis` but is never incremented.

**Change.** Add a `UPDATE siddhis SET view_count = view_count + 1 WHERE slug = ?` statement to the siddhi folio page. Display the view count on the archive browser.

**Effort.** Tiny.

## Mid-Term

### 5. Embedding-Based Semantic Retrieval

**Problem.** The Custodian (and the FTS5 index) cannot match semantically related terms. A query for "breath" will not find "prāṇa"; a query for "liberation" will not find "mokṣa".

**Change.** Add a build-time script that generates an embedding for each of the 101 chunks using a local or hosted embedding model (OpenAI `text-embedding-3-small`, Cohere `embed-v3`, or a local `bge-small` model). Store the embeddings in `knowledge/embeddings/<doc-slug>.jsonl`. Add a `GET /api/knowledge/semantic-search?q=...` endpoint that embeds the query, computes cosine similarity against the stored embeddings, and returns the top-k chunks. Use `sqlite-vec` for in-process vector search or `pgvector` if the embeddings are loaded into Postgres.

**Effort.** Medium. New build step, new endpoint, new dependency on an embedding model.

### 6. Authentication and Moderated Write Side

**Problem.** The reflections endpoint is unauthenticated and pen-name only. There is no way for trusted scholars to add or edit corpus entries through the UI.

**Change.** Add magic-link or OAuth authentication (NextAuth.js or Lucia). Distinguish three roles: anonymous (read-only), authenticated reader (can post reflections under a verified identity), and scholar (can propose siddhi / manuscript edits through a moderation queue). The moderation queue is a new `pending_edits` table.

**Effort.** Large. New auth dependency, new schema, new UI flows, new moderation tooling.

### 7. Multi-Language UI

**Problem.** The UI is English-first. Sanskrit readers, Hindi readers, and other language communities cannot navigate in their preferred language.

**Change.** Adopt `next-intl` or a similar i18n framework. Extract all UI strings into message catalogs. Add Hindi and Sanskrit message catalogs (English remains the fallback). The corpus content itself stays in its original language; only the chrome is translated.

**Effort.** Medium. Mostly mechanical string extraction; the harder part is the translation work.

### 8. Yantra Gallery with IIIF

**Problem.** The `yantra` field on siddhis is a JSONB object with textual descriptions only. There is no visual gallery.

**Change.** Add a `/yantra/[slug]` route that renders high-resolution yantra images using the IIIF Image API. Store image manifests in `public/iiif/`. Use a IIIF viewer (Mirador, OpenSeadragon) for pan/zoom.

**Effort.** Medium. Requires sourcing or commissioning yantra images; the IIIF integration itself is straightforward.

## Long-Term

### 9. Cross-Tradition Citation Graph

**Problem.** The `evidence_sources` table links evidence to siddhis but does not model the relationships *between* sources (e.g. "this commentary cites that primary text").

**Change.** Add a `citation_edges` table `(source_id, target_id, kind)` modelling citation relationships. Render an interactive citation graph on a new `/graph` route using a force-directed layout.

**Effort.** Large. New schema, new graph rendering, substantial data modelling.

### 10. Offline-First PWA

**Problem.** The application requires a network connection. Readers in low-connectivity environments cannot access the archive.

**Change.** Convert the application to a Progressive Web App with a service worker that caches the read-only corpus (siddhis, manuscripts, schools) on first visit. The reflections endpoint becomes a queued write that syncs when connectivity returns.

**Effort.** Large. PWA patterns, conflict resolution, cache invalidation.

### 11. Editorial Workflow for Corpus Updates

**Problem.** Updating the corpus requires editing `archive-data.ts` and deploying. This is fine for a small team but does not scale to multiple scholarly contributors.

**Change.** Move the seed corpus from `archive-data.ts` into the database (with a one-time migration). Build a scholar-facing admin UI for proposing, reviewing, and merging corpus edits. Version every edit; support diffs and rollbacks.

**Effort.** Very large. This is essentially a content management system.

## Explicitly Rejected

The following are explicitly *not* on the roadmap, to preserve the project's epistemic posture:

- **LLM-generated answers.** The Custodian will continue to return ranked pointers, not synthesised prose. An LLM that paraphrased the corpus would risk smoothing over the editorial / source distinction and presenting prescription as fact.
- **Practice recommendations.** The project will not recommend practices to readers based on their stated goals, symptoms, or horoscope. This crosses from scholarship into prescription.
- **Social features.** No following, no feeds, no public profiles. The reflections table is the only social-adjacent feature, and it remains pen-name only and unauthenticated.
- **Monetisation.** No paid tier, no premium content, no advertisements. The project is heritage preservation, not a business.
