'use client'
import AnimatedText from '@/domains/ui/components/animated-text/animated-text'
import Text from '@/domains/ui/components/text/text'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

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
      
    },
  };

  const itemAnimationFirstTitle = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const itemAnimationSubtitle = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    }
  };
  return (
    <>
     <AnimatedText className="text-7xl z-3" item={itemAnimationFirstTitle} container={containerFirstTile} setIsAnimationFinished={setIsAnimationFirstTitleFinished} text="Sofa" textColor="text-foreground"/>
     <div style={{ opacity: isAnimationFirstTitleFinished ? 1 : 0,  }} className='min-h-20 mb-6 md:mb-10'>{isAnimationFirstTitleFinished && <AnimatedText className="text-7xl z-3" item={itemAnimationFirstTitle} container={containerFirstTile}  setIsAnimationFinished={setIsAnimationFinished} text="Rockers" textColor="text-foreground"/> }</div>
     <div style={{ opacity: isAnimationFirstTitleFinished ? 1 : 0,  }} className='min-h-28'>{isAnimationFinished && <AnimatedText className="text-2xl md:text-3xl " item={itemAnimationSubtitle}   container={containerSubTitle} text={t('desc')}  /> }</div>
    </>
  )
}

export default TitlesContainer