"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface FastEntry { id: string; date: string; type: string; startTime: string; endTime: string; notes: string; }

const FAST_TYPES = ["Water only", "Fruit only", "Ekādaśī", "Nirjala (no water)", "One meal before sunset", "Saltless"];

export default function FastingPage() {
  const { data: entries, setData: setEntries } = useVaultData<FastEntry[]>("fasting", []);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [type, setType] = useState(FAST_TYPES[0]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");

  function save() { setEntries((p) => [{ id: crypto.randomUUID(), date, type, startTime: start, endTime: end, notes }, ...p]); setShow(false); }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Upavāsa (Fasting) Tracker</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Track fasting days, types, and physical/mental state.</p>
      </header>
      <div className="mb-4 flex justify-between">
        <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">{entries.length} fasts logged</span>
        <button onClick={() => setShow(!show)} className="btn-gold text-xs">+ Log Fast</button>
      </div>
      {show && (
        <div className="mb-4 space-y-3 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Date</label><input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="field mt-1 text-sm" /></div>
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Type</label><select value={type} onChange={(e)=>setType(e.target.value)} className="field mt-1 text-sm">{FAST_TYPES.map((t)=><option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Start Time</label><input type="time" value={start} onChange={(e)=>setStart(e.target.value)} className="field mt-1 text-sm" /></div>
            <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">End Time</label><input type="time" value={end} onChange={(e)=>setEnd(e.target.value)} className="field mt-1 text-sm" /></div>
          </div>
          <div><label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Notes</label><textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={2} className="field mt-1 text-sm" /></div>
          <div className="flex gap-2"><button onClick={save} className="btn-gold text-xs">Save</button><button onClick={()=>setShow(false)} className="btn-ghost text-xs">Cancel</button></div>
        </div>
      )}
      <div className="space-y-2">
        {[...entries].sort((a,b)=>b.date.localeCompare(a.date)).map((e) => (
          <div key={e.id} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[var(--color-gold-bright)]">{e.type}</span>
              <span className="text-[0.5rem] text-[var(--color-bone)]/45">{new Date(e.date).toLocaleDateString()}</span>
            </div>
            {(e.startTime || e.endTime) && <p className="mt-0.5 text-xs text-[var(--color-bone)]/55">{e.startTime} → {e.endTime}</p>}
            {e.notes && <p className="mt-0.5 text-xs italic text-[var(--color-bone)]/55">{e.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
