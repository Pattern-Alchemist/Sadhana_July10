import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KarmaCard } from "../data/cards";
import { CATEGORY_MAP } from "../data/cards";
import { DECODE } from "../data/decode";

export default function DecodePanel({ card }: { card: KarmaCard }) {
  const [open, setOpen] = useState(false);
  const decode = DECODE[card.id];
  const cat = CATEGORY_MAP[card.category];

  return (
    <div className="overflow-hidden rounded-2xl border border-gold-600/40 bg-gradient-to-br from-shadow/70 to-ink/50">
      {/* Seal / trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gold-500/5"
      >
        <span className="flex items-center gap-3">
          <span className="text-lg" style={{ color: cat.accent }}>
            {open ? "🔓" : "🗝️"}
          </span>
          <span>
            <span className="block font-display text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
              {open ? "The Decoded Solution" : "Decode the Reflection"}
            </span>
            <span className="block text-xs text-mist/70">
              {open ? "The deeper truth, a pathway & a key action" : "Unveil the real solution beneath the question"}
            </span>
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gold-400">
          ▾
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && decode && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="space-y-5 px-5 pb-6 pt-1">
              {/* The deeper truth */}
              <div>
                <p className="mb-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
                  ◈ The Deeper Truth
                </p>
                <p className="font-serif text-base italic leading-relaxed text-parchment/95">
                  {decode.truth}
                </p>
              </div>

              {/* The pathway */}
              <div>
                <p className="mb-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
                  ◈ The Pathway to Resolution
                </p>
                <ol className="space-y-2.5">
                  {decode.steps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.6rem] font-bold"
                        style={{ borderColor: `${cat.accent}66`, color: cat.accent, background: `${cat.accent}15` }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-mist">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Key action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 }}
                className="rounded-xl border p-4"
                style={{ borderColor: `${cat.accent}55`, background: `${cat.accent}10` }}
              >
                <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em]" style={{ color: cat.accent }}>
                  ✦ Your Key Action
                </p>
                <p className="font-display text-base font-semibold leading-snug text-parchment">
                  {decode.keyAction}
                </p>
              </motion.div>

              {/* Mantra */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="border-t border-gold-700/30 pt-4 text-center"
              >
                <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
                  Mantra to Embody
                </p>
                <p className="font-serif text-lg italic leading-relaxed text-gold-100">
                  “{decode.mantra}”
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
