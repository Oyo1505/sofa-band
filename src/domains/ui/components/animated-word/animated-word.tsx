"use client";
import { motion } from "framer-motion";

const AnimatedWord = ({
  word,
  className,
  delay = 0.1,
  duration = 0.3,
  onlyOpacity = false,
}: {
  word: string;
  className?: string;
  delay?: number;
  duration?: number;
  onlyOpacity?: boolean;
}) => {
  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  };

  const onlyOpacityVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={onlyOpacity ? onlyOpacityVariants : variants}
      transition={{
        duration: duration,
        ease: "easeOut",
        delay: delay,
      }}
      className={className}
    >
      {word}
    </motion.div>
  );
};

export default AnimatedWord;
