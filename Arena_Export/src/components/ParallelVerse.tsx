"use client";

import { useState } from "react";
import type { SanskritWord } from "@/lib/reader-data";

/**
 * ParallelVerse — client component that renders the verse in three parallel layers
 * (Devanagari, IAST, English) with hover-to-reveal word-by-word parsing.
 *
 * Hover any IAST word to see its grammatical analysis in a tooltip.
 * On mobile (no hover), tap a word to toggle the analysis.
 */
export default function ParallelVerse({
  devanagari,
  iast,
  english,
  wordByWord,
}: {
  devanagari: string;
  iast: string;
  english: string;
  wordByWord: SanskritWord[];
}) {
  const [activeWord, setActiveWord] = useState<number | null>(null);

  // Split the IAST into words (preserve punctuation as separate tokens)
  const iastWords = iast.split(/(\s+|[|।॥,;:.!?])/).filter((w) => w.trim().length > 0);

  // For each IAST word, find the matching wordByWord entry (by exact match or stripped of punctuation)
  function findWordEntry(word: string): SanskritWord | null {
    const clean = word.replace(/[|।॥,;:.!?]/g, "").trim();
    if (!clean) return null;
    return wordByWord.find((w) => w.iast === clean || w.iast === word) ?? null;
  }

  return (
    <div className="space-y-8">
      {/* Devanagari */}
      <section>
        <h2 className="mb-3 text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
          Devanagari
        </h2>
        <p className="font-display text-xl leading-loose text-[var(--color-ivory)] sm:text-2xl">
          {devanagari}
        </p>
      </section>

      {/* IAST with hover-to-reveal parsing */}
      <section>
        <h2 className="mb-3 text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
          IAST Transliteration · <span className="text-[var(--color-bone)]/55">hover a word for analysis</span>
        </h2>
        <p className="font-display text-lg leading-loose text-[var(--color-gold-bright)] sm:text-xl">
          {iastWords.map((word, idx) => {
            const entry = findWordEntry(word);
            if (!entry) {
              return (
                <span key={idx}>{word} </span>
              );
            }
            const wordIdx = wordByWord.indexOf(entry);
            const isActive = activeWord === wordIdx;
            return (
              <span key={idx} className="relative inline-block">
                <span
                  className="cursor-help underline decoration-dotted decoration-[var(--color-gold)]/40 underline-offset-4 transition motion-safe hover:decoration-[var(--color-gold-bright)]"
                  onMouseEnter={() => setActiveWord(wordIdx)}
                  onMouseLeave={() => setActiveWord(null)}
                  onClick={() => setActiveWord(isActive ? null : wordIdx)}
                >
                  {word}
                </span>
                {isActive && (
                  <span className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-obsidian)] p-3 text-sm shadow-lg">
                    <span className="block font-display text-base text-[var(--color-gold-bright)]">
                      {entry.devanagari}
                    </span>
                    <span className="block font-display text-sm italic text-[var(--color-gold)]/75">
                      {entry.iast}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[var(--color-bone)]/80">
                      {entry.analysis}
                    </span>
                  </span>
                )}
              </span>
            );
          })}
        </p>
      </section>

      {/* English */}
      <section>
        <h2 className="mb-3 text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
          English Translation
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
          {english}
        </p>
      </section>
    </div>
  );
}
