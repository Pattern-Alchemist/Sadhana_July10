import Link from "next/link";
import { AGHAD_COURSE_DATA, AGHAD_MODULES } from "@/lib/aghad-course-data";

export const metadata = {
  title: "Aghad: Complete Mastery & Enlightenment",
  description:
    "12-week self-learning curriculum to achieve Aghad (Avadhuta) consciousness and complete enlightenment.",
};

export default function AaghadLanding() {
  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-obsidian)] px-6 py-24 sm:px-8 sm:py-32">
        {/* Ambient background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[var(--color-purple-accent)]/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-t from-[var(--color-gold)]/5 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Spiritual Symbol */}
          <div className="mb-6 text-5xl sm:text-6xl text-[var(--color-gold)]/40">ॐ</div>

          {/* Eyebrow */}
          <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--color-purple-accent)]">
            The Complete Mastery Path
          </span>

          {/* Title */}
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight text-balance text-[var(--color-ivory)]">
            The Path of <span className="text-[var(--color-gold-bright)]">Aghad</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-[var(--color-bone)]/80 leading-relaxed max-w-2xl mx-auto">
            Complete enlightenment mastery in 12 weeks. Transform from beginner to Aghad consciousness through authenticated kundalini awakening, sacred mantras, and the path of non-duality.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-[var(--color-gold-bright)]">
                360
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-bone)]/60">
                Total Hours
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-[var(--color-gold-bright)]">
                12
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-bone)]/60">
                Weeks to Master
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-display text-[var(--color-gold-bright)]">
                7
              </div>
              <div className="text-xs uppercase tracking-wide text-[var(--color-bone)]/60">
                Chakra Stages
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aghad/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] text-[var(--color-obsidian)] font-display text-lg font-medium rounded-sm hover:from-[var(--color-gold-bright)] hover:to-[var(--color-gold)] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </Link>
            <Link
              href="/aghad/curriculum"
              className="px-8 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] font-display text-lg font-medium rounded-sm hover:bg-[var(--color-gold)]/5 transition-colors duration-300"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* About Aghad */}
      <section className="border-b border-[var(--hairline)] px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 font-display text-3xl sm:text-4xl text-[var(--color-ivory)]">
            What is <span className="text-[var(--color-gold-bright)]">Aghad</span>?
          </h2>

          <p className="mb-6 text-[var(--color-bone)]/85 leading-relaxed">
            Aghad (also known as Avadhuta or Avadhoot) is the highest spiritual state in Hindu philosophy—a being who has completely transcended ego, mind, and the cycle of karma. The Aghad exists beyond all dualities, free from attachment and fear, embodying the realization that individual consciousness is identical with universal consciousness (Brahman).
          </p>

          <p className="mb-6 text-[var(--color-bone)]/85 leading-relaxed">
            This 12-week course is a complete, scientifically-designed curriculum that guides you from spiritual foundation through complete enlightenment realization. It combines authenticated practices from the Dattatreya Avadhuta Gita, Vedic mantras, tantric kundalini activation, and non-dual teachings.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-3">
                Chakra Awakening
              </h3>
              <p className="text-sm text-[var(--color-bone)]/75">
                Systematically activate all 7 chakras, from root grounding through crown consciousness, with precise timing and intensity.
              </p>
            </div>
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-3">
                Sacred Mantras
              </h3>
              <p className="text-sm text-[var(--color-bone)]/75">
                Master 5+ authentic Vedic mantras including Gayatri, Maha Mrityunjaya, Om Namah Shivaya, and Soham with pronunciation and visualization.
              </p>
            </div>
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-3">
                Kundalini Mastery
              </h3>
              <p className="text-sm text-[var(--color-bone)]/75">
                Safely activate and stabilize kundalini energy with expert guidance through advanced pranayama and meditation techniques.
              </p>
            </div>
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-3">
                Voice-First Learning
              </h3>
              <p className="text-sm text-[var(--color-bone)]/75">
                Interact with an AI Guru using voice commands. Ask questions, get personalized guidance, and learn without constant typing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12-Week Timeline */}
      <section className="border-b border-[var(--hairline)] px-6 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-3xl sm:text-4xl text-[var(--color-ivory)]">
            Your 12-Week Transformation
          </h2>

          <div className="space-y-4">
            {AGHAD_MODULES.slice(0, 12).map((module, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/20 p-6 transition-all duration-300 hover:bg-[var(--color-ink)]/40 hover:border-[var(--color-gold)]/40"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-bright)]">
                        <span className="text-sm font-bold text-[var(--color-obsidian)]">
                          {module.moduleNumber}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                        Week {module.week} • {module.chakra}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-[var(--color-ivory)] group-hover:text-[var(--color-gold-bright)] transition-colors">
                      {module.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-bone)]/70">
                      {module.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[var(--color-gold-bright)]">
                      {module.hoursPerWeek}h
                    </div>
                    <div className="text-xs text-[var(--color-bone)]/60">per week</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/aghad/curriculum"
              className="inline-block px-6 py-2 text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] text-sm uppercase tracking-wide transition-colors"
            >
              View Full Curriculum →
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="border-b border-[var(--hairline)] px-6 py-16 sm:px-8 sm:py-24 bg-gradient-to-b from-[var(--color-ink)]/20 to-transparent">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 backdrop-blur p-8 sm:p-12">
            <h3 className="font-display text-2xl text-[var(--color-gold-bright)] mb-6">
              The Philosophy of Aghad
            </h3>

            <div className="space-y-4 text-[var(--color-bone)]/80 leading-relaxed">
              <p>
                The Aghad transcends all limitations of form, mind, and identity. Through kundalini awakening and mantra resonance, you dissolve the illusion of separation and recognize your true nature as infinite consciousness.
              </p>

              <p>
                This path is not about acquiring something new, but rather realizing what has always been present. It is the ultimate return to Self, the complete remembrance of your original nature.
              </p>

              <p className="italic text-[var(--color-gold)]/80">
                "The Aghad is he who sees the Self in all beings and all beings in the Self. Free from fear, free from attachment, free from ego—dwelling always in the Self alone." — Dattatreya Avadhuta Gita
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-display text-3xl sm:text-4xl text-[var(--color-ivory)]">
            Ready to Begin Your Transformation?
          </h2>

          <p className="mb-8 text-[var(--color-bone)]/80 leading-relaxed">
            Start now. Complete this 12-week mastery course at your own pace, with daily guidance, progress tracking, and voice-enabled Guru support.
          </p>

          <Link
            href="/aghad/dashboard"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] text-[var(--color-obsidian)] font-display text-lg font-medium rounded-sm hover:from-[var(--color-gold-bright)] hover:to-[var(--color-gold)] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Enter the Path of Aghad
          </Link>
        </div>
      </section>
    </div>
  );
}
