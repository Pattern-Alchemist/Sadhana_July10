"use client";

import { useEffect } from "react";

/**
 * ServiceWorkerRegister — registers /sw.js on mount.
 *
 * The service worker enables offline reading of the siddhi corpus.
 * It only registers in production (not in dev, where it would interfere
 * with HMR).
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[sw] registered with scope:", reg.scope);
        })
        .catch((err) => {
          console.warn("[sw] registration failed:", err);
        });
    };

    // Register after window load to avoid competing with first-paint resources
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
