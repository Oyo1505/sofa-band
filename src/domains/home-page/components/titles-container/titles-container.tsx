'use client'
import AnimatedText from '@/domains/ui/components/animated-text/animated-text'
import { useLocale, useTranslations } from 'next-intl';
import { Spicy_Rice } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AnimatedWord } from '@/domains/ui/components/animated-word/animated-word';
import { motion } from 'framer-motion';

const spicy = Spicy_Rice({ subsets: ['latin'], weight: '400' })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  const  locale  = useLocale();
  const containerSubTitle = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'anticipate',
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <div className='flex items-center justify-center'>
      <AnimatedText className={cn("text-8xl z-3 perspective-1000", spicy.className)} text="Sofa" /> 
      &nbsp;
      &nbsp;
      &nbsp;
      <AnimatedText 
        className={cn("text-8xl z-3", spicy.className)} 
        inverse={true}
        text="Rockers" 
      />
      </div>
      <motion.div  variants={containerSubTitle} initial="hidden" animate="visible">
      <AnimatedWord
        className="text-2xl md:text-3xl" 
        text={t('desc')}  
        wordToAnimated={locale === 'en' ? 'party' : 'パーティー'}
        cycleWords={locale === 'en' ? ['rock', 'groove', 'music', 'fun'] : ['ロック', 'グルーヴ', 'ミュージック', '楽しい']}
        cycleDuration={1700}
      />
      </motion.div>
    </div>
  )
}

export default TitlesContainer