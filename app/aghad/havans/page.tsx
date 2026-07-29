"use client";

import Link from "next/link";
import { useState } from "react";
import { AGHAD_COMPLETE_MODULES } from "@/lib/aghad-complete-curriculum";

export default function HavansPage() {
  const [expandedHavan, setExpandedHavan] = useState<string | null>(null);

  // Collect all havans from all modules
  const allHavans = AGHAD_COMPLETE_MODULES.flatMap(module =>
    (module.havans || []).map(havan => ({
      ...havan,
      moduleId: module.id,
      moduleName: module.title,
      week: module.week,
    }))
  );

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-900 via-red-900 to-amber-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/aghad" className="text-[var(--color-gold)]/60 hover:text-[var(--color-gold)] text-sm mb-4 inline-block">
            ← Back to Aghad
          </Link>
          <h1 className="text-5xl md:text-6xl font-display text-white mt-4 mb-6 text-balance">
            Sacred Fire Rituals (Havans)
          </h1>
          <p className="text-xl text-white/85 max-w-3xl">
            Complete guide to 24+ sacred fire ceremonies throughout the 12-week course. Each havan is a powerful ritual that transforms your internal state and manifests your intentions into reality through the element of fire.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Total Havans</div>
              <div className="text-3xl font-bold text-white">{allHavans.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Total Hours</div>
              <div className="text-3xl font-bold text-white">50+</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-sm border border-white/20">
              <div className="text-sm uppercase tracking-widest text-white/70 mb-2">Modules</div>
              <div className="text-3xl font-bold text-white">12</div>
            </div>
          </div>
        </div>
      </div>

      {/* Havan Principles */}
      <div className="bg-[var(--color-ink)]/40 border-b border-[var(--hairline)] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-8">Understanding Havans</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="text-xl font-semibold text-[var(--color-ivory)] mb-4">What is a Havan?</h3>
              <p className="text-[var(--color-bone)]/85 leading-relaxed mb-4">
                A havan is a sacred fire ritual where you make offerings to the divine and invoke specific qualities or goals. Fire is the mouth of the universe - what you offer becomes manifest reality. Each mantra chanted with offering creates a vibrational resonance that opens inner channels.
              </p>
              <p className="text-[var(--color-bone)]/85 leading-relaxed">
                The smoke of the havan carries your intention to higher dimensions, creating a bridge between your individual consciousness and cosmic consciousness.
              </p>
            </div>

            <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
              <h3 className="text-xl font-semibold text-[var(--color-ivory)] mb-4">Core Principles</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)] font-bold flex-shrink-0">1.</span>
                  <span><strong>Fire is Purification:</strong> Burning obstacles and karma</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)] font-bold flex-shrink-0">2.</span>
                  <span><strong>Mantras as Power:</strong> Words chanted with feeling create reality</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)] font-bold flex-shrink-0">3.</span>
                  <span><strong>Offerings as Surrender:</strong> What you offer, you become</span>
                </li>
                <li className="flex gap-3 text-[var(--color-bone)]/85">
                  <span className="text-[var(--color-gold)] font-bold flex-shrink-0">4.</span>
                  <span><strong>Visualization as Reality:</strong> What you hold in mind manifests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* All Havans Listed by Module */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-12">Complete Havan Directory</h2>

        {AGHAD_COMPLETE_MODULES.map(module => {
          const moduleHavans = module.havans || [];
          if (moduleHavans.length === 0) return null;

          const chakraColors: Record<string, string> = {
            "Root Chakra (Muladhara)": "bg-red-900/20 border-red-600/50",
            "Sacral Chakra (Svadhisthana)": "bg-orange-900/20 border-orange-600/50",
            "Solar Plexus (Manipura)": "bg-yellow-900/20 border-yellow-600/50",
            "Heart Chakra (Anahata)": "bg-green-900/20 border-green-600/50",
            "Throat Chakra (Vishuddha)": "bg-blue-900/20 border-blue-600/50",
            "Third Eye (Ajna)": "bg-indigo-900/20 border-indigo-600/50",
            "Crown Chakra (Sahasrara)": "bg-purple-900/20 border-purple-600/50",
            "All Chakras - Kundalini Path": "bg-violet-900/20 border-violet-600/50",
            "All Chakras - Balance and Integration": "bg-slate-900/20 border-slate-600/50",
            "All Chakras - Expressing Wisdom": "bg-pink-900/20 border-pink-600/50",
            "All Chakras - Unified Field": "bg-cyan-900/20 border-cyan-600/50",
            "All Chakras - Unified as One": "bg-rose-900/20 border-rose-600/50",
          };

          const moduleClass = chakraColors[module.chakraFocus] || "bg-slate-900/20 border-slate-600/50";

          return (
            <div key={module.id} className={`mb-12 p-8 rounded-sm border border-[var(--hairline)] ${moduleClass}`}>
              <div className="mb-8">
                <Link href={`/aghad/complete-module/${module.id}`} className="text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] text-sm font-semibold">
                  ← {module.title}
                </Link>
                <h3 className="text-2xl font-semibold text-[var(--color-ivory)] mt-2 mb-2">
                  Week {module.week}: {moduleHavans.length} Havans
                </h3>
              </div>

              <div className="space-y-6">
                {moduleHavans.map((havan, havanIdx) => {
                  const havanId = `${module.id}-${havanIdx}`;
                  const isExpanded = expandedHavan === havanId;

                  return (
                    <div key={havanIdx} className="bg-[var(--color-ink)]/40 border border-[var(--hairline)] rounded-sm overflow-hidden">
                      <button
                        onClick={() => setExpandedHavan(isExpanded ? null : havanId)}
                        className="w-full p-6 text-left hover:bg-[var(--color-ink)]/60 transition-colors flex justify-between items-start"
                      >
                        <div>
                          <h4 className="text-xl font-semibold text-[var(--color-gold-bright)] mb-2">
                            {havan.name}
                          </h4>
                          <p className="text-[var(--color-bone)]/75 mb-3">{havan.purpose}</p>
                          <div className="flex gap-4 text-sm text-[var(--color-bone)]/70">
                            <span className="bg-[var(--color-stone)]/30 px-3 py-1 rounded">
                              {havan.duration}
                            </span>
                            {havan.mantras && (
                              <span className="bg-[var(--color-stone)]/30 px-3 py-1 rounded">
                                {havan.mantras.length} Mantras
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-[var(--color-gold-bright)] text-2xl flex-shrink-0 ml-4">
                          {isExpanded ? "−" : "+"}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-[var(--hairline)] p-6 bg-[var(--color-obsidian)]/50 space-y-6">
                          {/* Materials */}
                          {havan.materials && (
                            <div>
                              <h5 className="font-semibold text-[var(--color-ivory)] mb-3">Materials Needed</h5>
                              <div className="grid md:grid-cols-2 gap-2">
                                {havan.materials.map((material, idx) => (
                                  <div key={idx} className="flex gap-2 text-[var(--color-bone)]/75">
                                    <span className="text-[var(--color-gold)]">•</span>
                                    <span>{material}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Mantras */}
                          {havan.mantras && (
                            <div>
                              <h5 className="font-semibold text-[var(--color-ivory)] mb-3">Sacred Mantras</h5>
                              <div className="bg-[var(--color-ink)]/40 p-4 rounded space-y-2 border border-[var(--hairline)]">
                                {havan.mantras.map((mantra, idx) => (
                                  <div key={idx} className="text-[var(--color-gold)]/85 font-serif italic text-sm">
                                    {mantra}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Steps */}
                          {havan.steps && (
                            <div>
                              <h5 className="font-semibold text-[var(--color-ivory)] mb-3">Step-by-Step Ritual</h5>
                              <ol className="space-y-3">
                                {havan.steps.map((step, idx) => (
                                  <li key={idx} className="flex gap-3 text-[var(--color-bone)]/85">
                                    <span className="text-[var(--color-gold)] font-semibold flex-shrink-0">{idx + 1}.</span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {/* Visualization */}
                          {havan.visualization && (
                            <div>
                              <h5 className="font-semibold text-[var(--color-ivory)] mb-3">Visualization</h5>
                              <div className="bg-[var(--color-stone)]/20 border border-[var(--color-gold)]/30 p-4 rounded italic text-[var(--color-bone)]/75">
                                {havan.visualization}
                              </div>
                            </div>
                          )}

                          {/* Benefits */}
                          {havan.benefits && (
                            <div>
                              <h5 className="font-semibold text-[var(--color-ivory)] mb-3">Benefits</h5>
                              <ul className="space-y-2">
                                {havan.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex gap-3 text-[var(--color-bone)]/75">
                                    <span className="text-[var(--color-gold)]">✓</span>
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* General Havan Guidelines */}
      <div className="bg-[var(--color-ink)]/40 border-y border-[var(--hairline)] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-12">Performing a Havan - General Guidelines</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
                <h3 className="font-semibold text-[var(--color-ivory)] mb-4">Preparation</h3>
                <ul className="space-y-2 text-[var(--color-bone)]/85">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Choose a clean, sacred space (even small corner is fine)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Gather all materials in advance</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Wear clean clothes, preferably white or light colored</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Bathe before havan if possible</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Set clear, pure intention for the ritual</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
                <h3 className="font-semibold text-[var(--color-ivory)] mb-4">Creating the Fire</h3>
                <ul className="space-y-2 text-[var(--color-bone)]/85">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Use copper bowl, brass vessel, or fire on sand</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Light with sesame, sandalwood, or incense</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Maintain steady, bright flame throughout</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Add ghee to keep fire alive and glowing</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Face appropriate direction per ritual</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
                <h3 className="font-semibold text-[var(--color-ivory)] mb-4">Chanting & Offerings</h3>
                <ul className="space-y-2 text-[var(--color-bone)]/85">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Chant mantras with full feeling and awareness</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Make offerings with each mantra completion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Visualize the desired outcome with each offering</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Maintain focus - no distractions during ritual</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Chant loudly enough to feel the vibration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--color-stone)]/20 p-6 rounded-sm border border-[var(--hairline)]">
                <h3 className="font-semibold text-[var(--color-ivory)] mb-4">Concluding the Havan</h3>
                <ul className="space-y-2 text-[var(--color-bone)]/85">
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Circumambulate (walk around) as instructed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Let fire burn completely if possible</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Collect ash for marking on body (if comfortable)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Sit in silent meditation after ritual</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--color-gold)]">•</span>
                    <span>Offer remaining materials to those present</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-display text-[var(--color-gold-bright)] mb-6">Ready to Begin?</h2>
        <p className="text-lg text-[var(--color-bone)]/85 mb-8 max-w-2xl mx-auto">
          Each havan is a powerful catalyst for transformation. As you progress through the 12 modules, the havans become increasingly profound, culminating in the ultimate Maha Samadhi Havan that completes your enlightenment.
        </p>
        <Link
          href="/aghad/complete-curriculum"
          className="inline-block px-8 py-4 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors text-lg"
        >
          Start Your 12-Week Journey →
        </Link>
      </div>
    </div>
  );
}
