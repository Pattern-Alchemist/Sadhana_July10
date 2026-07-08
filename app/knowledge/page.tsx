import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { OmGlyph } from "@/components/Symbols";
import KnowledgeSearch from "@/components/KnowledgeSearch";

export const dynamic = "force-dynamic";

interface KnowledgeDocMeta {
  slug: string;
  kind: string;
  title: string;
  original_title: string;
  category: string;
  subcategory: string;
  tradition: string;
  tags: string[];
  caution_level: "high" | "moderate" | "low";
  file: string;
  description: string;
  chunk_count: number;
  text_chars: number;
  text_words: number;
}

interface KnowledgeIndex {
  archive: string;
  version: string;
  generated_at: string;
  total_documents: number;
  total_chunks: number;
  total_chars: number;
  total_words: number;
  categories: string[];
  traditions: string[];
  caution_levels: string[];
  caution_summary: { high: number; moderate: number; low: number };
  documents: KnowledgeDocMeta[];
}

function loadIndex(): KnowledgeIndex | null {
  try {
    const raw = readFileSync(
      join(process.cwd(), "knowledge", "index.json"),
      "utf-8"
    );
    return JSON.parse(raw) as KnowledgeIndex;
  } catch {
    return null;
  }
}

const CAUTION_LABEL: Record<string, string> = {
  high: "High Caution",
  moderate: "Moderate Caution",
  low: "Low Caution",
};

const CAUTION_COLOR: Record<string, string> = {
  high: "text-[var(--color-rose-accent)] border-[var(--color-rose-accent)]/40",
  moderate: "text-[var(--color-gold-bright)] border-[var(--color-gold)]/40",
  low: "text-[var(--color-sage)] border-[var(--color-sage)]/40",
};

