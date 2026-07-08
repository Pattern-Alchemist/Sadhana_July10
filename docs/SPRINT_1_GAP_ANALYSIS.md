# Sprint 1 Gap Analysis: Foundation & Reliability

## Existing Assets (To Reuse)

### Motion Framework (Complete)
- `motion/RitualMotionConfig.tsx` - Provider with capability detection, reduced-motion support ✓
- `motion/tokens.ts` - Centralized durations, easings, scales, shadows, blur, z-depth, springs ✓
- `motion/variants.ts` - Pre-built Motion variants for entrance, container, overlay, interaction, ritual effects ✓

### State Machine (Complete)
- `lib/ritual-machine.ts` - Formal state machine with:
  - `StepStatus` enum (idle → pressing → charged → released → completed / cancelled / exited)
  - `RitualSession` type (shared contract for all entry points)
  - `RitualEvent` union type (all possible events)
  - `TRANSITIONS` table (deterministic state graph)
  - `ritualReducer()` (pure function for state updates)
  - `RitualCapabilities` interface (feature detection)
  - `InteractionMode` type ("full" | "reduced" | "tap")
  - `detectCapabilities()` function
  - ✓ FULLY COMPLETE

### Accessibility Foundation
- Motion config respects `prefers-reduced-motion` via MotionConfig ✓
- Reduced motion mode detected and available ✓
- Feature detection for haptics, audio ✓
- InteractionMode enum (including "tap" fallback) ✓

## Gaps Identified

### 1. Motion Policy Layer
**Status:** Partial
- Motion tokens and variants exist ✓
- Need: Utility functions to apply policies based on interaction mode and device capability
- Files needed: `motion/motion-policy.ts`
- Must include:
  - Policy selector based on (reducedMotion, canVibrate, canPlayAudio)
  - Motion profile application (ritual vs analytical screens)
  - Reduced-motion fallbacks for all ritual animations

### 2. Keyboard Complete Ritual Flow
**Status:** Missing
- No keyboard event handlers in ritual components
- No focus management utilities
- No keyboard navigation helpers
- Files needed:
  - `lib/keyboard-a11y.ts` - Keyboard event handlers
  - Keyboard event support in ritual components (press-and-hold → Spacebar / Enter)

### 3. Global Error & Loading States
**Status:** Partial
- App has error boundaries
- Missing: Ritual-specific error states, recovery UI
- Files needed:
  - `components/ritual/RitualErrorBoundary.tsx`
  - `components/ritual/RitualLoadingState.tsx`
  - Error recovery utilities

### 4. Reduced-Motion Audit
**Status:** Partial
- Motion config supports it ✓
- Variants have fallbacks ✓
- Need: Comprehensive audit of all existing components for animation cost
- Reduced-motion mode as dual accessibility + performance mode

### 5. Keyboard Navigation for Shrine/Ritual
**Status:** Missing
- Spacebar / Enter to start hold
- Escape to cancel
- Tab focus management
- Files needed: Integration into ritual UI components

## Summary

**Reusable:** 90% foundation already exists (motion framework, state machine, basic accessibility)
**To Build:** Focused utilities for motion policies, keyboard a11y, error handling, and integrated testing

## Next Steps
1. Build motion-policy layer
2. Add keyboard a11y utilities
3. Create ritual-specific error boundaries
4. Integrate into existing components
5. Test reduced-motion mode end-to-end
