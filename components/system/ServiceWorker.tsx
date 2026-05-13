"use client";

import { useEffect } from "react";

/** TEMPORARILY DISABLED — was caching stale JS. PWA install still works via manifest.
 *  Actively unregisters any previous SW so users get fresh code. */
export function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    // Unregister any previously registered SW so the user gets fresh code
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister().catch(() => {}));
    });

    // Clear all caches as well
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.forEach((k) => caches.delete(k));
      });
    }
  }, []);
  return null;
}
