'use client';

import { useEffect, useState } from 'react';
import { m as motion } from 'motion/react';
import { useMotionContext } from '@/motion/RitualMotionConfig';
import { getThemeForTime, type ThemeConfig } from '@/lib/theme-system';
import { getMotionProfile, createTransitionFromProfile } from '@/lib/motion-profiles';

interface PracticeDashboardProps {
  recentPractices?: Array<{ name: string; date: string; duration: number }>;
}

export default function PracticeDashboard({
  recentPractices = [],
}: PracticeDashboardProps) {
  const motionContext = useMotionContext();
  const [theme, setTheme] = useState<ThemeConfig>(getThemeForTime());
  const [isReady, setIsReady] = useState(false);
  const profile = getMotionProfile('dashboard');
  const transition = createTransitionFromProfile(profile, 'interaction');

  useEffect(() => {
    setTheme(getThemeForTime());
    setIsReady(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-6 md:p-8 max-w-4xl mx-auto"
      initial="hidden"
      animate={isReady ? 'visible' : 'hidden'}
      variants={containerVariants}
      transition={transition}
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        variants={itemVariants}
        transition={{
          delay: profile.staggerDelay / 1000,
          ...transition,
        }}
      >
        <h1 className="text-3xl md:text-4xl font-serif mb-2 font-light">
          Your Practice Dashboard
        </h1>
        <p className="text-sm opacity-60">
          Track your daily rituals and contemplative practices
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: profile.staggerDelay / 1000 } } }}
      >
        {/* Today's Practices */}
        <motion.div
          className="p-6 rounded-lg border"
          style={{ borderColor: theme.accent, backgroundColor: `${theme.accent}08` }}
          variants={itemVariants}
          transition={transition}
        >
          <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: theme.secondary }}>
            Today’s Practices
          </p>
          <p className="text-3xl font-light" style={{ color: theme.primary }}>
            {recentPractices.length}
          </p>
        </motion.div>

        {/* Total Minutes */}
        <motion.div
          className="p-6 rounded-lg border"
          style={{ borderColor: theme.accent, backgroundColor: `${theme.accent}08` }}
          variants={itemVariants}
          transition={transition}
        >
          <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: theme.secondary }}>
            Minutes Practiced
          </p>
          <p className="text-3xl font-light" style={{ color: theme.primary }}>
            {recentPractices.reduce((sum, p) => sum + p.duration, 0)}
          </p>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          className="p-6 rounded-lg border"
          style={{ borderColor: theme.accent, backgroundColor: `${theme.accent}08` }}
          variants={itemVariants}
          transition={transition}
        >
          <p className="text-xs font-light tracking-widest uppercase mb-2" style={{ color: theme.secondary }}>
            Day Streak
          </p>
          <p className="text-3xl font-light" style={{ color: theme.primary }}>
            {recentPractices.length > 0 ? '7' : '0'}
          </p>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      {recentPractices.length > 0 && (
        <motion.div
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          variants={itemVariants}
          transition={{
            delay: profile.staggerDelay / 1000 * 4,
            ...transition,
          }}
        >
          <h2 className="text-lg font-serif mb-4 font-light">Recent Practices</h2>
          <div className="space-y-3">
            {recentPractices.slice(0, 5).map((practice, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-lg border flex justify-between items-center"
                style={{ borderColor: theme.secondary }}
                initial="hidden"
                animate={isReady ? 'visible' : 'hidden'}
                variants={itemVariants}
                transition={{
                  delay: profile.staggerDelay / 1000 * (5 + idx),
                  ...transition,
                }}
              >
                <div>
                  <p className="font-light">{practice.name}</p>
                  <p className="text-xs opacity-60">{practice.date}</p>
                </div>
                <p className="text-sm font-light" style={{ color: theme.accent }}>
                  {practice.duration} min
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Start Button */}
      <motion.div
        className="mt-8"
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        variants={itemVariants}
        transition={{
          delay: profile.staggerDelay / 1000 * 6,
          ...transition,
        }}
      >
        <button
          className="w-full px-6 py-4 rounded-lg font-light tracking-wide uppercase text-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2"
          style={{
            backgroundColor: theme.accent,
            color: theme.background,
          }}
        >
          Begin Practice
        </button>
      </motion.div>
    </motion.div>
  );
}
