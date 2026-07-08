"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * useReadingProgress — tracks which siddhis the visitor has viewed,
 * persisted in localStorage. No auth, no server round-trip.
 *
 * Returns:
 *   viewed: string[] — slugs of siddhis viewed (most recent first)
 *   trackView: (slug: string) => void — call when a siddhi folio is visited
 *   clearProgress: () => void — wipe history (for a "reset" button)
 *   isHydrated: boolean — false on server, true after mount (avoids SSR mismatch)
 */

const STORAGE_KEY = "astrokalki:reading-progress";
const MAX_TRACKED = 50;

interface ReadingProgressState {
  viewed: string[];  // slugs, most recent first
  timestamps: Record<string, number>;  // slug → last-viewed epoch ms
}

const EMPTY: ReadingProgressState = { viewed: [], timestamps: {} };

function load(): ReadingProgressState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.viewed)) return EMPTY;
    return {
      viewed: parsed.viewed.slice(0, MAX_TRACKED),
      timestamps: parsed.timestamps ?? {},
    };
  } catch {
    return EMPTY;
  }
}

function save(state: ReadingProgressState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be full or disabled — fail silently
  }
}

export function useReadingProgress() {
  const [state, setState] = useState<ReadingProgressState>(EMPTY);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setIsHydrated(true);
  }, []);

  const trackView = useCallback((slug: string) => {
    if (!slug) return;
    setState((prev) => {
      // Remove if already present, then prepend
      const viewed = [slug, ...prev.viewed.filter((s) => s !== slug)].slice(0, MAX_TRACKED);
      const timestamps = { ...prev.timestamps, [slug]: Date.now() };
      const next = { viewed, timestamps };
      save(next);
      return next;
    });
  }, []);

  const clearProgress = useCallback(() => {
    setState(EMPTY);
    save(EMPTY);
  }, []);

  return {
    viewed: state.viewed,
    timestamps: state.timestamps,
    trackView,
    clearProgress,
    isHydrated,
  };
}
