"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Siddhi, EvidenceSource } from "@/db/schema";
import type {
  PreSadhnaStep,
  ProcedureStep,
  YantraInfo,
  FaqItem,
} from "@/lib/archive-data";
import { useEpistemicLens } from "./useEpistemicLens";
import {
  FlourishDivider,
  CategoryGlyph,
  SriYantraGlyph,
  LotusGlyph,
} from "./Symbols";

type Tab = "overview" | "presadhna" | "procedure" | "yantra" | "qa" | "evidence";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "presadhna", label: "Pre-Sādhana" },
  { id: "procedure", label: "Procedure" },
  { id: "yantra", label: "Yantra" },
  { id: "qa", label: "Inquiry" },
  { id: "evidence", label: "Evidence" },
];

export default function SiddhiFolio({
  siddhi,
  evidence,
}: {
  siddhi: Siddhi;
  evidence: EvidenceSource[];
}) {
  const { lens } = useEpistemicLens();
  const [tab, setTab] = useState<Tab>("overview");

  const pre = siddhi.preSadhna as unknown as PreSadhnaStep[] | null;
  const steps = siddhi.procedure as unknown as ProcedureStep[] | null;
  const yantra = siddhi.yantra as unknown as YantraInfo | null;
  const faqs = siddhi.faq as unknown as FaqItem[] | null;

  const score = siddhi.authenticityScore ?? 0;

  const defaultLensNote = useMemo(() => {
    return lens === "practitioner"
      ? "Practitioner lens · the experiential pathway is foregrounded."
      : "Scholar lens · textual evidence and etymology are foregrounded.";
  }, [lens]);

  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-8 sm:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs tracking-wide-sm text-[var(--color-bone)]/55">
        <Link href="/archive" className="hover:text-[var(--color-gold-bright)]">
          ← The Archive
        </Link>
        <span className="text-[var(--color-gold)]/40">/</span>
        <span className="text-[var(--color-bone)]/40">{siddhi.category}</span>
      </div>

      {/* Folio header */}
      <header className="corner-flourish parchment engraved-frame relative p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-gold">Folio · AK-{String(siddhi.id).padStart(3, "0")}</span>
          <span className="badge">{siddhi.level}</span>
          <span className="badge">{siddhi.category}</span>
        </div>

        <h1 className="mt-5 font-display text-4xl leading-tight text-[var(--color-ivory)] sm:text-5xl">
          {siddhi.name}
        </h1>
        <p className="mt-2 font-display text-xl text-[var(--color-gold-bright)]">
          {siddhi.sanskrit}
        </p>

        <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-bone)]/85">
          {siddhi.summary}
        </p>

        {/* Authenticity meter */}
        <div className="mt-7">
          <div className="mb-1.5 flex items-center justify-between text-[0.62rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
            <span>Authenticity Index</span>
            <span className="text-[var(--color-gold-bright)]">{score}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-stone)]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${score}%`,
                background:
                  "linear-gradient(90deg,#9a7340,#e6c089,#c9985e)",
              }}
            />
          </div>
        </div>

        {/* Key stats */}
        <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] sm:grid-cols-4">
          {[
            { k: "Discipline", v: `${siddhi.durationHours}h` },
            { k: "Cycle", v: `${siddhi.days} days` },
            { k: "Tradition", v: siddhi.tradition ?? "—" },
            { k: "Stage", v: siddhi.level ?? "—" },
          ].map((s) => (
            <div key={s.k} className="bg-[var(--color-ink)] p-3 text-center">
              <div className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/50">
                {s.k}
              </div>
              <div className="mt-1 font-display text-sm text-[var(--color-ivory)]">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Lens indicator */}
      <p className="mt-5 text-center text-xs italic text-[var(--color-bone)]/50">
        {defaultLensNote}
      </p>

      {/* Primary mantra — emphasized in practitioner lens */}
      <div
        className={`mt-6 flex flex-col items-center gap-2 rounded-sm border p-6 text-center transition ${
          lens === "practitioner"
            ? "border-[var(--color-purple-accent)]/50 bg-[var(--color-purple-accent)]/5"
            : "border-[var(--hairline)]"
        }`}
      >
        <span className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
          Primary Mantra
        </span>
        <p className="font-display text-2xl leading-snug text-[var(--color-gold-bright)] sm:text-3xl">
          {siddhi.primaryMantra}
        </p>
      </div>

      {/* Tab navigation */}
      <nav className="sticky top-[58px] z-30 mt-8 flex flex-wrap justify-center gap-1 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/90 p-1.5 backdrop-blur">
        {TABS.map((t) => {
          const disabled =
            (t.id === "yantra" && !yantra) || (t.id === "evidence" && evidence.length === 0);
          if (disabled) return null;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 font-display text-sm tracking-wide-sm transition ${
                tab === t.id
                  ? "bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]"
                  : "text-[var(--color-bone)]/65 hover:text-[var(--color-ivory)]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 min-h-[300px]">
        {tab === "overview" && (
          <OverviewTab siddhi={siddhi} />
        )}
        {tab === "presadhna" && pre && <PreSadhnaTab steps={pre} />}
        {tab === "procedure" && steps && <ProcedureTab steps={steps} />}
        {tab === "yantra" && yantra && <YantraTab yantra={yantra} siddhiSlug={siddhi.slug ?? ""} />}
        {tab === "qa" && faqs && <QaTab faqs={faqs} />}
        {tab === "evidence" && (
          <EvidenceTab evidence={evidence} siddhi={siddhi} />
        )}
      </div>

      <FlourishDivider className="mt-14" />

      {/* Lineage */}
      <section className="mt-10 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6">
        <h3 className="mb-2 text-[0.62rem] uppercase tracking-luxe text-[var(--color-purple-accent)]">
          Lineage of Transmission
        </h3>
        <p className="text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
          {siddhi.lineage}
        </p>
        <Link
          href="/lineage"
          className="mt-3 inline-block text-xs tracking-wide-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
        >
          View the transmission maps →
        </Link>
      </section>
    </article>
  );
}

function OverviewTab({ siddhi }: { siddhi: Siddhi }) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <p className="drop-cap max-w-prose text-[1.05rem] leading-[1.85] text-[var(--color-ivory)]/90">
          {siddhi.description}
        </p>
        <div className="flex items-start justify-center md:pl-4">
          <span className="text-[var(--color-gold)]/50">
            <CategoryGlyph category={siddhi.category ?? ""} />
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-sm border border-[var(--color-sage)]/30 bg-[var(--color-sage)]/5 p-5">
          <h4 className="mb-3 flex items-center gap-2 text-[0.62rem] uppercase tracking-luxe text-[var(--color-sage)]">
            <span>✦</span> Documented Facets
          </h4>
          <ul className="space-y-2">
            {(siddhi.benefits as string[] | null)?.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ivory)]/85">
                <span className="text-[var(--color-sage)]">·</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-[var(--color-rose-accent)]/30 bg-[var(--color-rose-accent)]/5 p-5">
          <h4 className="mb-3 flex items-center gap-2 text-[0.62rem] uppercase tracking-luxe text-[var(--color-rose-accent)]">
            <span>⚠</span> Cautions
          </h4>
          <ul className="space-y-2">
            {(siddhi.warnings as string[] | null)?.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--color-ivory)]/85">
                <span className="text-[var(--color-rose-accent)]">·</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PreSadhnaTab({ steps }: { steps: PreSadhnaStep[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <div>
      <p className="mb-5 text-center text-sm italic text-[var(--color-bone)]/60">
        The preparatory sequence common to all disciplined practice.
      </p>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`rounded-sm border p-5 transition ${
              done[i]
                ? "border-[var(--color-sage)]/40 bg-[var(--color-sage)]/5"
                : "border-[var(--hairline)]"
            }`}
          >
            <div className="flex items-start gap-4">
              <button
                onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs transition ${
                  done[i]
                    ? "border-[var(--color-sage)] bg-[var(--color-sage)]/20 text-[var(--color-sage)]"
                    : "border-[var(--color-gold)]/40 text-[var(--color-gold)]"
                }`}
                aria-label="mark complete"
              >
                {done[i] ? "✓" : i + 1}
              </button>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-display text-xl text-[var(--color-ivory)]">
                    {s.title}
                  </h4>
                  {s.duration !== "—" && (
                    <span className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-gold)]">
                      {s.duration}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/80">
                  {s.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center text-xs tracking-wide-sm text-[var(--color-bone)]/55">
        {completed} of {steps.length} steps completed
      </div>
    </div>
  );
}

