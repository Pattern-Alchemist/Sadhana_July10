"use client";

import { useState, useMemo } from "react";
import { OmGlyph } from "@/components/Symbols";

export default function CalculatorPage() {
  const [targetCount, setTargetCount] = useState("100000");
  const [japaPerMinute, setJapaPerMinute] = useState("8");
  const [minutesPerDay, setMinutesPerDay] = useState("30");
  const [restDays, setRestDays] = useState("1"); // rest days per week

  const result = useMemo(() => {
    const target = parseInt(targetCount) || 0;
    const rate = parseInt(japaPerMinute) || 1;
    const dailyMin = parseInt(minutesPerDay) || 1;
    const rest = parseInt(restDays) || 0;

    const japaPerDay = rate * dailyMin;
    const practiceDaysPerWeek = 7 - rest;
    const weeklyJapa = japaPerDay * practiceDaysPerWeek;
    const weeksNeeded = Math.ceil(target / weeklyJapa);
    const totalDays = weeksNeeded * 7;
    const actualDays = Math.ceil(target / japaPerDay);

    return {
      japaPerDay,
      weeksNeeded,
      totalDays,
      actualDays,
      monthsNeeded: Math.ceil(totalDays / 30),
      dailyTarget: Math.ceil(target / actualDays),
    };
  }, [targetCount, japaPerMinute, minutesPerDay, restDays]);

  const presets = [
    { label: "1 mālā (108)", count: "108" },
    { label: "11 mālā (1,188)", count: "1188" },
    { label: "Purascaraṇa (100,000)", count: "100000" },
    { label: "Mahā-purascaraṇa (1,000,000)", count: "1000000" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Anusthāna Planning
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Mantra Count Calculator
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Plan your sādhana cycle. Enter your target count and practice rate — get the timeline.
        </p>
      </header>

      <div className="space-y-6">
        {/* Inputs */}
        <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5 space-y-4">
          <div>
            <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Target Japa Count</label>
            <input type="number" value={targetCount} onChange={(e) => setTargetCount(e.target.value)} className="field mt-1 text-sm" />
            <div className="mt-2 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.count}
                  onClick={() => setTargetCount(p.count)}
                  className="rounded-full border border-[var(--hairline)] px-2.5 py-0.5 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55 transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Japa / Min</label>
              <input type="number" value={japaPerMinute} onChange={(e) => setJapaPerMinute(e.target.value)} className="field mt-1 text-sm" />
            </div>
            <div>
              <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Min / Day</label>
              <input type="number" value={minutesPerDay} onChange={(e) => setMinutesPerDay(e.target.value)} className="field mt-1 text-sm" />
            </div>
            <div>
              <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Rest Days/Wk</label>
              <input type="number" min={0} max={6} value={restDays} onChange={(e) => setRestDays(e.target.value)} className="field mt-1 text-sm" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-5">
          <h2 className="mb-4 text-center font-display text-lg text-[var(--color-gold-bright)]">Your Anusthāna Timeline</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <ResultCard label="Per Day" value={result.japaPerDay.toLocaleString()} unit="japa" />
            <ResultCard label="Daily Target" value={result.dailyTarget.toLocaleString()} unit="japa" />
            <ResultCard label="Duration" value={`${result.weeksNeeded}`} unit="weeks" />
            <ResultCard label="Calendar" value={`${result.totalDays}`} unit="days" />
          </div>
          <div className="mt-4 rounded-sm bg-[var(--color-obsidian)]/50 p-3 text-center">
            <p className="text-xs leading-relaxed text-[var(--color-bone)]/70">
              To complete <strong className="text-[var(--color-gold-bright)]">{parseInt(targetCount).toLocaleString()}</strong> repetitions
              at <strong className="text-[var(--color-gold-bright)]">{result.japaPerDay}</strong> per day
              with <strong className="text-[var(--color-gold-bright)]">{restDays}</strong> rest day(s) per week:
              approximately <strong className="text-[var(--color-gold-bright)]">{result.monthsNeeded} month(s)</strong> or
              <strong className="text-[var(--color-gold-bright)]"> {result.weeksNeeded} weeks</strong>.
            </p>
          </div>
          {result.weeksNeeded > 12 && (
            <p className="mt-3 text-center text-xs italic text-[var(--color-gold)]/60">
              A long anusthāna — consider a 41-day preliminary cycle before committing to the full count.
            </p>
          )}
          {parseInt(restDays) === 0 && (
            <p className="mt-2 text-center text-xs italic text-[var(--color-rose-accent)]/60">
              ⚠ No rest days — the traditional framework recommends at least one rest day per week.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">{value}</p>
      <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">{unit}</p>
      <p className="text-[0.4rem] uppercase tracking-luxe text-[var(--color-bone)]/35 mt-0.5">{label}</p>
    </div>
  );
}
