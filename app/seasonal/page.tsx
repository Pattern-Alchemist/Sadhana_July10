import { SEASONS, getCurrentSeason } from "@/lib/practice-data";
import { OmGlyph } from "@/components/Symbols";

export default function SeasonalPage() {
  const current = getCurrentSeason();
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Seasonal Practice</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Āyurvedic ṛtu (seasonal) framework for practice selection.</p>
      </header>
      <div className="mb-6 rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 p-5 text-center">
        <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Current Season</p>
        <h2 className="mt-2 font-display text-2xl text-[var(--color-gold-bright)]">{current.name}</h2>
        <p className="mt-1 text-xs text-[var(--color-bone)]/55">{current.months} · {current.element} predominant</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]/75">{current.recommendation}</p>
      </div>
      <div className="space-y-3">
        {SEASONS.map((s) => (
          <div key={s.id} className={`rounded-sm border p-4 ${s.id === current.id ? "border-[var(--color-gold)]/30" : "border-[var(--color-hairline)] bg-[var(--color-ink)]/30"}`}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-sm text-[var(--color-gold-bright)]">{s.name}</h3>
              <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">{s.months}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-bone)]/65">{s.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
