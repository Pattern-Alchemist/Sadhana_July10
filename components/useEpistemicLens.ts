"use client";

import { useCallback, useEffect, useState } from "react";

export type Lens = "scholar" | "practitioner";

const STORAGE_KEY = "astrokalki-lens";

/** Reads the persisted lens without SSR mismatch (defaults to scholar). */
export function readLens(): Lens {
  if (typeof window === "undefined") return "scholar";
  return (localStorage.getItem(STORAGE_KEY) as Lens) || "scholar";
}

/**
 * Dual Epistemological Lens. Scholar foregrounds evidence & etymology;
 * Practitioner foregrounds mantra, procedure & the experiential.
 */
export function useEpistemicLens() {
  const [lens, setLens] = useState<Lens>("scholar");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLens(readLens());
    setMounted(true);
    const handler = () => setLens(readLens());
    window.addEventListener("astrokalki:lens-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("astrokalki:lens-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Lens = readLens() === "scholar" ? "practitioner" : "scholar";
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event("astrokalki:lens-change"));
    document.documentElement.dataset.lens = next;
    setLens(next);
  }, []);

  return { lens, toggle, mounted };
}
