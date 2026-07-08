"use client";

import { useState } from "react";
import { RITUALS } from "@/lib/ritual-machine";
import RitualExperience from "@/components/ritual/RitualExperience";
import { OmGlyph } from "@/components/Symbols";

export default function RitualPage() {
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);

  if (selectedRitual) {
    const ritual = RITUALS.find((r) => r.id === selectedRitual);
    if (ritual) return <RitualExperience ritual={ritual} onExit={() => setSelectedRitual(null)} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Guided Ritual · Press & Hold
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Ritual Mode
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          A guided offering sequence. Press and hold each offering to charge it,
          then release to offer. The ritual auto-logs to your journal on completion.
        </p>
      </header>

      <div className="space-y-4">
        {RITUALS.map((ritual) => (
          <button
            key={ritual.id}
            onClick={() => setSelectedRitual(ritual.id)}
            className="group block w-full rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5 text-left transition hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-ink)]/70 card-3d"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-lg text-[var(--color-ivory)] transition group-hover:text-[var(--color-gold-bright)]">
                  {ritual.title}
                </h3>
                {ritual.sanskrit && (
                  <p className="mt-0.5 font-display text-sm italic text-[var(--color-gold)]/70">
                    {ritual.sanskrit}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                {ritual.steps.length} steps
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-bone)]/65">
              {ritual.description}
            </p>
            {ritual.deity && (
              <p className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">
                For {ritual.deity}
              </p>
            )}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35">
        Tap a ritual to begin · Press and hold each offering to charge it
      </p>
    </div>
  );
}
