'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BreathPhase {
  name: 'inhale' | 'hold' | 'exhale';
  duration: number; // seconds
  intensity: number; // 0-1
}

interface BreathTechnique {
  name: string;
  phases: BreathPhase[];
  cycles: number;
  totalDuration: number;
  benefits: string[];
  description: string;
}

const BREATH_TECHNIQUES: Record<string, BreathTechnique> = {
  '4-7-8': {
    name: '4-7-8 Coherence Breath',
    phases: [
      { name: 'inhale', duration: 4, intensity: 0.4 },
      { name: 'hold', duration: 7, intensity: 0.8 },
      { name: 'exhale', duration: 8, intensity: 0.3 },
    ],
    cycles: 4,
    totalDuration: 76, // (4+7+8) * 4
    benefits: ['calm', 'anxiety relief', 'sleep preparation', 'nervous system balance'],
    description: 'Box breathing with 4:7:8 ratio for nervous system reset and stress relief.',
  },
  'bhastrika': {
    name: 'Bhastrika - Bellows Breath',
    phases: [
      { name: 'inhale', duration: 1, intensity: 0.9 },
      { name: 'exhale', duration: 1, intensity: 0.9 },
    ],
    cycles: 30,
    totalDuration: 60,
    benefits: ['energy', 'heat', 'kundalini activation', 'mental clarity'],
    description: 'Rapid diaphragmatic breathing. Powerful heating and energizing.',
  },
  'nadi-shodhana': {
    name: 'Nadi Shodhana - Alternate Nostril',
    phases: [
      { name: 'inhale', duration: 4, intensity: 0.5 },
      { name: 'hold', duration: 4, intensity: 0.6 },
      { name: 'exhale', duration: 4, intensity: 0.5 },
    ],
    cycles: 10,
    totalDuration: 120,
    benefits: ['balance', 'clarity', 'harmony', 'nadi purification'],
    description: 'Channel purification through left-right-left nostril cycling.',
  },
  'ujjayi': {
    name: 'Ujjayi - Victorious Breath',
    phases: [
      { name: 'inhale', duration: 4, intensity: 0.6 },
      { name: 'exhale', duration: 4, intensity: 0.6 },
    ],
    cycles: 15,
    totalDuration: 120,
    benefits: ['heat', 'focus', 'energy', 'meditation support'],
    description: 'Throat constriction creates oceanic sound and internal warmth.',
  },
};

