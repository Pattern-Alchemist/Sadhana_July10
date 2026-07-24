"use client";

import { useState, useMemo } from "react";
import type { SiddhiSeed } from "@/lib/archive-data";
import { FlourishDivider, CategoryGlyph } from "./Symbols";

type ViewMode = "grid" | "detail" | "raw";

export default function AdminUnrestrictedView({
  siddhis,
}: {
  siddhis: SiddhiSeed[];
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return siddhis.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sanskrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, siddhis]);

  const selected = selectedSlug ? siddhis.find((s) => s.slug === selectedSlug) : null;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-[var(--color-hairline)] pb-6">
        <h1 className="font-display text-3xl text-[var(--color-ivory)] sm:text-4xl">
          Archive Administrator
        </h1>
        <p className="mt-2 text-sm text-[var(--color-bone)]/70">
          Unrestricted access to all archive content. Both Scholar and Practitioner perspectives, with raw metadata.
        </p>
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-xs uppercase tracking-luxe rounded-sm border transition ${
              viewMode === "grid"
                ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                : "border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode("detail")}
            className={`px-4 py-2 text-xs uppercase tracking-luxe rounded-sm border transition ${
              viewMode === "detail"
                ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                : "border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
            }`}
          >
            Dual Lens
          </button>
          <button
            onClick={() => setViewMode("raw")}
            className={`px-4 py-2 text-xs uppercase tracking-luxe rounded-sm border transition ${
              viewMode === "raw"
                ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                : "border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold)]/10"
            }`}
          >
            Raw Data
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, Sanskrit, or category…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="field w-full"
        />
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((siddhi) => (
            <div
              key={siddhi.slug}
              onClick={() => {
                setSelectedSlug(siddhi.slug);
                setViewMode("detail");
              }}
              className="cursor-pointer rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/40 p-4 transition hover:border-[var(--color-gold)]/60 hover:bg-[var(--color-ink)]/60"
            >
              <div className="mb-2 flex items-start justify-between">
                <span className="badge badge-gold text-xs">{siddhi.category}</span>
                <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">
                  {siddhi.level}
                </span>
              </div>
              <h3 className="font-display text-lg text-[var(--color-ivory)]">
                {siddhi.name}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-gold)]/80">
                {siddhi.sanskrit}
              </p>
              <p className="mt-2 text-xs text-[var(--color-bone)]/60">
                {siddhi.summary.substring(0, 80)}…
              </p>
              <div className="mt-3 flex items-center justify-between text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
                <span>{siddhi.durationHours}h / {siddhi.days} days</span>
                <span className="text-[var(--color-gold)]/70">{siddhi.authenticityScore}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail/Dual Lens View */}
      {viewMode === "detail" && selected && (
        <AdminDualLensView siddhi={selected} onBack={() => setSelectedSlug(null)} />
      )}

      {/* Raw Data View */}
      {viewMode === "raw" && (
        <div className="space-y-6">
          {filtered.map((siddhi) => (
            <div
              key={siddhi.slug}
              className="rounded-sm border border-[var(--color-gold)]/20 bg-[var(--color-ink)]/30 p-6"
            >
              <h3 className="font-display text-lg text-[var(--color-gold)]">
                {siddhi.name}
              </h3>
              <pre className="mt-4 overflow-x-auto rounded-sm bg-[var(--color-ink)]/80 p-4 text-[0.65rem] text-[var(--color-bone)]/80">
                {JSON.stringify(siddhi, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--color-bone)]/60">
            No entries found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}

function AdminDualLensView({
  siddhi,
  onBack,
}: {
  siddhi: SiddhiSeed;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
      >
        ← Back to Grid
      </button>

      {/* Header */}
      <div className="border-b border-[var(--color-gold)]/30 pb-6">
        <h2 className="font-display text-3xl text-[var(--color-ivory)]">
          {siddhi.name}
        </h2>
        <p className="mt-2 text-lg text-[var(--color-gold)]">{siddhi.sanskrit}</p>
        <p className="mt-3 max-w-3xl text-[var(--color-bone)]/75">{siddhi.description}</p>
      </div>

      {/* Metadata */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Slug", value: siddhi.slug },
          { label: "Category", value: siddhi.category },
          { label: "Tradition", value: siddhi.tradition },
          { label: "Level", value: siddhi.level },
          { label: "Duration", value: `${siddhi.durationHours}h` },
          { label: "Cycle", value: `${siddhi.days} days` },
          { label: "Authenticity", value: `${siddhi.authenticityScore}%` },
          { label: "Lineage", value: siddhi.lineage },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-sm border border-[var(--color-gold)]/20 bg-[var(--color-ink)]/40 p-3"
          >
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">
              {label}
            </p>
            <p className="mt-1 text-sm text-[var(--color-bone)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Dual Lens Content */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Scholar Perspective */}
        <div className="space-y-4">
          <div className="border-l-4 border-[var(--color-gold)]/60 pl-4">
            <h3 className="font-display text-lg text-[var(--color-gold)]">
              Scholar Lens
            </h3>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">
              Textual evidence and etymology foregrounded
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                Primary Source
              </h4>
              <p className="mt-2 text-sm text-[var(--color-bone)]/75">
                {siddhi.primaryMantra}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                Lineage
              </h4>
              <p className="mt-2 text-sm text-[var(--color-bone)]/75">
                {siddhi.lineage}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                Summary
              </h4>
              <p className="mt-2 text-sm text-[var(--color-bone)]/75">
                {siddhi.summary}
              </p>
            </div>

            {siddhi.benefits && siddhi.benefits.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                  Documented Benefits
                </h4>
                <ul className="mt-2 space-y-1">
                  {siddhi.benefits.map((b, i) => (
                    <li key={i} className="text-xs text-[var(--color-bone)]/70">
                      • {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Practitioner Perspective */}
        <div className="space-y-4">
          <div className="border-l-4 border-[var(--color-rose-accent)]/60 pl-4">
            <h3 className="font-display text-lg text-[var(--color-rose-accent)]">
              Practitioner Lens
            </h3>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">
              Experiential pathway foregrounded
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                Primary Mantra
              </h4>
              <div className="mt-2 rounded-sm border border-[var(--color-rose-accent)]/40 bg-[var(--color-ink)]/60 p-3">
                <p className="font-display text-center text-base text-[var(--color-rose-accent)]">
                  {siddhi.primaryMantra}
                </p>
              </div>
              <p className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/50">
                Initiation-restricted content
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                Full Description
              </h4>
              <p className="mt-2 text-sm text-[var(--color-bone)]/75">
                {siddhi.description}
              </p>
            </div>

            {siddhi.warnings && siddhi.warnings.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--color-rose-accent)]">
                  ⚠ Cautions
                </h4>
                <ul className="mt-2 space-y-1">
                  {siddhi.warnings.map((w, i) => (
                    <li key={i} className="text-xs text-[var(--color-rose-accent)]/80">
                      • {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {siddhi.preSadhna && siddhi.preSadhna.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--color-ivory)]">
                  Pre-Sādhana Steps
                </h4>
                <ul className="mt-2 space-y-2">
                  {siddhi.preSadhna.map((step, i) => (
                    <li key={i} className="text-xs text-[var(--color-bone)]/70">
                      <span className="font-medium">{step.title}</span>
                      <span className="mx-1 text-[var(--color-bone)]/50">
                        ({step.duration})
                      </span>
                      <br />
                      <span className="text-[0.7rem]">{step.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Procedure */}
      {siddhi.procedure && siddhi.procedure.length > 0 && (
        <div className="space-y-4 border-t border-[var(--color-gold)]/20 pt-8">
          <h3 className="font-display text-lg text-[var(--color-ivory)]">
            Complete Procedure
          </h3>
          <div className="space-y-4">
            {siddhi.procedure.map((step, i) => (
              <div
                key={i}
                className="rounded-sm border border-[var(--color-gold)]/20 bg-[var(--color-ink)]/30 p-4"
              >
                <h4 className="font-medium text-[var(--color-gold)]">
                  Step {i + 1}: {step.title}
                </h4>
                <p className="mt-2 text-sm text-[var(--color-bone)]/75">
                  {step.detail}
                </p>
                {step.substeps && step.substeps.length > 0 && (
                  <ul className="mt-3 space-y-1 pl-4">
                    {step.substeps.map((sub, j) => (
                      <li
                        key={j}
                        className="text-xs text-[var(--color-bone)]/65"
                      >
                        ▪ {sub}
                      </li>
                    ))}
                  </ul>
                )}
                {step.caution && (
                  <p className="mt-3 text-xs text-[var(--color-rose-accent)]/80">
                    ⚠ {step.caution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {siddhi.faq && siddhi.faq.length > 0 && (
        <div className="space-y-4 border-t border-[var(--color-gold)]/20 pt-8">
          <h3 className="font-display text-lg text-[var(--color-ivory)]">
            Inquiry & Response
          </h3>
          <div className="space-y-3">
            {siddhi.faq.map((item, i) => (
              <div key={i} className="text-sm">
                <p className="font-medium text-[var(--color-gold)]">Q: {item.q}</p>
                <p className="mt-1 text-[var(--color-bone)]/75">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
