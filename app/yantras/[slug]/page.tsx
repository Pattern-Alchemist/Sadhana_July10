import Link from "next/link";
import { notFound } from "next/navigation";
import { getYantraBySlug, YANTRAS } from "@/lib/yantra-data";
import { OmGlyph, FlourishDivider, SriYantraGlyph } from "@/components/Symbols";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return YANTRAS.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const yantra = getYantraBySlug(slug);
  if (!yantra) return { title: "Yantra not found · AstroKalki" };
  const title = `${yantra.title} · The Yantra Gallery`;
  const description = yantra.description;
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

const CAUTION_BADGE: Record<string, { label: string; classes: string }> = {
  high: {
    label: "High Caution",
    classes: "text-[var(--color-rose-accent)] border-[var(--color-rose-accent)]/40 bg-[var(--color-rose-accent)]/5",
  },
  moderate: {
    label: "Moderate Caution",
    classes: "text-[var(--color-gold-bright)] border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5",
  },
};

export default async function YantraDeepViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const yantra = getYantraBySlug(slug);
  if (!yantra) notFound();

  const badge = CAUTION_BADGE[yantra.caution];
  const currentIndex = YANTRAS.findIndex((y) => y.slug === slug);
  const prevYantra = currentIndex > 0 ? YANTRAS[currentIndex - 1] : YANTRAS[YANTRAS.length - 1];
  const nextYantra = currentIndex < YANTRAS.length - 1 ? YANTRAS[currentIndex + 1] : YANTRAS[0];

  // JSON-LD for the yantra deep view
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": yantra.title,
    "alternateName": yantra.sanskrit,
    "description": yantra.description,
    "about": {
      "@type": "Thing",
      "name": yantra.title,
      "description": yantra.symbolism,
    },
    "artMedium": "SVG (digital)",
    "artform": "Tantric Yantra",
    "creator": {
      "@type": "Organization",
      "name": "AstroKalki",
    },
    "isBasedOn": {
      "@type": "CreativeWork",
      "name": yantra.source,
      "text": yantra.sourceCitation,
    },
    "url": `https://astrokalki.example.com/yantras/${yantra.slug}`,
    "isPartOf": {
      "@type": "Collection",
      "name": "AstroKalki Yantra Gallery",
      "url": "https://astrokalki.example.com/yantras",
    },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="fade-up mb-8 flex flex-wrap items-center gap-2 text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        <Link href="/" className="transition hover:text-[var(--color-gold-bright)]">Home</Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <Link href="/yantras" className="transition hover:text-[var(--color-gold-bright)]">Yantras</Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <span className="text-[var(--color-gold-bright)]">{yantra.title}</span>
      </nav>

      {/* HERO */}
      <header className="fade-up mb-12 text-center">
        <div className="mb-6 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
          {yantra.tradition}
        </span>
        <h1 className="mt-3 font-display text-[2rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl lg:text-5xl">
          {yantra.title}
        </h1>
        <p className="mt-2 font-display text-base italic text-[var(--color-gold-bright)]/85 sm:text-lg">
          {yantra.sanskrit}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <span className={`badge ${badge.classes}`}>{badge.label}</span>
          <span className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            Source: {yantra.source}
          </span>
        </div>
      </header>

      <FlourishDivider className="mb-12" />

      {/* TWO-COLUMN: Yantra + Metadata */}
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        {/* LEFT: Full-screen yantra */}
        <div className="fade-up">
          <div className="relative overflow-hidden rounded-sm border border-[var(--color-gold)]/25 bg-[#0a0908] p-4 shadow-[0_0_80px_-30px_var(--color-gold)] sm:p-8">
            {/* Subtle rotating outer ring */}
            <div className="yantra-bg-spin pointer-events-none absolute inset-0 opacity-[0.05]">
              <div className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-gold)]" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={yantra.file}
              alt={`${yantra.title} — scholarly rendering`}
              className="relative z-10 mx-auto w-full max-w-[560px] transition-transform duration-[1500ms] ease-out hover:scale-[1.02]"
            />
          </div>
          <p className="mt-4 text-center text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]/55">
            Scholarly rendering · not an activated ritual object
          </p>

          {/* Bīja breakdown */}
          <div className="mt-10 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6 sm:p-8">
            <h2 className="font-display text-xl text-[var(--color-gold-bright)]">
              Bīja Breakdown
            </h2>
            <p className="mt-2 text-xs text-[var(--color-bone)]/55">
              The seed-syllables at the four gates and the central bindu, per the source text.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <BijaCard label="East Gate" bija={yantra.bijaBreakdown.east} />
              <BijaCard label="South Gate" bija={yantra.bijaBreakdown.south} />
              <BijaCard label="West Gate" bija={yantra.bijaBreakdown.west} />
              <BijaCard label="North Gate" bija={yantra.bijaBreakdown.north} />
              <BijaCard label="Central Bindu" bija={yantra.bijaBreakdown.center} highlight />
              <BijaCard label="Mantra Ring" bija={yantra.mantraRing} small />
            </div>
          </div>
        </div>

        {/* RIGHT: Metadata */}
        <div className="fade-up space-y-8" style={{ animationDelay: "120ms" }}>
          {/* Description */}
          <section>
            <h2 className="font-display text-xl text-[var(--color-gold-bright)]">
              The Geometry
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
              {yantra.description}
            </p>
          </section>

          {/* Symbolism */}
          <section>
            <h2 className="font-display text-xl text-[var(--color-gold-bright)]">
              The Symbolism
            </h2>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
              {yantra.symbolism}
            </p>
          </section>

          {/* Source */}
          <section className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5">
            <h3 className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
              Source Citation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/75">
              {yantra.sourceCitation}
            </p>
          </section>

          {/* Link to siddhi folio */}
          <section>
            <Link
              href={`/siddhi/${yantra.siddhiSlug}`}
              className="group flex items-center justify-between gap-3 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/40 p-5 transition-all duration-400 hover:border-[var(--color-gold)]/60 hover:bg-[var(--color-ink)]/70 hover:shadow-[0_0_30px_-12px_var(--color-gold)]"
            >
              <div>
                <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  View the Siddhi Folio
                </p>
                <p className="mt-1 font-display text-lg text-[var(--color-ivory)] transition-colors group-hover:text-[var(--color-gold-bright)]">
                  {yantra.siddhiName}
                </p>
              </div>
              <span className="text-[var(--color-gold)] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </section>
        </div>
      </div>

      <FlourishDivider className="my-14" />

      {/* NAVIGATION: prev / next yantra */}
      <nav className="grid gap-4 sm:grid-cols-2">
        <Link
          href={`/yantras/${prevYantra.slug}`}
          className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition-all duration-400 hover:border-[var(--color-gold)]/40"
        >
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            ← Previous
          </p>
          <p className="mt-1 font-display text-base text-[var(--color-ivory)] transition-colors group-hover:text-[var(--color-gold-bright)]">
            {prevYantra.title}
          </p>
        </Link>
        <Link
          href={`/yantras/${nextYantra.slug}`}
          className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 text-right transition-all duration-400 hover:border-[var(--color-gold)]/40"
        >
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            Next →
          </p>
          <p className="mt-1 font-display text-base text-[var(--color-ivory)] transition-colors group-hover:text-[var(--color-gold-bright)]">
            {nextYantra.title}
          </p>
        </Link>
      </nav>

      {/* Back to gallery */}
      <div className="mt-12 text-center">
        <Link href="/yantras" className="btn-ghost text-xs">
          ← All Yantras
        </Link>
      </div>
    </article>
  );
}

function BijaCard({
  label,
  bija,
  highlight,
  small,
}: {
  label: string;
  bija: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`rounded-sm border p-3 text-center transition-all duration-300 hover:border-[var(--color-gold)]/40 ${
        highlight
          ? "border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5"
          : "border-[var(--hairline)] bg-[var(--color-ink)]/40"
      }`}
    >
      <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        {label}
      </p>
      <p
        className={`mt-1 font-display ${
          small ? "text-[0.7rem] leading-tight" : "text-lg"
        } ${highlight ? "text-[var(--color-gold-bright)]" : "text-[var(--color-ivory)]"}`}
      >
        {bija}
      </p>
    </div>
  );
}
