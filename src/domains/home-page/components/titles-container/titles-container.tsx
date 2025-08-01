'use client'
import AnimatedText from '@/domains/ui/components/animated-text/animated-text'
import { useLocale, useTranslations } from 'next-intl';
import { Spicy_Rice } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AnimatedWord } from '@/domains/ui/components/animated-word/animated-word';

const spicy = Spicy_Rice({ subsets: ['latin'], weight: '400' })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  const locale = useLocale();
 
  return (
    <div className="overflow-hidden">
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <AnimatedText className={cn("text-6xl md:text-9xl z-3 perspective-1000", spicy.className)} text="Sofa" />
        &nbsp;
        &nbsp;
        &nbsp;
        <AnimatedText
          className={cn("text-6xl md:text-9xl z-3", spicy.className)}
          inverse={true}
          text="Rockers"
        />
      </div>
        <AnimatedWord
          className="text-center text-2xl md:text-3xl"
          text={t('desc')}
          wordToAnimated={locale === 'en' ? 'party' : 'パーティー'}
          cycleWords={locale === 'en' ? ['rock', 'groove', 'music', 'fun'] : ['ロック', 'グルーヴ', 'ミュージック', '楽しい']}
          cycleDuration={1700}
        />
    </div>
  )
}

export default TitlesContainer