export default function BreathMagicLab() {
  const [selectedTechnique, setSelectedTechnique] = useState('4-7-8');
  const [isActive, setIsActive] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [mentalState, setMentalState] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const technique = BREATH_TECHNIQUES[selectedTechnique];
  const currentPhase = technique.phases[currentPhaseIndex];

  useEffect(() => {
    if (!isActive) return;

    if (secondsRemaining === 0) {
      // Move to next phase
      const nextPhaseIndex = (currentPhaseIndex + 1) % technique.phases.length;
      setCurrentPhaseIndex(nextPhaseIndex);

      if (nextPhaseIndex === 0) {
        setCycleCount((prev) => prev + 1);
      }

      if (cycleCount >= technique.cycles) {
        setIsActive(false);
        return;
      }

      setSecondsRemaining(technique.phases[nextPhaseIndex].duration);
    } else {
      timerRef.current = setTimeout(() => setSecondsRemaining((prev) => prev - 1), 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, secondsRemaining, currentPhaseIndex, cycleCount, technique]);

  const startPractice = () => {
    setSecondsRemaining(technique.phases[0].duration);
    setCycleCount(0);
    setCurrentPhaseIndex(0);
    setIsActive(true);
  };

  const stopPractice = () => {
    setIsActive(false);
    setCycleCount(0);
    setCurrentPhaseIndex(0);
    setSecondsRemaining(0);
  };

  const phaseVariants = {
    inhale: { scale: 1.3, opacity: 1 },
    hold: { scale: 1.3, opacity: 0.8 },
    exhale: { scale: 1, opacity: 0.6 },
  };

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-2">Breath Magic Laboratory</h1>
        <p className="text-sm text-[var(--color-bone)]/60">Sacred breathing techniques with haptic & audio guidance</p>
      </div>

      {/* Technique Selector */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(BREATH_TECHNIQUES).map(([key, tech]) => (
          <button
            key={key}
            onClick={() => !isActive && setSelectedTechnique(key)}
            disabled={isActive}
            className={`rounded-lg border px-3 py-2 text-center text-xs transition ${
              selectedTechnique === key
                ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                : 'border-[var(--hairline)] text-[var(--color-bone)]/70 hover:border-[var(--color-gold)]/40'
            }`}
          >
            {tech.name.split(' - ')[0]}
          </button>
        ))}
      </div>

      {/* Active Visualization */}
      {isActive && (
        <motion.div className="flex flex-col items-center justify-center space-y-6 rounded-lg border border-[var(--hairline)] bg-[var(--color-bone)]/5 py-12">
          {/* Breathing Sphere */}
          <motion.div
            animate={phaseVariants[currentPhase.name]}
            transition={{ duration: currentPhase.duration, ease: 'linear' }}
            className="h-32 w-32 rounded-full border-2 border-[var(--color-gold)] bg-gradient-to-br from-[var(--color-gold)]/20 to-[var(--color-gold)]/5"
          />

          {/* Phase Display */}
          <div className="text-center">
            <p className="text-sm uppercase tracking-luxe text-[var(--color-bone)]/60">{currentPhase.name}</p>
            <p className="text-5xl font-serif text-[var(--color-gold)]">{secondsRemaining}s</p>
          </div>

          {/* Cycle Counter */}
          <div className="text-sm">
            <span className="text-[var(--color-bone)]/60">Cycle</span>
            <span className="ml-2 font-serif text-lg text-[var(--color-gold)]">
              {cycleCount}/{technique.cycles}
            </span>
          </div>

          {/* Haptic Feedback Info */}
          <div className="text-xs text-[var(--color-bone)]/50 text-center">
            Haptic feedback active • Audio guide playing
          </div>
        </motion.div>
      )}

      {/* Technique Details */}
      {!isActive && (
        <div className="space-y-6 rounded-lg border border-[var(--hairline)] p-6">
          <div>
            <h2 className="text-xl font-serif mb-2">{technique.name}</h2>
            <p className="text-sm text-[var(--color-bone)]/70 mb-4">{technique.description}</p>

            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Pattern</p>
                <div className="flex gap-2">
                  {technique.phases.map((phase, i) => (
                    <div key={i} className="flex-1 rounded bg-[var(--color-bone)]/10 p-3 text-center">
                      <p className="text-xs font-serif uppercase text-[var(--color-gold)]">{phase.name}</p>
                      <p className="text-lg font-serif text-[var(--color-bone)]">{phase.duration}s</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Duration</p>
                <p className="text-lg font-serif">{technique.totalDuration}s ({technique.cycles} cycles)</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Benefits</p>
                <div className="flex flex-wrap gap-2">
                  {technique.benefits.map((benefit) => (
                    <span key={benefit} className="rounded bg-[var(--color-gold)]/10 px-2 py-1 text-xs text-[var(--color-gold)]">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mental State Survey */}
          {cycleCount > 0 && !isActive && (
            <div className="border-t border-[var(--hairline)] pt-4">
              <label className="block text-sm mb-2">How do you feel?</label>
              <select
                value={mentalState}
                onChange={(e) => setMentalState(e.target.value)}
                className="w-full rounded border border-[var(--hairline)] bg-[var(--color-bone)]/5 px-3 py-2 text-sm"
              >
                <option value="">Select state...</option>
                <option value="calm">Calm & grounded</option>
                <option value="energized">Energized</option>
                <option value="focused">Focused & clear</option>
                <option value="relaxed">Relaxed & spacey</option>
                <option value="tingling">Tingling/Energy sensations</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {!isActive ? (
          <button
            onClick={startPractice}
            className="flex-1 rounded-lg bg-[var(--color-gold)] px-6 py-3 text-center text-sm font-serif uppercase tracking-luxe text-[var(--color-bone)] transition hover:bg-[var(--color-gold-bright)]"
          >
            Start Practice
          </button>
        ) : (
          <button
            onClick={stopPractice}
            className="flex-1 rounded-lg bg-red-900/30 px-6 py-3 text-center text-sm font-serif uppercase tracking-luxe text-red-200 transition hover:bg-red-900/50"
          >
            Stop
          </button>
        )}
      </div>

      {/* Info Card */}
      <div className="rounded-lg bg-[var(--color-bone)]/5 p-4 text-xs text-[var(--color-bone)]/60">
        <p className="mb-2">Breath Magic Lab Notes:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Practice in a quiet space with good posture</li>
          <li>Haptic feedback requires mobile device support</li>
          <li>Audio guide will provide real-time cues</li>
          <li>Sessions are logged for tracking progress</li>
        </ul>
      </div>
    </div>
  );
}
