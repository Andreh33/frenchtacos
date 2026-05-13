"use client";

import { useEffect } from "react";

/** Registers /sw.js and forces the latest version. */
export function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          // Listen for an updated SW waiting and force it to activate
          if (reg.waiting) {
            reg.waiting.postMessage({ type: "SKIP_WAITING" });
          }
          reg.addEventListener("updatefound", () => {
            const newSW = reg.installing;
            if (!newSW) return;
            newSW.addEventListener("statechange", () => {
              if (
                newSW.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // A new SW is ready — reload to use fresh code
                window.location.reload();
              }
            });
          });
          // Periodic check (every 10 min) for updates
          window.setInterval(() => reg.update().catch(() => {}), 600_000);
        })
        .catch(() => {
          /* silent */
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);
  return null;
}
