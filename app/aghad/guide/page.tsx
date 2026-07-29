import Link from "next/link";

export const metadata = {
  title: "Aghad Mastery Guide",
  description: "Complete guide to the Aghad enlightenment path and practices",
};

export default function Guide() {
  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-5xl sm:text-6xl text-[var(--color-ivory)]">
            The Aghad Path
          </h1>
          <p className="mt-4 text-lg text-[var(--color-bone)]/80">
            A complete guide to enlightenment mastery
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-20 space-y-16">
        {/* What is Aghad */}
        <section className="space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            What is Aghad?
          </h2>
          <p className="text-[var(--color-bone)]/85 leading-relaxed">
            Aghad (also known as Avadhuta or Avadhoot) represents the highest state of
            human consciousness—a being who has completely transcended ego, mind, and
            the cycle of karma. The Aghad exists beyond all dualities, free from
            attachment, fear, and desire. Such a being experiences continuous unity
            consciousness, recognizing that individual consciousness is identical with
            universal consciousness (Brahman).
          </p>
          <p className="text-[var(--color-bone)]/85 leading-relaxed">
            According to the Dattatreya Avadhuta Gita, the Aghad path is not one of
            renunciation or escape, but of direct realization through systematic practice.
            It combines the outer disciplines of yoga with inner cultivation of
            non-dual awareness.
          </p>
        </section>

        {/* The 12-Week Path */}
        <section className="space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            The 12-Week Path
          </h2>
          <p className="text-[var(--color-bone)]/85 leading-relaxed">
            This course is divided into 12 progressive weeks, each focusing on a specific
            chakra or stage of consciousness:
          </p>

          <div className="grid gap-4 mt-6">
            <div className="p-4 rounded-sm bg-[var(--color-ink)]/20 border border-[var(--hairline)]">
              <h4 className="font-semibold text-[var(--color-gold-bright)] mb-2">
                Weeks 1-3: Foundation (Muladhara, Svadhisthana, Manipura)
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Establish grounding, activate creative energy, and build personal power.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[var(--color-ink)]/20 border border-[var(--hairline)]">
              <h4 className="font-semibold text-[var(--color-gold-bright)] mb-2">
                Weeks 4-6: Heart & Throat (Anahata, Vishuddha)
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Open the heart center, cultivate compassion, and activate authentic
                expression.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[var(--color-ink)]/20 border border-[var(--hairline)]">
              <h4 className="font-semibold text-[var(--color-gold-bright)] mb-2">
                Weeks 7-9: Mind & Crown (Ajna, Sahasrara)
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Activate intuition, open the third eye, and connect to cosmic consciousness.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[var(--color-ink)]/20 border border-[var(--hairline)]">
              <h4 className="font-semibold text-[var(--color-gold-bright)] mb-2">
                Weeks 10-12: Mastery & Liberation
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Master kundalini, stabilize enlightenment, and embody Aghad consciousness.
              </p>
            </div>
          </div>
        </section>

        {/* The Five Core Mantras */}
        <section className="space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            The Five Core Mantras
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-[var(--color-gold)] mb-2">
                1. Om (Pranava)
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                The primordial sound representing Brahman. Foundation mantra that attunes
                consciousness to cosmic frequency.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-gold)] mb-2">
                2. Gayatri
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                The most sacred Vedic mantra. Illuminates intellect and accelerates
                kundalini activation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-gold)] mb-2">
                3. Maha Mrityunjaya
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Conquers fear of death and aligns consciousness with immortal Self. Most
                powerful healing mantra.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-gold)] mb-2">
                4. Om Namah Shivaya
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Transforms consciousness into pure witness awareness. Dissolves ego through
                surrender.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-gold)] mb-2">
                5. Soham
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                The natural mantra of breath. Fastest path to non-dual realization and
                self-recognition.
              </p>
            </div>
          </div>
        </section>

        {/* Key Practices */}
        <section className="space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            Key Practices
          </h2>

          <div className="grid gap-4">
            <div>
              <h4 className="font-semibold text-[var(--color-cyan-accent)] mb-2">
                Pranayama (Breath Control)
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Controlled breathing that activates specific energy channels and directs
                prana through the chakras.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-cyan-accent)] mb-2">
                Mantra Chanting
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Repetition of sacred sounds that attune consciousness and activate chakras
                through vibrational resonance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-cyan-accent)] mb-2">
                Meditation
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Deep inner observation leading to witness consciousness and recognition of
                the Self.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-cyan-accent)] mb-2">
                Visualization
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Inner seeing that directs energy and opens subtle perception to spiritual
                realities.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--color-cyan-accent)] mb-2">
                Mudras & Asanas
              </h4>
              <p className="text-sm text-[var(--color-bone)]/75">
                Hand seals and body postures that channel energy and create specific states
                of consciousness.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline & Duration */}
        <section className="space-y-4">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            Commitment & Timeline
          </h2>

          <div className="rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent p-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                Duration
              </div>
              <p className="text-[var(--color-bone)]/75 mt-1">
                12 weeks (3 months) of intensive practice
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                Daily Commitment
              </div>
              <p className="text-[var(--color-bone)]/75 mt-1">
                5-6 hours of practice, 5-6 days per week
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                Total Hours
              </div>
              <p className="text-[var(--color-bone)]/75 mt-1">
                360 hours of guided, progressive practice
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-[var(--color-gold)]">
                Expected Outcomes
              </div>
              <p className="text-[var(--color-bone)]/75 mt-1">
                Kundalini activation, chakra opening, stable meditation, ego dissolution,
                and enlightenment realization
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="space-y-6">
          <h2 className="font-display text-3xl text-[var(--color-gold-bright)]">
            Getting Started
          </h2>

          <div className="space-y-3">
            <Link
              href="/aghad/dashboard"
              className="block p-6 rounded-sm border border-[var(--color-gold)] bg-[var(--color-gold)]/5 hover:bg-[var(--color-gold)]/10 transition-colors"
            >
              <div className="font-semibold text-[var(--color-gold-bright)]">
                Start Your Journey
              </div>
              <p className="text-sm text-[var(--color-bone)]/75 mt-1">
                Begin with Week 1 and progress through the 12-week curriculum
              </p>
            </Link>

            <Link
              href="/aghad/mantras"
              className="block p-6 rounded-sm border border-[var(--color-cyan-accent)]/30 bg-[var(--color-ink)]/20 hover:bg-[var(--color-ink)]/40 transition-colors"
            >
              <div className="font-semibold text-[var(--color-cyan-accent)]">
                Learn the Mantras
              </div>
              <p className="text-sm text-[var(--color-bone)]/75 mt-1">
                Master pronunciation, meaning, and visualization of all 5 core mantras
              </p>
            </Link>

            <Link
              href="/aghad/meditation"
              className="block p-6 rounded-sm border border-[var(--color-purple-accent)]/30 bg-[var(--color-ink)]/20 hover:bg-[var(--color-ink)]/40 transition-colors"
            >
              <div className="font-semibold text-[var(--color-purple-accent)]">
                Practice Meditation
              </div>
              <p className="text-sm text-[var(--color-bone)]/75 mt-1">
                Guided meditations for each chakra and stage of the path
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
