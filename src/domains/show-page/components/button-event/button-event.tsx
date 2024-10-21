'use client'
import Text from '@/domains/ui/components/text/text'
import { useTranslations } from 'next-intl';
import React from 'react'

const ButtonEvent = ({link}: {link:string}) => {
  const t = useTranslations('ShowPage');
  return (
    <div className='border-foreground rounded border-2 pr-3 pl-3 pt-2 pb-2'>
      <a href={link} target='_blank' className='text-center text-sm text-text-foreground hover:text-foreground transition-colors duration-300'>
       <Text type='p' className="text-sm">{t('event')}</Text>
      </a>
    </div>
  )
}

export default ButtonEvent