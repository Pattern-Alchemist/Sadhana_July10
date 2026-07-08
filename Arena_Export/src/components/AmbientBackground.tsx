"use client";

/**
 * AmbientBackground — fixed-position cinematic atmosphere.
 *
 * Renders:
 *   - Aurora gradient (slowly shifting ambient glow)
 *   - Floating gold particles (12 ambient motes)
 *   - Faint yantra rotation (optional, very low opacity)
 *
 * Sits behind all content (z-index: 0). Pointer-events: none.
 * Disabled on reduced-motion.
 */
export default function AmbientBackground() {
  return (
    <>
      {/* Aurora gradient */}
      <div className="aurora-bg" aria-hidden="true" />

      {/* Floating particles */}
      <div className="ambient-particles" aria-hidden="true">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
        <span className="particle p6" />
        <span className="particle p7" />
        <span className="particle p8" />
        <span className="particle p9" />
        <span className="particle p10" />
        <span className="particle p11" />
        <span className="particle p12" />
      </div>
    </>
  );
}
