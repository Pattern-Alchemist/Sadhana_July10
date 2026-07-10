import { motion } from "framer-motion";
import { PRINCIPLES, HOW_TO_USE, SPREADS, READER_TIPS } from "../data/content";
import SectionHeading from "./SectionHeading";

const fade = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

export default function Guidebook() {
  return (
    <section id="guidebook" className="relative px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-700/40 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Guidebook"
          title="How to Read the Scales"
          subtitle="Karma is not a verdict but a mirror. These pages offer the principles, rituals and spreads to turn insight into a living, healing practice."
        />

        {/* Principles */}
        <motion.div {...fade} className="mt-16">
          <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">The Six Laws of Karma</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-gold-700/25 bg-gradient-to-br from-shadow/70 to-ink/40 p-6 transition-colors hover:border-gold-500/40"
              >
                <span className="absolute -right-3 -top-4 font-display text-7xl font-bold text-gold-500/5">
                  {i + 1}
                </span>
                <p className="mb-2 text-2xl text-gold-400">✦</p>
                <h4 className="font-display text-lg font-semibold text-parchment">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to use */}
        <motion.div {...fade} className="mt-20">
          <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">The Reading Ritual</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_TO_USE.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-gold-700/25 bg-ink/40 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold-600/40 bg-gold-500/10 font-display text-sm font-bold text-gold-300">
                  {s.n}
                </div>
                <h4 className="font-display text-base font-semibold text-parchment">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Spreads */}
        <motion.div {...fade} className="mt-20">
          <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">Sacred Spreads</h3>
          <div className="grid gap-5 md:grid-cols-2">
            {SPREADS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-gold-700/25 bg-gradient-to-br from-shadow/60 to-ink/30 p-7">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl font-semibold text-parchment">{s.name}</h4>
                  <span className="rounded-full border border-gold-600/40 bg-gold-500/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold-300">
                    {s.cards} {s.cards === 1 ? "card" : "cards"}
                  </span>
                </div>
                <p className="mt-2 text-sm italic text-mist">{s.intent}</p>
                <ol className="mt-4 space-y-2">
                  {s.positions.map((pos, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-parchment/85">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-700/40 text-[0.6rem] text-gold-400">
                        {i + 1}
                      </span>
                      {pos}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reader tips */}
        <motion.div {...fade} className="mt-20">
          <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">Wisdom for the Reader</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {READER_TIPS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gold-700/20 bg-ink/40 p-6">
                <h4 className="font-display text-base font-semibold text-gold-200">{t.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mist">{t.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
