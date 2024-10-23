'use client'
import { motion } from 'framer-motion'

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
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, transition: { duration: 0.5 }, filter: 'blur(0px)'},
    exit: { opacity: 0, filter: 'blur(0px)' },

  };

  return (
      <motion.div {...anim(opacity)}>
        {children}
      </motion.div>
  );
} 