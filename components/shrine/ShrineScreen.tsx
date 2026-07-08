'use client';

import { useEffect, useState } from 'react';
import { m as motion } from 'motion/react';
import { useMotionContext } from '@/motion/RitualMotionConfig';
import { getThemeForTime, type ThemeConfig } from '@/lib/theme-system';
import { getMotionProfile, createTransitionFromProfile } from '@/lib/motion-profiles';
import type { RitualTemplate } from '@/lib/ritual-templates';

interface ShrineScreenProps {
  onExit?: () => void;
  rituals?: RitualTemplate[];
}

export default function ShrineScreen({
  onExit,
  rituals = [],
}: ShrineScreenProps) {
  const motionContext = useMotionContext();
  const [theme, setTheme] = useState<ThemeConfig>(getThemeForTime());
  const [isReady, setIsReady] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<RitualTemplate | null>(null);
  const profile = getMotionProfile('shrine');
  const transition = createTransitionFromProfile(profile, 'entrance');

  useEffect(() => {
    setTheme(getThemeForTime());
    setIsReady(true);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && onExit) {
      onExit();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: theme.background, color: theme.text }}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Sacred shrine"
    >
      {/* Background gradient */}
      {!motionContext.prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.accent}, transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 0.2 } : { opacity: 0 }}
          transition={transition}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-2xl w-full text-center"
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        variants={containerVariants}
        transition={transition}
      >
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-serif mb-4 font-light"
          style={{ color: theme.primary }}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          variants={itemVariants}
          transition={{
            delay: profile.staggerDelay / 1000,
            ...transition,
          }}
        >
          Sacred Shrine
        </motion.h1>

        <motion.p
          className="text-lg font-light mb-12 opacity-70"
          style={{ color: theme.secondary }}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          variants={itemVariants}
          transition={{
            delay: profile.staggerDelay / 1000 * 2,
            ...transition,
          }}
        >
          Choose a practice to enter the sanctuary
        </motion.p>

        {/* Rituals Grid */}
        {rituals.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: profile.staggerDelay / 1000 } } }}
          >
            {rituals.map((ritual) => (
              <motion.button
                key={ritual.id}
                className="p-6 rounded-lg border text-left transition-all hover:opacity-80 focus:outline-none focus:ring-2"
                style={{
                  borderColor: theme.accent,
                  backgroundColor: `${theme.accent}08`,
                }}
                variants={itemVariants}
                transition={transition}
                onClick={() => setSelectedRitual(ritual)}
              >
                <h3 className="text-lg font-serif font-light mb-2" style={{ color: theme.primary }}>
                  {ritual.title}
                </h3>
                <p className="text-xs opacity-60 mb-3">{ritual.sanskrit || 'Sacred Practice'}</p>
                <p className="text-sm" style={{ color: theme.accent }}>
                  {ritual.phases.length} phases
                </p>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="p-8 rounded-lg border mb-8"
            style={{ borderColor: theme.secondary }}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={itemVariants}
            transition={{
              delay: profile.staggerDelay / 1000 * 2,
              ...transition,
            }}
          >
            <p className="text-sm opacity-60">No rituals available</p>
          </motion.div>
        )}

        {/* Selected Ritual Details */}
        {selectedRitual && (
          <motion.div
            className="p-8 rounded-lg border mb-8"
            style={{
              borderColor: theme.accent,
              backgroundColor: `${theme.accent}08`,
            }}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={transition}
          >
            <h2 className="text-2xl font-serif font-light mb-4" style={{ color: theme.primary }}>
              {selectedRitual.title}
            </h2>
            <p className="mb-4 opacity-70">{selectedRitual.sanskrit || 'Begin this sacred practice'}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setSelectedRitual(null)}
                className="px-6 py-2 rounded-lg font-light text-sm border transition-all hover:opacity-80"
                style={{ borderColor: theme.secondary, color: theme.secondary }}
              >
                Back
              </button>
              <button
                className="px-6 py-2 rounded-lg font-light text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: theme.accent,
                  color: theme.background,
                }}
              >
                Begin Ritual
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          className="text-xs opacity-40"
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          variants={itemVariants}
          transition={{
            delay: profile.staggerDelay / 1000 * 3,
            ...transition,
          }}
        >
          Press Escape to exit the shrine
        </motion.p>
      </motion.div>

      {/* Close button */}
      {onExit && (
        <button
          onClick={onExit}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-lg border transition-all hover:opacity-80 focus:outline-none focus:ring-2"
          style={{ borderColor: theme.secondary, color: theme.secondary }}
          aria-label="Exit shrine"
        >
          ✕
        </button>
      )}
    </div>
  );
}
