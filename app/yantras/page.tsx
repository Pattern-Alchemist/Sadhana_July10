import Link from "next/link";
import { YANTRAS } from "@/lib/yantra-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";

export const dynamic = "force-dynamic";

const CAUTION_BADGE: Record<string, { label: string; classes: string }> = {
  high: {
    label: "High Caution",
    classes: "text-[var(--color-rose-accent)] border-[var(--color-rose-accent)]/40 bg-[var(--color-rose-accent)]/5",
  },
  moderate: {
    label: "Moderate Caution",
    classes: "text-[var(--color-gold-bright)] border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5",
  },
};

export default function YantrasPage() {
  const highCaution = YANTRAS.filter((y) => y.caution === "high").length;
  const moderate = YANTRAS.filter((y) => y.caution === "moderate").length;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-[var(--color-ink)]/40 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="yantra-bg-spin absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full border border-[var(--color-gold)]" />
            <div className="absolute inset-[10%] rounded-full border border-[var(--color-gold)]" />
            <div className="absolute inset-[25%] rounded-full border border-[var(--color-gold)]" />
            <div className="absolute inset-[40%] rounded-full border border-[var(--color-gold)]" />
          </div>
        </div>

        <div className="content-z relative mx-auto max-w-5xl px-4 text-center sm:px-8">
          <div className="fade-up">
            <div className="mb-6 text-[var(--color-gold)]/70">
              <OmGlyph style={{ fontSize: "2.5rem" }} />
            </div>
            <span className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.62rem]">
              The Yantra Gallery
            </span>
            <h1 className="mt-4 font-display text-[2rem] font-medium leading-[1.1] text-balance text-[var(--color-ivory)] sm:text-6xl">
              Geometric instruments
              <br />
              of <span className="shimmer italic text-[var(--color-gold-bright)]">contemplative technology</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-bone)]/75 sm:mt-7 sm:text-lg">
              {YANTRAS.length} scholarly renderings of tantric yantras — each geometrically faithful to its source text, each preserved here as a contemplative instrument rather than an activated ritual object. Browse, study, trace the geometry.
            </p>
          </div>

          <div className="fade-up mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-gold)]/15 sm:mt-12">
            <Stat label="Yantras" value={YANTRAS.length} />
            <Stat label="High-Caution" value={highCaution} accent="rose" />
            <Stat label="Moderate" value={moderate} accent="gold" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5">
        <div className="mx-auto flex max-w-5xl items-start gap-3 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
          <span className="mt-0.5 text-[var(--color-rose-accent)]">⚠</span>
          <p className="text-xs leading-relaxed text-[var(--color-bone)]/85 sm:text-sm">
            These yantras are <strong className="text-[var(--color-rose-accent)]">scholarly renderings</strong> — geometric documentation of tantric source texts, not activated ritual objects. Several depict inauspicious, cremation-ground, or spirit-contact registers. Browse with the same scholarly restraint with which they are presented.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="mb-10 text-center sm:mb-12">
          <FlourishDivider className="mb-6" />
          <h2 className="font-display text-2xl text-[var(--color-ivory)] sm:text-3xl lg:text-4xl">
            The Collection
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs text-[var(--color-bone)]/65 sm:text-sm">
            Tap any yantra to study its geometry in detail — bīja breakdown, symbolism, and source citation. Click to open the corresponding siddhi folio.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {YANTRAS.map((y, i) => {
            const badge = CAUTION_BADGE[y.caution];
            return (
              <Link
                key={y.slug}
                href={`/yantras/${y.slug}`}
                className="group fade-up block rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4 transition-all duration-500 hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-ink)]/70 hover:shadow-[0_0_40px_-12px_var(--color-gold)] sm:p-6"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative aspect-square overflow-hidden rounded-sm border border-[var(--color-gold)]/20 bg-[#0a0908] transition-all duration-700 group-hover:border-[var(--color-gold)]/50 group-hover:shadow-[inset_0_0_60px_-20px_var(--color-gold)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={y.file}
                    alt={`${y.title} — scholarly rendering`}
                    className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:rotate-[2deg]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-gold)]/0 via-[var(--color-gold)]/5 to-[var(--color-gold)]/0" />
                  </div>
                </div>

                <div className="mt-4 sm:mt-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-base text-[var(--color-ivory)] transition-colors duration-300 group-hover:text-[var(--color-gold-bright)] sm:text-xl">
                      {y.title}
                    </h3>
                    <span className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[0.45rem] uppercase tracking-luxe sm:px-2 sm:text-[0.5rem] ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-1 font-display text-xs italic text-[var(--color-gold)]/75 sm:text-sm">{y.sanskrit}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-bone)]/70 sm:mt-3 sm:text-sm">{y.description}</p>
                  <div className="mt-3 flex items-center justify-between text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40 sm:mt-4 sm:text-[0.55rem]">
                    <span className="truncate">{y.tradition}</span>
                    <span className="shrink-0 text-[var(--color-gold)]/60 transition-colors duration-300 group-hover:text-[var(--color-gold-bright)]">
                      View →
                    </span>
                  </div>
                  <div className="mt-1.5 text-[0.5rem] text-[var(--color-bone)]/35 sm:mt-2 sm:text-[0.55rem]">{y.source}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--hairline)] bg-[var(--color-ink)]/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <h2 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">
            On the Renderings
          </h2>
          <div className="mt-6 space-y-4 text-xs leading-relaxed text-[var(--color-bone)]/75 sm:text-sm">
            <p>
              Each yantra in this gallery is rendered from its primary textual source — the Vāmakeśvara Tantra for the Śrī Cakra, the Kālī Tantra for the Dakṣiṇa Kālī yantra, the Mahākāla Saṃhitā for the Guhyakālī yantra, and so on. Where the source text prescribes exact geometry (gate widths, bīja placement, mantra inscriptions), the rendering follows it. Where the source is silent or ambiguous, the rendering approximates to the closest standard form.
            </p>
            <p>
              The color palette is consistent across all renderings: obsidian background (lamp-soot black), gold for the primary geometry, rose accent for the inauspicious and cremation-ground yantras (Dhūmāvatī, Smāśāna Bhairavī), cyan accent for the Śrī Cakra&apos;s Śakti triangles and the Bālā yantra, and purple accent for the Vajravārāhī maṇḍala (Buddhist tantric register). The bīja syllables at the four gates follow the source-text prescriptions; the mantra inscriptions around the outer ring follow the source paddhatis.
            </p>
            <p className="text-[var(--color-bone)]/60">
              The yantras are displayed here for scholarly study and contemplative browsing. They are not activated ritual objects — activation requires dīkṣā, nyāsa, prāṇa-pratiṣṭhā, and the operational context of a qualified lineage. The AstroKalki project does not endorse the undertaking of yantra-pūjā without adequate preparation, transmission, and supervision.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: "rose" | "gold" }) {
  const color = accent === "rose" ? "text-[var(--color-rose-accent)]" : "text-[var(--color-gold-bright)]";
  return (
    <div className="bg-[var(--color-ink)] p-3 text-center sm:p-6">
      <p className={`font-display text-2xl ${color} sm:text-4xl`}>{value}</p>
      <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55 sm:text-[0.58rem]">{label}</p>
    </div>
  );
}
