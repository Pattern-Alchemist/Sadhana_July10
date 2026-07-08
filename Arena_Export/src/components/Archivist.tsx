"use client";

import { useState } from "react";
import Link from "next/link";

interface ArchivistResult {
  slug: string;
  name: string;
  sanskrit: string;
  category: string;
  summary: string;
  type: "siddhi" | "manuscript";
  reason: string;
  score: number;
}

const SUGGESTIONS = [
  "What is the significance of Oṃ?",
  "How do traditions map the subtle body?",
  "A practice for steadying attention",
  "The Śrī Cakra",
  "Breath and the witness self",
];

export default function Archivist() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArchivistResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>("");

  async function ask(q: string) {
    if (!q.trim()) return;
    setLoading(true);
    setResults(null);
    setNote("");
    try {
      const res = await fetch("/api/archivist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setResults(data.results ?? []);
      setNote(data.note ?? "");
    } catch {
      setNote("The Custodian could not be reached. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-5">
        <label className="mb-2 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
          Address the Custodian
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="field flex-1"
            placeholder="Ask of any verse, doctrine, deity, or practice…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(query)}
          />
          <button className="btn-gold px-6" onClick={() => ask(query)} disabled={loading}>
            {loading ? "Searching…" : "Inquire"}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                ask(s);
              }}
              className="border border-[var(--hairline)] px-2.5 py-1 text-xs text-[var(--color-bone)]/70 transition hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold-bright)]"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {note && (
        <p className="mt-4 rounded-sm border-l-2 border-[var(--color-gold)] bg-[var(--color-gold)]/5 px-4 py-3 text-sm italic leading-relaxed text-[var(--color-bone)]/80">
          {note}
        </p>
      )}

      {results && results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((r) => (
            <Link
              key={r.slug}
              href={r.type === "manuscript" ? `/manuscripts#${r.slug}` : `/siddhi/${r.slug}`}
              className="folio-card block rounded-sm p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="badge mr-2">{r.type === "manuscript" ? "Codex" : r.category}</span>
                  <h3 className="mt-1.5 inline font-display text-xl text-[var(--color-ivory)]">
                    {r.name}
                  </h3>
                  <span className="ml-2 text-sm text-[var(--color-gold-bright)]">{r.sanskrit}</span>
                </div>
                <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
                  {r.score}% match
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/75">
                {r.summary}
              </p>
              <p className="mt-2 text-xs italic text-[var(--color-cyan-accent)]/80">
                ⟶ {r.reason}
              </p>
            </Link>
          ))}
        </div>
      )}

      {results && results.length === 0 && !loading && (
        <p className="mt-6 text-center text-sm text-[var(--color-bone)]/50">
          The Custodian found no folio matching that inquiry. Try a broader term.
        </p>
      )}
    </div>
  );
}
