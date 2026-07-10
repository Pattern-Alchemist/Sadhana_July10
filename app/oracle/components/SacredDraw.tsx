import { useState } from "react";
import { motion } from "framer-motion";
import { CARDS, CATEGORY_MAP, type KarmaCard } from "../data/cards";
import { SPREADS, type Spread } from "../data/content";
import { OracleFace, OracleBack } from "./OracleCard";
import DecodePanel from "./DecodePanel";
import SectionHeading from "./SectionHeading";

interface Drawn {
  card: KarmaCard;
  position: string;
  reversed: boolean;
}

const shuffle = (n: number): Drawn[] => {
  const pool = [...CARDS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n).map((card) => ({
    card,
    position: "",
    reversed: Math.random() < 0.34,
  }));
};

const drawSpread = (spread: Spread): Drawn[] =>
  shuffle(spread.cards).map((d, i) => ({ ...d, position: spread.positions[i] ?? "" }));

type Phase = "idle" | "shuffling" | "ready" | "revealed";

function FlipCard({
  drawn,
  delay,
  selected,
  onSelect,
}: {
  drawn: Drawn;
  delay: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const cat = CATEGORY_MAP[drawn.card.category];
  return (
    <div className="text-center">
      <div className="perspective relative">
        <motion.div
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{ delay, duration: 0.75, ease: "easeOut" }}
          onClick={onSelect}
          className="preserve-3d relative cursor-pointer"
        >
          {/* Front */}
          <div className="backface-hidden">
            <OracleFace card={drawn.card} interactive={false} />
          </div>
          {/* Back */}
          <div className="backface-hidden absolute inset-0" style={{ transform: "rotateY(180deg)" }}>
            <OracleBack />
          </div>
        </motion.div>

        {selected && (
          <span className="pointer-events-none absolute -inset-2 rounded-[1.4rem] ring-2 ring-gold-400/80" />
        )}
      </div>

      {/* reversed ribbon */}
      {drawn.reversed && (
        <div className="mt-2">
          <span className="inline-block rounded-full border border-amber-700/40 bg-amber-950/40 px-2.5 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-amber-300/90">
            Reversed · Shadow
          </span>
        </div>
      )}
      <span className="mt-1.5 block text-[0.55rem] uppercase tracking-[0.18em]" style={{ color: cat.accent }}>
        {drawn.position || "Your Card"}
      </span>
    </div>
  );
}

