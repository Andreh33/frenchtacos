"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PresentationControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { TakoModel } from "./TakoModel";

function Fallback() {
  return (
    <div
      aria-hidden
      className="h-full w-full animate-pulse rounded-3xl bg-gradient-to-br from-[var(--uft-purple)]/40 via-[var(--uft-purple-deep)] to-[var(--uft-purple)]/30"
    />
  );
}

export function TakoCanvas() {
  const [enabled, setEnabled] = useState(true);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const small = window.matchMedia("(max-width: 380px)").matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection;
    const saveData = conn?.saveData === true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (small || saveData || reduce) setEnabled(false);

    const t = setTimeout(() => setHint(false), 4200);
    return () => clearTimeout(t);
  }, []);

  if (!enabled) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--uft-purple)]/30 to-[var(--uft-purple-deep)]">
        <div
          className="absolute inset-0 grid place-items-center font-display text-7xl font-extrabold text-[var(--uft-yellow)]/90"
          aria-hidden
        >
          🌮
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-square w-full select-none"
      data-cursor="ARRASTRA"
    >
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0.6, 4.5], fov: 38 }}
          dpr={[1, 2]}
          shadows
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: 4 /* THREE.ACESFilmicToneMapping */,
            toneMappingExposure: 1.1,
          }}
        >
          <color attach="background" args={["#2A0F3D"]} />
          <fog attach="fog" args={["#2A0F3D", 6, 14]} />

          <ambientLight intensity={0.35} />
          <directionalLight
            position={[4, 5, 3]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-3, 2, -2]} intensity={1.5} color="#A855F7" />
          <pointLight position={[3, -1, 2]} intensity={0.8} color="#FFD60A" />

          <PresentationControls
            global
            polar={[-Math.PI / 5, Math.PI / 5]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            snap
          >
            <Float
              speed={1.4}
              rotationIntensity={0.35}
              floatIntensity={0.55}
              floatingRange={[-0.05, 0.08]}
            >
              <TakoModel />
            </Float>
          </PresentationControls>

          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.55}
            scale={6}
            blur={2.6}
            far={2}
            color="#000"
          />

          <Environment preset="city" />
        </Canvas>
      </Suspense>

      {/* Drag hint */}
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase transition-opacity duration-700 ${
          hint ? "opacity-90" : "opacity-0"
        }`}
      >
        ↻ Arrástrame
      </div>
    </div>
  );
}
