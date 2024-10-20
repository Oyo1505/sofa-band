'use client'
import { motion } from 'framer-motion'
import { tr } from 'framer-motion/client';

export default function Template({ children } : { children: React.ReactNode }) {
  const anim = (variants: any) => {
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants,
    };
  };

  const opacity = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0 },

  };

  return (
      <motion.div {...anim(opacity)}>
        {children}
      </motion.div>
  );
} 