"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface EnergeticEntry { id: string; date: string; siddhiName?: string; pranaLevel: number; cakraNotes?: string; tempShift?: string; subtleBody?: string; }

export default function EnergeticsPage() {
  const { data: entries, setData: setEntries } = useVaultData<EnergeticEntry[]>("energetics", []);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [siddhiName, setSiddhiName] = useState("");
  const [prana, setPrana] = useState("3");
  const [cakra, setCakra] = useState("");
  const [temp, setTemp] = useState("");
  const [subtle, setSubtle] = useState("");

  function save() { setEntries((p) => [{ id: crypto.randomUUID(), date, siddhiName: siddhiName||undefined, pranaLevel: parseInt(prana), cakraNotes: cakra||undefined, tempShift: temp||undefined, subtleBody: subtle||undefined }, ...p]); setShow(false); setSiddhiName(""); setCakra(""); setTemp(""); setSubtle(""); }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Energetic State Journal</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Track prāṇa, cakra sensations, subtle-body observations after each practice.</p>
      </header>
      <div className="mb-4 flex justify-between">
        <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">{entries.length} entries</span>
        <button onClick={() => setShow(!show)} className="btn-gold text-xs">+ New</button>
      </div>
      {show && (
        <div className="mb-4 space-y-3 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Date</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="field mt-1 text-sm" /></div>
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Practice</label><input type="text" value={siddhiName} onChange={(e)=>setSiddhiName(e.target.value)} className="field mt-1 text-sm" /></div>
          </div>
          <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Prāṇa Level (1-5)</label><input type="range" min={1} max={5} value={prana} onChange={(e)=>setPrana(e.target.value)} className="w-full accent-[var(--color-gold)]" /><span className="text-xs text-[var(--color-gold-bright)]">{prana}</span></div>
          <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Cakra Sensations</label><input type="text" value={cakra} onChange={(e)=>setCakra(e.target.value)} placeholder="e.g. heart warmth, crown tingling" className="field mt-1 text-sm" /></div>
          <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Temperature Shift</label><input type="text" value={temp} onChange={(e)=>setTemp(e.target.value)} placeholder="e.g. hands cold, face flushed" className="field mt-1 text-sm" /></div>
          <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Subtle-Body Observations</label><textarea value={subtle} onChange={(e)=>setSubtle(e.target.value)} rows={2} className="field mt-1 text-sm" /></div>
          <div className="flex gap-2"><button onClick={save} className="btn-gold text-xs">Save</button><button onClick={()=>setShow(false)} className="btn-ghost text-xs">Cancel</button></div>
        </div>
      )}
      <div className="space-y-2">
        {[...entries].sort((a,b)=>b.date.localeCompare(a.date)).map((e) => (
          <div key={e.id} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[var(--color-gold-bright)]">{e.siddhiName ?? "Practice"}</span>
              <span className="text-[0.5rem] text-[var(--color-bone)]/45">{new Date(e.date).toLocaleDateString()}</span>
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-[var(--color-bone)]/65">
              <span>Prāṇa: {"●".repeat(e.pranaLevel)}{"○".repeat(5-e.pranaLevel)}</span>
              {e.cakraNotes && <span>· {e.cakraNotes}</span>}
            </div>
            {e.tempShift && <p className="mt-0.5 text-xs text-[var(--color-cyan-accent)]/70">{e.tempShift}</p>}
            {e.subtleBody && <p className="mt-0.5 text-xs italic text-[var(--color-bone)]/55">{e.subtleBody}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
