'use client'
import AnimatedText from '@/domains/ui/components/animated-text/animated-text'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { Spicy_Rice } from 'next/font/google'
import { cn } from '@/lib/utils'
const spicy = Spicy_Rice({ subsets: ['latin'], weight: '400' })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isAnimationFirstTitleFinished, setIsAnimationFirstTitleFinished] = useState(false);

  const containerFirstTile = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1, 
      transition: {
        staggerChildren: 0.1,
      },
    },
  };


  const containerSubTitle = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1, 
      transition: {
        duration: 1,
      },
    },
  };

  const itemAnimationFirstTitle = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  const itemAnimationSubTitle = {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
      },
    }
  };

  return (
    <>
     <AnimatedText className={cn("text-8xl z-3", spicy.className)} item={itemAnimationFirstTitle} container={containerFirstTile} setIsAnimationFinished={setIsAnimationFirstTitleFinished} text="Sofa" textColor="text-foreground"/>
     <div style={{ opacity: isAnimationFirstTitleFinished ? 1 : 0,  }} className='min-h-20 mb-6 md:mb-10'>{isAnimationFirstTitleFinished && <AnimatedText className={cn("text-8xl z-3", spicy.className)} item={itemAnimationFirstTitle} container={containerFirstTile}  setIsAnimationFinished={setIsAnimationFinished} text="Rockers" textColor="text-foreground"/> }</div>
     <div style={{ opacity: isAnimationFinished ? 1 : 0,  }} className='font-shippori min-h-28'>{isAnimationFinished && <AnimatedText className="text-2xl md:text-3xl" item={itemAnimationSubTitle}  container={containerSubTitle} text={t('desc')}  /> }</div>
    </>
  )
}

export default TitlesContainer