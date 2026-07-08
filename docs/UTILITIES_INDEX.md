# AstroKalki Ritual Framework — Quick Reference

## Motion System

### Motion Policy Layer
**File:** `motion/motion-policy.ts`

```typescript
import { createMotionPolicy, shouldAnimate, ritualAnimationVariant } from "@/motion/motion-policy";

// Create policy
const policy = createMotionPolicy({
  prefersReducedMotion: true,
  isLowPerformance: false,
  motionProfile: "ritual",
});

// Check if should animate
if (shouldAnimate(policy)) { /* animate */ }

// Get reduced-motion variant
const variant = ritualAnimationVariant(policy);
// Returns: { idle, charging, charged, releasing }
```

---

## Keyboard Accessibility

### Keyboard Utilities
**File:** `lib/keyboard-a11y.ts`

```typescript
import {
  isPressTrigger,
  handleRitualKeyDown,
  handleRitualKeyUp,
  announceToScreenReader,
  setupFocusTrap,
  KEYBOARD_INSTRUCTIONS,
  RITUAL_ANNOUNCEMENTS,
} from "@/lib/keyboard-a11y";

// Check for press trigger (Spacebar/Enter)
if (isPressTrigger(event)) { /* handle */ }

// Handle ritual key events
handleRitualKeyDown(event, {
  onHoldStart: () => {},
  onCancel: () => {},
});

// Announce to screen readers
announceToScreenReader("Ritual started", "assertive");

// Focus trap for modals
const cleanup = setupFocusTrap(element);
```

### useKeyboardRitual Hook
**File:** `hooks/useKeyboardRitual.ts`

```typescript
import { useKeyboardRitual } from "@/hooks/useKeyboardRitual";

const { keyboardHandlers, isHoldingViaKeyboard } = useKeyboardRitual({
  onHoldStart: () => {},
  onHoldRelease: () => {},
  onCancel: () => {},
  announceStates: true,
});

<button {...keyboardHandlers} />
```

---

## Audio & Haptics

### Audio Manager
**File:** `lib/audio-manager.ts`

```typescript
import { getAudioManager, canPlayAudio } from "@/lib/audio-manager";

const audio = getAudioManager();

// Play sounds
await audio.playSound("bell-tap");       // Brief high tone
await audio.playSound("hum-start");      // Warm fundamental
await audio.playSound("hum-charge");     // Building energy
await audio.playSound("shimmer-release"); // Descending shimmer
await audio.playSound("chime-complete"); // Triumphant chime

// Control volume
audio.setMasterVolume(0.5);

// Enable/disable specific sounds
audio.enableSound("hum-charge", false);

// Mute
audio.setMuted(true);

// Check support
if (canPlayAudio()) { /* ... */ }
```

### Haptic Manager
**File:** `lib/haptic-manager.ts`

```typescript
import {
  getHapticManager,
  canVibrate,
  tapHaptic,
  chargeHaptic,
  releaseHaptic,
  errorHaptic,
  successHaptic,
} from "@/lib/haptic-manager";

const haptic = getHapticManager();

// Quick feedback
await tapHaptic();                    // 10ms tap
await chargeHaptic(0.5);              // Progressive (0-1)
await releaseHaptic();                // Burst
await errorHaptic();                  // Warning
await successHaptic();                // Confirmation

// Custom patterns
await haptic.playCustom([10, 20, 10, 20, 30]);

// Control
haptic.setIntensity(0.5);             // Volume
haptic.setReduceIntensity(true);      // Accessibility mode
haptic.setEnabled(false);             // Disable all

// Check support
if (canVibrate()) { /* ... */ }
```

---

## Ritual Templates

### Ritual Template Engine
**File:** `lib/ritual-templates.ts`

