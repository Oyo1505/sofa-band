//@ts-nocheck
'use client'
import { cn } from '@/libs/utils';
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

const AnimatedText = (
  { 
    translationTheme, 
    translationText, 
    text, 
    className,
    textColor,
    container,
    item,
    setIsAnimationFinished,
  }
  :{
    translationTheme?: string, 
    translationText?: string, 
    text?: string, 
    container:any,
    textColor?: string,
    item?:any
    className?: string,
    setIsAnimationFinished?: Dispatch<React.SetStateAction<boolean>>,
  }) => {

  const t = useTranslations(translationTheme || '');

  return (
    <motion.div  
      initial="hidden"
      animate="visible"
      variants={container}
      className={cn(className,textColor)}
      aria-hidden
      onAnimationComplete={()=>setIsAnimationFinished && setIsAnimationFinished(true)}
    >
      <>
        {text && item ? text.split("").map((letter, index) => (
          <AnimatedLetter key={index} item={item} letter={letter}  />
        )) : text ? <div>{text}</div> : null}

        {translationText && item ? t(translationText).split("").map((letter, index) => (
          <AnimatedLetter key={index} item={item} letter={letter}  />  
        )) : translationText ? <div>{t(translationText)}</div> : null}
      </>
    </motion.div>
  )
}

export default AnimatedText