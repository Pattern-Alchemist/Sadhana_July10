"use client";

import { motion, useReducedMotion } from "motion/react";
import type { OfferingKind } from "@/lib/ritual-machine";
import { durations, easings, opacity as op } from "@/motion/tokens";

/**
 * RitualSymbol — inline SVG + Motion animations for each offering type.
 *
 * Per the motion system spec:
 *   - Build symbolic ritual states with inline SVG + Motion + CSS
 *   - Do not use Rive
 *   - Style must be devotional and restrained
 *   - Completion should feel ceremonial, not game-like
 *
 * Each offering kind has its own SVG animation:
 *   fire:     flame grows during hold, spark wave on release
 *   water:    bowl fills during hold, ripple on release
 *   flower:   petals bloom during hold, float on release
 *   incense:  ember glows during hold, smoke trail on release
 *   mantra:   pulse ring + halo during hold
 *   bell:     rapid vibration ring on tap
 */

interface RitualSymbolProps {
  kind: OfferingKind;
  progress: number; // 0-1 during hold
  status: string; // StepStatus
  icon: string; // emoji fallback
}

export default function RitualSymbol({ kind, progress, status, icon }: RitualSymbolProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCharged = status === "charged" || status === "released" || status === "completed";
  const isReleased = status === "released" || status === "completed";

  if (prefersReducedMotion) {
    // Reduced motion: static icon, no SVG animation
    return (
      <span
        className="text-4xl"
        style={{
          filter: isCharged ? "brightness(1.3)" : "brightness(0.7)",
          opacity: status === "completed" ? op.subtle : op.visible,
        }}
        aria-hidden="true"
      >
        {icon}
      </span>
    );
  }

  switch (kind) {
    case "fire":
      return <FireSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    case "water":
      return <WaterSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    case "flower":
      return <FlowerSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    case "incense":
      return <IncenseSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    case "mantra":
      return <MantraSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    case "bell":
      return <BellSymbol progress={progress} isCharged={isCharged} isReleased={isReleased} icon={icon} />;
    default:
      return <span className="text-4xl" aria-hidden="true">{icon}</span>;
  }
}

// ---------- Fire (diya / arati) ----------

function FireSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.8 + progress * 0.3,
          filter: `brightness(${0.5 + progress * 0.8}) drop-shadow(0 0 ${progress * 16}px rgba(230, 192, 137, 0.8))`,
        }}
        transition={{ duration: durations.instant }}
        style={{ scale: isCharged ? 1.15 : undefined }}
      >
        {icon}
      </motion.span>
      {isReleased && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{ borderColor: "rgba(230, 192, 137, 0.6)", width: 64, height: 64 }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: durations.ritual, ease: easings.ritual as any }}
        />
      )}
    </div>
  );
}

// ---------- Water (kalash / ripple) ----------

function WaterSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.8 + progress * 0.25,
          filter: `brightness(${0.5 + progress * 0.7}) drop-shadow(0 0 ${progress * 12}px rgba(111, 199, 189, 0.8))`,
        }}
        transition={{ duration: durations.instant }}
        style={{ scale: isCharged ? 1.15 : undefined }}
      >
        {icon}
      </motion.span>
      {progress > 0.1 && (
        <motion.div
          className="absolute rounded-full border"
          style={{
            borderColor: `rgba(111, 199, 189, ${progress * 0.5})`,
            width: 40 + progress * 40,
            height: 40 + progress * 40,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      {isReleased && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{ borderColor: "rgba(111, 199, 189, 0.6)", width: 64, height: 64 }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: durations.ritual, ease: easings.ritual as any }}
        />
      )}
    </div>
  );
}

// ---------- Flower (lotus bloom) ----------

function FlowerSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.7 + progress * 0.4,
          rotate: progress * 15,
          filter: `brightness(${0.5 + progress * 0.7}) drop-shadow(0 0 ${progress * 14}px rgba(217, 154, 138, 0.8))`,
        }}
        transition={{ duration: durations.instant }}
        style={{ scale: isCharged ? 1.2 : undefined, rotate: isCharged ? 15 : undefined }}
      >
        {icon}
      </motion.span>
      {isReleased && (
        <motion.div
          className="absolute"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 2, opacity: [0, 1, 0], y: -40, rotate: 45 }}
          transition={{ duration: durations.ceremonial, ease: easings.ritual as any }}
        >
          <span className="text-2xl">🌸</span>
        </motion.div>
      )}
    </div>
  );
}

// ---------- Incense (ember / smoke) ----------

function IncenseSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.8 + progress * 0.25,
          filter: `brightness(${0.5 + progress * 0.8}) drop-shadow(0 0 ${progress * 14}px rgba(169, 138, 214, 0.8))`,
        }}
        transition={{ duration: durations.instant }}
        style={{ scale: isCharged ? 1.15 : undefined }}
      >
        {icon}
      </motion.span>
      {isReleased && (
        <>
          <motion.div
            className="absolute rounded-full border-2"
            style={{ borderColor: "rgba(169, 138, 214, 0.5)", width: 64, height: 64 }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: durations.ritual, ease: easings.ritual as any }}
          />
          <motion.div
            className="absolute text-2xl"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -60, opacity: [0, 0.5, 0], scale: 1.5 }}
            transition={{ duration: durations.ceremonial, ease: "easeOut" }}
          >
            💨
          </motion.div>
        </>
      )}
    </div>
  );
}

// ---------- Mantra (pulse / halo) ----------

function MantraSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.8 + progress * 0.3,
          filter: `brightness(${0.5 + progress * 0.8}) drop-shadow(0 0 ${progress * 18}px rgba(201, 152, 94, 0.9))`,
        }}
        transition={{ duration: durations.instant }}
        style={{ scale: isCharged ? 1.2 : undefined }}
      >
        {icon}
      </motion.span>
      {progress > 0.2 && (
        <motion.div
          className="absolute rounded-full border"
          style={{
            borderColor: `rgba(201, 152, 94, ${progress * 0.4})`,
            width: 50 + progress * 50,
            height: 50 + progress * 50,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        />
      )}
      {isReleased && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{ borderColor: "rgba(201, 152, 94, 0.7)", width: 80, height: 80 }}
          initial={{ scale: 0.3, opacity: 0.9 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: durations.ceremonial, ease: easings.ritual as any }}
        />
      )}
    </div>
  );
}

// ---------- Bell (vibration) ----------

function BellSymbol({ progress, isCharged, isReleased, icon }: { progress: number; isCharged: boolean; isReleased: boolean; icon: string }) {
  return (
    <div className="relative grid place-items-center" aria-hidden="true">
      <motion.span
        className="text-4xl"
        animate={{
          scale: 0.9 + progress * 0.15,
          rotate: progress > 0 ? [0, -5, 5, -3, 3, 0] : 0,
          filter: `brightness(${0.6 + progress * 0.6}) drop-shadow(0 0 ${progress * 12}px rgba(143, 169, 126, 0.8))`,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ scale: isCharged ? 1.1 : undefined }}
      >
        {icon}
      </motion.span>
      {isReleased && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{ borderColor: "rgba(143, 169, 126, 0.6)", width: 56, height: 56 }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: [0.5, 1.3, 1.1, 1.25, 1.4], opacity: [0.8, 0.5, 0.7, 0.3, 0] }}
          transition={{ duration: durations.ritual, ease: "easeOut" }}
        />
      )}
    </div>
  );
}
