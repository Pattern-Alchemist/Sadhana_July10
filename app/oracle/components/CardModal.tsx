import { useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARDS, CATEGORY_MAP, toRoman } from "../data/cards";
import { useDeck } from "./DeckContext";
import { OracleFace } from "./OracleCard";
import { KarmaIcon } from "./icons";
import DecodePanel from "./DecodePanel";

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
      {children}
    </p>
  );
}

export default function CardModal() {
  const { activeCard, openCard, closeCard } = useDeck();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeCard) return;
      if (e.key === "Escape") closeCard();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = activeCard ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  const navigate = (dir: number) => {
    if (!activeCard) return;
    const idx = CARDS.findIndex((c) => c.id === activeCard.id);
    const next = CARDS[(idx + dir + CARDS.length) % CARDS.length];
    openCard(next);
  };

  return (
    <AnimatePresence>
      {activeCard && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-md"
            onClick={closeCard}
          />

          <motion.div
            className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-700/40 bg-ink/95 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div className="grid max-h-[92vh] grid-cols-1 overflow-y-auto md:grid-cols-[40%_60%] md:overflow-hidden">
              {/* Left: card visual */}
              <div className="flex items-center justify-center bg-gradient-to-br from-shadow to-void p-6 md:p-8">
                <motion.div
                  key={activeCard.id}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-[230px]"
                >
                  <OracleFace card={activeCard} />
                </motion.div>
              </div>

              {/* Right: details */}
              <div className="overflow-y-auto p-6 sm:p-8">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]"
                      style={{ color: CATEGORY_MAP[activeCard.category].accent }}
                    >
                      {toRoman(activeCard.id)} · {CATEGORY_MAP[activeCard.category].name}
                    </span>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-parchment sm:text-3xl">
                      {activeCard.name}
                    </h2>
                  </div>
                  <button
                    onClick={closeCard}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-700/40 text-gold-300 transition-colors hover:bg-gold-500/15"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <Label>Core Message</Label>
                    <p className="font-serif text-lg italic leading-relaxed text-parchment/95">
                      “{activeCard.core}”
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-amber-700/30 bg-amber-950/20 p-4">
                      <Label>Challenge</Label>
                      <p className="text-sm leading-relaxed text-amber-100/80">{activeCard.challenge}</p>
                    </div>
                    <div className="rounded-xl border border-emerald-700/30 bg-emerald-950/20 p-4">
                      <Label>Guidance</Label>
                      <p className="text-sm leading-relaxed text-emerald-100/80">{activeCard.guidance}</p>
                    </div>
                  </div>

                  <div>
                    <Label>Artwork</Label>
                    <p className="text-sm leading-relaxed text-mist">{activeCard.artwork}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <KarmaIcon
                      name={activeCard.icon}
                      className="mt-0.5 h-6 w-6 shrink-0 text-gold-400"
                      strokeWidth={1.3}
                    />
                    <div>
                      <Label>Symbolism</Label>
                      <p className="text-sm leading-relaxed text-mist">{activeCard.symbolism}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gold-700/40 bg-gradient-to-br from-gold-500/10 to-transparent p-4">
                    <Label>✦ Reflection Prompt</Label>
                    <p className="font-serif text-lg italic leading-relaxed text-gold-100">
                      {activeCard.reflection}
                    </p>
                  </div>

                  <DecodePanel card={activeCard} />
                </div>

                {/* nav */}
                <div className="mt-6 flex items-center justify-between border-t border-gold-700/20 pt-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-xs uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-200"
                  >
                    ‹ Prev
                  </button>
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-mist/60">
                    Card {activeCard.id} of 77
                  </span>
                  <button
                    onClick={() => navigate(1)}
                    className="text-xs uppercase tracking-[0.2em] text-gold-400 transition-colors hover:text-gold-200"
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
