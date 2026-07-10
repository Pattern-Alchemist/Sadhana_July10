import { motion } from "framer-motion";
import { CARDS, type KarmaCard } from "../data/cards";
import { OracleFace } from "./OracleCard";

const byId = (id: number): KarmaCard => CARDS.find((c) => c.id === id)!;
const FAN: { card: KarmaCard; rotate: number; x: number; delay: number }[] = [
  { card: byId(23), rotate: -16, x: -90, delay: 0.1 },
  { card: byId(61), rotate: -6, x: -32, delay: 0.2 },
  { card: byId(71), rotate: 6, x: 32, delay: 0.3 },
  { card: byId(77), rotate: 16, x: 90, delay: 0.4 },
];

const STATS = [
  { n: "77", l: "Cards" },
  { n: "6", l: "Realms" },
  { n: "5", l: "Spreads" },
  { n: "∞", l: "Reflections" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8">
      {/* Big rotating mandala behind */}
      <div className="animate-spin-slow pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]">
        <svg viewBox="0 0 400 400" className="h-full w-full text-gold-300">
          <g fill="none" stroke="currentColor">
            <circle cx="200" cy="200" r="196" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="160" strokeWidth="0.5" strokeDasharray="3 6" />
            <circle cx="200" cy="200" r="120" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="80" strokeWidth="0.5" strokeDasharray="2 5" />
            {Array.from({ length: 36 }).map((_, i) => {
              const a = (i / 36) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(a) * 120}
                  y1={200 + Math.sin(a) * 120}
                  x2={200 + Math.cos(a) * 196}
                  y2={200 + Math.sin(a) * 196}
                  strokeWidth="0.5"
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-gold-500"
          >
            ✦ A 77-Card Oracle Deck ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gold-gradient parchment-shadow">The Karma</span>
            <br />
            <span className="text-parchment parchment-shadow">Oracle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl font-serif text-xl italic leading-relaxed text-mist lg:mx-0"
          >
            Portals into the law of cause and effect — where every action ripples, every debt
            returns, and the unseen scales of the cosmos seek their balance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <a
              href="#draw"
              className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-void shadow-[0_10px_40px_-8px_rgba(212,175,55,0.5)] transition-transform hover:scale-[1.03] sm:w-auto"
            >
              <span className="relative z-10">Begin a Sacred Draw</span>
            </a>
            <a
              href="#deck"
              className="w-full rounded-full border border-gold-600/50 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-gold-100 transition-colors hover:bg-gold-500/10 sm:w-auto"
            >
              Explore the 77 Cards
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 grid max-w-md grid-cols-4 gap-3 lg:mx-0"
          >
            {STATS.map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <p className="font-display text-2xl font-bold text-gold-gradient sm:text-3xl">{s.n}</p>
                <p className="mt-0.5 text-[0.6rem] uppercase tracking-[0.25em] text-mist">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Fan of cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex h-[420px] items-center justify-center sm:h-[460px]"
        >
          <div className="animate-float relative h-full w-full">
            {FAN.map((f) => (
              <div
                key={f.card.id}
                className="absolute left-1/2 top-1/2 w-[44%] max-w-[200px] -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40, rotate: 0, x: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: f.rotate, x: f.x }}
                  transition={{ duration: 0.8, delay: f.delay, type: "spring", stiffness: 80 }}
                >
                  <OracleFace card={f.card} />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gold-500/60 sm:flex">
        <span className="text-[0.55rem] uppercase tracking-[0.4em]">Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-gold-500/60 to-transparent" />
      </div>
    </section>
  );
}
