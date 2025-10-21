"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export const GlitchText = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-red-500 mix-blend-screen"
        initial={{ clipPath: "inset(0 0 0 0)", x: 0 }}
        animate={
          isInView
            ? {
                clipPath: [
                  "inset(0 0 0 0)",
                  "inset(20% 0 30% 0)",
                  "inset(0 0 0 0)",
                ],
                x: [-2, 2, -2, 0],
              }
            : {}
        }
        transition={{ duration: 0.6, times: [0, 0.3, 0.6, 1] }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 text-cyan-500 mix-blend-screen"
        initial={{ clipPath: "inset(0 0 0 0)", x: 0 }}
        animate={
          isInView
            ? {
                clipPath: [
                  "inset(0 0 0 0)",
                  "inset(40% 0 20% 0)",
                  "inset(0 0 0 0)",
                ],
                x: [2, -2, 2, 0],
              }
            : {}
        }
        transition={{ duration: 0.6, times: [0, 0.3, 0.6, 1], delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
