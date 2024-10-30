'use client'
import { Link } from '@/i18n/routing'
import { Event } from '@/shared/models/event'
import React from 'react'
import { hours } from '@/shared/constants/hours'
import { useLocale } from 'next-intl'

const EventItem = ({event}: {event: Event}) => {
  const time = hours[0].time_slots.filter(h => h.id === event.time)[0]
  const locale = useLocale()
  
  return (
    <div className='grid grid-cols-8 border-b border-background border-opacity-20 p-4'>
      <div className=''>{event.title}</div>
      <div className='truncate'>{event.location}</div>
      <div className=''>{time[locale]}</div>
      <div className=''>{event.date}</div>
      <div className=''>{event.city}</div>
      <div className=''>{event.region}</div>
      <div className=''><Link href={{pathname: '/dashboard/events/edit-event', query: {id: event.id}}}>Edit</Link></div>
      <div className=''><button >Delete</button></div>
    </div>
  )
}

export default EventItem