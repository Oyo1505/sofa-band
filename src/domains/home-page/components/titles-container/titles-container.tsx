'use client'
import AnimatedText from '@/domains/ui/components/animated-text/animated-text'
import Text from '@/domains/ui/components/text/text'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  
  const containerTile = {
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

  const itemAnimationTitle = {
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
     <AnimatedText className="text-8xl z-3" item={itemAnimationTitle} container={containerTile} setIsAnimationFinished={setIsAnimationFinished} text="Sofa Rockers" textColor="text-white"/>
     <AnimatedText className="md:text-3xl mt-10 h-20" item={itemAnimationSubtitle}  isAnimated={isAnimationFinished} container={containerSubTitle} text={t('desc')}  />
    </>
  )
}

export default TitlesContainer