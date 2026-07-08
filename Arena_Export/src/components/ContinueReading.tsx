"use client";

import Link from "next/link";
import { useReadingProgress } from "./useReadingProgress";

/**
 * ContinueReading — client component for the homepage.
 * Shows up to 6 recently-viewed siddhis as quick-link cards.
 * Hidden on first visit (no history yet).
 */
export default function ContinueReading({
  siddhiNames,
}: {
  siddhiNames: Record<string, { name: string; sanskrit: string | null; category: string | null }>;
}) {
  const { viewed, isHydrated, clearProgress } = useReadingProgress();

  if (!isHydrated || viewed.length === 0) return null;

  const recent = viewed.slice(0, 6);
  const known = recent.filter((slug) => siddhiNames[slug]);
  if (known.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
            Your Path So Far
          </span>
          <h2 className="mt-2 font-display text-xl text-[var(--color-ivory)] sm:text-2xl">
            Continue reading
          </h2>
        </div>
        <button
          onClick={clearProgress}
          className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45 transition motion-safe hover:text-[var(--color-rose-accent)]"
          aria-label="Clear reading history"
        >
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {known.map((slug, i) => {
          const s = siddhiNames[slug];
          return (
            <Link
              key={slug}
              href={`/siddhi/${slug}`}
              className="list-item-enter-active group flex items-center gap-3 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-3 transition motion-safe motion-reduce:transition-none sm:p-4"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/30 text-xs text-[var(--color-gold-bright)]">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm text-[var(--color-ivory)] transition motion-safe group-hover:text-[var(--color-gold-bright)]">
                  {s.name}
                </p>
                <p className="truncate text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {s.category ?? "—"}
                </p>
              </div>
              <span className="text-[var(--color-gold)]/50 transition motion-safe group-hover:translate-x-0.5 group-hover:text-[var(--color-gold-bright)]">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
