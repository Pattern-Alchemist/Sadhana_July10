"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { fadeIn, overlayBackdrop, modalEnter, sheetSlideUp } from "@/motion/variants";
import { durations, easings, z } from "@/motion/tokens";

/**
 * Layout motion components for the Ritual Motion System.
 *
 * These provide:
 *   - RouteTransition: page enter/exit via AnimatePresence (keyed on pathname)
 *   - OverlayBackdrop: dimmed background for modals/drawers
 *   * ModalEnter: modal content entrance (scale + opacity + translateY)
 *   - SheetSlideUp: bottom sheet entrance
 *   - SectionReveal: scroll-triggered section entrance (clip-path)
 *   - AnimatedDivider: gold line that grows from center
 */

// ---------- RouteTransition ----------

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: durations.fast, ease: easings.standard as any }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ---------- OverlayBackdrop ----------

export function OverlayBackdrop({ visible, onClick }: { visible: boolean; onClick?: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0"
          style={{
            zIndex: z.overlay,
            backgroundColor: "rgba(10, 9, 8, 0.7)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          variants={overlayBackdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClick}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}

// ---------- ModalEnter ----------

export function ModalEnter({ visible, children, onClose }: { visible: boolean; children: ReactNode; onClose?: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <>
          <OverlayBackdrop visible={visible} onClick={onClose} />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              variants={prefersReducedMotion ? fadeIn : modalEnter}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-md rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)] p-6 shadow-2xl"
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------- SheetSlideUp ----------

export function SheetSlideUp({ visible, children, onClose }: { visible: boolean; children: ReactNode; onClose?: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <>
          <OverlayBackdrop visible={visible} onClick={onClose} />
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[101] rounded-t-lg border-t border-[var(--color-gold)]/30 bg-[var(--color-ink)] p-6 pb-8 shadow-2xl"
            role="dialog"
            aria-modal="true"
            variants={prefersReducedMotion ? fadeIn : sheetSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------- SectionReveal ----------

export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, clipPath: "inset(20% 0 20% 0)", filter: "blur(6px) brightness(0.6)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", filter: "blur(0px) brightness(1)" }}
      viewport={{ once: true, margin: "-60px 0px" }}
      transition={{ duration: durations.emphasis, ease: easings.standard as any }}
    >
      {children}
    </motion.div>
  );
}

// ---------- AnimatedDivider ----------

export function AnimatedDivider({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={`h-px w-24 ${className}`}
        style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }}
      />
    );
  }

  return (
    <motion.div
      className={`h-px w-24 ${className}`}
      style={{ background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: durations.ceremonial, ease: easings.ritual as any }}
    />
  );
}
