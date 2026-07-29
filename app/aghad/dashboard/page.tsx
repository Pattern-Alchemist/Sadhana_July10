"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AGHAD_MODULES, AGHAD_MANTRAS } from "@/lib/aghad-course-data";

const CHAKRA_COLORS = {
  "Muladhara (Root)": "#c41e3a",
  "Svadhisthana (Sacral)": "#ff8c00",
  "Manipura (Solar Plexus)": "#ffdd00",
  "Anahata (Heart)": "#00c032",
  "Vishuddha (Throat)": "#0088ff",
  "Ajna (Third Eye)": "#6f42c1",
  "Sahasrara (Crown)": "#fff",
};

interface UserProgress {
  currentModule: number;
  totalHoursCompleted: number;
  currentStreak: number;
  enlightenmentProgress: number;
  completedModules: number[];
  nextPractice: string;
}

export default function AaghadDashboard() {
  const [progress, setProgress] = useState<UserProgress>({
    currentModule: 1,
    totalHoursCompleted: 0,
    currentStreak: 0,
    enlightenmentProgress: 0,
    completedModules: [],
    nextPractice: "Muladhara Activation Breathing",
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("aghad-progress");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const currentModule = AGHAD_MODULES[progress.currentModule - 1];
  const chakraPalette =
    Object.entries(CHAKRA_COLORS).map(([name, color]) => ({
      name,
      color,
    })) || [];

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl text-[var(--color-gold-bright)]">
                Aghad Mastery Path
              </h1>
              <p className="mt-1 text-sm text-[var(--color-bone)]/70">
                Week {currentModule?.week} • {currentModule?.chakra}
              </p>
            </div>
            <Link
              href="/aghad"
              className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
            >
              ← Back to Overview
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Progress & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enlightenment Progress */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-6">
                Your Enlightenment Journey
              </h2>

              {/* Main Progress Bar */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--color-bone)]/70">
                    Overall Progress
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-gold-bright)]">
                    {progress.enlightenmentProgress}%
                  </span>
                </div>
                <div className="h-3 bg-[var(--color-stone)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] transition-all duration-500"
                    style={{ width: `${progress.enlightenmentProgress}%` }}
                  />
                </div>
              </div>

              {/* Chakra Activation Stages */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wide text-[var(--color-gold)] font-semibold">
                  Chakra Activation Stages
                </h3>

                <div className="grid grid-cols-7 gap-2">
                  {chakraPalette.map((chakra, idx) => (
                    <div
                      key={idx}
                      className="group relative"
                      title={chakra.name}
                    >
                      <div
                        className={`w-full aspect-square rounded-sm border-2 transition-all duration-300 ${
                          idx < progress.currentModule
                            ? "border-[var(--color-gold)] shadow-lg"
                            : "border-[var(--hairline)]"
                        }`}
                        style={{
                          backgroundColor:
                            idx < progress.currentModule
                              ? `${chakra.color}40`
                              : "transparent",
                        }}
                      >
                        <div className="flex items-center justify-center h-full">
                          {idx < progress.currentModule ? (
                            <span className="text-xs font-bold text-[var(--color-gold)]">
                              ✓
                            </span>
                          ) : idx === progress.currentModule - 1 ? (
                            <span className="text-lg animate-pulse">◆</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="absolute -bottom-8 left-0 right-0 text-center text-xs text-[var(--color-bone)]/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[var(--color-bone)]/60 mt-6">
                  You are currently working with <span className="text-[var(--color-gold-bright)]">{currentModule?.chakra}</span> energy
                </p>
              </div>
            </div>

            {/* Current Module */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h2 className="font-display text-2xl text-[var(--color-ivory)] mb-4">
                Week {currentModule?.week}: {currentModule?.title}
              </h2>

              <p className="text-[var(--color-bone)]/80 leading-relaxed mb-6">
                {currentModule?.description}
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mb-8">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70">
                    Hours This Week
                  </div>
                  <div className="text-3xl font-display text-[var(--color-gold-bright)]">
                    {currentModule?.hoursPerWeek}h
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70">
                    Next Practice
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-ivory)]">
                    {progress.nextPractice}
                  </div>
                </div>
              </div>

              <h3 className="text-sm uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                This Week's Practices
              </h3>

              <ul className="space-y-2">
                {currentModule?.practicesIncluded?.map((practice, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[var(--color-bone)]/75"
                  >
                    <span className="text-[var(--color-gold)] mt-1">→</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/aghad/module/${progress.currentModule}`}
                className="mt-8 inline-block px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors"
              >
                Start This Module →
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
                <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-2">
                  Total Hours
                </div>
                <div className="text-3xl font-display text-[var(--color-gold-bright)]">
                  {progress.totalHoursCompleted}
                </div>
                <div className="text-xs text-[var(--color-bone)]/60 mt-2">
                  of 360 hours
                </div>
              </div>

              <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
                <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-2">
                  Current Streak
                </div>
                <div className="text-3xl font-display text-[var(--color-gold-bright)]">
                  {progress.currentStreak}
                </div>
                <div className="text-xs text-[var(--color-bone)]/60 mt-2">
                  days in a row
                </div>
              </div>

              <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
                <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-2">
                  Modules Complete
                </div>
                <div className="text-3xl font-display text-[var(--color-gold-bright)]">
                  {progress.completedModules.length}
                </div>
                <div className="text-xs text-[var(--color-bone)]/60 mt-2">
                  of 12
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Link
                  href="/aghad/mantras"
                  className="block w-full px-4 py-3 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 text-[var(--color-gold)] text-sm font-semibold rounded-sm hover:bg-[var(--color-gold)]/20 transition-colors text-center"
                >
                  Mantra Lab
                </Link>
                <Link
                  href="/aghad/voice"
                  className="block w-full px-4 py-3 bg-[var(--color-purple-accent)]/10 border border-[var(--color-purple-accent)]/30 text-[var(--color-purple-accent)] text-sm font-semibold rounded-sm hover:bg-[var(--color-purple-accent)]/20 transition-colors text-center"
                >
                  Ask Guru
                </Link>
                <Link
                  href="/aghad/meditation"
                  className="block w-full px-4 py-3 bg-[var(--color-cyan-accent)]/10 border border-[var(--color-cyan-accent)]/30 text-[var(--color-cyan-accent)] text-sm font-semibold rounded-sm hover:bg-[var(--color-cyan-accent)]/20 transition-colors text-center"
                >
                  Guided Meditation
                </Link>
              </div>
            </div>

            {/* Mantras to Master */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
              <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-4">
                Core Mantras
              </h3>

              <div className="space-y-3">
                {AGHAD_MANTRAS.slice(0, 3).map((mantra, idx) => (
                  <Link
                    key={idx}
                    href={`/aghad/mantras/${mantra.id}`}
                    className="block p-3 rounded-sm border border-[var(--hairline)] bg-[var(--color-stone)]/40 hover:bg-[var(--color-stone)]/60 hover:border-[var(--color-gold)]/40 transition-all group"
                  >
                    <div className="text-sm font-semibold text-[var(--color-gold-bright)] group-hover:text-[var(--color-gold)]">
                      {mantra.title}
                    </div>
                    <div className="text-xs text-[var(--color-bone)]/60 mt-1">
                      {mantra.transliteration}
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/aghad/mantras"
                className="mt-4 inline-block text-xs text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] uppercase tracking-wide"
              >
                View All Mantras →
              </Link>
            </div>

            {/* Tip of the Day */}
            <div className="rounded-sm border border-[var(--color-gold)]/20 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent p-6">
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                ✨ Daily Guidance
              </div>
              <p className="text-sm text-[var(--color-bone)]/80 italic">
                "Consistency is the foundation of enlightenment. Practice with reverence, not ambition. The Self reveals itself to the sincere seeker."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
