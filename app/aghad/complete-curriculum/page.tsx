"use client";

import Link from "next/link";
import { useState } from "react";
import { AGHAD_COMPLETE_MODULES } from "@/lib/aghad-complete-curriculum";

export default function CompleteCurriculumPage() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const chakraColors: Record<string, string> = {
    "Root Chakra (Muladhara)": "from-red-900 to-red-700 text-red-100",
    "Sacral Chakra (Svadhisthana)": "from-orange-900 to-orange-700 text-orange-100",
    "Solar Plexus (Manipura)": "from-yellow-900 to-yellow-700 text-yellow-100",
    "Heart Chakra (Anahata)": "from-green-900 to-green-700 text-green-100",
    "Throat Chakra (Vishuddha)": "from-blue-900 to-blue-700 text-blue-100",
    "Third Eye (Ajna)": "from-indigo-900 to-indigo-700 text-indigo-100",
    "Crown Chakra (Sahasrara)": "from-purple-900 to-purple-700 text-purple-100",
    "All Chakras - Kundalini Path": "from-violet-900 to-violet-700 text-violet-100",
    "All Chakras - Balance and Integration": "from-slate-900 to-slate-700 text-slate-100",
    "All Chakras - Expressing Wisdom": "from-pink-900 to-pink-700 text-pink-100",
    "All Chakras - Unified Field": "from-cyan-900 to-cyan-700 text-cyan-100",
    "All Chakras - Unified as One": "from-rose-900 to-rose-700 text-rose-100",
  };

  const getColorClass = (chakra: string) => chakraColors[chakra] || "from-slate-900 to-slate-700 text-slate-100";

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/aghad" className="text-[var(--color-gold)]/60 hover:text-[var(--color-gold)] text-sm mb-4 inline-block">
            ← Back to Aghad
          </Link>
          <h1 className="text-5xl md:text-6xl font-display text-white mt-4 mb-6 text-balance">
            Complete 12-Week Aghad Curriculum
          </h1>
          <p className="text-xl text-white/85 max-w-2xl">
            The complete path to enlightenment through chakra awakening, kundalini rising, and integration into daily life. Each module contains comprehensive theory, daily practices, sacred havans, and transformation protocols.
          </p>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-5 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Weeks</div>
              <div className="text-3xl font-bold text-white">12</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Hours</div>
              <div className="text-3xl font-bold text-white">360</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Modules</div>
              <div className="text-3xl font-bold text-white">12</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Havans</div>
              <div className="text-3xl font-bold text-white">24+</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Chakras</div>
              <div className="text-3xl font-bold text-white">7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-12">The 12 Modules</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {AGHAD_COMPLETE_MODULES.map((module) => {
            const colorClass = getColorClass(module.chakraFocus);
            const isExpanded = selectedWeek === module.week;

            return (
              <div key={module.id} className="group">
                <Link
                  href={`/aghad/complete-module/${module.id}`}
                  className={`block p-6 rounded-sm border border-[var(--hairline)] transition-all duration-300 h-full bg-gradient-to-br ${colorClass} hover:shadow-lg hover:scale-105`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm uppercase tracking-widest text-white/70 mb-2">
                        Week {module.week}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {module.title}
                      </h3>
                    </div>
                    <div className="text-3xl font-bold text-white/20">
                      {module.id}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      {module.theory.practices?.length || 0} Practices
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      {module.havans?.length || 0} Havans
                    </span>
                    <span className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                      6h/day
                    </span>
                  </div>

                  <p className="text-white/85 text-sm leading-relaxed">
                    {module.theory.overview}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      Full Module →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Path Overview */}
      <div className="bg-[var(--color-ink)]/40 border-y border-[var(--hairline)] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-12">The Path to Enlightenment</h2>

          <div className="space-y-4">
            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="font-semibold text-[var(--color-ivory)] mb-3">Weeks 1-3: Foundation & Activation</h3>
              <p className="text-[var(--color-bone)]/75">
                Ground yourself through the Root Chakra, awaken creative power in the Sacral Chakra, and activate personal will through the Solar Plexus. By the end of week 3, you have a solid foundation for higher work.
              </p>
            </div>

            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="font-semibold text-[var(--color-ivory)] mb-3">Weeks 4-7: Heart, Expression, Vision, Unity</h3>
              <p className="text-[var(--color-bone)]/75">
                Open your heart to universal love, express your truth, perceive divine vision through the third eye, and finally rest in the Crown Chakra. These are the spiritual chakras leading directly to enlightenment.
              </p>
            </div>

            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="font-semibold text-[var(--color-ivory)] mb-3">Week 8: Kundalini Rising</h3>
              <p className="text-[var(--color-bone)]/75">
                The serpent fire rises through all chakras, purifying every channel. This is the accelerated path where kundalini does the work of all previous weeks in one concentrated week.
              </p>
            </div>

            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="font-semibold text-[var(--color-ivory)] mb-3">Weeks 9-12: Integration & Stabilization</h3>
              <p className="text-[var(--color-bone)]/75">
                Integrate enlightenment into daily life as karma yoga, become a teacher, recognize the cosmic play (Leela), and finally stabilize in the eternal now. Enlightenment becomes your permanent, unshakable nature.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included in Each Module */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-12">Complete Module Content</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--color-ivory)] mb-6">Comprehensive Theory</h3>
            <div className="bg-[var(--color-ink)]/40 p-6 rounded-sm border border-[var(--hairline)]">
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Overview:</strong> 300+ words introduction to chakra and module focus</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Deep Dive:</strong> 2,500+ words of profound spiritual theory</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Philosophy:</strong> Historical context, element mastery, chakra qualities</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Wisdom:</strong> Ashram-level teachings previously available only in-person</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--color-ivory)] mb-6">Daily Practices</h3>
            <div className="bg-[var(--color-ink)]/40 p-6 rounded-sm border border-[var(--hairline)]">
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>5-8 Techniques:</strong> Specific meditations, pranayama, asanas</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Step-by-Step:</strong> Detailed instructions for each practice</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Benefits:</strong> Specific transformation from each practice</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>6-Hour Schedule:</strong> Complete daily time-blocking</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--color-ivory)] mb-6">Sacred Fire Rituals</h3>
            <div className="bg-[var(--color-ink)]/40 p-6 rounded-sm border border-[var(--hairline)]">
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>2 Havans Per Module:</strong> Sacred fire ceremonies</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Complete Materials:</strong> List of everything needed</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Sacred Mantras:</strong> Sanskrit + pronunciation + power</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Step-by-Step:</strong> Exact ritual procedures (45-120 min)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--color-ivory)] mb-6">Integration Tools</h3>
            <div className="bg-[var(--color-ink)]/40 p-6 rounded-sm border border-[var(--hairline)]">
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Daily Schedule:</strong> Hour-by-hour 6-hour curriculum</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Visualizations:</strong> Chakra-specific meditation imagery</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Completion Criteria:</strong> Know when module is complete</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)]">✓</span>
                  <span><strong>Progress Tracking:</strong> Monitor your transformation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-900 via-violet-900 to-indigo-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display text-white mb-6">Begin Your 12-Week Journey</h2>
          <p className="text-xl text-white/85 mb-8">
            This is a complete, professional-grade spiritual course equivalent to years of ashram training. Every module is designed to progressively awaken your consciousness from root to crown.
          </p>
          <Link
            href="/aghad/complete-module/1"
            className="inline-block px-8 py-4 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors text-lg"
          >
            Start Module 1: Foundation →
          </Link>
        </div>
      </div>
    </div>
  );
}
