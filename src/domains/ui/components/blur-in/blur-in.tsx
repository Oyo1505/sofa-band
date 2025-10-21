"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export const BlurIn = ({
  children,
  duration = 0.5,
  blur = 20,
}: {
  children: React.ReactNode;
  duration?: number;
  blur?: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: `blur(${blur}px)`, opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration }}
      className="tracking-tighter"
    >
      {children}
    </motion.div>
  );
};
