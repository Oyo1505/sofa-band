'use client'
import { useTranslations } from 'next-intl';
import { Spicy_Rice } from 'next/font/google';
import { cn } from '@/lib/utils';

const spicy = Spicy_Rice({ subsets: ['latin'], weight: '400' })

const TitlesContainer = () => {
  const t = useTranslations('HomePage');
  return (
      <div className={cn('flex flex-col spicy gap-4 items-start justify-start', spicy.className)}>
        <div className='text-8xl'>SOFA</div>
        <div className='text-8xl'>ROCKERS</div>
        <div className='text-2xl'>{t('desc')}</div>
      </div>
  )
}

export default TitlesContainer
