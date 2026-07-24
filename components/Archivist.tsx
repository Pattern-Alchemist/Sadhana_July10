"use client";

import { useState } from "react";
import Link from "next/link";

interface ArchivistResult {
  slug: string;
  name: string;
  sanskrit: string | null;
  category: string | null;
  summary: string | null;
  type: "siddhi" | "manuscript";
  reason: string;
  score: number;
}

interface SynthesisCitation {
  slug: string;
  url: string;
  name: string;
  score: number;
}

type SearchMode = "keyword" | "semantic" | "synthesis";

/** RFC-001 Phase C — synthesis UI ships only when the flag is compiled in. */
const SYNTHESIS_ENABLED = process.env.NEXT_PUBLIC_ARCHIVIST_SYNTHESIS === "true";

const SUGGESTIONS = [
  "What is the significance of Oṃ?",
  "How do traditions map the subtle body?",
  "A practice for steadying attention",
  "The Śrī Cakra",
  "Breath and the witness self",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getResults(payload: unknown): ArchivistResult[] {
  if (!isRecord(payload) || !Array.isArray(payload.results)) return [];
  return payload.results as ArchivistResult[];
}

function getNote(payload: unknown): string {
  if (!isRecord(payload)) return "";
  return typeof payload.note === "string" ? payload.note : "";
}

function getAnswer(payload: unknown): string | null {
  if (!isRecord(payload) || typeof payload.answer !== "string") return null;
  return payload.answer.trim() || null;
}

function getCitations(payload: unknown): SynthesisCitation[] {
  if (!isRecord(payload) || !Array.isArray(payload.citations)) return [];
  return payload.citations.filter(
    (c): c is SynthesisCitation =>
      isRecord(c) && typeof c.slug === "string" && typeof c.name === "string",
  );
}

function isSynthesis(payload: unknown): boolean {
  return isRecord(payload) && payload.synthesis === true;
}

async function postSearch(endpoint: string, query: string) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const payload = (await response.json().catch(() => ({}))) as unknown;
  return { response, payload };
}

export default function Archivist() {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>("keyword");
  const [results, setResults] = useState<ArchivistResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [citations, setCitations] = useState<SynthesisCitation[]>([]);

  async function ask(q: string) {
    if (!q.trim()) return;
    const trimmedQuery = q.trim();
    setLoading(true);
    setResults(null);
    setNote("");
    setAnswer(null);
    setCitations([]);

    try {
      if (searchMode === "synthesis") {
        // RFC-001 Phase C: the endpoint itself refuses or degrades to
        // retrieval pointers — this client renders whatever it returns.
        const { payload } = await postSearch("/api/archivist/synthesize", trimmedQuery);
        setNote(getNote(payload) || "The Custodian is momentarily unavailable.");
        setResults(getResults(payload));
        if (isSynthesis(payload)) {
          setAnswer(getAnswer(payload));
          setCitations(getCitations(payload));
        }
        return;
      }

      if (searchMode === "semantic") {
        const { response, payload } = await postSearch("/api/archivist/semantic", trimmedQuery);

        if (response.ok) {
          setResults(getResults(payload));
          setNote(getNote(payload));
          return;
        }

        const semanticNote = getNote(payload);
        const fallback = await postSearch("/api/archivist", trimmedQuery);
        const fallbackResults = getResults(fallback.payload);
        const fallbackNote = getNote(fallback.payload);
        setResults(fallbackResults);
        setNote(
          [
            semanticNote || "Deep search is unavailable on this deployment.",
            "Showing keyword pointers instead.",
            fallbackNote,
          ]
            .filter(Boolean)
            .join(" ")
        );
        return;
      }

      const { payload } = await postSearch("/api/archivist", trimmedQuery);
      setResults(getResults(payload));
      setNote(getNote(payload));
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

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            Search mode
          </span>
          <button
            type="button"
            aria-pressed={searchMode === "keyword"}
            onClick={() => setSearchMode("keyword")}
            className={`border px-2.5 py-1 text-xs transition ${
              searchMode === "keyword"
                ? "border-[var(--color-gold)]/70 text-[var(--color-gold-bright)]"
                : "border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold-bright)]"
            }`}
          >
            Keyword
          </button>
          <button
            type="button"
            aria-pressed={searchMode === "semantic"}
            onClick={() => setSearchMode("semantic")}
            className={`border px-2.5 py-1 text-xs transition ${
              searchMode === "semantic"
                ? "border-[var(--color-cyan-accent)]/70 text-[var(--color-cyan-accent)]"
                : "border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-cyan-accent)]/50 hover:text-[var(--color-cyan-accent)]"
            }`}
          >
            Deep search
          </button>
          {SYNTHESIS_ENABLED && (
            <button
              type="button"
              aria-pressed={searchMode === "synthesis"}
              onClick={() => setSearchMode("synthesis")}
              className={`border px-2.5 py-1 text-xs transition ${
                searchMode === "synthesis"
                  ? "border-[var(--color-gold)]/70 text-[var(--color-gold-bright)]"
                  : "border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-gold)]/50 hover:text-[var(--color-gold-bright)]"
              }`}
            >
              Ask the Custodian
            </button>
          )}
          <span className="text-xs italic text-[var(--color-bone)]/50">
            {searchMode === "semantic"
              ? "Embeds your query server-side and falls back to keyword pointers if unavailable."
              : searchMode === "synthesis"
                ? "Answers composed only from retrieved folios, every claim cited. Falls back to pointers when grounding is thin."
                : "Weighted catalogue search across siddhis and codices (no cost, works everywhere)."}
          </span>
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

      {answer && (
        <div className="folio-card mt-4 rounded-sm p-5">
          <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
            The Custodian answers — every claim cited
          </span>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-ivory)]">{answer}</p>
          {citations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {citations.map((c) => (
                <Link
                  key={c.slug}
                  href={`/siddhi/${c.slug}`}
                  className="border border-[var(--color-cyan-accent)]/40 px-2.5 py-1 text-xs text-[var(--color-cyan-accent)] transition hover:border-[var(--color-cyan-accent)]"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.map((r) => (
            <Link
              key={`${r.type}-${r.slug}`}
              href={r.type === "manuscript" ? `/manuscripts/${r.slug}` : `/siddhi/${r.slug}`}
              className="folio-card block rounded-sm p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="badge mr-2">{r.type === "manuscript" ? "Codex" : r.category}</span>
                  <h3 className="mt-1.5 inline font-display text-xl text-[var(--color-ivory)]">
                    {r.name}
                  </h3>
                  {r.sanskrit && (
                    <span className="ml-2 text-sm text-[var(--color-gold-bright)]">
                      {r.sanskrit}
                    </span>
                  )}
                </div>
                <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
                  {r.score}% match
                </span>
              </div>
              {r.summary && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/75">
                  {r.summary}
                </p>
              )}
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