function DetailPanel({ drawn }: { drawn: Drawn }) {
  const cat = CATEGORY_MAP[drawn.card.category];
  return (
    <motion.div
      key={drawn.card.id + String(drawn.reversed)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-gold-700/30 bg-ink/60 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className="text-[0.6rem] font-semibold uppercase tracking-[0.3em]"
          style={{ color: cat.accent }}
        >
          {drawn.position ? drawn.position : "Your Reading"}
        </span>
        {drawn.reversed && (
          <span className="rounded-full border border-amber-700/40 bg-amber-950/40 px-2 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-amber-300/90">
            Reversed
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl font-semibold text-parchment sm:text-3xl">
        {drawn.card.name}
      </h3>

      <p className="mt-4 font-serif text-lg italic leading-relaxed text-parchment/95">
        “{drawn.card.core}”
      </p>

      <div
        className={`mt-5 rounded-xl border p-4 ${
          drawn.reversed
            ? "border-amber-700/40 bg-amber-950/20"
            : "border-emerald-700/30 bg-emerald-950/20"
        }`}
      >
        <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
          {drawn.reversed ? "✦ The Shadow Lesson" : "✦ Guidance"}
        </p>
        <p className={`text-sm leading-relaxed ${drawn.reversed ? "text-amber-100/85" : "text-emerald-100/85"}`}>
          {drawn.reversed ? drawn.card.challenge : drawn.card.guidance}
        </p>
        {drawn.reversed && (
          <p className="mt-2 text-xs italic text-mist/80">
            The card arrives inverted — its light is blocked. The work here is to meet the challenge
            consciously so the pattern may release.
          </p>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-gold-700/40 bg-gradient-to-br from-gold-500/10 to-transparent p-4">
        <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-500/90">
          Reflection
        </p>
        <p className="font-serif text-lg italic leading-relaxed text-gold-100">{drawn.card.reflection}</p>
      </div>

      <div className="mt-5">
        <DecodePanel card={drawn.card} />
      </div>
    </motion.div>
  );
}

export default function SacredDraw() {
  const [spread, setSpread] = useState<Spread>(SPREADS[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [drawn, setDrawn] = useState<Drawn[]>([]);
  const [selected, setSelected] = useState(0);

  const handleShuffle = () => {
    setPhase("shuffling");
    setDrawn([]);
    setSelected(0);
    setTimeout(() => setPhase("ready"), 1200);
  };

  const handleReveal = () => {
    setDrawn(drawSpread(spread));
    setSelected(0);
    setPhase("revealed");
  };

  const reset = () => {
    setPhase("idle");
    setDrawn([]);
  };

  const single = drawn.length === 1;

  return (
    <section id="draw" className="relative px-5 py-24 sm:px-8">
      {/* ambient divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-700/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Sacred Draw"
          title="Consult the Scales"
          subtitle="Breathe, centre yourself, and hold a question in your heart. Choose a spread, shuffle the deck, and let karma reveal what most needs to be seen."
        />

        {/* Spread selector */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SPREADS.map((s) => (
            <button
              key={s.name}
              onClick={() => {
                setSpread(s);
                reset();
              }}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-all ${
                spread.name === s.name
                  ? "border-gold-400 bg-gold-500/15 text-gold-100"
                  : "border-gold-700/30 text-mist hover:border-gold-500/50 hover:text-gold-200"
              }`}
            >
              {s.name} · {s.cards}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-sm italic text-mist/80">{spread.intent}</p>

        {/* Stage */}
        <div className="mt-12">
          {phase !== "revealed" ? (
            /* Deck stage */
            <div className="flex flex-col items-center">
              <div className="relative flex h-[300px] w-full items-center justify-center sm:h-[340px]">
                <motion.div
                  className="relative h-full"
                  animate={
                    phase === "shuffling"
                      ? { x: [0, -8, 8, -6, 6, -3, 0], rotate: [0, -2, 2, -1.5, 1, 0] }
                      : { x: 0, rotate: 0 }
                  }
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                >
                  {[0, 1, 2, 3].map((layer) => (
                    <motion.div
                      key={layer}
                      className="absolute left-1/2 top-1/2 w-[160px] -translate-x-1/2 -translate-y-1/2 sm:w-[185px]"
                      animate={
                        phase === "shuffling"
                          ? { y: [0, layer % 2 ? -10 : 10, 0], x: [0, layer % 2 ? 6 : -6, 0] }
                          : { y: -layer * 3, x: -layer * 3, rotate: -layer * 1.5 }
                      }
                      transition={{ duration: 0.9, delay: layer * 0.05 }}
                      style={{ zIndex: 10 - layer }}
                    >
                      <OracleBack />
                    </motion.div>
                  ))}
                </motion.div>

                {phase === "ready" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-none absolute inset-0 m-auto h-[230px] w-[170px] rounded-[1.2rem] bg-gold-400/20 blur-2xl"
                  />
                )}
              </div>

              {/* Controls */}
              <div className="mt-2 flex flex-col items-center gap-3">
                {phase === "idle" && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleShuffle}
                    className="rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-void shadow-[0_10px_40px_-8px_rgba(212,175,55,0.5)] transition-transform hover:scale-[1.03]"
                  >
                    Shuffle the Deck
                  </motion.button>
                )}
                {phase === "shuffling" && (
                  <p className="font-serif text-lg italic text-gold-200">The cards weave your fate…</p>
                )}
                {phase === "ready" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-gold-400">The deck is ready</p>
                    <button
                      onClick={handleReveal}
                      className="rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-void shadow-[0_10px_40px_-8px_rgba(212,175,55,0.5)] transition-transform hover:scale-[1.03]"
                    >
                      Reveal Your Reading
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* Reveal */
            <div className="flex flex-col gap-8">
              <div className={`mx-auto grid w-full gap-5 ${single ? "max-w-[220px] grid-cols-1" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
                {drawn.map((d, i) => (
                  <FlipCard
                    key={d.card.id}
                    drawn={d}
                    delay={i * 0.2}
                    selected={selected === i}
                    onSelect={() => setSelected(i)}
                  />
                ))}
              </div>

              <DetailPanel drawn={drawn[selected]} />

              <div className="flex justify-center">
                <button
                  onClick={reset}
                  className="rounded-full border border-gold-600/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-100 transition-colors hover:bg-gold-500/10"
                >
                  ↻ Draw Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
