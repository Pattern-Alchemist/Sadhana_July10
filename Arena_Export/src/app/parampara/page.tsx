"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface GuruEntry { id: string; name: string; dates: string; tradition: string; note: string; order: number; }

export default function ParamparaPage() {
  const { data: gurus, setData: setGurus } = useVaultData<GuruEntry[]>("parampara", []);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [tradition, setTradition] = useState("");
  const [note, setNote] = useState("");

  function add() {
    if (!name) return;
    const order = gurus.length;
    setGurus((p) => [...p, { id: crypto.randomUUID(), name, dates, tradition, note, order }]);
    setName(""); setDates(""); setTradition(""); setNote(""); setShow(false);
  }
  function remove(id: string) { setGurus((p) => p.filter((g) => g.id !== id)); }

  const sorted = [...gurus].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Guru Paramparā</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Your personal transmission chain. Build from your guru upward.</p>
      </header>
      <div className="mb-4 flex justify-between">
        <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">{gurus.length} entries</span>
        <button onClick={() => setShow(!show)} className="btn-gold text-xs">+ Add Guru</button>
      </div>
      {show && (
        <div className="mb-4 space-y-3 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4">
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="field text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value={dates} onChange={(e)=>setDates(e.target.value)} placeholder="Dates (e.g. 1950-2020)" className="field text-sm" />
            <input type="text" value={tradition} onChange={(e)=>setTradition(e.target.value)} placeholder="Tradition" className="field text-sm" />
          </div>
          <textarea value={note} onChange={(e)=>setNote(e.target.value)} rows={2} placeholder="Note…" className="field text-sm" />
          <div className="flex gap-2"><button onClick={add} className="btn-gold text-xs">Add</button><button onClick={()=>setShow(false)} className="btn-ghost text-xs">Cancel</button></div>
        </div>
      )}
      <div className="space-y-3">
        {sorted.map((g, i) => (
          <div key={g.id} className="relative pl-8">
            {i < sorted.length - 1 && <div className="absolute left-3 top-12 bottom-0 w-px bg-[var(--color-gold)]/30" />}
            <div className="absolute left-0 top-3 grid h-6 w-6 place-items-center rounded-full border border-[var(--color-gold)]/50 text-[0.5rem] text-[var(--color-gold-bright)]">{i + 1}</div>
            <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm text-[var(--color-gold-bright)]">{g.name}</span>
                <button onClick={() => remove(g.id)} className="text-xs text-[var(--color-rose-accent)]/60 hover:text-[var(--color-rose-accent)]">✕</button>
              </div>
              {g.dates && <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45"> {g.dates}</span>}
              {g.tradition && <span className="text-[0.5rem] text-[var(--color-bone)]/40"> · {g.tradition}</span>}
              {g.note && <p className="mt-1 text-xs text-[var(--color-bone)]/60">{g.note}</p>}
            </div>
          </div>
        ))}
        {gurus.length === 0 && <p className="text-center text-sm text-[var(--color-bone)]/50 py-8">Add your guru to begin your paramparā.</p>}
      </div>
    </div>
  );
}
