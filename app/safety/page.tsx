import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

const GROUNDING = [
  "Open the eyes fully and rest the gaze on a fixed, ordinary object in the room.",
  "Press the feet into the floor and the palms together; feel their weight and warmth.",
  "Lengthen the exhale to twice the length of the inhale for ten slow breaths.",
  "Name five things you can see, four you can touch, three you can hear.",
  "Drink water. Eat something. Return to an ordinary task.",
];

const FLAGS = [
  "Persistent derealisation or a sense that the world is unreal",
  "Distressing imagery that does not fade with grounding",
  "A racing heart, chest tightness, or panic that will not settle",
  "Intrusive thoughts of harm to yourself or others",
  "Sleep that does not return for several nights",
];

export default function SafetyPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Stewardship · Always Open"
        title="Safety & Closing"
        subtitle="Contemplative practice can, on occasion, surface more than a person is ready to hold. These protocols are ungated and ever-present — the Archive's first duty is to your wellbeing."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-8 px-6 sm:px-8">
        {/* Closing protocol */}
        <section className="rounded-sm border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/5 p-6">
          <h2 className="font-display text-2xl text-[var(--color-sage)]">
            Closing a Practice
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/80">
            Never end abruptly mid-absorption. A practice is sealed, not abandoned.
            Use this sequence whenever you wish to return to ordinary mind.
          </p>
          <ol className="mt-4 space-y-2">
            {GROUNDING.map((g, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ivory)]/90">
                <span className="font-display text-[var(--color-sage)]">{i + 1}.</span>
                {g}
              </li>
            ))}
          </ol>
        </section>

        {/* When to pause */}
        <section className="rounded-sm border border-[var(--color-rose-accent)]/30 bg-[var(--color-rose-accent)]/5 p-6">
          <h2 className="font-display text-2xl text-[var(--color-rose-accent)]">
            When to Pause
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/80">
            If any of the following arise, stop the practice entirely and seek
            grounding — and, if needed, qualified support. None of these are
            &quot;part of the path&quot; to endure alone.
          </p>
          <ul className="mt-4 space-y-2">
            {FLAGS.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-[var(--color-ivory)]/90">
                <span className="text-[var(--color-rose-accent)]">⚠</span>
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Crisis */}
        <section className="engraved-frame rounded-sm bg-[var(--color-ink)]/70 p-6">
          <h2 className="font-display text-2xl text-[var(--color-gold-bright)]">
            In Crisis
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/80">
            The Archive is a library — it cannot help you in an emergency. If you
            are in danger or thinking of ending your life, reach out to people
            trained to help, right now.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <CrisisCard
              region="United States"
              lines={["988 — Suicide & Crisis Lifeline", "Text 988 · chat at 988lifeline.org"]}
            />
            <CrisisCard
              region="United Kingdom"
              lines={["116 123 — Samaritans (24/7)", "jo@samaritans.org"]}
            />
            <CrisisCard
              region="India"
              lines={["iCall — 9152987821", "Vandrevala — 1860-2662-345"]}
            />
            <CrisisCard
              region="International"
              lines={["findahelpline.com", "iasp.info/resources/Crisis_Centres"]}
            />
          </div>
          <p className="mt-4 text-xs italic text-[var(--color-bone)]/55">
            If you are elsewhere, search &ldquo;crisis helpline&rdquo; with your
            country or region. In immediate danger, contact your local emergency
            number.
          </p>
        </section>

        {/* Editorial standard */}
        <section className="rounded-sm border border-[var(--hairline)] p-6">
          <h2 className="font-display text-xl text-[var(--color-ivory)]">
            The Archive&apos;s Standard
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--color-bone)]/75">
            <li>· Practices are documented heritage, not medical or guaranteed advice.</li>
            <li>· Claims of experience are testimony, not fact; the Archive reports, it does not endorse.</li>
            <li>· Nothing here replaces the care of a qualified teacher, clinician, or counsellor.</li>
            <li>· Intermediate and advanced practices are best undertaken with a living guide.</li>
          </ul>
          <Link
            href="/archive"
            className="mt-5 inline-block text-xs tracking-wide-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            ← Return to the Archive
          </Link>
        </section>
      </div>
    </div>
  );
}

function CrisisCard({ region, lines }: { region: string; lines: string[] }) {
  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-charcoal)]/40 p-4">
      <div className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
        {region}
      </div>
      <div className="mt-1.5 space-y-0.5">
        {lines.map((l) => (
          <p key={l} className="text-sm text-[var(--color-ivory)]/90">{l}</p>
        ))}
      </div>
    </div>
  );
}
