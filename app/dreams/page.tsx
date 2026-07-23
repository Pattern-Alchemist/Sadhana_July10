"use client";

import { useState, useMemo } from "react";
import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

const DREAM_TYPES = [
  { id: "lucid", label: "Lucid", color: "var(--color-cyan-accent)" },
  { id: "visitation", label: "Visitation", color: "var(--color-gold-bright)" },
  { id: "symbolic", label: "Symbolic", color: "var(--color-purple-accent)" },
  { id: "preognitive", label: "Precognitive", color: "var(--color-sage)" },
  { id: "disturbing", label: "Disturbing", color: "var(--color-rose-accent)" },
  { id: "neutral", label: "Neutral", color: "var(--color-bone)" },
];

export default function DreamsPage() {
  const { data: entries } = useVaultData<JournalEntry[]>("journal", []);
  const { data: taggedDreams, setData: setTaggedDreams } = useVaultData<Record<string, string>>("dream-tags", {});

  // Filter entries that have dream content
  const dreamEntries = useMemo(
    () => entries.filter((e) => e.dreams && e.dreams.trim().length > 0).sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  // Pattern detection
  const patterns: string[] = [];
  if (dreamEntries.length >= 3) {
    // Check for recurring siddhi + dream correlation
    const siddhiDreamCounts: Record<string, number> = {};
    dreamEntries.forEach((e) => {
      if (e.siddhiName) siddhiDreamCounts[e.siddhiName] = (siddhiDreamCounts[e.siddhiName] ?? 0) + 1;
    });
    for (const [siddhi, count] of Object.entries(siddhiDreamCounts)) {
      if (count >= 2) {
        patterns.push(`You've had ${count} dream logs after ${siddhi} practice.`);
      }
    }
    // Check for disturbing dream frequency
    const disturbing = dreamEntries.filter((e) => taggedDreams[e.id] === "disturbing");
    if (disturbing.length >= 3) {
      patterns.push(`${disturbing.length} dreams tagged "disturbing" — consider grounding practices.`);
    }
    // Check for visitation frequency
    const visitations = dreamEntries.filter((e) => taggedDreams[e.id] === "visitation");
    if (visitations.length >= 2) {
      patterns.push(`${visitations.length} visitation-type dreams recorded — significant for spirit-contact practices.`);
    }
  }

  function tagDream(entryId: string, type: string) {
    setTaggedDreams((prev: Record<string, string>) => ({ ...prev, [entryId]: prev[entryId] === type ? "" : type }));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Dream Journal
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Dreams logged from your practice journal. Tag them to surface patterns over time.
        </p>
      </header>

      {patterns.length > 0 && (
        <div className="mb-6 rounded-sm border border-[var(--color-cyan-accent)]/20 bg-[var(--color-cyan-accent)]/5 p-4">
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-cyan-accent)]/80">Patterns Detected</p>
          <ul className="mt-2 space-y-1">
            {patterns.map((p, i) => (
              <li key={i} className="text-xs text-[var(--color-bone)]/75">• {p}</li>
            ))}
          </ul>
        </div>
      )}

      {dreamEntries.length === 0 ? (
        <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-8 text-center">
          <p className="text-sm text-[var(--color-bone)]/65">
            No dream logs yet. Record dreams in your practice journal — they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {dreamEntries.map((entry) => {
            const tag = taggedDreams[entry.id] ?? "";
            const tagInfo = DREAM_TYPES.find((t) => t.id === tag);
            return (
              <div key={entry.id} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-xs text-[var(--color-gold)]/70">
                      {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    {entry.siddhiName && (
                      <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">After: {entry.siddhiName}</p>
                    )}
                  </div>
                  {tagInfo && (
                    <span className="text-[0.5rem] uppercase tracking-luxe" style={{ color: tagInfo.color }}>{tagInfo.label}</span>
                  )}
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-bone)]/75">{entry.dreams}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {DREAM_TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => tagDream(entry.id, t.id)}
                      className={`rounded-full border px-2 py-0.5 text-[0.5rem] uppercase tracking-luxe transition motion-safe motion-reduce:transition-none ${
                        tag === t.id ? "border-current" : "border-[var(--hairline)] text-[var(--color-bone)]/40"
                      }`}
                      style={tag === t.id ? { color: t.color, borderColor: t.color } : {}}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
