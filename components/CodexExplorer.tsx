"use client";

import { useState } from "react";

interface ManuscriptCardData {
  slug: string;
  title: string;
  originalTitle: string | null;
  tradition: string | null;
  century: string | null;
  catalogNumber: string | null;
  language: string | null;
  description: string | null;
  conditionRating: string | null;
  folios: number | null;
  sourceUrl: string | null;
}

export default function CodexExplorer({
  items,
}: {
  items: ManuscriptCardData[];
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.slug ?? null);

  return (
    <div className="space-y-4">
      {items.map((m) => {
        const isOpen = open === m.slug;
        return (
          <div
            key={m.slug}
            id={m.slug}
            className="overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/50"
          >
            <button
              onClick={() => setOpen(isOpen ? null : m.slug)}
              className="flex w-full items-center gap-5 px-6 py-5 text-left transition hover:bg-[var(--color-ink)]"
            >
              <span className="hidden h-14 w-10 shrink-0 place-items-center rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-parchment)]/5 sm:grid">
                <span className="font-display text-xs tracking-luxe text-[var(--color-gold)] rotate-180" style={{ writingMode: "vertical-rl" }}>
                  {m.catalogNumber}
                </span>
              </span>
              <div className="flex-1">
                <h3 className="font-display text-2xl text-[var(--color-ivory)]">
                  {m.title}
                </h3>
                <p className="mt-0.5 font-display text-base text-[var(--color-gold-bright)]">
                  {m.originalTitle}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/50">
                  <span>{m.tradition}</span>
                  <span className="text-[var(--color-gold)]/40">·</span>
                  <span>{m.century}</span>
                  <span className="text-[var(--color-gold)]/40">·</span>
                  <span>{m.folios} folios</span>
                </div>
              </div>
              <span className="text-[var(--color-gold)]/70">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="border-t border-[var(--hairline)] px-6 py-6">
                <p className="drop-cap max-w-prose text-[1.02rem] leading-[1.85] text-[var(--color-ivory)]/90">
                  {m.description}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <Meta label="Catalogue" value={m.catalogNumber ?? "—"} />
                  <Meta label="Language" value={m.language ?? "—"} />
                  <Meta label="Condition" value={m.conditionRating ?? "—"} />
                </div>
                {m.sourceUrl && (
                  <a
                    href={m.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block btn-ghost px-5 py-2.5 text-sm"
                  >
                    Consult the source text ↗
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-charcoal)]/40 p-3">
      <div className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        {label}
      </div>
      <div className="mt-1 font-display text-sm text-[var(--color-gold-bright)]">
        {value}
      </div>
    </div>
  );
}
