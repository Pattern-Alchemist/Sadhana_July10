"use client";

import { useState } from "react";
import { useVaultData, type CaseNote } from "@/components/useVaultData";
import { AFFLICTIONS, AFFLICTION_CATEGORIES } from "@/lib/affliction-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import Link from "next/link";

export default function HealingPage() {
  const [view, setView] = useState<"reference" | "case-notes">("reference");

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Healer’s Reference · Encrypted
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Healing Hub
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Browse by affliction — what the tradition prescribes. Log your healing sessions.
        </p>
      </header>

      {/* View toggle */}
      <div className="mb-6 flex justify-center">
        <div className="flex rounded-sm border border-[var(--hairline)] overflow-hidden">
          <button
            onClick={() => setView("reference")}
            className={`px-4 py-2 text-xs transition motion-safe motion-reduce:transition-none ${
              view === "reference" ? "bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/55"
            }`}
          >
            Affliction Reference
          </button>
          <button
            onClick={() => setView("case-notes")}
            className={`px-4 py-2 text-xs transition motion-safe motion-reduce:transition-none ${
              view === "case-notes" ? "bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/55"
            }`}
          >
            Case Notes
          </button>
        </div>
      </div>

      {view === "reference" ? <AfflictionReference /> : <CaseNotesView />}
    </div>
  );
}

