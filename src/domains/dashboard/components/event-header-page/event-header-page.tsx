import Title from '@/domains/ui/components/title/title'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import React from 'react'

const EventHeaderPage = () => {
  const t = useTranslations('EventPage')
  return (
    <div className='flex justify-between mb-5 items-center'>
      <Title text={t('title')} textColor='text-2xl font-bold' />
      <Link className='border-2 border-black text-black pr-3 pl-3 pt-1 pb-1 rounded-md' href={{ pathname: '/dashboard/events/add-event' }}>{t('addEvent')}</Link>
    </div>
  )
}

export default EventHeaderPage
