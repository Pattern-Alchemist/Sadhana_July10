"use client";

import { useMemo, useState } from "react";

interface AuditItem {
  id: string;
  label: string;
  weight: number;
  help: string;
}

const ITEMS: AuditItem[] = [
  { id: "intention", label: "Intention is framed (saṅkalpa)", weight: 18, help: "A clear, non-acquisitive purpose stated." },
  { id: "guide", label: "Qualified guidance obtained", weight: 16, help: "Especially for intermediate / advanced practice." },
  { id: "posture", label: "Body settled & upright", weight: 12, help: "Stable seat, spine alert, not strained." },
  { id: "stomach", label: "Light / empty stomach", weight: 8, help: "Practice before heavy meals." },
  { id: "environment", label: "Calm, undisturbed setting", weight: 10, help: "Phone silenced, fire-safety observed for flames." },
  { id: "breath", label: "Breath unforced", weight: 14, help: "No strain, no retention to dizziness." },
  { id: "grounding", label: "Grounding known", weight: 12, help: "You know how to close & return to ordinary mind." },
  { id: "honesty", label: "Honesty over experience", weight: 10, help: "Documenting, not chasing phenomena." },
];

export default function ReadinessValidator() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const { score, missing } = useMemo(() => {
    let s = 0;
    const m: string[] = [];
    for (const it of ITEMS) {
      if (checked[it.id]) s += it.weight;
      else m.push(it.label);
    }
    return { score: Math.min(100, s), missing: m };
  }, [checked]);

  const band =
    score >= 85
      ? { label: "Attuned", color: "var(--color-sage)", note: "A measured threshold to begin." }
      : score >= 55
      ? { label: "Preparing", color: "var(--color-gold-bright)", note: "Address the outstanding items." }
      : { label: "Not yet", color: "var(--color-rose-accent)", note: "Pause and prepare the ground first." };

  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
          Harmonic Readiness Score
        </span>
        <div className="relative grid h-28 w-28 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-stone)" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke={band.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 276.46} 276.46`}
              style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease" }}
            />
          </svg>
          <div>
            <span className="font-display text-3xl text-[var(--color-ivory)]">{score}</span>
            <span className="text-sm text-[var(--color-bone)]/55">/100</span>
          </div>
        </div>
        <span className="font-display text-xl" style={{ color: band.color }}>
          {band.label}
        </span>
        <p className="text-xs italic text-[var(--color-bone)]/55">{band.note}</p>
      </div>

      <div className="mt-6 space-y-2">
        {ITEMS.map((it) => (
          <button
            key={it.id}
            onClick={() => setChecked((c) => ({ ...c, [it.id]: !c[it.id] }))}
            className={`flex w-full items-start gap-3 rounded-sm border px-3 py-2.5 text-left transition ${
              checked[it.id]
                ? "border-[var(--color-sage)]/40 bg-[var(--color-sage)]/5"
                : "border-[var(--hairline)] hover:border-[var(--color-gold)]/40"
            }`}
          >
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.6rem] ${
                checked[it.id]
                  ? "border-[var(--color-sage)] bg-[var(--color-sage)]/20 text-[var(--color-sage)]"
                  : "border-[var(--color-bone)]/40"
              }`}
            >
              {checked[it.id] ? "✓" : ""}
            </span>
            <span>
              <span className="block text-sm text-[var(--color-ivory)]/90">{it.label}</span>
              <span className="block text-xs text-[var(--color-bone)]/55">{it.help}</span>
            </span>
          </button>
        ))}
      </div>

      {missing.length > 0 && score < 100 && (
        <p className="mt-4 text-center text-xs text-[var(--color-bone)]/50">
          Remaining: {missing.slice(0, 3).join(" · ")}
          {missing.length > 3 ? " …" : ""}
        </p>
      )}
    </div>
  );
}
