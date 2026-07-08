"use client";

import { useEffect } from "react";
import { useReadingProgress } from "./useReadingProgress";

/**
 * ViewTracker — invisible component that records a siddhi view
 * in localStorage when mounted. Place at the top of a siddhi folio.
 */
export default function ViewTracker({ slug }: { slug: string }) {
  const { trackView, isHydrated } = useReadingProgress();

  useEffect(() => {
    if (!isHydrated || !slug) return;
    trackView(slug);
  }, [isHydrated, slug, trackView]);

  return null;
}
