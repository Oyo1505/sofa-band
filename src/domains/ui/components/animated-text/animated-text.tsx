//@ts-nocheck
'use client'
import { useTranslations } from 'next-intl';
import React, { Dispatch } from 'react'
import { animate, motion } from 'framer-motion'



interface AnimatedTextProps {
  text?: string;
  translationText?: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  inverse?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  translationText,
  className = '',
  delay = 0,
  staggerChildren = 0.04,
  inverse = false,
}) => {
  const { t } = useTranslations();

  const letterVariants = {
    initial: {
      y: 40,
      opacity: 0
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * staggerChildren,
        duration: 0.7,
        ease: 'backInOut',
      },
    }),
  };

  const displayText = translationText ? t(translationText) : text || '';
  const displayTextArray = displayText.split('');

  return (
    <div>
    <span className={`inline-block overflow-hidden ${className}`}>
      {!inverse && displayTextArray.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className="inline-block"
          style={{
            display: letter === ' ' ? 'inline-block' : 'inline-block',
     
          }}
        >
          {letter}
        </motion.span>
      ))}
      {inverse &&
        displayTextArray.map((letter, index) => (
          <motion.span
            key={index}
            custom={displayTextArray.length - index}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            className="inline-block"
            style={{
              display: letter === ' ' ? 'inline-block' : 'inline-block',
       
            }}
          >
            {letter}
          </motion.span>
        ))
      }
    </span>
    </div>
  );
};

export default AnimatedText
