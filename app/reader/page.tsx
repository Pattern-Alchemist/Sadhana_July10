import Link from "next/link";
import { READER_ENTRIES } from "@/lib/reader-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parallel-Sanskrit Reader · AstroKalki",
  description: "Primary-source Sanskrit verses with Devanagari, IAST transliteration, English translation, and word-by-word parsing.",
};

export default function ReaderIndexPage() {
  return (
    <div>
      <section className="border-b border-[var(--hairline)] bg-[var(--color-ink)]/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-8">
          <div className="mb-6 text-[var(--color-gold)]/70">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
            Primary Source · Three Layers
          </span>
          <h1 className="mt-3 font-display text-[2rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl lg:text-5xl">
            Parallel-Sanskrit Reader
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-bone)]/75 sm:text-base">
            Primary-source verses presented in three parallel layers: Devanagari, IAST transliteration, and English translation — with hover-to-reveal word-by-word parsing. For scholarly study of the actual sounds.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="space-y-8">
          {READER_ENTRIES.map((entry, i) => (
            <Link
              key={entry.slug}
              href={`/reader/${entry.slug}`}
              className="group block rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6 transition motion-safe motion-reduce:transition-none sm:p-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl text-[var(--color-ivory)] transition group-hover:text-[var(--color-gold-bright)] sm:text-2xl">
                  {entry.title}
                </h2>
                <span className="shrink-0 text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {entry.tradition}
                </span>
              </div>
              <p className="mt-2 font-display text-base text-[var(--color-gold-bright)]/85 sm:text-lg">
                {entry.devanagari.split(" ").slice(0, 4).join(" ")}{entry.devanagari.split(" ").length > 4 ? "…" : ""}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]/70">
                {entry.english.slice(0, 180)}{entry.english.length > 180 ? "…" : ""}
              </p>
              <p className="mt-3 text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                {entry.source}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
