"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * AmbientBackground v2 — CSS-only temple/shrine atmosphere.
 *
 * Rules (per the motion system spec):
 *   - Layered CSS gradients, glow, soft blur, grain
 *   - Low-intensity ambient movement only
 *   - Avoid heavy GPU scenes
 *   - Avoid multiple simultaneous decorative motion layers
 *   - Temple / shrine / cosmic sacred atmosphere — not neon startup blobs
 *   - At most ONE ambient motion layer visible at a time
 *
 * This replaces the v2.4 AmbientBackground which had 12 floating particles
 * (too many simultaneous layers). This version uses:
 *   - One aurora gradient (slow 30s shift)
 *   - Three ambient motes only (down from 12)
 *   - SVG grain texture (static)
 *   - Radial glow (static)
 */

export default function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Aurora gradient — slowly shifting ambient glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 0%, rgba(201, 152, 94, 0.12), transparent 70%)," +
              "radial-gradient(ellipse 50% 40% at 80% 100%, rgba(111, 199, 189, 0.06), transparent 70%)",
            backgroundSize: "200% 200%, 200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%, 100% 50%", "100% 50%, 0% 50%", "0% 50%, 100% 50%"],
          }}
          transition={{
            duration: 30,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          aria-hidden="true"
        />
      )}

      {/* Static radial glow for reduced motion (no animation) */}
      {prefersReducedMotion && (
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 20% 0%, rgba(201, 152, 94, 0.12), transparent 70%)," +
              "radial-gradient(ellipse 50% 40% at 80% 100%, rgba(111, 199, 189, 0.06), transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Three ambient motes only (down from 12) — very low opacity */}
      {!prefersReducedMotion && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.span
            className="absolute rounded-full"
            style={{
              left: "20%",
              width: "3px",
              height: "3px",
              background: "radial-gradient(circle, rgba(230, 192, 137, 0.6) 0%, transparent 100%)",
            }}
            animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.5, 0] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{
              left: "55%",
              width: "2px",
              height: "2px",
              background: "radial-gradient(circle, rgba(201, 152, 94, 0.5) 0%, transparent 100%)",
            }}
            animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.4, 0] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity, delay: 5 }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{
              left: "85%",
              width: "4px",
              height: "4px",
              background: "radial-gradient(circle, rgba(230, 192, 137, 0.7) 0%, transparent 100%)",
            }}
            animate={{ y: ["100vh", "-10vh"], opacity: [0, 0.6, 0] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity, delay: 10 }}
          />
        </div>
      )}

      {/* SVG grain texture — static, very low opacity */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
    </>
  );
}
