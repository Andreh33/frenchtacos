"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { sound } from "@/lib/sound";

type Ctx = {
  muted: boolean;
  toggle: () => void;
  ready: boolean;
};

const SoundCtx = createContext<Ctx | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true); // default muted
  const [ready, setReady] = useState(false);

  // Read persisted preference on mount
  useEffect(() => {
    const stored = localStorage.getItem("clm_sound_muted");
    if (stored === "false") {
      setMuted(false);
      sound.setMuted(false);
    } else {
      // default muted true on first load to respect user
      sound.setMuted(true);
    }
    setReady(true);
  }, []);

  // First user gesture primes the audio context
  useEffect(() => {
    const prime = () => {
      sound.prime();
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);

  // Global click → play click sound when sound is on
  useEffect(() => {
    if (!ready) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      // play only on prominent interactive elements
      if (
        t.closest(
          "a[data-cursor], button[data-cursor], a.btn-fill, button.btn-fill"
        )
      ) {
        sound.playClick();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [ready]);

  const toggle = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      sound.setMuted(next);
      localStorage.setItem("clm_sound_muted", String(next));
      // if turning on, play a confirmation click
      if (!next) {
        // small delay so audio context is alive
        window.setTimeout(() => sound.playClick(), 30);
      }
      return next;
    });
  }, []);

  return (
    <SoundCtx.Provider value={{ muted, toggle, ready }}>
      {children}
    </SoundCtx.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundCtx);
  if (!ctx) return { muted: true, toggle: () => {}, ready: false } as Ctx;
  return ctx;
}
