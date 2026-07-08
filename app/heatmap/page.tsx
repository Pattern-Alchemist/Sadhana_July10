"use client";
import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function HeatmapPage() {
  const { data: entries } = useVaultData<JournalEntry[]>("journal", []);

  // Build 365-day map
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: { date: string; count: number }[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().slice(0, 10);
    const count = entries.filter((e) => e.date === dStr).length;
    days.push({ date: dStr, count });
  }

  // Group into weeks (columns of 7)
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const practiceDays = days.filter((d) => d.count > 0).length;
  const totalSessions = entries.length;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Practice Heatmap — Year View</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">365 days of practice at a glance.</p>
      </header>
      <div className="mb-4 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-[var(--color-hairline)] bg-[var(--color-gold)]/15">
        <div className="bg-[var(--color-ink)] p-3 text-center"><p className="font-display text-xl text-[var(--color-gold-bright)]">{practiceDays}</p><p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Practice Days</p></div>
        <div className="bg-[var(--color-ink)] p-3 text-center"><p className="font-display text-xl text-[var(--color-gold-bright)]">{totalSessions}</p><p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Total Sessions</p></div>
        <div className="bg-[var(--color-ink)] p-3 text-center"><p className="font-display text-xl text-[var(--color-gold-bright)]">{Math.round((practiceDays / 365) * 100)}%</p><p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Consistency</p></div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1" style={{ minWidth: "fit-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <div key={di} className="h-3 w-3 rounded-sm" style={{ backgroundColor: day.count === 0 ? "rgba(36,32,25,0.3)" : `rgba(201,152,94,${Math.min(0.3 + day.count * 0.25, 1)})` }} title={`${day.date}: ${day.count}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
        <span>Less</span>
        {[0.2, 0.4, 0.6, 0.8, 1].map((o) => <div key={o} className="h-2 w-2 rounded-sm" style={{ backgroundColor: `rgba(201,152,94,${o})` }} />)}
        <span>More</span>
      </div>
    </div>
  );
}
