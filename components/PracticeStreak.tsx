"use client";

import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

/**
 * PracticeStreak — shows consecutive-day practice streak.
 *
 * Reads journal entries from the vault, computes the current streak
 * (consecutive days with at least one entry), and shows milestone
 * celebrations at 7 / 21 / 41 / 108 days.
 */
export default function PracticeStreak() {
  const { data: entries, loading } = useVaultData<JournalEntry[]>("journal", []);

  if (loading || entries.length === 0) return null;

  // Get all unique practice dates
  const dates = new Set(entries.map((e) => e.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  // Compute current streak (walking backward from today)
  let streak = 0;
  let cursor = new Date(today);
  // If no entry today, start from yesterday (grace period)
  if (!dates.has(todayStr)) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Compute longest streak
  const sortedDates = Array.from(dates).sort();
  let longest = 0;
  let currentRun = 0;
  let prev: Date | null = null;
  for (const d of sortedDates) {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    if (prev) {
      const diff = Math.round((dt.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        currentRun++;
      } else {
        currentRun = 1;
      }
    } else {
      currentRun = 1;
    }
    longest = Math.max(longest, currentRun);
    prev = dt;
  }

  // Milestone check
  const milestones = [7, 21, 41, 108];
  const nextMilestone = milestones.find((m) => m > streak);
  const isMilestone = milestones.includes(streak);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-center gap-6 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 sm:p-6">
        {/* Streak number */}
        <div className="text-center">
          <p className={`font-display text-4xl sm:text-5xl ${isMilestone ? "text-[var(--color-gold-bright)]" : "text-[var(--color-gold)]"}`}>
            {streak}
          </p>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
            {streak === 1 ? "Day Streak" : "Day Streak"}
          </p>
        </div>
        <div className="h-12 w-px bg-[var(--hairline)]" />
        {/* Longest */}
        <div className="text-center">
          <p className="font-display text-2xl text-[var(--color-bone)]/70 sm:text-3xl">{longest}</p>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Longest</p>
        </div>
        {/* Next milestone */}
        {nextMilestone && (
          <>
            <div className="h-12 w-px bg-[var(--hairline)]" />
            <div className="text-center">
              <p className="font-display text-2xl text-[var(--color-gold)]/60 sm:text-3xl">{nextMilestone - streak}</p>
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">to {nextMilestone}</p>
            </div>
          </>
        )}
      </div>
      {isMilestone && (
        <p className="mt-3 text-center text-xs italic text-[var(--color-gold-bright)]">
          ✦ {streak}-day milestone reached. Anusthāna continuity sustained.
        </p>
      )}
    </div>
  );
}
