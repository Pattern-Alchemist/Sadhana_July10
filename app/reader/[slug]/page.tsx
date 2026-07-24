import Link from "next/link";
import { notFound } from "next/navigation";
import { getReaderEntry, READER_ENTRIES } from "@/lib/reader-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import ParallelVerse from "@/components/ParallelVerse";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return READER_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getReaderEntry(slug);
  if (!entry) return { title: "Verse not found · AstroKalki" };
  const title = `${entry.title} · Reader`;
  const description = entry.english.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ReaderDeepViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getReaderEntry(slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    articleBody: entry.iast,
    description: entry.english,
    citation: entry.source,
    inLanguage: ["sa", "en"],
    author: { "@type": "Organization", name: "AstroKalki" },
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
        <Link href="/reader" className="transition motion-safe hover:text-[var(--color-gold-bright)]">Reader</Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <span className="text-[var(--color-gold-bright)]">{entry.title}</span>
      </nav>

      {/* Header */}
      <header className="fade-up mb-10 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.6rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          {entry.tradition} · {entry.century}
        </span>
        <h1 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl">
          {entry.title}
        </h1>
      </header>

      <FlourishDivider className="mb-10" />

      {/* Parallel verse */}
      <div className="fade-up" style={{ animationDelay: "100ms" }}>
        <ParallelVerse
          devanagari={entry.devanagari}
          iast={entry.iast}
          english={entry.english}
          wordByWord={entry.wordByWord}
        />
      </div>

      {/* Commentary */}
      <section className="fade-up mt-12 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 sm:p-6" style={{ animationDelay: "150ms" }}>
        <h2 className="mb-3 font-display text-lg text-[var(--color-gold-bright)] sm:text-xl">
          Commentary
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
          {entry.commentary}
        </p>
      </section>

      {/* Source */}
      <section className="fade-up mt-6" style={{ animationDelay: "200ms" }}>
        <h3 className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
          Source
        </h3>
        <p className="mt-1 text-sm text-[var(--color-bone)]/75">{entry.source}</p>
        {entry.sourceUrl && (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-[var(--color-gold-bright)] transition motion-safe hover:underline"
          >
            View source →
          </a>
        )}
      </section>

      <FlourishDivider className="my-10" />

      <div className="text-center">
        <Link href="/reader" className="btn-ghost text-xs sm:text-sm">
          ← All Verses
        </Link>
      </div>
    </article>
  );
}