function ProcedureTab({ steps }: { steps: ProcedureStep[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      <p className="mb-5 text-center text-sm italic text-[var(--color-bone)]/60">
        The graded sequence. Each stage is its own discipline — do not hurry.
      </p>
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-sm border border-[var(--hairline)]">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center gap-4 bg-[var(--color-ink)]/60 px-5 py-4 text-left transition hover:bg-[var(--color-ink)]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/40 font-display text-sm text-[var(--color-gold-bright)]">
                {i + 1}
              </span>
              <span className="flex-1 font-display text-lg text-[var(--color-ivory)]">
                {s.title}
              </span>
              <span className="text-[var(--color-gold)]/60">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="space-y-3 border-t border-[var(--hairline)] px-5 py-5">
                <p className="text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
                  {s.detail}
                </p>
                {s.substeps && (
                  <ul className="ml-2 space-y-1.5">
                    {s.substeps.map((sb, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[var(--color-bone)]/75">
                        <span className="text-[var(--color-gold)]/70">{String.fromCharCode(97 + j)}.</span>
                        {sb}
                      </li>
                    ))}
                  </ul>
                )}
                {s.caution && (
                  <p className="rounded-sm border border-[var(--color-rose-accent)]/30 bg-[var(--color-rose-accent)]/5 px-3 py-2 text-sm italic text-[var(--color-rose-accent)]">
                    ⚠ {s.caution}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function YantraTab({ yantra, siddhiSlug }: { yantra: YantraInfo; siddhiSlug: string }) {
  // Map siddhi slugs to the SVG yantras available in /public/yantras/.
  const YANTRA_SVG_MAP: Record<string, string> = {
    "preta-siddhi": "/yantras/preta-sandhi-yantra.svg",
    "sudarshana-chakra-sadhana": "/yantras/sudarshana-yantra.svg",
    "shodashi-tripurasundari-sadhana": "/yantras/sri-cakra-yantra.svg",
    "bhuvaneshvari-sadhana": "/yantras/bhuvaneshvari-yantra.svg",
    "kamala-sadhana": "/yantras/kamala-yantra.svg",
    "dakshina-kali-sadhana": "/yantras/dakshina-kali-yantra.svg",
    "dhumavati-sadhana": "/yantras/dhumavati-yantra.svg",
    "matangi-sadhana": "/yantras/matangi-yantra.svg",
    "tara-ugra-sadhana": "/yantras/tara-ugra-yantra.svg",
    "tripura-bhairavi-sadhana": "/yantras/tripura-bhairavi-yantra.svg",
    "smasana-bhairavi-sadhana": "/yantras/smasana-bhairavi-yantra.svg",
    "guhyakali-sadhana": "/yantras/guhyakali-yantra.svg",
    "bala-tripurasundari-sadhana": "/yantras/bala-tripurasundari-yantra.svg",
    "bagalamukhi-sadhana": "/yantras/bagalamukhi-yantra.svg",
    "pratyangira-devi-sadhana": "/yantras/pratyangira-yantra.svg",
    "vajrayogini-sadhana": "/yantras/vajrayogini-mandala.svg",
    "lakulisha-pashupata-sadhana": "/yantras/lakulisha-linga.svg",
    "matsyendranath-nath-sadhana": "/yantras/nath-cakra-diagram.svg",
  };
  const svgPath = YANTRA_SVG_MAP[siddhiSlug];

  return (
    <div className="flex flex-col items-center gap-6 rounded-sm border border-[var(--hairline)] p-8 text-center md:flex-row md:text-left">
      <div className="relative shrink-0 text-[var(--color-gold)]">
        {svgPath ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={svgPath}
            alt={`${yantra.name} — scholarly rendering`}
            width={220}
            height={220}
            className="relative rounded-sm border border-[var(--color-gold)]/30 transition-transform duration-700 hover:scale-105 hover:rotate-1"
          />
        ) : (
          <>
            <div className="absolute inset-0 -m-6 opacity-30 blur-2xl">
              <SriYantraGlyph size={160} />
            </div>
            <SriYantraGlyph size={140} className="relative" />
          </>
        )}
      </div>
      <div>
        <h4 className="font-display text-2xl text-[var(--color-gold-bright)]">
          {yantra.name}
        </h4>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
          {yantra.description}
        </p>
        <p className="mt-3 text-sm italic leading-relaxed text-[var(--color-bone)]/65">
          {yantra.symbolism}
        </p>
        {svgPath && (
          <p className="mt-3 text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]/60">
            Scholarly rendering · not an activated ritual object
          </p>
        )}
      </div>
    </div>
  );
}

function QaTab({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="rounded-sm border border-[var(--hairline)] p-5">
          <h4 className="flex items-start gap-3 font-display text-lg text-[var(--color-cyan-accent)]">
            <LotusGlyph size={20} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
            {f.q}
          </h4>
          <p className="mt-2 pl-8 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
            {f.a}
          </p>
        </div>
      ))}
    </div>
  );
}

function EvidenceTab({
  evidence,
  siddhi,
}: {
  evidence: EvidenceSource[];
  siddhi: Siddhi;
}) {
  const kindColor: Record<string, string> = {
    primary: "var(--color-gold-bright)",
    secondary: "var(--color-cyan-accent)",
    scholarly: "var(--color-purple-accent)",
    modern: "var(--color-sage)",
  };
  const confWidth: Record<string, number> = { high: 95, medium: 65, low: 35 };
  return (
    <div>
      <p className="mb-6 text-center text-sm italic text-[var(--color-bone)]/60">
        Each claim is traced to its source. Confidence is the Archive&apos;s
        editorial assessment of textual attestation.
      </p>
      <div className="space-y-4">
        {evidence.map((e, i) => (
          <div key={i} className="rounded-sm border border-[var(--hairline)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className="badge"
                style={{
                  color: kindColor[e.kind ?? ""] ?? "var(--color-bone)",
                  borderColor: kindColor[e.kind ?? ""] ?? "var(--color-bone)",
                }}
              >
                {e.kind}
              </span>
              <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                confidence · {e.confidence}
              </span>
            </div>
            <p className="mt-3 font-display text-lg leading-snug text-[var(--color-ivory)]">
              {e.citation}
            </p>
            <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/80">
              {e.notes}
            </p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[var(--color-stone)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${confWidth[e.confidence ?? "low"]}%`,
                  background: kindColor[e.kind ?? ""] ?? "var(--color-gold)",
                }}
              />
            </div>
            {e.url ? (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs tracking-wide-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
              >
                Consult primary text ↗
              </a>
            ) : (
              <span className="mt-3 inline-block text-xs tracking-wide-sm text-[var(--color-bone)]/35">
                (source text held in print reference)
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-4 text-center text-xs italic leading-relaxed text-[var(--color-bone)]/60">
        Folio AK-{String(siddhi.id).padStart(3, "0")} · the Archive separates the
        testimony of texts from later interpretation. Traditions are reported as
        their own, not endorsed as fact.
      </p>
    </div>
  );
}
