'use client';

import { useEffect, useState } from 'react';
import { m as motion } from 'motion/react';
import { useMotionContext } from '@/motion/RitualMotionConfig';
import { getThemeForTime, type ThemeConfig } from '@/lib/theme-system';
import { getMotionProfile, createTransitionFromProfile } from '@/lib/motion-profiles';

interface RitualHeroProps {
  title: string;
  subtitle?: string;
  deity?: string;
  mantra?: string;
  onEnter?: () => void;
  variant?: 'opening' | 'ritual' | 'closing';
}

export default function RitualHero({
  title,
  subtitle,
  deity,
  mantra,
  onEnter,
  variant = 'opening',
}: RitualHeroProps) {
  const motionContext = useMotionContext();
  const [theme, setTheme] = useState<ThemeConfig>(getThemeForTime());
  const profile = getMotionProfile(variant === 'opening' ? 'hero' : variant === 'ritual' ? 'ritual' : 'hero');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTheme(getThemeForTime());
    setIsReady(true);
  }, []);

  const entranceTransition = createTransitionFromProfile(profile, 'entrance');
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerDelay = motionContext.prefersReducedMotion ? 0 : profile.staggerDelay / 1000;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    } else if (e.key === 'Escape') {
      window.history.back();
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Ritual opening"
    >
      {/* Background gradient overlay */}
      {!motionContext.prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.accent}, transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 0.3 } : { opacity: 0 }}
          transition={entranceTransition}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 py-12 max-w-2xl"
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
        variants={containerVariants}
        transition={entranceTransition}
        tabIndex={0}
        role="main"
      >
        {/* Deity name if provided */}
        {deity && (
          <motion.div
            className="mb-6 text-sm font-light tracking-widest uppercase"
            style={{ color: theme.secondary }}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{
              delay: staggerDelay,
              ...entranceTransition,
            }}
          >
            {deity}
          </motion.div>
        )}

        {/* Main title */}
        <motion.h1
          className="text-5xl md:text-6xl font-serif mb-4 font-light"
          style={{ color: theme.primary }}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          variants={textVariants}
          transition={{
            delay: staggerDelay * 2,
            ...entranceTransition,
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed mb-8"
            style={{ color: theme.secondary }}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{
              delay: staggerDelay * 3,
              ...entranceTransition,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Mantra if provided */}
        {mantra && (
          <motion.div
            className="mt-12 p-6 rounded-lg border border-opacity-20"
            style={{
              borderColor: theme.accent,
              backgroundColor: `${theme.accent}08`,
            }}
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{
              delay: staggerDelay * 4,
              ...entranceTransition,
            }}
          >
            <p
              className="font-serif text-base md:text-lg"
              style={{ color: theme.accent }}
            >
              {mantra}
            </p>
          </motion.div>
        )}

        {/* Call to action */}
        {onEnter && (
          <motion.div
            className="mt-12 flex flex-col items-center gap-4"
            initial="hidden"
            animate={isReady ? 'visible' : 'hidden'}
            variants={textVariants}
            transition={{
              delay: staggerDelay * 5,
              ...entranceTransition,
            }}
          >
            <button
              onClick={onEnter}
              className="px-8 py-3 rounded-lg font-light tracking-wide uppercase text-sm transition-colors hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: theme.accent,
                color: theme.background,
              }}
              onKeyDown={handleKeyDown}
              aria-label="Begin ritual"
            >
              Begin Ritual
            </button>
            <p className="text-xs opacity-60">or press Enter</p>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative elements - only in full motion mode */}
      {!motionContext.prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: theme.accent }}
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
            style={{ backgroundColor: theme.secondary }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}
