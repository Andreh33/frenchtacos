"use client";

import { motion } from "framer-motion";

export type PatternAccent = "tacos" | "burgers" | "bowls" | "ensaladas";

type Blob = { color: string; size: string; init: { x: string; y: string }; path: { x: string[]; y: string[]; scale: number[] } };

const PALETTES: Record<PatternAccent, Blob[]> = {
  // Tacos — fire: red + orange
  tacos: [
    {
      color: "rgba(199, 31, 31, 0.55)",
      size: "65vh",
      init: { x: "-20%", y: "-30%" },
      path: { x: ["-20%", "30%", "-10%", "-20%"], y: ["-30%", "20%", "50%", "-30%"], scale: [1, 1.25, 0.9, 1] },
    },
    {
      color: "rgba(229, 97, 26, 0.5)",
      size: "55vh",
      init: { x: "50%", y: "10%" },
      path: { x: ["50%", "10%", "60%", "50%"], y: ["10%", "60%", "-20%", "10%"], scale: [1, 1.4, 0.85, 1] },
    },
    {
      color: "rgba(255, 138, 61, 0.4)",
      size: "45vh",
      init: { x: "20%", y: "60%" },
      path: { x: ["20%", "70%", "-10%", "20%"], y: ["60%", "20%", "70%", "60%"], scale: [1, 0.85, 1.3, 1] },
    },
  ],
  // Burgers — sizzle: orange + amber
  burgers: [
    {
      color: "rgba(229, 97, 26, 0.55)",
      size: "60vh",
      init: { x: "-10%", y: "-20%" },
      path: { x: ["-10%", "40%", "0%", "-10%"], y: ["-20%", "30%", "60%", "-20%"], scale: [1, 1.3, 0.9, 1] },
    },
    {
      color: "rgba(255, 165, 38, 0.5)",
      size: "50vh",
      init: { x: "60%", y: "0%" },
      path: { x: ["60%", "20%", "70%", "60%"], y: ["0%", "50%", "-10%", "0%"], scale: [1, 1.2, 0.95, 1] },
    },
    {
      color: "rgba(255, 214, 10, 0.35)",
      size: "40vh",
      init: { x: "30%", y: "50%" },
      path: { x: ["30%", "70%", "-20%", "30%"], y: ["50%", "10%", "60%", "50%"], scale: [1, 0.9, 1.35, 1] },
    },
  ],
  // Bowls — earthy: olive + warm
  bowls: [
    {
      color: "rgba(120, 158, 75, 0.5)",
      size: "60vh",
      init: { x: "-20%", y: "-10%" },
      path: { x: ["-20%", "30%", "10%", "-20%"], y: ["-10%", "40%", "50%", "-10%"], scale: [1, 1.25, 0.9, 1] },
    },
    {
      color: "rgba(229, 97, 26, 0.4)",
      size: "55vh",
      init: { x: "55%", y: "20%" },
      path: { x: ["55%", "10%", "65%", "55%"], y: ["20%", "60%", "-10%", "20%"], scale: [1, 1.35, 0.85, 1] },
    },
    {
      color: "rgba(54, 90, 45, 0.45)",
      size: "45vh",
      init: { x: "10%", y: "60%" },
      path: { x: ["10%", "60%", "-10%", "10%"], y: ["60%", "20%", "70%", "60%"], scale: [1, 0.9, 1.3, 1] },
    },
  ],
  // Ensaladas — fresh: yellow + orange-glow
  ensaladas: [
    {
      color: "rgba(255, 220, 145, 0.5)",
      size: "60vh",
      init: { x: "-10%", y: "-30%" },
      path: { x: ["-10%", "40%", "-20%", "-10%"], y: ["-30%", "20%", "50%", "-30%"], scale: [1, 1.3, 0.85, 1] },
    },
    {
      color: "rgba(255, 138, 61, 0.45)",
      size: "55vh",
      init: { x: "50%", y: "10%" },
      path: { x: ["50%", "0%", "60%", "50%"], y: ["10%", "50%", "-20%", "10%"], scale: [1, 1.25, 0.9, 1] },
    },
    {
      color: "rgba(255, 214, 10, 0.4)",
      size: "45vh",
      init: { x: "20%", y: "55%" },
      path: { x: ["20%", "70%", "-10%", "20%"], y: ["55%", "10%", "65%", "55%"], scale: [1, 0.85, 1.35, 1] },
    },
  ],
};

export function AnimatedPattern({ accent }: { accent: PatternAccent }) {
  const blobs = PALETTES[accent];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: 0,
            left: 0,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
            filter: "blur(60px)",
            x: b.init.x,
            y: b.init.y,
            willChange: "transform",
            mixBlendMode: "screen",
          }}
          animate={{
            x: b.path.x,
            y: b.path.y,
            scale: b.path.scale,
          }}
          transition={{
            duration: 22 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Subtle film noise on top */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
