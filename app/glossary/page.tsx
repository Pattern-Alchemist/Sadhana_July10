import Link from "next/link";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryEntry } from "@/lib/glossary-data";
import { OmGlyph } from "@/components/Symbols";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sanskrit Glossary · AstroKalki",
  description: "A curated glossary of key Sanskrit terms — Devanagari, IAST, English gloss, etymology, and related siddhis.",
};

export default function GlossaryPage() {
  // Group by category
  const byCategory = new Map<string, GlossaryEntry[]>();
  for (const entry of GLOSSARY) {
    const arr = byCategory.get(entry.category) ?? [];
    arr.push(entry);
    byCategory.set(entry.category, arr);
  }
  // Sort each category alphabetically by IAST
  for (const arr of byCategory.values()) {
    arr.sort((a, b) => a.iast.localeCompare(b.iast));
  }

  return (
    <div>
      <section className="border-b border-[var(--hairline)] bg-[var(--color-ink)]/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-8">
          <div className="mb-6 text-[var(--color-gold)]/70">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
            Onboarding for Non-Sanskritist Readers
          </span>
          <h1 className="mt-3 font-display text-[2rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl lg:text-5xl">
            Sanskrit Glossary
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-bone)]/75 sm:text-base">
            {GLOSSARY.length} key terms — each with Devanagari, IAST transliteration, English gloss, etymology, and links to related siddhis. Browse by category below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        {/* Category jump-links */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {Object.entries(GLOSSARY_CATEGORIES).map(([key, label]) => {
            const count = byCategory.get(key as GlossaryEntry["category"])?.length ?? 0;
            if (count === 0) return null;
            return (
              <a
                key={key}
                href={`#${key}`}
                className="rounded-full border border-[var(--hairline)] px-3 py-1.5 text-xs text-[var(--color-bone)]/70 transition motion-safe motion-reduce:transition-none hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]"
              >
                {label} ({count})
              </a>
            );
          })}
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {Object.entries(GLOSSARY_CATEGORIES).map(([key, label]) => {
            const entries = byCategory.get(key as GlossaryEntry["category"]);
            if (!entries || entries.length === 0) return null;
            return (
              <div key={key} id={key}>
                <h2 className="mb-6 font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">
                  {label}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {entries.map((entry) => (
                    <GlossaryCard key={entry.iast} entry={entry} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function GlossaryCard({ entry }: { entry: GlossaryEntry }) {
  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition motion-safe motion-reduce:transition-none">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h3 className="font-display text-lg text-[var(--color-ivory)]">
            <span className="text-[var(--color-gold-bright)]">{entry.iast}</span>
          </h3>
          <p className="mt-0.5 font-display text-base text-[var(--color-gold)]/75">
            {entry.devanagari}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]/80">
        {entry.english}
      </p>
      <p className="mt-2 text-xs italic text-[var(--color-bone)]/55">
        Etymology: <span className="text-[var(--color-bone)]/75">{entry.etymology}</span>
      </p>
      {entry.related && entry.related.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.related.map((slug) => (
            <Link
              key={slug}
              href={`/siddhi/${slug}`}
              className="rounded-full border border-[var(--hairline)] px-2 py-0.5 text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/55 transition motion-safe hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]"
            >
              → folio
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
