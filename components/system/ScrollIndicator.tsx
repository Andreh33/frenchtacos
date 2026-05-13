"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[60] h-screen w-[2px]"
    >
      <motion.div
        className="origin-top bg-[var(--yellow)]"
        style={{
          height: "100%",
          scaleY: scrollYProgress,
        }}
      />
    </div>
  );
}
