import Link from "next/link";
import { OmGlyph, FlourishDivider } from "./Symbols";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-[var(--hairline)] bg-[var(--color-ink)]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
        <FlourishDivider className="mb-10" />
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-[var(--color-gold-bright)]">
              <OmGlyph style={{ fontSize: "1.4rem" }} />
              <span className="font-display text-xl text-gold-foil">AstroKalki</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-bone)]/70">
              A living archive of contemplative heritage — presented with scholarly
              restraint, separating the testimony of texts from the claims of
              modernity.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-[0.62rem] uppercase tracking-luxe text-[var(--color-gold)]">
              The Halls
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/archive">The Great Archive</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/manuscripts">Codex Library</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/schools">Seven Schools</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/lineage">Transmission Maps</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.62rem] uppercase tracking-luxe text-[var(--color-gold)]">
              Instruments
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/cosmos">Living Cosmology</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/comparative">Comparative Matrix</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/archivist">The Custodian</Link></li>
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/journey">Personal Journey</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-[0.62rem] uppercase tracking-luxe text-[var(--color-gold)]">
              Stewardship
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-bone)]/75">
              <li><Link className="hover:text-[var(--color-gold-bright)]" href="/safety">Safety & Closing</Link></li>
              <li><span className="text-[var(--color-bone)]/40">Editorial standard: dual-lens</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-[var(--hairline)] pt-8 text-center">
          <p className="max-w-2xl text-xs leading-relaxed text-[var(--color-bone)]/45">
            AstroKalki documents cultural and contemplative heritage for study.
            Mantras, breath, and ritual are presented as the tradition&apos;s own
            testimony — not as medical, legal, or guaranteed advice. In distress,
            please contact qualified local care; see{" "}
            <Link className="text-[var(--color-gold)] underline-offset-2 hover:underline" href="/safety">
              Safety &amp; Closing
            </Link>.
          </p>
          <p className="mt-2 text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/35">
            ◆ Catalogued in reverent scholarship · {new Date().getFullYear()} ◆
          </p>
        </div>
      </div>
    </footer>
  );
}
