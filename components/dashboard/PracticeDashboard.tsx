'use client';

/**
 * Practice Dashboard - Home page ritual practice tracking
 * Sprint 3: Product Integration
 *
 * Shows:
 * - Active rituals
 * - Practice streaks
 * - Daily completion progress
 * - Suggested rituals for time of day
 * - Quick-start buttons
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getMotionProfile,
  getMotionVariant,
  createStaggerAnimation,
  MotionProfile,
} from '@/lib/motion-profiles';
import { getThemeConfig, getCurrentTimeOfDay, getThemeForTime } from '@/lib/theme-system';
import { getRitualTemplates } from '@/lib/ritual-templates';
import type { TimeOfDay, ThemeConfig } from '@/lib/theme-system';

// ============================================================================
// Types
// ============================================================================

interface PracticeStats {
  streak: number;
  totalPractices: number;
  completedToday: boolean;
  activePractices: string[];
  nextSuggestedRitual: string;
  timeOfDay: TimeOfDay;
}

interface DashboardProps {
  stats?: PracticeStats;
  prefersReducedMotion?: boolean;
  onStartRitual?: (templateId: string) => void;
  motionProfile?: MotionProfile;
}

// ============================================================================
// Mock Data Utilities
// ============================================================================

function getMockStats(): PracticeStats {
  const timeOfDay = getCurrentTimeOfDay();
  const templates = getRitualTemplates();

  return {
    streak: 7,
    totalPractices: 24,
    completedToday: false,
    activePractices: templates.slice(0, 2).map((t) => t.id),
    nextSuggestedRitual: templates[0]?.id || 'daily-offering',
    timeOfDay,
  };
}

// ============================================================================
// Stat Card Component
// ============================================================================

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  theme: ThemeConfig;
  motionProfile: MotionProfileConfig;
  index: number;
  prefersReducedMotion?: boolean;
}

interface MotionProfileConfig {
  staggerDelay: number;
  variants: any;
}

function StatCard({
  label,
  value,
  subtext,
  icon,
  theme,
  motionProfile,
  index,
  prefersReducedMotion,
}: StatCardProps) {
  const staggerFn = createStaggerAnimation(motionProfile, 3);
  const enterVariant = getMotionVariant(
    motionProfile.name as MotionProfile,
    'entrance'
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion
          ? 150
          : enterVariant.duration,
        delay: staggerFn(index) / 1000,
        easing: enterVariant.easing,
      }}
      style={{
        backgroundColor: theme.colors.muted,
        borderColor: theme.colors.border,
        color: theme.colors.foreground,
      }}
      className="p-4 rounded-lg border flex flex-col gap-2"
    >
      {icon && <div className="text-2xl">{icon}</div>}
      <div>
        <p style={{ color: theme.colors.mutedForeground }} className="text-sm">
          {label}
        </p>
        <p className="text-2xl font-bold">{value}</p>
        {subtext && (
          <p style={{ color: theme.colors.mutedForeground }} className="text-xs">
            {subtext}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// Quick Start Button
// ============================================================================

interface QuickStartProps {
  templateId: string;
  templateTitle: string;
  theme: ThemeConfig;
  motionProfile: MotionProfileConfig;
  onStart?: () => void;
  prefersReducedMotion?: boolean;
}

function QuickStartButton({
  templateId,
  templateTitle,
  theme,
  motionProfile,
  onStart,
  prefersReducedMotion,
}: QuickStartProps) {
  const [isHovering, setIsHovering] = useState(false);

  const hoverVariant = getMotionVariant(
    motionProfile.name as MotionProfile,
    'hover'
  );

  return (
    <motion.button
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onStart}
      style={{
        backgroundColor: isHovering ? theme.colors.primary : theme.colors.muted,
        color: isHovering
          ? theme.colors.primaryForeground
          : theme.colors.foreground,
        borderColor: theme.colors.border,
      }}
      className="px-4 py-2 rounded-lg border transition-colors duration-200 text-sm font-medium"
    >
      Start {templateTitle}
    </motion.button>
  );
}

// ============================================================================
// Progress Ring
// ============================================================================

interface ProgressRingProps {
  percentage: number;
  theme: ThemeConfig;
  size?: number;
  prefersReducedMotion?: boolean;
}

function ProgressRing({
  percentage,
  theme,
  size = 120,
  prefersReducedMotion,
}: ProgressRingProps) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.svg
      width={size}
      height={size}
      className="transform -rotate-90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 150 : 300 }}
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={theme.colors.muted}
        strokeWidth="4"
        fill="none"
      />

      {/* Progress ring */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={theme.colors.sacred}
        strokeWidth="4"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{
          duration: prefersReducedMotion ? 200 : 600,
          ease: 'easeInOut',
        }}
      />

      {/* Center text */}
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="24"
        fontWeight="bold"
        fill={theme.colors.foreground}
      >
        {percentage}%
      </text>
    </motion.svg>
  );
}

