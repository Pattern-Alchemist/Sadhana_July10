"use client";

import { OmGlyph } from "@/components/Symbols";

const GROUNDING_STEPS = [
  { title: "Salt Water", detail: "Drink a glass of water with a pinch of rock salt. Bathe in lukewarm water with salt. Salt grounds and clears residual energy.", icon: "🧂" },
  { title: "Eat Food", detail: "Eat something substantial — rice, milk, fruit. An empty prāṇa-kṣetra is vulnerable. Food restores the earth element.", icon: "🍚" },
  { title: "Walk in Sunlight", detail: "Step outside. Direct sunlight for 5-10 minutes. The sun dissolves liminal residue and re-grounds the body in the physical.", icon: "☀️" },
  { title: "Hanumān Cālīsā", detail: "Recite the Hanumān Cālīsā aloud. The text is held to dissolve spirit-contact residue and restore protective fire.", icon: "🛡️" },
  { title: "Mahāmṛtyuñjaya Mantra", detail: "Recite the Mahāmṛtyuñjaya mantra 21 times. The 'death-conquering' verse restores the prāṇa and stabilises the mind.", icon: "🕉️" },
  { title: "Grounding Breath", detail: "Sit on the ground (not a chair). 7 rounds of Nāḍī Śuddhi (alternate-nostril breath). This balances the autonomic state.", icon: "🌬️" },
  { title: "Call a Trusted Person", detail: "If symptoms persist — heart racing, vision blurring, overwhelming grief — call your guru or a trusted friend. Do not remain alone.", icon: "📞" },
];

export default function CrisisPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-rose-accent)]">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-rose-accent)] sm:text-[0.6rem]">
          Grounding Protocol · Instant Access
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          I'm Overwhelmed
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          If you feel destabilized — racing heart, blurred vision, overwhelming emotion — follow these steps in order. Do not skip.
        </p>
      </header>

      <div className="rounded-sm border border-[var(--color-rose-accent)]/30 bg-[var(--color-rose-accent)]/5 p-4 mb-6">
        <p className="text-xs leading-relaxed text-[var(--color-bone)]/75">
          <strong className="text-[var(--color-rose-accent)]">If your heart rate spikes uncontrollably, your vision blurs, or an overwhelming grief enters you</strong> — stop immediately. Recite the Hanumān Cālīsā aloud. Dismiss the practice. Eat. Bathe. Do not sleep until dawn.
        </p>
        <p className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60">
          — Preta-Siddhi Field Manual, Crisis Caution
        </p>
      </div>

      <div className="space-y-3">
        {GROUNDING_STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-4 rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/30 text-lg">
              {step.icon}
            </span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/50">Step {i + 1}</span>
                <h3 className="font-display text-base text-[var(--color-gold-bright)]">{step.title}</h3>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-bone)]/70">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-sm border border-[var(--color-rose-accent)]/20 bg-[var(--color-obsidian)]/40 p-5 text-center">
        <p className="text-xs leading-relaxed text-[var(--color-bone)]/65">
          If symptoms persist after all steps, <strong className="text-[var(--color-rose-accent)]">seek qualified medical help</strong>.
          Psychological and physiological symptoms are real. This grounding protocol
          complements — does not replace — professional care.
        </p>
      </div>

      <div className="mt-6 text-center">
        <a href="/" className="btn-ghost text-xs">← Return to Archive</a>
      </div>
    </div>
  );
}
