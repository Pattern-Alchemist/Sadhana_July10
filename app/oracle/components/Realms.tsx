import { motion } from "framer-motion";
import { CATEGORIES, countByCategory, type CategoryKey } from "../data/cards";
import { KarmaIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Realms({ onPick }: { onPick: (key: CategoryKey) => void }) {
  return (
    <section id="realms" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Six Realms"
          title="The Architecture of Karma"
          subtitle="Every card belongs to one of six realms — each illuminating a different face of cause, consequence, and the cosmic scales that keep them true."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.key}
              onClick={() => onPick(cat.key)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-gold-700/25 p-7 text-left transition-colors hover:border-gold-500/50"
              style={{ background: `linear-gradient(155deg, ${cat.from}, ${cat.to})` }}
            >
              {/* glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: cat.accent }}
              />
              <span className="pointer-events-none absolute right-5 top-3 font-display text-6xl font-bold opacity-10">
                {cat.numeral}
              </span>

              <div
                className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border"
                style={{ borderColor: `${cat.accent}55`, background: `${cat.accent}18`, color: cat.accent }}
              >
                <KarmaIcon name={cat.motif} className="h-7 w-7" strokeWidth={1.3} />
              </div>

              <p className="relative text-[0.6rem] font-semibold uppercase tracking-[0.3em]" style={{ color: cat.accent }}>
                Realm {cat.numeral}
              </p>
              <h3 className="relative mt-1 font-display text-xl font-semibold text-parchment">{cat.name}</h3>
              <p className="relative mt-0.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-mist/80">
                {cat.tagline}
              </p>
              <p className="relative mt-3 text-sm leading-relaxed text-mist">{cat.description}</p>

              <div className="relative mt-5 flex items-center justify-between">
                <span className="rounded-full border border-gold-700/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold-300/90">
                  {countByCategory(cat.key)} {countByCategory(cat.key) === 1 ? "card" : "cards"}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400 transition-transform group-hover:translate-x-1">
                  Explore ›
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
