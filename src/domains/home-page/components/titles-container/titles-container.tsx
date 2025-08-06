'use client'
import { useTranslations } from 'next-intl';
import { Mulish  } from 'next/font/google';
import { cn } from '@/lib/utils';

const mulish = Mulish ({ subsets: ['latin'], weight: ['400', '700'] })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  return (
      <div className={cn('flex flex-col spicy gap-4 items-start justify-start', mulish.className)}>
        <div className='text-8xl font-bold'>SOFA</div>
        <div className='text-8xl font-bold'>ROCKERS</div>
        <div className='text-2xl'>{t('desc')}</div>
      </div>
  )
}

export default TitlesContainer
