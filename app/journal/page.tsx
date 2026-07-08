"use client";

import { useState } from "react";
import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";

export default function JournalPage() {
  const { data: entries, setData: setEntries, loading } = useVaultData<JournalEntry[]>("journal", []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sorted = [...entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function addEntry(entry: Omit<JournalEntry, "id" | "createdAt">) {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setShowForm(false);
    setEditingId(null);
  }

  function deleteEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Practice Journal
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Your private record of every practice session. AES-256 encrypted, stored only on this device.
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}
        </p>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); }}
          className="btn-gold text-xs sm:text-sm"
        >
          + New Entry
        </button>
      </div>

      {showForm && (
        <EntryForm onSubmit={addEntry} onCancel={() => setShowForm(false)} />
      )}

      {loading ? (
        <p className="text-center text-sm text-[var(--color-bone)]/50">Loading…</p>
      ) : sorted.length === 0 && !showForm ? (
        <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8 text-center">
          <p className="text-sm text-[var(--color-bone)]/65">
            No entries yet. Begin your practice record.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onDelete={() => deleteEntry(entry.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function EntryForm({
  onSubmit,
  onCancel,
  initial,
}: {
  onSubmit: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  onCancel: () => void;
  initial?: JournalEntry;
}) {
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [siddhiName, setSiddhiName] = useState(initial?.siddhiName ?? "");
  const [duration, setDuration] = useState(initial?.duration?.toString() ?? "");
  const [japaCount, setJapaCount] = useState(initial?.japaCount?.toString() ?? "");
  const [moodBefore, setMoodBefore] = useState(initial?.moodBefore?.toString() ?? "");
  const [moodAfter, setMoodAfter] = useState(initial?.moodAfter?.toString() ?? "");
  const [insights, setInsights] = useState(initial?.insights ?? "");
  const [disturbances, setDisturbances] = useState(initial?.disturbances ?? "");
  const [dreams, setDreams] = useState(initial?.dreams ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      date,
      siddhiName: siddhiName || undefined,
      duration: duration ? parseInt(duration) : undefined,
      japaCount: japaCount ? parseInt(japaCount) : undefined,
      moodBefore: moodBefore ? parseInt(moodBefore) : undefined,
      moodAfter: moodAfter ? parseInt(moodAfter) : undefined,
      insights: insights || undefined,
      disturbances: disturbances || undefined,
      dreams: dreams || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="field mt-1 text-sm" required />
        </div>
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Siddhi / Practice</label>
          <input type="text" value={siddhiName} onChange={(e) => setSiddhiName(e.target.value)} placeholder="e.g. Pranava Japa" className="field mt-1 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Duration (min)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="field mt-1 text-sm" />
        </div>
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Japa Count</label>
          <input type="number" value={japaCount} onChange={(e) => setJapaCount(e.target.value)} className="field mt-1 text-sm" />
        </div>
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Mood Before (1-5)</label>
          <input type="number" min={1} max={5} value={moodBefore} onChange={(e) => setMoodBefore(e.target.value)} className="field mt-1 text-sm" />
        </div>
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Mood After (1-5)</label>
          <input type="number" min={1} max={5} value={moodAfter} onChange={(e) => setMoodAfter(e.target.value)} className="field mt-1 text-sm" />
        </div>
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Insights</label>
        <textarea value={insights} onChange={(e) => setInsights(e.target.value)} rows={2} className="field mt-1 text-sm" />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Disturbances</label>
        <textarea value={disturbances} onChange={(e) => setDisturbances(e.target.value)} rows={2} className="field mt-1 text-sm" placeholder="Any physical, emotional, or energetic disturbances…" />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Dreams (that night)</label>
        <textarea value={dreams} onChange={(e) => setDreams(e.target.value)} rows={2} className="field mt-1 text-sm" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-gold text-xs">Save Entry</button>
        <button type="button" onClick={onCancel} className="btn-ghost text-xs">Cancel</button>
      </div>
    </form>
  );
}

function EntryCard({ entry, onDelete }: { entry: JournalEntry; onDelete: () => void }) {
  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <p className="font-display text-base text-[var(--color-gold-bright)]">
            {entry.siddhiName ?? "Practice"}
          </p>
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            {new Date(entry.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            {entry.duration ? ` · ${entry.duration} min` : ""}
            {entry.japaCount ? ` · ${entry.japaCount} japa` : ""}
          </p>
        </div>
        <button onClick={onDelete} className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60 transition hover:text-[var(--color-rose-accent)]">
          Delete
        </button>
      </div>
      {(entry.moodBefore || entry.moodAfter) && (
        <p className="mt-2 text-xs text-[var(--color-bone)]/60">
          Mood: {entry.moodBefore ?? "—"} → {entry.moodAfter ?? "—"}
        </p>
      )}
      {entry.insights && (
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/80">{entry.insights}</p>
      )}
      {entry.disturbances && (
        <p className="mt-1 text-xs italic text-[var(--color-rose-accent)]/70">⚠ {entry.disturbances}</p>
      )}
      {entry.dreams && (
        <p className="mt-1 text-xs italic text-[var(--color-cyan-accent)]/70">◐ {entry.dreams}</p>
      )}
    </div>
  );
}
