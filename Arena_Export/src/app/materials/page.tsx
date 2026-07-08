"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface Material { id: string; name: string; quantity: string; cost: string; needed: boolean; }

export default function MaterialsPage() {
  const { data: items, setData: setItems } = useVaultData<Material[]>("materials", []);
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [cost, setCost] = useState("");

  function add() { if (!name) return; setItems((p) => [...p, { id: crypto.randomUUID(), name, quantity: qty, cost, needed: true }]); setName(""); setQty(""); setCost(""); }
  function toggle(id: string) { setItems((p) => p.map((m) => m.id === id ? { ...m, needed: !m.needed } : m)); }
  function remove(id: string) { setItems((p) => p.filter((m) => m.id !== id)); }

  const totalCost = items.filter((m) => m.needed).reduce((s, m) => s + (parseFloat(m.cost) || 0), 0);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Pūjā Materials Tracker</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Shopping list + budget for practice materials.</p>
      </header>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Item (e.g. sesame oil)" className="field text-sm" />
        <input type="text" value={qty} onChange={(e)=>setQty(e.target.value)} placeholder="Qty" className="field text-sm" />
        <div className="flex gap-1">
          <input type="text" value={cost} onChange={(e)=>setCost(e.target.value)} placeholder="₹" className="field text-sm" />
          <button onClick={add} className="btn-gold text-xs px-2">+</button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((m) => (
          <div key={m.id} className={`flex items-center gap-2 rounded-sm border p-3 ${m.needed ? "border-[var(--color-gold)]/30 bg-[var(--color-ink)]/40" : "border-[var(--color-hairline)] bg-[var(--color-ink)]/20 opacity-50"}`}>
            <input type="checkbox" checked={!m.needed} onChange={() => toggle(m.id)} className="accent-[var(--color-gold)]" />
            <span className={`flex-1 text-sm ${m.needed ? "text-[var(--color-ivory)]" : "text-[var(--color-bone)]/50 line-through"}`}>{m.name}</span>
            {m.quantity && <span className="text-xs text-[var(--color-bone)]/55">{m.quantity}</span>}
            {m.cost && <span className="text-xs text-[var(--color-gold-bright)]">₹{m.cost}</span>}
            <button onClick={() => remove(m.id)} className="text-xs text-[var(--color-rose-accent)]/60 hover:text-[var(--color-rose-accent)]">✕</button>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="mt-4 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-3 text-center">
          <span className="text-xs text-[var(--color-bone)]/65">Needed items total: </span>
          <span className="font-display text-lg text-[var(--color-gold-bright)]">₹{totalCost.toFixed(0)}</span>
        </div>
      )}
    </div>
  );
}