export default async function KnowledgePage() {
  const index = loadIndex();

  if (!index) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <PageHeader
          eyebrow="Offline Source Library"
          title="The Knowledge Archive"
          subtitle="A curated library of primary-source PDFs and scholarly transcriptions, indexed for retrieval."
        />
        <div className="mt-12 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-8 text-center">
          <p className="text-[var(--color-bone)]/70">
            The knowledge archive index could not be loaded on this deployment.
            It may not have been built during deployment — see
            <code className="mx-1 text-[var(--color-gold-bright)]">scripts/build_knowledge_archive.py</code>.
          </p>
        </div>
      </div>
    );
  }

  // Group by category
  const byCategory = new Map<string, KnowledgeDocMeta[]>();
  for (const doc of index.documents) {
    const arr = byCategory.get(doc.category) ?? [];
    arr.push(doc);
    byCategory.set(doc.category, arr);
  }
  // Sort each category by caution_level (high first) then alphabetically
  const cautionOrder: Record<string, number> = { high: 0, moderate: 1, low: 2 };
  for (const arr of byCategory.values()) {
    arr.sort(
      (a, b) =>
        (cautionOrder[a.caution_level] ?? 9) - (cautionOrder[b.caution_level] ?? 9) ||
        a.title.localeCompare(b.title)
    );
  }
  const sortedCategories = Array.from(byCategory.keys()).sort();

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-[var(--hairline)] bg-[var(--color-ink)]/40 py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <PageHeader
            eyebrow="Offline Source Library"
            title="The Knowledge Archive"
            subtitle="A curated library of primary-source PDFs and scholarly transcriptions, indexed for full-text retrieval. Separate from the runtime PostgreSQL catalogue; preserved here for scholarly study and future RAG retrieval."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-gold)]/15 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Documents" value={index.total_documents} />
            <Stat label="Text Chunks" value={index.total_chunks} />
            <Stat label="Total Words" value={index.total_words.toLocaleString()} />
            <Stat
              label="High-Caution Texts"
              value={index.caution_summary.high}
              accent
            />
          </div>
        </div>
      </section>

      {/* CAUTION BANNER */}
      {index.caution_summary.high > 0 && (
        <section className="border-b border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5">
          <div className="mx-auto flex max-w-5xl items-start gap-4 px-6 py-5 sm:px-8">
            <span className="mt-0.5 text-[var(--color-rose-accent)]">⚠</span>
            <p className="text-sm leading-relaxed text-[var(--color-bone)]/85">
              This archive contains {index.caution_summary.high} document
              {index.caution_summary.high === 1 ? "" : "s"} tagged
              <span className="mx-1 font-medium text-[var(--color-rose-accent)]">high-caution</span> —
              they describe spirit-contact, adversarial, or ingestion-related rites. They
              are preserved for scholarly study only and are not surfaced through the main
              browsing UI. Read the editorial framing on each document carefully.
            </p>
          </div>
        </section>
      )}

      {/* SEARCH (client-side) */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
        <h2 className="font-display text-2xl text-[var(--color-ivory)]">
          Search the Archive
        </h2>
        <p className="mt-2 text-sm text-[var(--color-bone)]/70">
          Full-text search across all {index.total_chunks} indexed chunks. Powered by a
          SQLite FTS5 index with diacritic folding (so &ldquo;Om&rdquo; matches &ldquo;Oṃ&rdquo;).
          The endpoint lives at <code className="text-[var(--color-gold-bright)]">/api/knowledge/search</code>.
        </p>
        <KnowledgeSearch />
      </section>

      {/* DOCUMENTS BY CATEGORY */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
        <h2 className="font-display text-2xl text-[var(--color-ivory)]">
          Documents by Category
        </h2>
        <p className="mt-2 text-sm text-[var(--color-bone)]/70">
          {sortedCategories.length} categories · {index.traditions.length} traditions
        </p>

        <div className="mt-10 space-y-16">
          {sortedCategories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-3">
                <OmGlyph style={{ fontSize: "1.4rem" }} className="text-[var(--color-gold)]" />
                <h3 className="font-display text-xl text-[var(--color-gold-bright)]">
                  {category}
                </h3>
                <span className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {byCategory.get(category)!.length} document
                  {byCategory.get(category)!.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {byCategory.get(category)!.map((doc) => (
                  <DocumentCard key={doc.slug} doc={doc} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="border-t border-[var(--hairline)] bg-[var(--color-ink)]/40 py-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8">
          <h2 className="font-display text-2xl text-[var(--color-ivory)]">
            How the Archive is Built
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--color-bone)]/75">
            <p>
              The knowledge archive is a build-time artefact, separate from the runtime
              PostgreSQL database. Each source document (PDF or Markdown) is processed by
              <code className="mx-1 text-[var(--color-gold-bright)]">scripts/build_knowledge_archive.py</code>,
              which extracts text, splits it into ~1200-character chunks with 150-character
              overlap, writes per-document metadata JSON, and builds a SQLite FTS5 full-text
              index using the <code className="text-[var(--color-gold-bright)]">unicode61 remove_diacritics 2</code>
              tokenizer for IAST-aware search.
            </p>
            <p>
              Markdown files carry YAML frontmatter that declares their title, category,
              tradition, language, century, tags, and caution level. The build script
              auto-discovers any <code className="text-[var(--color-gold-bright)]">.md</code> file
              in <code className="text-[var(--color-gold-bright)]">knowledge/tantra/</code> with
              valid frontmatter — new sadhanas can be added by dropping a file in place and
              re-running the script.
            </p>
            <p>
              The Custodian endpoint (<code className="text-[var(--color-gold-bright)]">/api/archivist</code>)
              continues to search the runtime catalogue. The knowledge archive search endpoint
              (<code className="text-[var(--color-gold-bright)]">/api/knowledge/search</code>)
              searches only the offline source archive. The two are deliberately separate
              so that the editorial catalogue and the primary-source archive remain
              epistemically distinct.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className="bg-[var(--color-ink)] p-5">
      <p className={`font-display text-3xl ${accent ? "text-[var(--color-rose-accent)]" : "text-[var(--color-gold-bright)]"}`}>
        {value}
      </p>
      <p className="mt-1 text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
        {label}
      </p>
    </div>
  );
}

function DocumentCard({ doc }: { doc: KnowledgeDocMeta }) {
  return (
    <article className="folio-card flex flex-col rounded-sm p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]/75">
          {doc.kind === "pdf" ? "PDF" : "Markdown"} · {doc.category}
        </span>
        <span
          className={`badge border ${CAUTION_COLOR[doc.caution_level]} text-[0.55rem] uppercase tracking-luxe`}
        >
          {CAUTION_LABEL[doc.caution_level]}
        </span>
      </div>
      <h4 className="mt-3 font-display text-xl text-[var(--color-ivory)]">
        {doc.title}
      </h4>
      {doc.original_title && (
        <p className="mt-1 font-display text-sm text-[var(--color-gold-bright)]/85">
          {doc.original_title}
        </p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-bone)]/70">
        {doc.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {doc.tags.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[0.55rem] text-[var(--color-bone)]/55"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
        <span>{doc.tradition}</span>
        <span>{doc.chunk_count} chunks · {doc.text_words.toLocaleString()} words</span>
      </div>
      <div className="mt-3 text-[0.55rem] text-[var(--color-bone)]/35 truncate">
        <code>{doc.file}</code>
      </div>
    </article>
  );
}
