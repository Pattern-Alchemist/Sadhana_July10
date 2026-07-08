"use client";
import { useVaultData, type CurriculumProgress } from "@/components/useVaultData";
import { DEPENDENCIES } from "@/lib/practice-data";
import { OmGlyph } from "@/components/Symbols";
import Link from "next/link";

export default function DependenciesPage() {
  const { data: progress } = useVaultData<CurriculumProgress[]>("curriculum-progress", []);
  const getStatus = (slug: string) => progress.find((p) => p.siddhiSlug === slug)?.status ?? "unread";

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Practice Dependencies</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Prerequisite relationships — what to complete before attempting advanced practices.</p>
      </header>
      <div className="space-y-4">
        {DEPENDENCIES.map((dep, i) => {
          const advStatus = getStatus(dep.siddhi);
          const reqMet = dep.requires.every((r) => getStatus(r) === "completed");
          return (
            <div key={i} className={`rounded-sm border p-4 ${reqMet ? "border-[var(--color-sage)]/30 bg-[var(--color-ink)]/40" : "border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5"}`}>
              <div className="flex items-center gap-2">
                <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Requires</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Link href={`/siddhi/${dep.requires[0]}`} className="text-[var(--color-bone)]/70 underline decoration-dotted">{dep.label}</Link>
                <span className="text-[var(--color-gold)]">→</span>
                <Link href={`/siddhi/${dep.siddhi}`} className="text-[var(--color-gold-bright)] underline decoration-dotted">Advanced</Link>
              </div>
              {reqMet ? (
                <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-sage)]">✓ Prerequisite completed</p>
              ) : (
                <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/70">⚠ Complete prerequisite first</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
