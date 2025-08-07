'use client'
import React from 'react'
import ShowItem from '../show-item/show-item'
import { EventData } from '@/models/show/show'
import ShowTitle from '../show-title/show-title'
import Text from '@/domains/ui/components/text/text'
import Title from '@/domains/ui/components/title/title'
import { useTranslations } from 'next-intl'

const ShowList = ({events}: {events: EventData[]}) => {

  const today = new Date().toISOString()
  const t = useTranslations('ShowPage')
  const isFutureShow = events.filter((event: EventData) => event.date > today)
  const isPastShow = events.filter((event: EventData) => event.date < today).slice(0, 3);
  return (
    <div className='rounded-2xl w-full flex flex-col gap-5'>
    <ShowTitle />
    {isFutureShow.length > 0 ? (
      <>
    <div className='rounded-md shadow-sm bg-amber-50 p-5'>
      {isFutureShow?.map((event: EventData, index: number) => (
          <ShowItem key={index} event={event}  />
      ))}
  
    </div>
    </>
    ) : (<Text type='p'>{t('noEvents')}</Text>)}
    {isPastShow.length > 0 ? (
      <>
        <Title type='h2' text={t('pastEvents')} className='text-xl text-amber-50 font-bold' />
        <div className='rounded-md shadow-sm bg-amber-50 p-5'>
          {isPastShow?.map((event: EventData, index: number) => (
            <ShowItem key={index} event={event}  />
          ))}
        </div>
      </>
    ) : (<Text type='p'>{t('noEvents')}</Text>)}
    </div>
  )
}

export default ShowList