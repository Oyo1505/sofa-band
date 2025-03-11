//@ts-nocheck
'use client'
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React, { Dispatch } from 'react'
import { animate, motion } from 'framer-motion'


const AnimatedLetter = ({letter, item}: {letter:string, item:any}) => {  
  return (
    <motion.span className='inline-block' variants={item}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
  )
}

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
  staggerChildren = 0.03,
  inverse = false,
}) => {
  const { t } = useTranslations();
  
  // Animation pour chaque lettre
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
        ease: [0.2, 0.65, 0.3, 0.9], // Courbe d'accélération personnalisée
      },
    }),
  };

  // Détermine le texte à afficher
  const displayText = translationText ? t(translationText) : text || '';

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {displayText.split('').map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className="inline-block"
          style={{ 
            display: letter === ' ' ? 'inline-block' : 'inline-block',
            width: letter === ' ' ? '0.3em' : 'auto'
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedText