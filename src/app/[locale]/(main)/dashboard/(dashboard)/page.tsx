'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  const t = useTranslations('EventPage')
  return (
    <div className='flex justify-end'>
     <Link className='border-2 border-black text-black pr-3 pl-3 pt-1 pb-1 rounded-md' href={{ pathname: '/dashboard/events/add-event' }}>{t('addEvent')}</Link>
    </div>
  )
}

export default Page
