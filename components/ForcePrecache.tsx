"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import {
  PRECACHE_ROUTE_LIST,
  isPrecacheSupported,
  precacheAllRoutes,
  type PrecacheProgress,
} from "@/lib/offline-precache";

type Phase = "idle" | "running" | "done" | "error";

/**
 * Force Precache button (Moonshot 4.3 — True Offline Practice Mode).
 *
 * Lets a practitioner proactively walk the entire top-level route manifest
 * into the service worker's static cache while they still have connectivity —
 * e.g. before leaving for a retreat with no network. Everything written here
 * lands in the same Cache Storage the SW serves from, so the archive keeps
 * working entirely offline afterwards.
 */
// Capability is static for the page lifetime — nothing to subscribe to.
const subscribeNoop = () => () => {};

export default function ForcePrecache() {
  // Cache-Storage support is only knowable on the client. useSyncExternalStore
  // gives the prerendered HTML and the first client render the same `null`
  // snapshot (no hydration mismatch), then reveals the real capability.
  const supported = useSyncExternalStore(
    subscribeNoop,
    () => isPrecacheSupported(),
    () => null,
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState<PrecacheProgress | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (phase === "running") return;
    setPhase("running");
    setSummary(null);
    setProgress({ completed: 0, total: PRECACHE_ROUTE_LIST.length, current: "", failures: [] });

    try {
      const result = await precacheAllRoutes(setProgress);
      setPhase("done");
      const failedNote =
        result.failed.length > 0
          ? ` (${result.failed.length} route${result.failed.length === 1 ? "" : "s"} could not be cached — check connectivity and retry)`
          : "";
      setSummary(
        `Archive prepared for offline practice — ${result.cached} of ${result.total} routes stored in ${result.cacheName}${failedNote}.`,
      );
    } catch (error) {
      setPhase("error");
      setSummary(
        error instanceof Error
          ? `Precache failed: ${error.message}`
          : "Precache failed for an unknown reason. Reconnect and try again.",
      );
    }
  }, [phase]);

  if (supported === null) {
    // Not yet mounted — render nothing so SSR and hydration match.
    return null;
  }

  if (!supported) {
    return (
      <p className="mt-6 text-xs text-[var(--color-bone)]/50">
        Offline precaching is not supported by this browser.
      </p>
    );
  }

  const pct =
    progress && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <div className="mt-10 w-full max-w-md">
      <p className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/50">
        Prepare for retreat
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-bone)]/70">
        While you are still online, walk the archive into your browser&apos;s
        cache so every practice tool stays available without a network.
      </p>

      <button
        type="button"
        onClick={run}
        disabled={phase === "running"}
        className="btn-gold mt-4 text-xs sm:text-sm disabled:cursor-wait disabled:opacity-60"
        aria-live="polite"
      >
        {phase === "running"
          ? `Caching… ${pct}%`
          : phase === "done"
            ? "Re-run Precache"
            : "Force Precache All Routes"}
      </button>

      {phase === "running" && progress && (
        <div className="mt-3" role="status" aria-live="polite">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-bone)]/10">
            <div
              className="h-full rounded-full bg-[var(--color-gold)] transition-[width] duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 truncate text-[0.65rem] text-[var(--color-bone)]/50">
            {progress.completed}/{progress.total} — {progress.current}
          </p>
        </div>
      )}

      {summary && (
        <p
          className={`mt-3 text-xs leading-relaxed ${
            phase === "error" ? "text-red-300/80" : "text-[var(--color-bone)]/70"
          }`}
          role="status"
        >
          {summary}
        </p>
      )}
    </div>
  );
}
