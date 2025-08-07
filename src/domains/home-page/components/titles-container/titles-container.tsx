'use client'
import { useTranslations } from 'next-intl';
import { Mulish  } from 'next/font/google';
import { cn } from '@/lib/utils';
import AnimatedWord from '@/domains/ui/components/animated-word/animated-word';

const mulish = Mulish ({ subsets: ['latin'], weight: ['400', '700'] })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  return (
      <div className={cn('flex flex-col gap-2 items-start justify-start ', mulish.className)}>
          <AnimatedWord word='SOFA' delay={0.05} className='text-8xl font-bold' />
          <AnimatedWord word='ROCKERS' delay={0.2} className='text-8xl font-bold' />
          <AnimatedWord word={t('desc')} delay={0.5} duration={0.5} className='text-2xl' onlyOpacity={true} />
      </div>
  )
}

export default TitlesContainer
