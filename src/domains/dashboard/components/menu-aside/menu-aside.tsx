import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import React from 'react'

const MenuAside = () => {
  const t = useTranslations('MenuAside')
  return (
    <div className='w-2/12 flex flex-col gap-4 font-bold font-shippori'>
      <Link href='/dashboard'>{t('Dashboard')}</Link>
      <Link href='/dashboard/events'>{t('Events')}</Link>

    </div>
  )
}

export default MenuAside
