"use client";
import { useState, useMemo } from "react";
import { useVaultData } from "@/components/useVaultData";
import { READER_ENTRIES } from "@/lib/reader-data";
import { OmGlyph } from "@/components/Symbols";

interface CardState { word: string; iast: string; analysis: string; ease: number; interval: number; nextReview: string; }

export default function FlashcardsPage() {
  const { data: cards, setData: setCards } = useVaultData<CardState[]>("flashcards", []);
  const [flipped, setFlipped] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Build all available words from reader entries
  const allWords = useMemo(() => READER_ENTRIES.flatMap((e) => e.wordByWord.map((w) => w.iast)), []);

  const today = new Date().toISOString().slice(0, 10);
  const dueCards = cards.filter((c) => c.nextReview <= today);

  function addWords() {
    const newCards: CardState[] = selected.map((iast) => {
      const entry = READER_ENTRIES.flatMap((e) => e.wordByWord).find((w) => w.iast === iast)!;
      return { word: entry.devanagari, iast: entry.iast, analysis: entry.analysis, ease: 2.5, interval: 1, nextReview: today };
    });
    setCards((prev) => [...prev, ...newCards.filter((nc) => !prev.find((p) => p.iast === nc.iast))]);
    setShowSetup(false);
    setSelected([]);
  }

  function review(quality: number) {
    if (dueCards.length === 0) return;
    const card = dueCards[0];
    const newEase = Math.max(1.3, card.ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    const newInterval = quality < 3 ? 1 : Math.round(card.interval * newEase);
    const next = new Date(); next.setDate(next.getDate() + newInterval);
    setCards((prev) => prev.map((c) => c.iast === card.iast ? { ...c, ease: newEase, interval: newInterval, nextReview: next.toISOString().slice(0, 10) } : c));
    setFlipped(false);
  }

  const currentCard = dueCards[0];

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
      <header className="fade-up mb-6">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Mantra Flashcards</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Spaced-repetition Sanskrit vocabulary.</p>
      </header>
      {cards.length === 0 && !showSetup ? (
        <div>
          <p className="text-sm text-[var(--color-bone)]/55 mb-4">No cards yet. Add words from the reader.</p>
          <button onClick={() => setShowSetup(true)} className="btn-gold text-xs">Add Words</button>
        </div>
      ) : showSetup ? (
        <div className="space-y-3 text-left">
          <div className="max-h-60 overflow-y-auto space-y-1">
            {allWords.map((w) => (
              <label key={w} className="flex items-center gap-2 text-sm text-[var(--color-bone)]/70">
                <input type="checkbox" checked={selected.includes(w)} onChange={() => setSelected((p) => p.includes(w) ? p.filter((x) => x !== w) : [...p, w])} className="accent-[var(--color-gold)]" />
                {w}
              </label>
            ))}
          </div>
          <button onClick={addWords} className="btn-gold text-xs">Add Selected</button>
        </div>
      ) : dueCards.length === 0 ? (
        <div className="rounded-sm border border-[var(--color-sage)]/30 bg-[var(--color-ink)]/40 p-6">
          <p className="text-sm text-[var(--color-sage)]">✓ All cards reviewed for today.</p>
          <p className="mt-1 text-xs text-[var(--color-bone)]/50">{cards.length} cards · {cards.filter((c) => c.nextReview > today).length} scheduled</p>
        </div>
      ) : (
        <div>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45 mb-3">{dueCards.length} due</p>
          <div onClick={() => setFlipped(!flipped)} className="cursor-pointer rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-8 min-h-[200px] flex items-center justify-center">
            {flipped ? (
              <p className="text-sm leading-relaxed text-[var(--color-bone)]/80">{currentCard.analysis}</p>
            ) : (
              <div>
                <p className="font-display text-3xl text-[var(--color-gold-bright)]">{currentCard.word}</p>
                <p className="mt-2 font-display text-base italic text-[var(--color-gold)]/70">{currentCard.iast}</p>
              </div>
            )}
          </div>
          {flipped && (
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => review(1)} className="rounded-sm border border-[var(--color-rose-accent)]/40 px-3 py-1 text-xs text-[var(--color-rose-accent)]">Again</button>
              <button onClick={() => review(3)} className="rounded-sm border border-[var(--color-gold)]/40 px-3 py-1 text-xs text-[var(--color-gold-bright)]">Good</button>
              <button onClick={() => review(5)} className="rounded-sm border border-[var(--color-sage)]/40 px-3 py-1 text-xs text-[var(--color-sage)]">Easy</button>
            </div>
          )}
          {!flipped && <p className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35">Tap to flip</p>}
        </div>
      )}
    </div>
  );
}
