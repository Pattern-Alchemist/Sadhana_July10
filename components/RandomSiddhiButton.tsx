"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { selectCosmicallyAlignedSiddhi, getCurrentCosmicConditions } from "@/lib/cosmic-alignment";

interface SiddhiData {
  slug: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bestTithi?: number[];
  dosha?: string[];
  season?: string;
}

/**
 * RandomSiddhiButton — 🎲 button that uses cosmic alignment to select a Siddhi.
 *
 * Instead of pure randomness, this button:
 * - Calculates current lunar phase, dosha, and season
 * - Weights siddhi selection based on cosmic alignment
 * - Shows alignment percentage and reason
 * - Navigates to selected siddhi with cosmic context
 *
 * Placed in the SiteNav next to the search/lens toggles.
 */
export default function RandomSiddhiButton({ 
  siddhis,
  slugs 
}: { 
  siddhis?: SiddhiData[];
  slugs: string[] 
}) {
  const router = useRouter();
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [showAlignment, setShowAlignment] = useState(false);
  const [alignment, setAlignment] = useState<{ percentage: number; reason: string } | null>(null);

  function pick() {
    if (slugs.length === 0) return;

    let next: string;
    let selectedAlignment = { percentage: 0, reason: "" };

    if (siddhis && siddhis.length > 0) {
      // Use cosmic alignment algorithm
      try {
        const cosmicScore = selectCosmicallyAlignedSiddhi(siddhis, {
          completedSiddhis: [],
          recentlyRecommended: lastSlug ? [lastSlug] : [],
          difficulty: 'beginner',
        });
        next = cosmicScore.slug;
        selectedAlignment = {
          percentage: cosmicScore.percentage,
          reason: cosmicScore.reason,
        };
      } catch (error) {
        // Fallback to random if cosmic calculation fails
        next = slugs[Math.floor(Math.random() * slugs.length)];
        selectedAlignment = {
          percentage: 42,
          reason: "Cosmic paths converge",
        };
      }
    } else {
      // Fallback to simple random
      next = slugs[Math.floor(Math.random() * slugs.length)];
      selectedAlignment = {
        percentage: Math.floor(Math.random() * 30) + 70,
        reason: "The universe guides your path",
      };
    }

    // Avoid repeating the last one (if we have at least 2)
    if (slugs.length > 1 && next === lastSlug) {
      let attempts = 0;
      while (next === lastSlug && attempts < 10) {
        const randomIdx = Math.floor(Math.random() * slugs.length);
        next = slugs[randomIdx];
        attempts++;
      }
    }

    setLastSlug(next);
    setAlignment(selectedAlignment);
    setShowAlignment(true);
    setSpinning(true);

    // Show alignment for 2 seconds, then navigate
    setTimeout(() => {
      setShowAlignment(false);
      router.push(`/siddhi/${next}`);
    }, 2500);
  }

  const conditions = getCurrentCosmicConditions();

  return (
    <div className="relative">
      <button
        onClick={pick}
        disabled={spinning || slugs.length === 0}
        title="Let the cosmos guide you"
        aria-label="Cosmic alignment dice"
        className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--hairline)] text-[var(--color-gold-bright)] transition motion-safe motion-reduce:transition-none hover:border-[var(--color-gold)]/60 disabled:opacity-50"
      >
        <span
          className={`text-base transition motion-safe ${spinning ? "rotate-[360deg]" : ""}`}
          style={{ transitionDuration: spinning ? "1200ms" : "var(--dur-instant)" }}
        >
          🎲
        </span>
      </button>

      {/* Cosmic Alignment Tooltip */}
      {showAlignment && alignment && (
        <div className="absolute bottom-full right-0 mb-2 rounded-lg border border-[var(--color-gold)]/40 bg-[var(--color-ink)]/95 backdrop-blur-sm p-3 whitespace-nowrap shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="text-xs uppercase tracking-wider text-[var(--color-gold)]/90 mb-1">
            Cosmic Alignment
          </div>
          <div className="text-sm font-semibold text-[var(--color-gold-bright)] mb-2">
            {alignment.percentage}%
          </div>
          <div className="text-xs text-[var(--color-bone)]/80 max-w-xs leading-tight">
            {alignment.reason}
          </div>
          <div className="text-[0.65rem] text-[var(--color-bone)]/50 mt-2 pt-2 border-t border-[var(--color-gold)]/20">
            Tithi #{conditions.tithi} • {conditions.dosha.toUpperCase()} • {conditions.season}
          </div>
        </div>
      )}
    </div>
  );
}
