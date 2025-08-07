"use client"
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface AnimatedWordProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  inverse?: boolean;
  wordToAnimated?: string;
  cycleWords?: string[];
  cycleDuration?: number;
}

const colors = ['bg-red-400', 'bg-cyan-400', 'bg-amber-400', 'bg-purple-400']
export const AnimatedWordCycle = ({
  text,
  className = '',
  inverse = false,
  wordToAnimated,
  cycleWords,
  cycleDuration = 3000
}: AnimatedWordProps) => {
  const words = text.split(' ');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % (cycleWords?.length || 0));

      }, 500); 
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [cycleWords?.length, cycleDuration]);

  const wordVariants = {
    initial: {
      y: inverse ? -20 : 20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,

      }
    },
    exit: {
      y: inverse ? 20 : -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }}
      transition={{ duration: 2 }}
      style={{ overflow: 'hidden' }}
      className={className}
    >
      {words.map((word, index) => (
        word === wordToAnimated ? (
          <span key={index} style={{ display: 'inline-block', minWidth: 'auto', position: 'relative', height: '1.3em' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                variants={wordVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`${colors[currentWordIndex]} px-2 pb-2`}
                style={{
                  display: 'inline-block',
                  position: 'absolute',
                  left: 0,
                  width: 'auto'
                }}
              >
                {cycleWords?.[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
            <span style={{ visibility: 'hidden' }}>
              {/* Espace réservé basé sur le mot le plus long du cycle */}
              {cycleWords?.reduce((a, b) => a.length > b.length ? a : b, '')}
            </span>
          </span>
        ) : (
          <span key={index} style={{ display: 'inline-block', marginRight: '0.2em' }}>
            {word}
          </span>
        )
      ))}
    </motion.div>
  );
};