```typescript
import {
  RITUAL_TEMPLATES,
  getTemplate,
  getAllTemplates,
  getTemplatesByTheme,
  createRitualTemplate,
  templateToConfig,
  getTemplateRegistry,
} from "@/lib/ritual-templates";

// Get template
const template = getTemplate("daily-offering");

// Get all
const all = getAllTemplates();

// Filter by theme
const gentle = getTemplatesByTheme("gentle");

// Create custom
const custom = createRitualTemplate({
  id: "my-ritual",
  title: "My Ritual",
  deity: "My Deity",
  purpose: "My purpose",
  theme: "devotional",
  phases: [ /* ... */ ],
});

// Convert to state machine config
const config = templateToConfig(template);

// Register custom
const registry = getTemplateRegistry();
registry.register(custom);
registry.get("my-ritual");
registry.list(); // All IDs
registry.all();  // All templates
registry.filterByTheme("ritual");
```

**Available Templates:**
- `daily-offering` — Nityápúja (gratitude)
- `maha-mrityunjaya` — Mahá Mṛtyuñjaya (health/protection, 108 reps)
- `gayatri` — Gāyatrī Mantra (solar awakening)

---

## Components

### Ritual Error Boundary
**File:** `components/ritual/RitualErrorBoundary.tsx`

```typescript
import RitualErrorBoundary from "@/components/ritual/RitualErrorBoundary";

<RitualErrorBoundary
  onError={(error, info) => {
    console.error("Ritual error:", error);
  }}
>
  <RitualFlow />
</RitualErrorBoundary>
```

### Ritual Loading State
**File:** `components/ritual/RitualLoadingState.tsx`

```typescript
import { RitualLoadingState, RitualContentSkeleton } from "@/components/ritual/RitualLoadingState";

<RitualLoadingState
  label="Preparing ritual"
  message="Gathering offerings..."
  prefersReducedMotion={policy.reducedMotion}
/>

// For skeleton loading
<RitualContentSkeleton />
```

### Japa Counter
**File:** `components/ritual/JapaCounter.tsx`

```typescript
import JapaCounter from "@/components/ritual/JapaCounter";

<JapaCounter
  targetCount={108}
  mantraText="ॐ नमः शिवाय"
  onComplete={() => nextPhase()}
  prefersReducedMotion={prefersReducedMotion}
/>
```

---

## State Machine (Pre-Existing)

### Ritual Machine
**File:** `lib/ritual-machine.ts`

```typescript
import {
  createSession,
  ritualReducer,
  detectCapabilities,
  type RitualSession,
  type RitualEvent,
  type InteractionMode,
} from "@/lib/ritual-machine";

// Create session
const session = createSession(ritualConfig);

// Use with useReducer
const [state, dispatch] = useReducer(ritualReducer, session);

// Dispatch events
dispatch({ type: "START_PRESS" });
dispatch({ type: "UPDATE_PROGRESS", progress: 0.5 });
dispatch({ type: "CHARGE_COMPLETE" });
dispatch({ type: "RELEASE" });
dispatch({ type: "ADVANCE_STEP" });

// Detect capabilities
const capabilities = detectCapabilities();
// Returns: { canVibrate, canPlayAudio, prefersReducedMotion, pointerType }
```

---

## Motion Tokens & Variants (Pre-Existing)

### Motion Tokens
**File:** `motion/tokens.ts`

```typescript
import {
  durations,
  easings,
  scale,
  opacity,
  shadows,
  blur,
  z,
  springs,
  stagger,
} from "@/motion/tokens";

// Use in animations
transition={{ duration: durations.ritual, ease: easings.ritual }}
animate={{ scale: scale.hover, opacity: opacity.visible }}
boxShadow={shadows.ritualCharged}
filter={`blur(${blur.backdrop}px)`}
```

### Motion Variants
**File:** `motion/variants.ts`

```typescript
import {
  fadeUp,
  heroReveal,
  staggerContainer,
  staggerRitual,
  ritualCharge,
  ritualRelease,
  completionPulse,
  // ... 20+ more variants
} from "@/motion/variants";

<motion.div variants={fadeUp} initial="hidden" animate="visible" />
<motion.div variants={staggerRitual}>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeUp} />
  ))}
</motion.div>
```

