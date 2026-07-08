import { db } from "@/db";
import { manuscripts, evidenceSources, siddhis } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import Link from "next/link";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await ensureArchiveSeeded();
  const [row] = await db.select().from(manuscripts).where(eq(manuscripts.slug, slug)).limit(1);
  if (!row) return { title: "Manuscript not found · AstroKalki" };
  return {
    title: `${row.title} · Codex Library · AstroKalki`,
    description: row.description ?? undefined,
  };
}

export default async function ManuscriptDeepViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureArchiveSeeded();
  const { slug } = await params;

  const [manuscript] = await db
    .select()
    .from(manuscripts)
    .where(eq(manuscripts.slug, slug))
    .limit(1);

  if (!manuscript) notFound();

  // Find siddhis that cite this manuscript (by matching citation text)
  const allSiddhis = await db.select().from(siddhis);
  const allEvidence = await db.select().from(evidenceSources);

  // Find evidence sources that mention this manuscript's title
  const relatedEvidence = allEvidence.filter((e) => {
    if (!e.citation) return false;
    const cite = e.citation.toLowerCase();
    const title = (manuscript.title ?? "").toLowerCase();
    const origTitle = (manuscript.originalTitle ?? "").toLowerCase();
    return cite.includes(title) || (origTitle && cite.includes(origTitle));
  });

  // Find the siddhis those evidence sources belong to
  const relatedSiddhiSlugs = new Set(relatedEvidence.map((e) => e.siddhiSlug).filter(Boolean));
  const relatedSiddhis = allSiddhis.filter((s) => relatedSiddhiSlugs.has(s.slug));

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: manuscript.title,
    alternateName: manuscript.originalTitle ?? undefined,
    description: manuscript.description ?? undefined,
    inLanguage: manuscript.language ?? undefined,
    dateCreated: manuscript.century ?? undefined,
    identifier: manuscript.catalogNumber ?? undefined,
    numberOfPages: manuscript.folios ?? undefined,
    url: manuscript.sourceUrl ?? undefined,
    isPartOf: {
      "@type": "Collection",
      name: "AstroKalki Codex Library",
    },
  };

  return (
    <article className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="fade-up mb-8 flex flex-wrap items-center gap-2 text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        <Link href="/" className="transition motion-safe hover:text-[var(--color-gold-bright)]">Home</Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <Link href="/manuscripts" className="transition motion-safe hover:text-[var(--color-gold-bright)]">Codices</Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <span className="text-[var(--color-gold-bright)]">{manuscript.title}</span>
      </nav>

      {/* Header */}
      <header className="fade-up mb-10 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.6rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          {manuscript.tradition ?? "—"} · {manuscript.century ?? "—"}
        </span>
        <h1 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl lg:text-5xl">
          {manuscript.title}
        </h1>
        {manuscript.originalTitle && (
          <p className="mt-2 font-display text-base italic text-[var(--color-gold-bright)]/85 sm:text-lg">
            {manuscript.originalTitle}
          </p>
        )}
      </header>

      <FlourishDivider className="mb-10" />

      {/* Description */}
      <section className="fade-up mb-10" style={{ animationDelay: "100ms" }}>
        <h2 className="mb-3 font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">
          Description
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
          {manuscript.description}
        </p>
      </section>

      {/* Catalogue metadata */}
      <section className="fade-up mb-10 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 sm:p-6" style={{ animationDelay: "150ms" }}>
        <h2 className="mb-4 font-display text-lg text-[var(--color-gold-bright)] sm:text-xl">
          Catalogue Record
        </h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <MetaRow label="Catalog Number" value={manuscript.catalogNumber} />
          <MetaRow label="Tradition" value={manuscript.tradition} />
          <MetaRow label="Century" value={manuscript.century} />
          <MetaRow label="Language" value={manuscript.language} />
          <MetaRow label="Folios" value={manuscript.folios?.toString()} />
          <MetaRow label="Condition" value={manuscript.conditionRating} />
        </dl>
        {manuscript.sourceUrl && (
          <div className="mt-4 border-t border-[var(--hairline)] pt-4">
            <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
              Digital Surrogate
            </p>
            <a
              href={manuscript.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-[var(--color-gold-bright)] transition motion-safe hover:underline"
            >
              View source → {manuscript.sourceUrl}
            </a>
          </div>
        )}
      </section>

      {/* Related siddhis */}
      {relatedSiddhis.length > 0 && (
        <section className="fade-up" style={{ animationDelay: "200ms" }}>
          <h2 className="mb-4 font-display text-lg text-[var(--color-gold-bright)] sm:text-xl">
            Siddhis Citing This Manuscript
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {relatedSiddhis.map((s) => (
              <Link
                key={s.slug}
                href={`/siddhi/${s.slug}`}
                className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4 transition motion-safe motion-reduce:transition-none"
              >
                <p className="font-display text-base text-[var(--color-ivory)] transition group-hover:text-[var(--color-gold-bright)]">
                  {s.name}
                </p>
                <p className="mt-1 text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {s.category} · {s.tradition}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FlourishDivider className="my-10" />

      <div className="text-center">
        <Link href="/manuscripts" className="btn-ghost text-xs sm:text-sm">
          ← All Manuscripts
        </Link>
      </div>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-[var(--color-ivory)]">
        {value || "—"}
      </dd>
    </div>
  );
}
