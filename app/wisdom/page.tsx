"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface WisdomNote { id: string; siddhiSlug: string; type: "worked" | "didnt" | "differently"; text: string; date: string; }

export default function WisdomPage() {
  const { data: notes, setData: setNotes } = useVaultData<WisdomNote[]>("wisdom", []);
  const [siddhi, setSiddhi] = useState("");
  const [type, setType] = useState<WisdomNote["type"]>("worked");
  const [text, setText] = useState("");

  function add() { if (!text) return; setNotes((p) => [{ id: crypto.randomUUID(), siddhiSlug: siddhi, type, text, date: new Date().toISOString().slice(0,10) }, ...p]); setText(""); }
  function remove(id: string) { setNotes((p) => p.filter((n) => n.id !== id)); }

  const typeLabels = { worked: "✓ What Worked", didnt: "✕ What Didn't", differently: "↻ What I'd Do Differently" };
  const typeColors = { worked: "var(--color-sage)", didnt: "var(--color-rose-accent)", differently: "var(--color-gold-bright)" };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Practice Wisdom Board</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Accumulated wisdom per siddhi — what worked, what didn't, what you'd change.</p>
      </header>
      <div className="mb-4 space-y-2 rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-4">
        <input type="text" value={siddhi} onChange={(e)=>setSiddhi(e.target.value)} placeholder="Siddhi / practice name" className="field text-sm" />
        <div className="flex gap-2">
          {(Object.keys(typeLabels) as WisdomNote["type"][]).map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-sm border px-2 py-1 text-[0.5rem] uppercase tracking-luxe transition ${type === t ? "border-current" : "border-[var(--color-hairline)] text-[var(--color-bone)]/40"}`} style={type === t ? { color: typeColors[t], borderColor: typeColors[t] } : {}}>{typeLabels[t].split(" ")[1]}</button>
          ))}
        </div>
        <textarea value={text} onChange={(e)=>setText(e.target.value)} rows={2} placeholder="Your wisdom note…" className="field text-sm" />
        <button onClick={add} className="btn-gold text-xs">Add Note</button>
      </div>
      <div className="space-y-2">
        {notes.map((n) => (
          <div key={n.id} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.5rem] uppercase tracking-luxe" style={{ color: typeColors[n.type] }}>{typeLabels[n.type].split(" ")[1]}</span>
              <button onClick={() => remove(n.id)} className="text-xs text-[var(--color-rose-accent)]/60 hover:text-[var(--color-rose-accent)]">✕</button>
            </div>
            <p className="mt-1 text-sm text-[var(--color-bone)]/75">{n.text}</p>
            {n.siddhiSlug && <p className="mt-0.5 text-[0.5rem] text-[var(--color-bone)]/35">{n.siddhiSlug} · {n.date}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