// ============================================================================
// Main Dashboard Component
// ============================================================================

export function PracticeDashboard({
  stats: initialStats,
  prefersReducedMotion = false,
  onStartRitual,
  motionProfile = 'dashboard',
}: DashboardProps) {
  const [stats, setStats] = useState<PracticeStats>(
    initialStats || getMockStats()
  );
  const [mounted, setMounted] = useState(false);

  const currentTheme = getThemeForTime();
  const motionProfileConfig = getMotionProfile(motionProfile);
  const templates = getRitualTemplates();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const completionPercentage = stats.completedToday ? 100 : 50;
  const nextRitual = templates.find((t) => t.id === stats.nextSuggestedRitual);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 300 }}
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.foreground,
      }}
      className="min-h-screen p-4 md:p-6 space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 150 : 400,
          delay: 100,
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          {stats.timeOfDay === 'dawn'
            ? 'Good morning'
            : stats.timeOfDay === 'daylight'
              ? 'Welcome back'
              : stats.timeOfDay === 'dusk'
                ? 'Evening reflections'
                : 'Blessed night'}
        </h1>
        <p
          style={{ color: currentTheme.colors.mutedForeground }}
          className="text-sm mt-1"
        >
          {stats.completedToday
            ? 'Today&apos;s practice is complete'
            : 'Keep your practice flowing'}
        </p>
      </motion.div>

      {/* Main Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 200 : 500,
          delay: 200,
        }}
        className="flex justify-center py-6"
      >
        <ProgressRing
          percentage={completionPercentage}
          theme={currentTheme}
          prefersReducedMotion={prefersReducedMotion}
        />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <StatCard
          label="Streak"
          value={stats.streak}
          subtext="days"
          icon="🔥"
          theme={currentTheme}
          motionProfile={motionProfileConfig}
          index={0}
          prefersReducedMotion={prefersReducedMotion}
        />
        <StatCard
          label="Total"
          value={stats.totalPractices}
          subtext="practices"
          icon="🙏"
          theme={currentTheme}
          motionProfile={motionProfileConfig}
          index={1}
          prefersReducedMotion={prefersReducedMotion}
        />
        <StatCard
          label="Today"
          value={stats.completedToday ? '✓' : '○'}
          subtext="completed"
          icon="✨"
          theme={currentTheme}
          motionProfile={motionProfileConfig}
          index={2}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* Suggested Ritual */}
      {nextRitual && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 150 : 400,
            delay: 500,
          }}
          style={{
            backgroundColor: currentTheme.colors.muted,
            borderColor: currentTheme.colors.sacred,
            borderLeftWidth: '4px',
          }}
          className="p-4 rounded-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                style={{ color: currentTheme.colors.mutedForeground }}
                className="text-sm font-medium mb-1"
              >
                Suggested for {stats.timeOfDay}
              </p>
              <h3 className="text-lg font-semibold">{nextRitual.title}</h3>
              <p
                style={{ color: currentTheme.colors.mutedForeground }}
                className="text-sm mt-1"
              >
                {nextRitual.description}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={() => onStartRitual?.(nextRitual.id)}
            style={{
              backgroundColor: currentTheme.colors.sacred,
              color: currentTheme.colors.foreground,
            }}
            className="mt-4 px-6 py-2 rounded-lg font-medium w-full"
          >
            Begin {nextRitual.title}
          </motion.button>
        </motion.div>
      )}

      {/* Quick Start Rituals */}
      {templates.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: prefersReducedMotion ? 150 : 400,
            delay: 600,
          }}
        >
          <h2 className="text-lg font-semibold mb-3">Quick Start</h2>
          <div className="flex flex-col gap-2">
            {templates.slice(0, 3).map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 100 : 300,
                  delay: 700 + idx * 100,
                }}
              >
                <QuickStartButton
                  templateId={template.id}
                  templateTitle={template.title}
                  theme={currentTheme}
                  motionProfile={motionProfileConfig}
                  onStart={() => onStartRitual?.(template.id)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 150 : 400,
          delay: 900,
        }}
        style={{ color: currentTheme.colors.mutedForeground }}
        className="text-center text-xs py-4 border-t"
      >
        <p>
          Practice duration varies by ritual • All times estimated • Progress
          synced automatically
        </p>
      </motion.div>
    </motion.div>
  );
}

export default PracticeDashboard;
