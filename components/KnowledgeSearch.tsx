"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface KnowledgeDocMeta {
  slug: string;
  kind: string;
  title: string;
  original_title: string;
  category: string;
  subcategory: string;
  tradition: string;
  tags: string[];
  caution_level: "high" | "moderate" | "low";
  file: string;
  description: string;
  chunk_count: number;
  text_chars: number;
  text_words: number;
}

interface SearchHit {
  id: string;
  doc_slug: string;
  ordinal: number;
  text: string;
  snippet: string;
  score: number;
  document: KnowledgeDocMeta;
}

interface SearchResponse {
  results: SearchHit[];
  note: string;
  total: number;
  query: string;
  offset: number;
  limit: number;
  archive_stats: {
    total_documents: number;
    total_chunks: number;
  };
  explanation?: Array<{ word: string; stems: string[]; analysis: string }>;
  matchQuery?: string;
  search_type?: string;
}

const SUGGESTIONS = [
  "pranava om",
  "kumbhaka breath",
  "preta spirit",
  "bagalamukhi stambhana",
  "mahamrityunjaya tryambaka",
  "yantra bindu",
  "vajrayogini",
  "bhairava",
];

export default function KnowledgeSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[] | null>(null);
  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [includeHighCaution, setIncludeHighCaution] = useState(true);
  const [searchMode, setSearchMode] = useState<"keyword" | "morphological">("keyword");
  const [explanation, setExplanation] = useState<any[] | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const runSearch = useCallback(
    async (q: string) => {
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      if (!q.trim()) {
        setResults(null);
        setNote("");
        setTotal(0);
        setExplanation(null);
        return;
      }

      setLoading(true);
      try {
        const endpoint = searchMode === "morphological" ? "/api/knowledge/morphological" : "/api/knowledge";
        const url = new URL(endpoint, window.location.origin);
        url.searchParams.set("q", q);
        url.searchParams.set("limit", "12");
        if (searchMode === "keyword" && !includeHighCaution) {
          url.searchParams.set("include_high_caution", "false");
        }
        const res = await fetch(url.toString(), { signal: ctrl.signal });
        if (!res.ok) {
          setResults([]);
          setNote("The knowledge archive search is momentarily unavailable.");
          setTotal(0);
          setExplanation(null);
          return;
        }
        const data: SearchResponse = await res.json();
        setResults(data.results);
        setNote(data.note);
        setTotal(data.total);
        setExplanation(data.explanation ?? null);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setResults([]);
        setNote("The search request failed. Please retry.");
        setTotal(0);
        setExplanation(null);
      } finally {
        setLoading(false);
      }
    },
    [includeHighCaution, searchMode]
  );

  // Re-run when the caution toggle or search mode changes
  useEffect(() => {
    if (query.trim()) runSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeHighCaution, searchMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archive — mantras, terms, texts, traditions…"
            className="w-full rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)] px-4 py-3 font-body text-base text-[var(--color-ivory)] placeholder:text-[var(--color-bone)]/40 focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]/40"
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-gold px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Searching…" : "Search Archive"}
        </button>
      </form>

      {/* Search mode toggle */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex rounded-sm border border-[var(--hairline)] overflow-hidden">
          <button
            type="button"
            onClick={() => setSearchMode("keyword")}
            className={`px-3 py-1.5 text-xs transition motion-safe motion-reduce:transition-none ${
              searchMode === "keyword"
                ? "bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]"
                : "text-[var(--color-bone)]/55 hover:text-[var(--color-ivory)]"
            }`}
          >
            Keyword
          </button>
          <button
            type="button"
            onClick={() => setSearchMode("morphological")}
            className={`px-3 py-1.5 text-xs transition motion-safe motion-reduce:transition-none ${
              searchMode === "morphological"
                ? "bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]"
                : "text-[var(--color-bone)]/55 hover:text-[var(--color-ivory)]"
            }`}
          >
            Morphological
          </button>
        </div>
        <label className="flex items-center gap-2 text-xs text-[var(--color-bone)]/65">
          <input
            type="checkbox"
            checked={includeHighCaution}
            onChange={(e) => setIncludeHighCaution(e.target.checked)}
            className="accent-[var(--color-gold)]"
          />
          Include high-caution
        </label>
        {searchMode === "morphological" && (
          <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-cyan-accent)]/70">
            Sandhi-aware · catches inflected forms
          </span>
        )}
      </div>

      {/* Morphological analysis display */}
      {searchMode === "morphological" && explanation && explanation.length > 0 && (
        <div className="mt-4 rounded-sm border border-[var(--color-cyan-accent)]/20 bg-[var(--color-cyan-accent)]/5 p-4">
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-cyan-accent)]/80">
            Morphological Analysis
          </p>
          <div className="mt-2 space-y-1.5">
            {explanation.map((e, i) => (
              <div key={i} className="text-xs text-[var(--color-bone)]/75">
                <span className="font-display text-[var(--color-gold-bright)]">{e.word}</span>
                {" → "}
                <span className="italic">{e.stems.join(", ")}</span>
                <span className="ml-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                  ({e.analysis})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {!results && (
        <div className="mt-6">
          <p className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
            Suggested queries
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  runSearch(s);
                }}
                className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-[var(--color-bone)]/70 transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      {note && (
        <p className="mt-6 text-sm italic leading-relaxed text-[var(--color-bone)]/70">
          {note}
        </p>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="mt-6 space-y-4">
          <p className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
            {total} matching passage{total === 1 ? "" : "s"} · showing {results.length}
          </p>
          {results.map((hit) => (
            <article
              key={hit.id}
              className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg text-[var(--color-ivory)]">
                  {hit.document.title}
                </h4>
                <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                  {hit.document.category} · {hit.document.tradition}
                </span>
              </div>
              {hit.document.original_title && (
                <p className="font-display text-sm text-[var(--color-gold-bright)]/85">
                  {hit.document.original_title}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-bone)]/80">
                {hit.snippet}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.55rem] uppercase tracking-luxe">
                <span className="text-[var(--color-bone)]/40">
                  chunk {hit.ordinal} · score {hit.score.toFixed(2)}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 ${
                    hit.document.caution_level === "high"
                      ? "border-[var(--color-rose-accent)]/40 text-[var(--color-rose-accent)]"
                      : "border-[var(--color-gold)]/40 text-[var(--color-gold-bright)]"
                  }`}
                >
                  {hit.document.caution_level} caution
                </span>
                {hit.document.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-[var(--color-bone)]/55">
                    #{t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {results && results.length === 0 && query.trim() && (
        <div className="mt-6 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6 text-center text-sm text-[var(--color-bone)]/65">
          No matching passages found. Try simpler terms or a single Sanskrit bīja.
        </div>
      )}
    </div>
  );
}
