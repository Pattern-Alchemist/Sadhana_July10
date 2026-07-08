"use client";
import { useState } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

const TEMPLATES = [
  { id: "healing", label: "Healing", text: "May this practice bring healing to myself and all beings who suffer." },
  { id: "protection", label: "Protection", text: "May this practice establish a mantle of protection around me and those in my care." },
  { id: "liberation", label: "Liberation", text: "May this practice dissolve the bonds that obscure the recognition of my true nature." },
  { id: "wisdom", label: "Wisdom", text: "May this practice open the doorway to direct knowledge of the Self." },
  { id: "devotion", label: "Devotion", text: "May this practice deepen my surrender to the divine will." },
  { id: "release", label: "Release", text: "May this practice sever the karmic bonds that bind me to suffering." },
];

export default function SankalpaPage() {
  const { data: saved, setData: setSaved } = useVaultData<{id:string; text:string; pinned:boolean}[]>("sankalpas", []);
  const [text, setText] = useState("");
  const [pinned, setPinned] = useState(false);

  function save() { if (!text.trim()) return; setSaved((p) => [...p, { id: crypto.randomUUID(), text, pinned }]); setText(""); setPinned(false); }
  function togglePin(id: string) { setSaved((p) => p.map((s) => s.id === id ? { ...s, pinned: !s.pinned } : s)); }
  function remove(id: string) { setSaved((p) => p.filter((s) => s.id !== id)); }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Saṅkalpa Builder</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Formulate your intention. Pin one to the homepage as a daily anchor.</p>
      </header>
      <div className="mb-4 flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => setText(t.text)} className="rounded-full border border-[var(--color-hairline)] px-3 py-1 text-xs text-[var(--color-bone)]/65 transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]">{t.label}</button>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} className="field text-sm mb-3" placeholder="Your saṅkalpa…" />
      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-xs text-[var(--color-bone)]/65"><input type="checkbox" checked={pinned} onChange={(e)=>setPinned(e.target.checked)} className="accent-[var(--color-gold)]" /> Pin to homepage</label>
        <button onClick={save} className="btn-gold text-xs">Save</button>
      </div>
      <div className="space-y-2">
        {saved.map((s) => (
          <div key={s.id} className="flex items-start gap-2 rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
            <p className="flex-1 text-sm italic text-[var(--color-bone)]/75">{s.text}</p>
            {s.pinned && <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold-bright)]">📌 Pinned</span>}
            <button onClick={() => togglePin(s.id)} className="text-xs text-[var(--color-bone)]/40 hover:text-[var(--color-gold-bright)]">📌</button>
            <button onClick={() => remove(s.id)} className="text-xs text-[var(--color-rose-accent)]/60 hover:text-[var(--color-rose-accent)]">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
