'use client'
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import AnimatedWord from '@/domains/ui/components/animated-word/animated-word';

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  return (
      <div className="flex flex-col gap-2 items-start justify-start font-mulish">
          <AnimatedWord word='SOFA' delay={0.05} className='md:text-8xl text-6xl font-bold' />
          <AnimatedWord word='ROCKERS' delay={0.2} className='md:text-8xl text-6xl font-bold' />
          <AnimatedWord word={t('desc')} delay={0.5} duration={0.5} className='text-2xl' onlyOpacity={true} />
      </div>
  )
}

export default TitlesContainer
