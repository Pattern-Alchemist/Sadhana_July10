import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CARDS, CATEGORIES, type CategoryKey } from "../data/cards";
import { OracleFace } from "./OracleCard";
import { useDeck } from "./DeckContext";
import SectionHeading from "./SectionHeading";

type Filter = CategoryKey | "all";

export default function Gallery({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const [query, setQuery] = useState("");
  const { openCard } = useDeck();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((c) => {
      const matchCat = filter === "all" || c.category === filter;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.core.toLowerCase().includes(q) ||
        c.symbolism.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [filter, query]);

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "All Cards" },
    ...CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.name })),
  ];

  return (
    <section id="deck" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Deck · 77 Cards"
          title="Browse the Oracle"
          subtitle="Wander the full deck card by card. Tap any card to unfold its core message, challenge, guidance, artwork and a reflection to sit with."
        />

        {/* Search */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="flex items-center gap-3 rounded-full border border-gold-700/30 bg-ink/50 px-5 py-3 backdrop-blur-sm focus-within:border-gold-500/60">
            <span className="text-gold-500">⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a card, theme, or symbol…"
              className="w-full bg-transparent text-sm text-parchment placeholder:text-mist/60 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-mist hover:text-gold-200">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {chips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setFilter(chip.key)}
              className={`rounded-full border px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all ${
                filter === chip.key
                  ? "border-gold-400 bg-gold-500/15 text-gold-100"
                  : "border-gold-700/30 text-mist hover:border-gold-500/50 hover:text-gold-200"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-xs uppercase tracking-[0.25em] text-mist/70">
          {filtered.length} {filtered.length === 1 ? "card" : "cards"} revealed
        </p>

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.3) }}
            >
              <OracleFace card={card} interactive onClick={() => openCard(card)} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-serif text-lg italic text-mist">
            No card answers to that name — try another symbol.
          </p>
        )}
      </div>
    </section>
  );
}