---

## Motion Config Provider (Pre-Existing)

### Ritual Motion Config
**File:** `motion/RitualMotionConfig.tsx`

```typescript
import RitualMotionConfig, { useMotionContext } from "@/motion/RitualMotionConfig";

// Wrap app
<RitualMotionConfig>
  <App />
</RitualMotionConfig>

// Use in components
const context = useMotionContext();
// Returns: { prefersReducedMotion, canVibrate, canPlayAudio }
```

---

## Common Patterns

### Complete Ritual Offering Flow

```typescript
import { useReducer, useCallback } from "react";
import { useKeyboardRitual } from "@/hooks/useKeyboardRitual";
import { createSession, ritualReducer } from "@/lib/ritual-machine";
import { getAudioManager } from "@/lib/audio-manager";
import { getHapticManager } from "@/lib/haptic-manager";
import { templateToConfig } from "@/lib/ritual-templates";
import { createMotionPolicy } from "@/motion/motion-policy";

export function RitualOffering({ template }) {
  const [state, dispatch] = useReducer(
    ritualReducer,
    createSession(templateToConfig(template))
  );

  const audio = getAudioManager();
  const haptic = getHapticManager();
  const policy = createMotionPolicy({
    prefersReducedMotion: false,
    motionProfile: "ritual",
  });

  const handleStartPress = useCallback(async () => {
    dispatch({ type: "START_PRESS" });
    await audio.playSound("hum-start");
    await haptic.playPattern("charge-build");
  }, [audio, haptic]);

  const handleRelease = useCallback(async () => {
    dispatch({ type: "RELEASE" });
    await audio.playSound("shimmer-release");
    await haptic.playPattern("release-burst");
  }, [audio, haptic]);

  const { keyboardHandlers } = useKeyboardRitual({
    onHoldStart: handleStartPress,
    onHoldRelease: handleRelease,
  });

  return (
    <motion.button
      {...keyboardHandlers}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {state.stepStatus === "idle" ? "Press to Offer" : state.stepStatus}
    </motion.button>
  );
}
```

---

## Environment Setup

### Add Motion Provider to Layout
```typescript
// app/layout.tsx
import RitualMotionConfig from "@/motion/RitualMotionConfig";
import RitualErrorBoundary from "@/components/ritual/RitualErrorBoundary";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RitualMotionConfig>
          <RitualErrorBoundary>
            {children}
          </RitualErrorBoundary>
        </RitualMotionConfig>
      </body>
    </html>
  );
}
```

---

## Performance Tips

1. **Audio Manager** — Initializes on first user interaction (prevents autoplay issues)
2. **Haptic Manager** — Gracefully no-ops on unsupported devices (zero overhead)
3. **Keyboard Utilities** — Pure functions (no state, no hooks — use with useKeyboardRitual)
4. **Ritual Templates** — All data, highly tree-shakeable (unused templates don't ship)
5. **JapaCounter** — Lazy-load if not in critical path

---

## Accessibility Checklist

- [ ] Use `useKeyboardRitual` for all ritual interactions
- [ ] Use `announceToScreenReader` for state changes
- [ ] Wrap rituals in `RitualErrorBoundary`
- [ ] Apply motion policy to all animations
- [ ] Set `aria-label` using `KEYBOARD_INSTRUCTIONS`
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Test keyboard-only navigation
- [ ] Test screen reader (announcements)
- [ ] Test on low-end Android device

---

## Useful Links

- Motion Framework: `motion/` directory
- State Machine: `lib/ritual-machine.ts`
- Documentation: `docs/` directory
  - SPRINT_1_COMPLETE.md
  - SPRINT_2_COMPLETE.md
  - IMPLEMENTATION_SUMMARY.md

---

**Ready to integrate into product surfaces (Sprint 3).** ✓
