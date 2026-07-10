import { motion } from "framer-motion";
import { KARMA_TYPES, PALETTE, SYMBOLS } from "../data/content";
import SectionHeading from "./SectionHeading";

const STYLE_NOTES = [
  { t: "Ethereal Realism", d: "A blend of classical tarot gravitas with modern surrealism — timeless, yet fresh." },
  { t: "Shadow & Light", d: "Every card holds a balance of dark and luminous, mirroring karma's dual nature of justice and mercy." },
  { t: "Living Texture", d: "Water, stone, root and star are rendered as physical, tactile presences — karma made visible." },
];

export default function Vision() {
  return (
    <section id="vision" className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Artwork & Vision"
          title="A Deck Born of Mystery"
          subtitle="Mystical in tone, accessible in spirit — an invitation to explore your spiritual journey with curiosity and empowerment."
        />

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2"
        >
          <p className="font-serif text-lg leading-relaxed text-parchment/90">
            The Karma Oracle is a complete 77-card deck devoted to the unseen laws of cause and
            effect. It traces karmic situations and justice, ancestral and soul-deep debts, the great
            archetypes that enforce cosmic law, and the cycles that return to us until they are
            finally understood.
          </p>
          <p className="font-serif text-lg leading-relaxed text-mist">
            Each card is a portal — revealing hidden truths about past actions and their weight upon
            the present and future. Yet the deck is never a sentence. It is a mirror, offered in the
            spirit of insight, healing, and the quiet power to rewrite one's own karmic story.
          </p>
        </motion.div>

        {/* Karma types */}
        <div className="mt-20">
          <h3 className="mb-6 text-center font-display text-xl font-semibold text-gold-200">
            The Lineages of Karma
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {KARMA_TYPES.map((k, i) => (
              <motion.div
                key={k.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-gold-700/25 bg-gradient-to-b from-shadow/60 to-ink/30 p-6 text-center"
              >
                <p className="text-3xl text-gold-400">{k.glyph}</p>
                <h4 className="mt-3 font-display text-base font-semibold text-parchment">{k.name}</h4>
                <p className="mt-2 text-xs leading-relaxed text-mist">{k.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Artwork style */}
        <div className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Style notes */}
          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">The Visual Language</h3>
            <div className="space-y-4">
              {STYLE_NOTES.map((n) => (
                <div key={n.t} className="flex gap-4 rounded-xl border border-gold-700/20 bg-ink/30 p-5">
                  <span className="mt-0.5 text-xl text-gold-400">✦</span>
                  <div>
                    <h4 className="font-display text-base font-semibold text-parchment">{n.t}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{n.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="mb-3 mt-8 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-500">
              Symbolic Motifs
            </h4>
            <div className="flex flex-wrap gap-2">
              {SYMBOLS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gold-700/30 bg-ink/40 px-3 py-1.5 text-xs text-mist"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Palette */}
          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-gold-200">The Palette</h3>
            <div className="grid grid-cols-2 gap-3">
              {PALETTE.map((c) => (
                <div key={c.name} className="overflow-hidden rounded-xl border border-gold-700/20">
                  <div className="h-20" style={{ background: c.hex }} />
                  <div className="bg-ink/50 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-sm font-semibold text-parchment">{c.name}</p>
                      <p className="text-[0.6rem] uppercase tracking-wider text-mist/70">{c.hex}</p>
                    </div>
                    <p className="mt-1 text-xs text-mist">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
