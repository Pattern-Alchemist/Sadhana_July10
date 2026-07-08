'use client';

/**
 * Shrine Screen - Premium ritual destination
 * Sprint 3: Product Integration
 *
 * Features:
 * - Immersive altar visualization
 * - Deity/purpose display
 * - Ritual phase progression
 * - Sacred audio/haptic feedback
 * - Detailed ritual context
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getMotionProfile,
  getMotionVariant,
  MotionProfile,
} from '@/lib/motion-profiles';
import { getThemeForTime } from '@/lib/theme-system';
import type { ThemeConfig } from '@/lib/theme-system';
import type { RitualTemplate } from '@/lib/ritual-templates';

// ============================================================================
// Types
// ============================================================================

interface ShrineScreenProps {
  ritual: RitualTemplate;
  currentPhase?: number;
  totalPhases?: number;
  prefersReducedMotion?: boolean;
  motionProfile?: MotionProfile;
  onPhaseChange?: (phaseIndex: number) => void;
  onClose?: () => void;
}

interface AltarElement {
  id: string;
  name: string;
  symbol: string;
  color: string;
  delay: number;
}

// ============================================================================
// Mock Altar Elements
// ============================================================================

function getAltarElements(theme: ThemeConfig): AltarElement[] {
  return [
    {
      id: 'flower',
      name: 'Flower Offering',
      symbol: '🌺',
      color: theme.colors.offering,
      delay: 0,
    },
    {
      id: 'incense',
      name: 'Incense',
      symbol: '🔥',
      color: theme.colors.sacred,
      delay: 200,
    },
    {
      id: 'lamp',
      name: 'Oil Lamp',
      symbol: '🕯️',
      color: theme.colors.completion,
      delay: 400,
    },
    {
      id: 'bell',
      name: 'Bell',
      symbol: '🔔',
      color: theme.colors.offering,
      delay: 600,
    },
  ];
}

// ============================================================================
// Altar Element Component
// ============================================================================

interface AltarElementProps {
  element: AltarElement;
  theme: ThemeConfig;
  motionProfile: MotionProfile;
  prefersReducedMotion?: boolean;
  isActive?: boolean;
}

function AltarElementComponent({
  element,
  theme,
  motionProfile,
  prefersReducedMotion,
  isActive,
}: AltarElementProps) {
  const entranceVariant = getMotionVariant(motionProfile, 'entrance');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: isActive ? 1.1 : 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 200 : entranceVariant.duration,
        delay: prefersReducedMotion ? 0 : element.delay / 1000,
        ease: entranceVariant.easing,
      }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        className="text-5xl"
        animate={
          isActive && !prefersReducedMotion
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          repeatDelay: 0.5,
        }}
      >
        {element.symbol}
      </motion.div>
      <p
        style={{ color: theme.colors.mutedForeground }}
        className="text-sm text-center"
      >
        {element.name}
      </p>
    </motion.div>
  );
}

// ============================================================================
// Ritual Phase Progress
// ============================================================================

interface PhaseProgressProps {
  currentPhase: number;
  totalPhases: number;
  theme: ThemeConfig;
  phases?: string[];
  prefersReducedMotion?: boolean;
}

function PhaseProgress({
  currentPhase,
  totalPhases,
  theme,
  phases,
  prefersReducedMotion,
}: PhaseProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 150 : 300 }}
      className="space-y-3"
    >
      {/* Phase indicator */}
      <div className="flex justify-between items-center">
        <span
          style={{ color: theme.colors.mutedForeground }}
          className="text-sm"
        >
          Phase {currentPhase + 1} of {totalPhases}
        </span>
        <span
          style={{ color: theme.colors.sacred }}
          className="text-sm font-semibold"
        >
          {Math.round(((currentPhase + 1) / totalPhases) * 100)}%
        </span>
      </div>

      {/* Progress bar */}
      <motion.div
        style={{ backgroundColor: theme.colors.muted }}
        className="w-full h-2 rounded-full overflow-hidden"
      >
        <motion.div
          style={{ backgroundColor: theme.colors.sacred }}
          className="h-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentPhase + 1) / totalPhases) * 100}%` }}
          transition={{
            duration: prefersReducedMotion ? 300 : 600,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {/* Phase names */}
      {phases && (
        <div className="flex gap-1 mt-2">
          {phases.map((phase, idx) => (
            <motion.div
              key={phase}
              style={{
                backgroundColor:
                  idx <= currentPhase
                    ? theme.colors.sacred
                    : theme.colors.muted,
              }}
              className="flex-1 h-1 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: prefersReducedMotion ? 150 : 300,
                delay: (idx * 100) / 1000,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// Main Shrine Screen Component
// ============================================================================

export function ShrineScreen({
  ritual,
  currentPhase = 0,
  totalPhases = 5,
  prefersReducedMotion = false,
  motionProfile = 'shrine',
  onPhaseChange,
  onClose,
}: ShrineScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [activeElement, setActiveElement] = useState(0);

  const currentTheme = getThemeForTime();
  const motionProfileConfig = getMotionProfile(motionProfile);
  const altarElements = getAltarElements(currentTheme);
  const phaseNames = ['Preparation', 'Invocation', 'Offering', 'Completion'];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through altar elements
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveElement((prev) => (prev + 1) % altarElements.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [altarElements.length, prefersReducedMotion]);

  if (!mounted) {
    return null;
  }

  const entranceVariant = getMotionVariant(motionProfile, 'entrance');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 200 : 400,
      }}
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.foreground,
      }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 150 : entranceVariant.duration,
          delay: 100,
        }}
        className="p-4 md:p-6 border-b"
        style={{ borderColor: currentTheme.colors.divider }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{ritual.title}</h1>
            {ritual.deity && (
              <p
                style={{ color: currentTheme.colors.mutedForeground }}
                className="text-sm mt-1"
              >
                Dedicated to {ritual.deity}
              </p>
            )}
            {ritual.purpose && (
              <p
                style={{ color: currentTheme.colors.mutedForeground }}
                className="text-sm"
              >
                {ritual.purpose}
              </p>
            )}
          </div>

          {/* Close button */}
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
            onClick={onClose}
            style={{
              color: currentTheme.colors.mutedForeground,
              hoverColor: currentTheme.colors.foreground,
            }}
            className="text-2xl leading-none"
          >
            ✕
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content - Centered Altar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 200 : 600,
          delay: 300,
        }}
        className="flex-1 flex flex-col items-center justify-center p-6 space-y-12"
      >
        {/* Altar Elements Grid */}
        <div className="grid grid-cols-2 gap-8 md:gap-12">
          {altarElements.map((element, idx) => (
            <AltarElementComponent
              key={element.id}
              element={element}
              theme={currentTheme}
              motionProfile={motionProfile}
              prefersReducedMotion={prefersReducedMotion}
              isActive={activeElement === idx}
            />
          ))}
        </div>

        {/* Ritual Description */}
        {ritual.description && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 150 : 400,
              delay: 500,
            }}
            className="text-center max-w-lg"
          >
            <p
              style={{ color: currentTheme.colors.mutedForeground }}
              className="text-base leading-relaxed"
            >
              {ritual.description}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Footer - Phase Progress and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 150 : 400,
          delay: 600,
        }}
        className="p-4 md:p-6 border-t space-y-4"
        style={{ borderColor: currentTheme.colors.divider }}
      >
        {/* Phase Progress */}
        <PhaseProgress
          currentPhase={currentPhase}
          totalPhases={totalPhases}
          theme={currentTheme}
          phases={phaseNames}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={() => onPhaseChange?.(Math.max(0, currentPhase - 1))}
            disabled={currentPhase === 0}
            style={{
              backgroundColor: currentTheme.colors.muted,
              color: currentTheme.colors.foreground,
              opacity: currentPhase === 0 ? 0.5 : 1,
            }}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition-opacity"
          >
            Back
          </motion.button>

          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={() => onPhaseChange?.(Math.min(totalPhases - 1, currentPhase + 1))}
            disabled={currentPhase === totalPhases - 1}
            style={{
              backgroundColor:
                currentPhase === totalPhases - 1
                  ? currentTheme.colors.completion
                  : currentTheme.colors.sacred,
              color: currentTheme.colors.foreground,
              opacity: currentPhase === totalPhases - 1 ? 0.8 : 1,
            }}
            className="flex-1 px-4 py-2 rounded-lg font-medium transition-opacity"
          >
            {currentPhase === totalPhases - 1 ? 'Complete' : 'Continue'}
          </motion.button>
        </div>

        {/* Help text */}
        <p
          style={{ color: currentTheme.colors.mutedForeground }}
          className="text-xs text-center"
        >
          {currentPhase === totalPhases - 1
            ? 'Complete this ritual to mark it as finished'
            : `Step ${currentPhase + 1} of ${totalPhases}`}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default ShrineScreen;
