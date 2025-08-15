import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { RocketIcon } from '@radix-ui/react-icons'
import React from 'react'

const MenuAside = () => {
  const t = useTranslations('MenuAside')
  return (
    <div className='w-2/12 flex flex-col gap-4 font-light border-r border-black border-opacity-20 bg-foreground rounded-md p-3'>
      <Link href='/dashboard/events' className='flex items-center gap-2'>
        <RocketIcon className='w-5 h-5' />
        {t('Events')}
      </Link>
    </div>
  )
}

export default MenuAside
