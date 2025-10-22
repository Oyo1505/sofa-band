"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export interface GlitchTextProps {
  children: React.ReactNode;
  className?: string;
  repeat?: number;
  repeatDelay?: number;
}

export const GlitchText = ({
  children,
  className = "",
  repeat = Infinity,
  repeatDelay = 5,
}: GlitchTextProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const GLITCH_PRESETS: {
    subtle: {
      red: { clipPath: string[]; x: number[] };
      cyan: { clipPath: string[]; x: number[] };
    };
  } = {
    subtle: {
      red: {
        clipPath: [
          "inset(0 0 0 0)",
          "inset(10% 0 15% 0)",
          "inset(10% 0 40% 0)",
        ],
        x: [-2, 2, -2, 0],
      },
      cyan: {
        clipPath: [
          "inset(30% 0 20% 0)",
          "inset(30% 0 20% 0)",
          "inset(0 0 0 0)",
        ],
        x: [4, -4, 4, 0],
      },
    },
  };
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        aria-label="animation-glitch-text"
        className={`relative ${className}`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      aria-label="animation-glitch-text"
      className={`relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-red-500 mix-blend-screen"
        style={{ willChange: "clip-path, transform" }}
        initial={{ clipPath: "inset(0 0 0 0)", x: 0 }}
        animate={
          isInView && !prefersReducedMotion ? GLITCH_PRESETS.subtle?.red : {}
        }
        transition={{
          duration: 0.3,
          times: [0, 0.3, 0.6, 1],
          delay: 0.1,
          repeat,
          repeatDelay,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-cyan-500 mix-blend-screen"
        style={{ willChange: "clip-path, transform" }}
        initial={{ clipPath: "inset(0 0 0 0)", x: 0 }}
        animate={
          isInView && !prefersReducedMotion ? GLITCH_PRESETS.subtle?.cyan : {}
        }
        transition={{
          duration: 0.4,
          times: [0, 0.3, 0.6, 1],
          delay: 0.1,
          repeat,
          repeatDelay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
