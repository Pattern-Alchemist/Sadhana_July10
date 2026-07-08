/**
 * Ritual Motion System OSS — Motion Tokens
 * =========================================
 * Centralized motion tokens for the entire AstroKalki product.
 * Every animation duration, easing, scale, opacity, shadow, and blur
 * value is defined here. No component should hardcode motion values.
 *
 * Design philosophy: motion supports devotion, attention, and ritual
 * clarity. Not decoration. Not gamification. Not SaaS polish.
 *
 * Free/open only — no Rive, no paid platforms, no runtime cost.
 * Uses Motion for React (framer-motion) for UI animation,
 * inline SVG + CSS keyframes for symbolic ritual animations.
 */

// ---------- Durations ----------

export const durations = {
  /** Instant feedback — hover, focus, press acknowledgement */
  instant: 0.12,
  /** Fast — small component enter/update, toggle, badge */
  fast: 0.18,
  /** UI — tab switch, accordion, card entrance, standard interaction */
  ui: 0.24,
  /** Emphasis — modal enter, drawer, section reveal, premium hover */
  emphasis: 0.42,
  /** Ritual — offering charge, release, completion, hero reveal */
  ritual: 0.7,
  /** Extended ritual — multi-element ceremonial sequences */
  ceremonial: 1.2,
} as const;

// ---------- Easings ----------

export const easings = {
  /** Standard — default for most UI motion. Smooth deceleration. */
  standard: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  /** Exit — accelerating departure. Faster than enter. */
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
  /** Ritual — ceremonial, slightly overshooting. For offering moments. */
  ritual: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Linear — continuous rotation, progress bars, ambient loops only */
  linear: [0, 0, 1, 1] as [number, number, number, number],
} as const;

// ---------- Scale values ----------

export const scale = {
  /** Hover — subtle lift on cards, buttons */
  hover: 1.02,
  /** Press — active feedback on tap/press */
  press: 0.97,
  /** Tap (ritual) — the offering button on press */
  ritualPress: 0.95,
  /** Charge — the offering button when fully charged */
  ritualCharge: 1.05,
  /** Completion — the ceremonial pop on offering completion */
  completion: 1.15,
  /** Overlay backdrop — slight scale for depth */
  backdrop: 1.02,
} as const;

// ---------- Opacity levels ----------

export const opacity = {
  /** Fully visible */
  visible: 1,
  /** Subtle — for secondary content, hints */
  subtle: 0.7,
  /** Faint — for ambient elements, watermarks */
  faint: 0.4,
  /** Whisper — barely visible, for background atmosphere */
  whisper: 0.15,
  /** Hidden */
  hidden: 0,
  /** Overlay backdrop dim */
  backdrop: 0.6,
  /** Hero poster fallback */
  poster: 0.3,
} as const;

// ---------- Shadow / depth intensity ----------

export const shadows = {
  /** Resting — default card, no elevation */
  resting: "0 0 0 0 transparent",
  /** Hover — card lift, subtle gold glow */
  hover: "0 8px 30px -12px rgba(0,0,0,0.6), 0 0 40px -20px rgba(201,152,94,0.3)",
  /** Press — button press, inward shadow */
  press: "0 2px 8px -4px rgba(0,0,0,0.5), inset 0 1px 3px rgba(0,0,0,0.2)",
  /** Ritual charged — offering button at full charge */
  ritualCharged: "0 0 30px -5px rgba(230,192,137,0.5), 0 0 60px -15px rgba(201,152,94,0.3)",
  /** Completion — ceremonial glow on offering complete */
  completion: "0 0 40px -5px rgba(143,169,126,0.4), 0 0 80px -20px rgba(143,169,126,0.2)",
  /** Overlay — modal/drawer shadow */
  overlay: "0 -10px 40px -10px rgba(0,0,0,0.5)",
  /** Hero — atmospheric depth for hero sections */
  hero: "0 20px 80px -20px rgba(0,0,0,0.8)",
} as const;

// ---------- Blur levels ----------

export const blur = {
  /** No blur */
  none: 0,
  /** Subtle — for overlay backdrop */
  backdrop: 8,
  /** Medium — for modal backdrop, focused content */
  overlay: 12,
  /** Heavy — for hero atmosphere, depth separation */
  atmosphere: 20,
  /** Ritual — for charged/transitioning offering states */
  ritual: 6,
} as const;

// ---------- Z-depth (stacking) ----------

export const z = {
  /** Background atmosphere */
  atmosphere: 0,
  /** Content */
  content: 2,
  /** Sticky nav */
  nav: 50,
  /** Card hover, dropdown */
  dropdown: 24,
  /** Modal, drawer, overlay */
  overlay: 100,
  /** Toast, snackbar */
  toast: 200,
  /** Critical — ritual overlay, crisis */
  critical: 1000,
} as const;

// ---------- Spring configs (for Motion) ----------

export const springs = {
  /** Gentle — for cards, lists, non-urgent motion */
  gentle: { type: "spring", stiffness: 200, damping: 26, mass: 1 },
  /** Snappy — for buttons, toggles, quick feedback */
  snappy: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },
  /** Ritual — for offering charge/release, ceremonial moments */
  ritual: { type: "spring", stiffness: 120, damping: 18, mass: 1.2 },
  /** Soft — for hero reveals, large element entrances */
  soft: { type: "spring", stiffness: 80, damping: 20, mass: 1.5 },
} as const;

// ---------- Stagger configs ----------

export const stagger = {
  /** Quick — for small lists (3-6 items) */
  quick: { staggerChildren: 0.04 },
  /** Standard — for card grids, dashboards */
  standard: { staggerChildren: 0.06 },
  /** Slow — for ceremonial sequences, ritual steps */
  ritual: { staggerChildren: 0.1 },
  /** Hero — for word-by-word hero text reveals */
  hero: { staggerChildren: 0.15 },
} as const;

// ---------- Type exports ----------

export type Duration = keyof typeof durations;
export type Easing = keyof typeof easings;
export type Scale = keyof typeof scale;
export type Shadow = keyof typeof shadows;
export type Blur = keyof typeof blur;
