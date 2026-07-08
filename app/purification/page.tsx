"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface Purification { id: string; startDate: string; night: number; checks: Record<string, boolean>; }

const NIGHT_STEPS = [
  { id: "agni-jala", label: "Agnī-jāla Rakṣā: 7 sesame lamps, chant 21× Om Agne Jālasamantaṁ Māṁ Rakṣa Rakṣa Svāhā" },
  { id: "tripundra", label: "Tripuṇḍra: vibhūti on forehead, 3× Om Namaḥ Śivāya, rakṣā-sūtra on right wrist" },
  { id: "diet", label: "Dietary restraint: no meat/alcohol/onion/garlic, one meal before sunset" },
];

export default function PurificationPage() {
  const { data: current, setData: setCurrent } = useVaultData<Purification | null>("purification", null);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));

  function start() { setCurrent({ id: crypto.randomUUID(), startDate, night: 1, checks: {} }); }
  function toggle(id: string) { if (!current) return; setCurrent({ ...current, checks: { ...current.checks, [id]: !current.checks[id] } }); }
  function advanceNight() { if (!current || current.night >= 3) return; setCurrent({ ...current, night: current.night + 1, checks: {} }); }
  function complete() { setCurrent(null); }
  function cancel() { setCurrent(null); }

  if (!current) {
    return (
      <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
        <header className="fade-up mb-6">
          <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
          <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Purification Countdown</h1>
          <p className="mt-1 text-xs text-[var(--color-bone)]/60">3-night bhūta-śuddhi before high-caution rites.</p>
        </header>
        <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5">
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Start Date</label>
          <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="field mt-1 text-sm mb-3" />
          <button onClick={start} className="btn-gold w-full text-xs">Begin 3-Night Purification</button>
        </div>
      </div>
    );
  }

  const allDone = NIGHT_STEPS.every((s) => current.checks[s.id]);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Night {current.night} of 3</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Started {new Date(current.startDate).toLocaleDateString()}</p>
      </header>
      {/* Progress */}
      <div className="mb-6 flex justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`grid h-10 w-10 place-items-center rounded-full border ${n < current.night ? "border-[var(--color-sage)] bg-[var(--color-sage)]/10 text-[var(--color-sage)]" : n === current.night ? "border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold-bright)]" : "border-[var(--color-hairline)] text-[var(--color-bone)]/40"}`}>
            {n < current.night ? "✓" : n}
          </div>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        {NIGHT_STEPS.map((s) => (
          <label key={s.id} className={`flex items-start gap-2 rounded-sm border p-3 ${current.checks[s.id] ? "border-[var(--color-sage)]/30" : "border-[var(--color-hairline)]"}`}>
            <input type="checkbox" checked={current.checks[s.id] || false} onChange={() => toggle(s.id)} className="mt-0.5 accent-[var(--color-gold)]" />
            <span className={`text-xs ${current.checks[s.id] ? "text-[var(--color-sage)]" : "text-[var(--color-bone)]/70"}`}>{s.label}</span>
          </label>
        ))}
      </div>
      {allDone && current.night < 3 && (
        <button onClick={advanceNight} className="btn-gold w-full text-xs mb-2">Complete Night {current.night} →</button>
      )}
      {allDone && current.night === 3 && (
        <div className="rounded-sm border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/5 p-4 text-center mb-2">
          <p className="text-sm text-[var(--color-sage)]">✓ Purification complete. You are ready for the rite.</p>
          <button onClick={complete} className="mt-2 btn-gold text-xs">Acknowledge & Clear</button>
        </div>
      )}
      <button onClick={cancel} className="w-full text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/50 transition hover:text-[var(--color-rose-accent)]">Cancel Purification</button>
    </div>
  );
}
