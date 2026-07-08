"use client";

import { useVaultData, type JournalEntry, type JapaSession, type CycleEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function InsightsPage() {
  const { data: entries } = useVaultData<JournalEntry[]>("journal", []);
  const { data: japaSessions } = useVaultData<JapaSession[]>("japa-sessions", []);
  const { data: cycles } = useVaultData<CycleEntry[]>("cycles", []);

  // Practice frequency heatmap (last 90 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last90: { date: string; count: number }[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().slice(0, 10);
    const count = entries.filter((e) => e.date === dStr).length;
    last90.push({ date: dStr, count });
  }

  // Mood correlation: before vs after
  const moodPairs = entries.filter((e) => e.moodBefore && e.moodAfter);
  const avgBefore = moodPairs.length ? moodPairs.reduce((s, e) => s + (e.moodBefore ?? 0), 0) / moodPairs.length : 0;
  const avgAfter = moodPairs.length ? moodPairs.reduce((s, e) => s + (e.moodAfter ?? 0), 0) / moodPairs.length : 0;

  // Most practiced siddhis
  const siddhiCounts: Record<string, number> = {};
  entries.forEach((e) => {
    if (e.siddhiName) siddhiCounts[e.siddhiName] = (siddhiCounts[e.siddhiName] ?? 0) + 1;
  });
  const topSiddhis = Object.entries(siddhiCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Japa stats
  const totalJapa = japaSessions.reduce((s, j) => s + j.count, 0);
  const avgJapaPerSession = japaSessions.length ? Math.round(totalJapa / japaSessions.length) : 0;

  // Cycle stats
  const completedCycles = cycles.filter((c) => c.status === "completed").length;
  const activeCycles = cycles.filter((c) => c.status === "active").length;
  const cycleCompletionRate = cycles.length ? Math.round((completedCycles / cycles.length) * 100) : 0;

  // Practice days (unique dates with entries)
  const practiceDays = new Set(entries.map((e) => e.date)).size;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only · Computed in Browser
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Practice Insights
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Your practice data reflected back. All analytics computed client-side from your encrypted vault.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8 text-center">
          <p className="text-sm text-[var(--color-bone)]/65">
            No practice data yet. Log sessions in your journal to see insights.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Key stats */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-gold)]/15 sm:grid-cols-4">
            <Stat label="Practice Days" value={practiceDays} />
            <Stat label="Total Japa" value={totalJapa.toLocaleString()} />
            <Stat label="Cycles Done" value={`${completedCycles}/${cycles.length}`} />
            <Stat label="Cycle Rate" value={`${cycleCompletionRate}%`} />
          </div>

          {/* Mood correlation */}
          {moodPairs.length > 0 && (
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5">
              <h2 className="font-display text-lg text-[var(--color-gold-bright)]">Mood Shift</h2>
              <p className="mt-1 text-xs text-[var(--color-bone)]/55">{moodPairs.length} sessions with mood data</p>
              <div className="mt-4 flex items-center justify-center gap-8">
                <div className="text-center">
                  <p className="font-display text-3xl text-[var(--color-rose-accent)]/70">{avgBefore.toFixed(1)}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Before</p>
                </div>
                <span className="text-2xl text-[var(--color-gold)]">→</span>
                <div className="text-center">
                  <p className="font-display text-3xl text-[var(--color-sage)]">{avgAfter.toFixed(1)}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">After</p>
                </div>
                <span className="text-2xl text-[var(--color-gold)]">=</span>
                <div className="text-center">
                  <p className="font-display text-3xl text-[var(--color-gold-bright)]">+{(avgAfter - avgBefore).toFixed(1)}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Shift</p>
                </div>
              </div>
              {avgAfter - avgBefore < 0.5 && (
                <p className="mt-3 text-center text-xs italic text-[var(--color-rose-accent)]/70">
                  ⚠ Low mood shift — consider grounding practices or a gentler siddhi.
                </p>
              )}
            </div>
          )}

          {/* 90-day heatmap */}
          <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5">
            <h2 className="font-display text-lg text-[var(--color-gold-bright)]">90-Day Practice Heatmap</h2>
            <div className="mt-4 grid grid-cols-[repeat(15,1fr)] gap-1 sm:grid-cols-[repeat(30,1fr)]">
              {last90.map((d) => (
                <div
                  key={d.date}
                  className="aspect-square rounded-sm"
                  style={{
                    backgroundColor: d.count === 0 ? "rgba(36,32,25,0.3)" : `rgba(201,152,94,${Math.min(0.3 + d.count * 0.25, 1)})`,
                  }}
                  title={`${d.date}: ${d.count} session${d.count !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
              <span>90 days ago</span>
              <span>Less</span>
              <div className="flex gap-0.5">
                {[0.2, 0.4, 0.6, 0.8, 1].map((o) => (
                  <div key={o} className="h-2 w-2 rounded-sm" style={{ backgroundColor: `rgba(201,152,94,${o})` }} />
                ))}
              </div>
              <span>More</span>
              <span>Today</span>
            </div>
          </div>

          {/* Top practices */}
          {topSiddhis.length > 0 && (
            <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5">
              <h2 className="font-display text-lg text-[var(--color-gold-bright)]">Most Practiced</h2>
              <div className="mt-3 space-y-2">
                {topSiddhis.map(([name, count], i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40 w-4">{i + 1}</span>
                    <span className="flex-1 text-sm text-[var(--color-bone)]/75 truncate">{name}</span>
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-obsidian)]">
                      <div className="h-full bg-[var(--color-gold)]" style={{ width: `${(count / topSiddhis[0][1]) * 100}%` }} />
                    </div>
                    <span className="text-xs text-[var(--color-gold-bright)] w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Japa stats */}
          {japaSessions.length > 0 && (
            <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5">
              <h2 className="font-display text-lg text-[var(--color-gold-bright)]">Japa Summary</h2>
              <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-display text-xl text-[var(--color-gold-bright)]">{japaSessions.length}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Sessions</p>
                </div>
                <div>
                  <p className="font-display text-xl text-[var(--color-gold-bright)]">{totalJapa.toLocaleString()}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Total Count</p>
                </div>
                <div>
                  <p className="font-display text-xl text-[var(--color-gold-bright)]">{avgJapaPerSession}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Avg / Session</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-[var(--color-ink)] p-3 text-center sm:p-4">
      <p className="font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">{value}</p>
      <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">{label}</p>
    </div>
  );
}
