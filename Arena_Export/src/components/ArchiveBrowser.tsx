"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Siddhi } from "@/db/schema";
import { CategoryGlyph } from "./Symbols";

export default function ArchiveBrowser({ items }: { items: Siddhi[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [trad, setTrad] = useState("all");
  const [level, setLevel] = useState("all");

  const cats = useMemo(
    () => Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[],
    [items]
  );
  const trads = useMemo(
    () => Array.from(new Set(items.map((i) => i.tradition).filter(Boolean))) as string[],
    [items]
  );
  const levels = ["Foundation", "Intermediate", "Advanced"];

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter((i) => {
      if (cat !== "all" && i.category !== cat) return false;
      if (trad !== "all" && i.tradition !== trad) return false;
      if (level !== "all" && i.level !== level) return false;
      if (t) {
        const hay = `${i.name} ${i.sanskrit ?? ""} ${i.summary ?? ""} ${i.tradition ?? ""}`.toLowerCase();
        if (!hay.includes(t)) return false;
      }
      return true;
    });
  }, [items, q, cat, trad, level]);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-5">
        <input
          className="field mb-4"
          placeholder="Search the archive — name, term, tradition…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <FilterGroup label="Category" value={cat} onChange={setCat} options={["all", ...cats]} />
          <FilterGroup label="Tradition" value={trad} onChange={setTrad} options={["all", ...trads]} />
          <FilterGroup label="Stage" value={level} onChange={setLevel} options={["all", ...levels]} />
        </div>
      </div>

      <p className="mt-5 text-xs tracking-wide-sm text-[var(--color-bone)]/55">
        {filtered.length} {filtered.length === 1 ? "folio" : "folios"} catalogued
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link key={s.slug} href={`/siddhi/${s.slug}`} className="folio-card group flex flex-col rounded-sm p-6">
            <div className="flex items-start justify-between">
              <CategoryGlyph category={s.category ?? ""} />
              <span className="badge badge-gold">{s.authenticityScore}%</span>
            </div>
            <h3 className="mt-4 font-display text-2xl text-[var(--color-ivory)]">{s.name}</h3>
            <p className="mt-1 font-display text-sm text-[var(--color-gold-bright)]">{s.sanskrit}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-bone)]/70">{s.summary}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                <span>{s.level}</span>
                <span className="text-[var(--color-gold)]/40">·</span>
                <span>{s.category}</span>
              </div>
              <span className="text-[var(--color-gold)] transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-sm border border-dashed border-[var(--hairline)] p-12 text-center">
          <p className="text-[var(--color-bone)]/50">No folio matches these filters.</p>
          <button
            onClick={() => {
              setQ("");
              setCat("all");
              setTrad("all");
              setLevel("all");
            }}
            className="mt-3 text-xs tracking-wide-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
        {label}
      </label>
      <select
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--color-ink)] capitalize">
            {o === "all" ? "— all —" : o}
          </option>
        ))}
      </select>
    </div>
  );
}