function AfflictionReference() {
  const [category, setCategory] = useState<string | null>(null);
  const filtered = category ? AFFLICTIONS.filter((a) => a.category === category) : AFFLICTIONS;

  return (
    <div>
      {/* Category filter */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setCategory(null)}
          className={`rounded-full border px-3 py-1 text-[0.55rem] uppercase tracking-luxe transition motion-safe ${
            !category ? "border-[var(--color-gold)] text-[var(--color-gold-bright)]" : "border-[var(--hairline)] text-[var(--color-bone)]/55"
          }`}
        >
          All
        </button>
        {Object.entries(AFFLICTION_CATEGORIES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`rounded-full border px-3 py-1 text-[0.55rem] uppercase tracking-luxe transition motion-safe ${
              category === key ? "border-[var(--color-gold)] text-[var(--color-gold-bright)]" : "border-[var(--hairline)] text-[var(--color-bone)]/55"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((a) => (
          <div key={a.affliction} className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-lg text-[var(--color-gold-bright)]">{a.affliction}</h3>
              <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                {AFFLICTION_CATEGORIES[a.category]}
              </span>
            </div>
            {a.sanskrit && <p className="mt-0.5 font-display text-sm italic text-[var(--color-gold)]/70">{a.sanskrit}</p>}
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/75">{a.description}</p>

            <div className="mt-4 space-y-3">
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">The Tradition Prescribes</p>
              {a.prescribedPractices.map((p, i) => (
                <div key={i} className="rounded-sm border border-[var(--hairline)]/60 bg-[var(--color-obsidian)]/40 p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    {p.siddhiSlug ? (
                      <Link href={`/siddhi/${p.siddhiSlug}`} className="font-display text-sm text-[var(--color-ivory)] transition hover:text-[var(--color-gold-bright)]">
                        {p.practiceName}
                      </Link>
                    ) : (
                      <span className="font-display text-sm text-[var(--color-ivory)]">{p.practiceName}</span>
                    )}
                    <span className={`text-[0.45rem] uppercase tracking-luxe ${p.caution === "high" ? "text-[var(--color-rose-accent)]" : "text-[var(--color-gold-bright)]"}`}>
                      {p.caution} caution
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-bone)]/65">{p.note}</p>
                  <p className="mt-0.5 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35">Source: {p.source}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 rounded-sm border border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5 p-4 text-center text-xs italic leading-relaxed text-[var(--color-bone)]/60">
        These mappings document what the tradition holds — not what will work.
        The healer’s role is to facilitate, not to guarantee. Always consult
        qualified medical professionals for physical and psychological conditions.
      </p>
    </div>
  );
}

function CaseNotesView() {
  const { data: notes, setData: setNotes } = useVaultData<CaseNote[]>("case-notes", []);
  const [showForm, setShowForm] = useState(false);

  function addNote(note: Omit<CaseNote, "id">) {
    setNotes((prev) => [{ ...note, id: crypto.randomUUID() }, ...prev]);
    setShowForm(false);
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
          {notes.length} {notes.length === 1 ? "case note" : "case notes"} · AES-256 encrypted
        </p>
        <button onClick={() => setShowForm(true)} className="btn-gold text-xs">+ New Case Note</button>
      </div>

      {showForm && <CaseNoteForm onSubmit={addNote} onCancel={() => setShowForm(false)} />}

      <div className="space-y-3">
        {sorted.map((note) => (
          <div key={note.id} className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <div>
                <p className="font-display text-sm text-[var(--color-gold-bright)]">
                  {note.personInitials} — {note.affliction}
                </p>
                <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {new Date(note.date).toLocaleDateString()} · {note.practiceApplied}
                </p>
              </div>
              <button onClick={() => deleteNote(note.id)} className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60 transition hover:text-[var(--color-rose-accent)]">
                Delete
              </button>
            </div>
            {note.beforeNotes && <p className="mt-2 text-xs text-[var(--color-bone)]/70">Before: {note.beforeNotes}</p>}
            {note.afterNotes && <p className="mt-1 text-xs text-[var(--color-sage)]/80">After: {note.afterNotes}</p>}
            {!note.consentConfirmed && <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]">⚠ Consent not confirmed</p>}
          </div>
        ))}
        {notes.length === 0 && !showForm && (
          <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8 text-center">
            <p className="text-sm text-[var(--color-bone)]/65">No case notes yet. Log a healing session.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseNoteForm({ onSubmit, onCancel }: { onSubmit: (n: Omit<CaseNote, "id">) => void; onCancel: () => void }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [personInitials, setPersonInitials] = useState("");
  const [affliction, setAffliction] = useState("");
  const [practiceApplied, setPracticeApplied] = useState("");
  const [beforeNotes, setBeforeNotes] = useState("");
  const [afterNotes, setAfterNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [followUp, setFollowUp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      date, personInitials, affliction, practiceApplied,
      beforeNotes: beforeNotes || undefined,
      afterNotes: afterNotes || undefined,
      consentConfirmed: consent,
      followUpDate: followUp || undefined,
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
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Person (initials only)</label>
          <input type="text" value={personInitials} onChange={(e) => setPersonInitials(e.target.value)} className="field mt-1 text-sm" placeholder="e.g. R.K." required />
        </div>
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Affliction</label>
        <input type="text" value={affliction} onChange={(e) => setAffliction(e.target.value)} className="field mt-1 text-sm" placeholder="e.g. anxiety, grief, spirit-affliction" required />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Practice Applied</label>
        <input type="text" value={practiceApplied} onChange={(e) => setPracticeApplied(e.target.value)} className="field mt-1 text-sm" placeholder="e.g. Mahāmṛtyuñjaya japa 108×" required />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Before Notes</label>
        <textarea value={beforeNotes} onChange={(e) => setBeforeNotes(e.target.value)} rows={2} className="field mt-1 text-sm" />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">After Notes</label>
        <textarea value={afterNotes} onChange={(e) => setAfterNotes(e.target.value)} rows={2} className="field mt-1 text-sm" />
      </div>
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Follow-up Date (optional)</label>
        <input type="date" value={followUp} onChange={(e) => setFollowUp(e.target.value)} className="field mt-1 text-sm" />
      </div>
      <label className="flex items-center gap-2 text-xs text-[var(--color-bone)]/65">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="accent-[var(--color-gold)]" required />
        Consent confirmed
      </label>
      <div className="flex gap-2">
        <button type="submit" className="btn-gold text-xs">Save Case Note</button>
        <button type="button" onClick={onCancel} className="btn-ghost text-xs">Cancel</button>
      </div>
    </form>
  );
}
