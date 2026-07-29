"use client";

import { useState } from "react";
import Link from "next/link";
import { AGHAD_MODULES } from "@/lib/aghad-course-data";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ModulePage({ params }: PageProps) {
  const moduleNumber = parseInt(params.id);
  const module = AGHAD_MODULES.find((m) => m.moduleNumber === moduleNumber);
  const [completedPractices, setCompletedPractices] = useState<string[]>([]);

  if (!module) {
    return (
      <div className="min-h-screen bg-[var(--color-obsidian)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-[var(--color-gold-bright)] mb-4">
            Module Not Found
          </h1>
          <Link
            href="/aghad/curriculum"
            className="text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  const prevModule =
    moduleNumber > 1 ? AGHAD_MODULES[moduleNumber - 2] : null;
  const nextModule =
    moduleNumber < 12 ? AGHAD_MODULES[moduleNumber] : null;

  const togglePractice = (practice: string) => {
    setCompletedPractices((prev) =>
      prev.includes(practice)
        ? prev.filter((p) => p !== practice)
        : [...prev, practice]
    );
  };

  const completionPercentage = Math.round(
    (completedPractices.length / module.practicesIncluded.length) * 100
  );

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/aghad/curriculum"
            className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] mb-4 inline-block"
          >
            ← Back to Curriculum
          </Link>

          <div className="mt-4">
            <span className="text-[0.65rem] uppercase tracking-luxe text-[var(--color-purple-accent)]">
              Week {module.week} • Module {module.moduleNumber}
            </span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl text-[var(--color-ivory)]">
              {module.title}
            </h1>
            <p className="mt-3 text-[var(--color-bone)]/80 max-w-2xl">
              {module.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Practices */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h2 className="font-display text-2xl text-[var(--color-gold-bright)] mb-6">
                Module Practices
              </h2>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[var(--color-bone)]/70">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-gold-bright)]">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="h-3 bg-[var(--color-stone)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Practices List */}
              <div className="space-y-3">
                {module.practicesIncluded.map((practice, idx) => (
                  <button
                    key={idx}
                    onClick={() => togglePractice(practice)}
                    className={`w-full text-left p-4 rounded-sm border transition-all ${
                      completedPractices.includes(practice)
                        ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)]"
                        : "bg-[var(--color-stone)]/20 border-[var(--hairline)] hover:bg-[var(--color-stone)]/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          completedPractices.includes(practice)
                            ? "bg-[var(--color-gold)] border-[var(--color-gold)]"
                            : "border-[var(--bone)] hover:border-[var(--color-gold)]"
                        }`}
                      >
                        {completedPractices.includes(practice) && (
                          <span className="text-xs text-[var(--color-obsidian)]">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[var(--color-ivory)]">
                          {practice}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-4">
                Learning Outcomes
              </h3>

              <ul className="space-y-3">
                {module.learningOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[var(--color-bone)]/80"
                  >
                    <span className="text-[var(--color-gold)] flex-shrink-0 mt-1">
                      ◆
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 flex-wrap">
              {prevModule && (
                <Link
                  href={`/aghad/module/${prevModule.moduleNumber}`}
                  className="flex-1 px-6 py-3 bg-[var(--color-stone)]/40 border border-[var(--hairline)] text-[var(--color-ivory)] font-semibold rounded-sm hover:bg-[var(--color-stone)]/60 transition-colors text-center"
                >
                  ← Previous Module
                </Link>
              )}

              {nextModule && (
                <Link
                  href={`/aghad/module/${nextModule.moduleNumber}`}
                  className="flex-1 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors text-center"
                >
                  Next Module →
                </Link>
              )}

              {!nextModule && (
                <Link
                  href="/aghad/dashboard"
                  className="flex-1 px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors text-center"
                >
                  Complete Course
                </Link>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Module Stats */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-4">
                Module Details
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-1">
                    Chakra Focus
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-ivory)]">
                    {module.chakra}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-1">
                    Total Duration
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-ivory)]">
                    {module.hoursPerWeek} hours
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-1">
                    Number of Practices
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-ivory)]">
                    {module.practicesIncluded.length}
                  </div>
                </div>
              </div>
            </div>



            {/* Week Summary */}
            <div className="rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent p-6">
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                💡 Remember
              </div>
              <p className="text-sm text-[var(--color-bone)]/80 italic">
                Consistency transforms practice into mastery. Complete one practice each day with full presence and reverence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
