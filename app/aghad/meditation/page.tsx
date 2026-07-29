"use client";

import { useState } from "react";
import Link from "next/link";

interface MeditationSession {
  id: string;
  title: string;
  duration: number;
  chakra: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  steps: string[];
}

const MEDITATIONS: MeditationSession[] = [
  {
    id: "root-grounding",
    title: "Root Chakra Grounding",
    duration: 15,
    chakra: "Muladhara",
    difficulty: "beginner",
    description: "Connect to earth energy and establish stability",
    steps: [
      "Sit with spine straight, feet flat on ground",
      "Visualize red/brown light at base of spine",
      "Chant 'LAM' 108 times slowly",
      "Feel roots growing from your base into the earth",
      "Rest in this grounded state",
    ],
  },
  {
    id: "heart-opening",
    title: "Heart Center Opening",
    duration: 20,
    chakra: "Anahata",
    difficulty: "intermediate",
    description: "Awaken divine love and compassion",
    steps: [
      "Sit comfortably, hand on heart",
      "Breathe into the heart center",
      "Visualize green light expanding from your heart",
      "Chant 'YAM' or 'Om Namah Shivaya'",
      "Feel unconditional love radiating outward",
    ],
  },
  {
    id: "third-eye",
    title: "Third Eye Awakening",
    duration: 25,
    chakra: "Ajna",
    difficulty: "advanced",
    description: "Activate intuition and inner vision",
    steps: [
      "Sit with eyes closed, gaze at eyebrow center",
      "Visualize indigo light between eyebrows",
      "Chant 'OM' with focus on third eye",
      "Watch any visions or light patterns",
      "Rest in witnessing awareness",
    ],
  },
  {
    id: "crown-unity",
    title: "Crown Consciousness Unity",
    duration: 30,
    chakra: "Sahasrara",
    difficulty: "advanced",
    description: "Experience cosmic unity consciousness",
    steps: [
      "Sit in perfect alignment, energy channels open",
      "Visualize white/golden light above head",
      "Chant extended 'OM' meditation",
      "Feel individual consciousness merging with cosmic",
      "Rest in infinite awareness",
    ],
  },
];

export default function MeditationGuide() {
  const [selectedMeditation, setSelectedMeditation] = useState(MEDITATIONS[0]);
  const [sessionTime, setSessionTime] = useState(selectedMeditation.duration);
  const [isSession, setIsSession] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(selectedMeditation.duration * 60);

  const startSession = () => {
    setIsSession(true);
    setCurrentStep(0);
    setTimeLeft(selectedMeditation.duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isSession) {
    return (
      <div className="min-h-screen bg-[var(--color-obsidian)] flex flex-col items-center justify-center px-6 py-8">
        {/* Timer & Chakra */}
        <div className="text-center space-y-6 max-w-2xl">
          <div className="text-6xl sm:text-8xl font-display text-[var(--color-gold-bright)]">
            {formatTime(timeLeft)}
          </div>

          <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ivory)]">
            {selectedMeditation.title}
          </h2>

          {/* Guided Steps */}
          <div className="space-y-4 mt-12">
            {selectedMeditation.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-sm border transition-all ${
                  idx === currentStep
                    ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)] shadow-lg"
                    : idx < currentStep
                      ? "bg-[var(--color-stone)]/30 border-[var(--hairline)] opacity-60"
                      : "bg-[var(--color-ink)]/20 border-[var(--hairline)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                      idx === currentStep
                        ? "bg-[var(--color-gold)] text-[var(--color-obsidian)]"
                        : "bg-[var(--color-stone)] text-[var(--color-bone)]"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-[var(--color-bone)]/85 leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => {
                setIsSession(false);
                setCurrentStep(0);
              }}
              className="px-6 py-3 bg-[var(--color-rose-accent)] text-white rounded-sm font-semibold hover:bg-[var(--color-rose-accent)]/90 transition-colors"
            >
              End Session
            </button>

            {currentStep < selectedMeditation.steps.length - 1 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] rounded-sm font-semibold hover:bg-[var(--color-gold-bright)] transition-colors"
              >
                Next Step →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-[var(--color-gold-bright)]">
              Guided Meditations
            </h1>
            <p className="mt-1 text-sm text-[var(--color-bone)]/70">
              Chakra-specific practices for awakening
            </p>
          </div>
          <Link
            href="/aghad/dashboard"
            className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Meditation List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-display text-lg text-[var(--color-gold-bright)] mb-4">
              Available Sessions
            </h2>

            {MEDITATIONS.map((med) => (
              <button
                key={med.id}
                onClick={() => {
                  setSelectedMeditation(med);
                  setSessionTime(med.duration);
                }}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-300 ${
                  selectedMeditation.id === med.id
                    ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)] shadow-lg"
                    : "bg-[var(--color-ink)]/20 border-[var(--hairline)] hover:bg-[var(--color-ink)]/40"
                }`}
              >
                <div className="font-semibold text-[var(--color-ivory)]">
                  {med.title}
                </div>
                <div className="text-xs text-[var(--color-bone)]/60 mt-1">
                  {med.duration} minutes • {med.chakra}
                </div>
                <div className="text-xs text-[var(--color-gold)]/70 mt-2">
                  {med.difficulty}
                </div>
              </button>
            ))}
          </div>

          {/* Meditation Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h2 className="font-display text-3xl text-[var(--color-gold-bright)] mb-4">
                {selectedMeditation.title}
              </h2>

              <p className="text-[var(--color-bone)]/85 leading-relaxed mb-8">
                {selectedMeditation.description}
              </p>

              <div className="grid gap-6 sm:grid-cols-3 mb-8">
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70">
                    Duration
                  </div>
                  <div className="text-2xl font-display text-[var(--color-gold-bright)]">
                    {selectedMeditation.duration}
                  </div>
                  <div className="text-xs text-[var(--color-bone)]/60">minutes</div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70">
                    Chakra
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-ivory)]">
                    {selectedMeditation.chakra}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70">
                    Level
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-cyan-accent)]">
                    {selectedMeditation.difficulty}
                  </div>
                </div>
              </div>

              <button
                onClick={startSession}
                className="w-full px-8 py-4 bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-bright)] text-[var(--color-obsidian)] font-display text-lg font-medium rounded-sm hover:from-[var(--color-gold-bright)] hover:to-[var(--color-gold)] transition-all shadow-lg hover:shadow-xl"
              >
                Begin Meditation
              </button>
            </div>

            {/* Steps Preview */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <h3 className="font-display text-xl text-[var(--color-gold-bright)] mb-6">
                Meditation Steps
              </h3>

              <div className="space-y-4">
                {selectedMeditation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-gold)] text-[var(--color-obsidian)] flex items-center justify-center font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-[var(--color-bone)]/85 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
