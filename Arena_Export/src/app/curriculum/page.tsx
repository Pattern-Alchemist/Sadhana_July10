"use client";

import { useState } from "react";
import { useVaultData, type CurriculumProgress } from "@/components/useVaultData";
import { CURRICULUM_PATHS } from "@/lib/curriculum-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import Link from "next/link";

const STATUS_LABELS: Record<CurriculumProgress["status"], string> = {
  unread: "Unread",
  read: "Read",
  studying: "Studying",
  practicing: "Practicing",
  completed: "Completed",
};

const STATUS_COLORS: Record<CurriculumProgress["status"], string> = {
  unread: "text-[var(--color-bone)]/40",
  read: "text-[var(--color-cyan-accent)]",
  studying: "text-[var(--color-gold-bright)]",
  practicing: "text-[var(--color-gold)]",
  completed: "text-[var(--color-sage)]",
};

export default function CurriculumPage() {
  const { data: progress, setData: setProgress } = useVaultData<CurriculumProgress[]>("curriculum-progress", []);
  const [expandedPath, setExpandedPath] = useState<string | null>(CURRICULUM_PATHS[0]?.id ?? null);

  function getProgress(pathId: string, slug: string): CurriculumProgress["status"] {
    const found = progress.find((p) => p.pathId === pathId && p.siddhiSlug === slug);
    return found?.status ?? "unread";
  }

  function setSiddhiStatus(pathId: string, slug: string, status: CurriculumProgress["status"]) {
    setProgress((prev) => {
      const existing = prev.find((p) => p.pathId === pathId && p.siddhiSlug === slug);
      if (existing) {
        return prev.map((p) =>
          p.pathId === pathId && p.siddhiSlug === slug
            ? { ...p, status, updatedAt: new Date().toISOString() }
            : p
        );
      }
      return [...prev, { pathId, siddhiSlug: slug, status, updatedAt: new Date().toISOString() }];
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Reading Curriculum
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Structured paths through the corpus. Track your progress through each siddhi.
        </p>
      </header>

      <div className="space-y-8">
        {CURRICULUM_PATHS.map((path) => {
          const isExpanded = expandedPath === path.id;
          const pathProgress = path.siddhis.filter((s) => getProgress(path.id, s.slug) !== "unread").length;
          const pathComplete = path.siddhis.filter((s) => getProgress(path.id, s.slug) === "completed").length;
          const progressPct = Math.round((pathProgress / path.siddhis.length) * 100);

          return (
            <div key={path.id} className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 overflow-hidden">
              <button
                onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                className="w-full p-4 text-left transition motion-safe motion-reduce:transition-none sm:p-5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h2 className="font-display text-lg text-[var(--color-gold-bright)] sm:text-xl">{path.title}</h2>
                    {path.sanskrit && <span className="text-sm italic text-[var(--color-gold)]/70"> {path.sanskrit}</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                      {pathProgress}/{path.siddhis.length} · {progressPct}%
                    </span>
                    <span className={`text-xs transition motion-safe ${isExpanded ? "rotate-90" : ""}`}>▶</span>
                  </div>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-bone)]/65">{path.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">{path.level}</span>
                  <span className="text-[0.5rem] text-[var(--color-bone)]/30">·</span>
                  <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">{path.tradition}</span>
                  {pathComplete === path.siddhis.length && (
                    <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-sage)]">✓ Path Complete</span>
                  )}
                </div>
                {/* Progress bar */}
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--color-obsidian)]">
                  <div className="h-full bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-bright)] transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--hairline)] p-4 sm:p-5">
                  <div className="space-y-3">
                    {path.siddhis.map((s, i) => {
                      const status = getProgress(path.id, s.slug);
                      return (
                        <div key={s.slug} className="rounded-sm border border-[var(--hairline)]/60 bg-[var(--color-obsidian)]/40 p-3">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-display text-sm text-[var(--color-gold)]/50">{i + 1}.</span>
                              <Link href={`/siddhi/${s.slug}`} className="font-display text-sm text-[var(--color-ivory)] transition hover:text-[var(--color-gold-bright)]">
                                {s.name}
                              </Link>
                            </div>
                            <select
                              value={status}
                              onChange={(e) => setSiddhiStatus(path.id, s.slug, e.target.value as CurriculumProgress["status"])}
                              className={`rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)] px-2 py-0.5 text-[0.5rem] uppercase tracking-luxe ${STATUS_COLORS[status]}`}
                            >
                              {Object.entries(STATUS_LABELS).map(([val, label]) => (
                                <option key={val} value={val}>{label}</option>
                              ))}
                            </select>
                          </div>
                          <p className="mt-1 text-xs italic leading-relaxed text-[var(--color-bone)]/55">{s.note}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
