"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * RandomSiddhiButton — 🎲 button that jumps to a random siddhi folio.
 *
 * Receives the full list of siddhi slugs as a prop (server-fetched), picks
 * one at random on click, and navigates. Avoids repeating the last-shown
 * siddhi if possible (tracks lastSlug in component state).
 *
 * Placed in the SiteNav next to the search/lens toggles.
 */
export default function RandomSiddhiButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function pick() {
    if (slugs.length === 0) return;
    let next = slugs[Math.floor(Math.random() * slugs.length)];
    // Avoid repeating the last one (if we have at least 2)
    if (slugs.length > 1) {
      let attempts = 0;
      while (next === lastSlug && attempts < 10) {
        next = slugs[Math.floor(Math.random() * slugs.length)];
        attempts++;
      }
    }
    setLastSlug(next);
    setSpinning(true);
    // Brief spin animation, then navigate
    setTimeout(() => {
      router.push(`/siddhi/${next}`);
    }, 350);
  }

  return (
    <button
      onClick={pick}
      disabled={spinning || slugs.length === 0}
      title="Discover a random folio"
      aria-label="Random siddhi"
      className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--hairline)] text-[var(--color-gold-bright)] transition motion-safe motion-reduce:transition-none hover:border-[var(--color-gold)]/60 disabled:opacity-50"
    >
      <span
        className={`text-base transition motion-safe ${spinning ? "rotate-[360deg]" : ""}`}
        style={{ transitionDuration: spinning ? "350ms" : "var(--dur-instant)" }}
      >
        🎲
      </span>
    </button>
  );
}
