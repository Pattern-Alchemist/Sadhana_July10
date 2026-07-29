import Link from "next/link";
import { AGHAD_MODULES } from "@/lib/aghad-course-data";

export const metadata = {
  title: "Aghad Mastery Curriculum",
  description: "Complete 12-week curriculum structure and learning objectives",
};

const CHAKRA_EMOJIS: Record<string, string> = {
  "Muladhara (Root)": "🔴",
  "Svadhisthana (Sacral)": "🟠",
  "Manipura (Solar Plexus)": "🟡",
  "Anahata (Heart)": "💚",
  "Vishuddha (Throat)": "🔵",
  "Ajna (Third Eye)": "🟣",
  "Sahasrara (Crown)": "⚪",
  Transcendent: "✨",
};

export default function Curriculum() {
  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Header */}
      <section className="border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--color-gold)]">
            Complete Learning Path
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl text-[var(--color-ivory)]">
            12-Week Aghad Mastery Curriculum
          </h1>
          <p className="mt-4 text-[var(--color-bone)]/80 leading-relaxed max-w-2xl mx-auto">
            A complete progression from spiritual foundation to complete enlightenment realization. 360 hours of authentic practice, guided by proven teachings.
          </p>
        </div>
      </section>

      {/* Curriculum Modules */}
      <section className="px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-6">
          {AGHAD_MODULES.map((module, idx) => (
            <Link
              key={idx}
              href={`/aghad/module/${module.moduleNumber}`}
              className="group block"
            >
              <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/20 p-6 sm:p-8 transition-all duration-300 hover:bg-[var(--color-ink)]/40 hover:border-[var(--color-gold)]/40">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div className="flex items-start gap-4">
                    {/* Module Number Circle */}
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-bright)] shadow-lg">
                      <span className="text-lg font-display font-bold text-[var(--color-obsidian)]">
                        {module.moduleNumber}
                      </span>
                    </div>

                    {/* Title & Meta */}
                    <div className="flex-1">
                      <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ivory)] group-hover:text-[var(--color-gold-bright)] transition-colors">
                        {module.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-1 text-[var(--color-gold)]/80">
                          {CHAKRA_EMOJIS[module.chakra] || "✨"}
                          {module.chakra}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[var(--color-cyan-accent)]/80">
                          📅 Week {module.week}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[var(--color-purple-accent)]/80">
                          ⏱️ {module.hoursPerWeek}h/week
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl text-[var(--color-gold)]">→</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[var(--color-bone)]/80 leading-relaxed mb-4">
                  {module.description}
                </p>

                {/* Learning Outcomes */}
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                    Learning Outcomes
                  </div>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {module.learningOutcomes?.map((outcome, i) => (
                      <li
                        key={i}
                        className="text-xs text-[var(--color-bone)]/70 flex items-start gap-2"
                      >
                        <span className="text-[var(--color-gold)]/60 flex-shrink-0">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practices */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-cyan-accent)] font-semibold">
                    Key Practices
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.practicesIncluded?.map((practice, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 bg-[var(--color-cyan-accent)]/10 border border-[var(--color-cyan-accent)]/30 text-xs text-[var(--color-cyan-accent)] rounded-sm"
                      >
                        {practice}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="border-t border-[var(--hairline)] bg-gradient-to-b from-transparent to-[var(--color-ink)]/20 px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-3xl text-[var(--color-ivory)]">
            Curriculum Overview
          </h2>

          <div className="grid gap-6 sm:grid-cols-3 mb-10">
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <div className="text-3xl font-display text-[var(--color-gold-bright)] mb-2">
                360h
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                Total Duration
              </div>
              <p className="mt-3 text-sm text-[var(--color-bone)]/70">
                30 hours per week, 5-6 hours daily across 5-6 days
              </p>
            </div>

            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <div className="text-3xl font-display text-[var(--color-gold-bright)] mb-2">
                12
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                Progression Stages
              </div>
              <p className="mt-3 text-sm text-[var(--color-bone)]/70">
                From root chakra awakening to cosmic consciousness
              </p>
            </div>

            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <div className="text-3xl font-display text-[var(--color-gold-bright)] mb-2">
                7
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                Chakra Systems
              </div>
              <p className="mt-3 text-sm text-[var(--color-bone)]/70">
                Complete kundalini activation through all energy centers
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent p-8">
            <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-6">
              What You'll Master
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-gold)] mb-3">
                  Sacred Mantras
                </h4>
                <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
                  <li>✓ Om (Pranava) - Universal vibration</li>
                  <li>✓ Gayatri - Solar illumination</li>
                  <li>✓ Maha Mrityunjaya - Death conquest</li>
                  <li>✓ Om Namah Shivaya - Divine surrender</li>
                  <li>✓ Soham - Non-dual realization</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[var(--color-purple-accent)] mb-3">
                  Advanced Practices
                </h4>
                <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
                  <li>✓ Kundalini activation & control</li>
                  <li>✓ 7 Chakra mastery & alignment</li>
                  <li>✓ Pranayama breathing techniques</li>
                  <li>✓ Deep meditation & visualization</li>
                  <li>✓ Ego death & enlightenment</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[var(--color-cyan-accent)] mb-3">
                  Voice-Enabled Learning
                </h4>
                <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
                  <li>✓ AI Guru guidance via voice</li>
                  <li>✓ Real-time pronunciation feedback</li>
                  <li>✓ Personalized practice recommendations</li>
                  <li>✓ Symptom guidance & support</li>
                  <li>✓ Progress tracking & adjustments</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[var(--color-rose-accent)] mb-3">
                  Self-Learning Support
                </h4>
                <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
                  <li>✓ Daily guided meditation</li>
                  <li>✓ Authenticated source materials</li>
                  <li>✓ Progress dashboard & tracking</li>
                  <li>✓ Gamified chakra activation</li>
                  <li>✓ Community reflection journaling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-display text-3xl text-[var(--color-ivory)]">
            Ready to Start Your Journey?
          </h2>
          <Link
            href="/aghad/dashboard"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] text-[var(--color-obsidian)] font-display text-lg font-medium rounded-sm hover:from-[var(--color-gold-bright)] hover:to-[var(--color-gold)] transition-all shadow-lg hover:shadow-xl"
          >
            Begin the Aghad Path
          </Link>
        </div>
      </section>
    </div>
  );
}
