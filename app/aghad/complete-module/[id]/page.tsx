"use client";

import Link from "next/link";
import { useState } from "react";
import { AGHAD_COMPLETE_MODULES } from "@/lib/aghad-complete-curriculum";

export default function CompleteModulePage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id);
  const module = AGHAD_COMPLETE_MODULES.find(m => m.id === moduleId);
  const [activeTab, setActiveTab] = useState<"overview" | "theory" | "practices" | "havans" | "schedule">("overview");
  const [expandedPractice, setExpandedPractice] = useState<number | null>(null);

  if (!module) {
    return (
      <div className="min-h-screen bg-[var(--color-obsidian)] p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-display text-[var(--color-gold-bright)]">Module Not Found</h1>
          <Link href="/aghad/curriculum" className="mt-6 inline-block text-[var(--color-cyan-accent)] hover:text-[var(--color-gold-bright)]">
            ← Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  const chakraColors: Record<string, string> = {
    "Root Chakra (Muladhara)": "from-red-900 to-red-700",
    "Sacral Chakra (Svadhisthana)": "from-orange-900 to-orange-700",
    "Solar Plexus (Manipura)": "from-yellow-900 to-yellow-700",
    "Heart Chakra (Anahata)": "from-green-900 to-green-700",
    "Throat Chakra (Vishuddha)": "from-blue-900 to-blue-700",
    "Third Eye (Ajna)": "from-indigo-900 to-indigo-700",
    "Crown Chakra (Sahasrara)": "from-purple-900 to-purple-700",
  };

  const gradientClass = chakraColors[module.chakraFocus] || "from-slate-900 to-slate-700";

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${gradientClass} py-16 px-6`}>
        <div className="max-w-5xl mx-auto">
          <Link href="/aghad/curriculum" className="text-[var(--color-gold)]/60 hover:text-[var(--color-gold)] text-sm mb-4 inline-block">
            ← Back to Curriculum
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-white mt-4 text-balance">
            {module.title}
          </h1>
          <div className="flex flex-wrap gap-6 mt-6 text-white">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/70">Week</div>
              <div className="text-2xl font-semibold">{module.week}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/70">Chakra Focus</div>
              <div className="text-xl">{module.chakraFocus}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/70">Duration</div>
              <div className="text-xl">6 hours daily</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[var(--color-ink)]/40 border-b border-[var(--hairline)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap gap-1 py-4">
          {["overview", "theory", "practices", "havans", "schedule"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[var(--color-gold)] text-[var(--color-obsidian)]"
                  : "bg-[var(--color-ink)]/40 text-[var(--color-bone)] hover:bg-[var(--color-ink)]/60"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm p-8">
              <h2 className="text-2xl font-display text-[var(--color-gold-bright)] mb-4">Module Overview</h2>
              <p className="text-lg text-[var(--color-bone)] leading-relaxed mb-6">
                {module.theory.overview}
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-[var(--color-stone)]/30 p-4 rounded-sm border border-[var(--hairline)]">
                  <div className="text-sm uppercase tracking-widest text-[var(--color-gold)]/70 mb-2">Practices</div>
                  <div className="text-3xl font-bold text-[var(--color-gold-bright)]">{module.theory.practices?.length || 0}</div>
                </div>
                <div className="bg-[var(--color-stone)]/30 p-4 rounded-sm border border-[var(--hairline)]">
                  <div className="text-sm uppercase tracking-widest text-[var(--color-gold)]/70 mb-2">Havans</div>
                  <div className="text-3xl font-bold text-[var(--color-gold-bright)]">{module.havans?.length || 0}</div>
                </div>
                <div className="bg-[var(--color-stone)]/30 p-4 rounded-sm border border-[var(--hairline)]">
                  <div className="text-sm uppercase tracking-widest text-[var(--color-gold)]/70 mb-2">Daily Duration</div>
                  <div className="text-2xl font-bold text-[var(--color-gold-bright)]">6 Hours</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theory Tab */}
        {activeTab === "theory" && (
          <div className="space-y-8">
            <div className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm p-8">
              <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-6">Complete Theory</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-ivory)] mb-4">Foundation</h3>
                  <p className="text-[var(--color-bone)]/85 leading-relaxed whitespace-pre-wrap">
                    {module.theory.overview}
                  </p>
                </div>

                <div className="border-t border-[var(--hairline)] pt-8">
                  <h3 className="text-xl font-semibold text-[var(--color-ivory)] mb-4">Deep Dive</h3>
                  <p className="text-[var(--color-bone)]/85 leading-relaxed whitespace-pre-wrap">
                    {module.theory.deepDive}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practices Tab */}
        {activeTab === "practices" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-display text-[var(--color-gold-bright)]">Daily Practices</h2>
            
            {module.theory.practices?.map((practice, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedPractice(expandedPractice === idx ? null : idx)}
                  className="w-full p-6 text-left hover:bg-[var(--color-ink)]/60 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-gold-bright)] mb-2">
                        {practice.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-[var(--color-bone)]/70">
                        <span className="font-mono">{practice.duration}</span>
                        <span className="text-[var(--color-gold)]/70">{practice.timing}</span>
                      </div>
                    </div>
                    <div className="text-[var(--color-gold-bright)] text-2xl">
                      {expandedPractice === idx ? "−" : "+"}
                    </div>
                  </div>
                </button>

                {expandedPractice === idx && (
                  <div className="border-t border-[var(--hairline)] p-6 bg-[var(--color-obsidian)]/50 space-y-6">
                    <div>
                      <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Instructions</h4>
                      <p className="text-[var(--color-bone)]/85 leading-relaxed">
                        {practice.instructions}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {practice.benefits?.map((benefit, bidx) => (
                          <li key={bidx} className="flex gap-3 text-[var(--color-bone)]/75">
                            <span className="text-[var(--color-gold)]">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Havans Tab */}
        {activeTab === "havans" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-display text-[var(--color-gold-bright)]">Sacred Fire Rituals (Havans)</h2>
            
            {module.havans?.map((havan, idx) => (
              <div key={idx} className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm p-8 space-y-6">
                <div className="border-b border-[var(--hairline)] pb-6">
                  <h3 className="text-2xl font-display text-[var(--color-gold-bright)] mb-2">
                    {havan.name}
                  </h3>
                  <p className="text-[var(--color-bone)]/75 mb-4">{havan.purpose}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="bg-[var(--color-stone)]/30 px-3 py-1 rounded text-[var(--color-gold)]/70">
                      Duration: {havan.duration}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Materials Needed</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {havan.materials?.map((material, midx) => (
                      <div key={midx} className="flex gap-3 text-[var(--color-bone)]/75">
                        <span className="text-[var(--color-gold)]">•</span>
                        <span>{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Sacred Mantras</h4>
                  <div className="bg-[var(--color-obsidian)]/70 p-4 rounded space-y-2">
                    {havan.mantras?.map((mantra, mantidx) => (
                      <div key={mantidx} className="text-[var(--color-gold)]/85 font-serif italic">
                        {mantra}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Steps to Perform</h4>
                  <ol className="space-y-3">
                    {havan.steps?.map((step, sidx) => (
                      <li key={sidx} className="flex gap-3 text-[var(--color-bone)]/85">
                        <span className="text-[var(--color-gold)] font-semibold flex-shrink-0">{sidx + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Visualization</h4>
                  <div className="bg-[var(--color-stone)]/20 border border-[var(--color-gold)]/30 p-4 rounded italic text-[var(--color-bone)]/75">
                    {havan.visualization}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--color-ivory)] mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {havan.benefits?.map((benefit, bidx) => (
                      <li key={bidx} className="flex gap-3 text-[var(--color-bone)]/75">
                        <span className="text-[var(--color-gold)]">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-8">
            <h2 className="text-3xl font-display text-[var(--color-gold-bright)]">Daily Practice Schedule</h2>
            
            <div className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm overflow-hidden">
              {Object.entries(module.dailySchedule).map(([time, details]: [string, any], idx) => (
                <div
                  key={idx}
                  className={`p-6 flex gap-6 border-b border-[var(--hairline)] last:border-b-0 ${
                    idx % 2 === 0 ? "bg-[var(--color-obsidian)]/20" : ""
                  }`}
                >
                  <div className="font-mono font-bold text-[var(--color-gold)] w-24 flex-shrink-0">
                    {time}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-[var(--color-ivory)] mb-2">
                      {details.practice}
                    </div>
                    <div className="text-sm text-[var(--color-bone)]/70">
                      {details.benefits}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[var(--color-stone)]/20 border border-[var(--color-gold)]/30 rounded-sm p-6">
              <h4 className="font-semibold text-[var(--color-ivory)] mb-4">Completion Requirements</h4>
              <ul className="space-y-2">
                {module.completionRequirements?.map((req, ridx) => (
                  <li key={ridx} className="flex gap-3 text-[var(--color-bone)]/75">
                    <span className="text-[var(--color-gold)]">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-12 pt-8 border-t border-[var(--hairline)]">
          {moduleId > 1 && (
            <Link
              href={`/aghad/complete-module/${moduleId - 1}`}
              className="px-6 py-3 bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm hover:bg-[var(--color-ink)]/60 text-[var(--color-bone)] transition-colors"
            >
              ← Previous Module
            </Link>
          )}
          {moduleId < 12 && (
            <Link
              href={`/aghad/complete-module/${moduleId + 1}`}
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors ml-auto"
            >
              Next Module →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
