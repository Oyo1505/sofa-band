
'use client'
import { Link } from '@/i18n/routing'
import { EventData } from '@/models/show/show'
import { hours } from '@/shared/constants/hours'
import { useLocale, useTranslations } from 'next-intl'

const EventItem = ({ event, deleteEvent, index }: { event: EventData, deleteEvent: (id: string) => void, index: number }) => {
  const time = hours[0].time_slots.filter(h => h.id === event.time)[0]
  const locale = useLocale()
  const t = useTranslations('EventPage')
  return (
    <div className='grid grid-cols-8 border-b border-background border-opacity-20 gap-1 p-4 last:border-b-0'>
      <div className='truncate font-bold'>{index + 1}. {event.title}</div>
      <div className='truncate'>{event.location}</div>
      {/*@ts-ignore */}
      <div className=''>{time[locale]}</div>
      <div className='truncate'>{event.date}</div>
      <div className='truncate'>{locale === 'ja' && event.cityInJpn ? event.cityInJpn : event.city}</div>
      <div className=''>{event.region}</div>
      <Link className='bg-black text-foreground text-center rounded-md px-2 py-1' href={{ pathname: '/dashboard/events/edit-event', query: { id: event.id } }}>{t('Edit')}</Link>
      <button className='bg-red-500 text-white text-center rounded-md px-2 py-1' onClick={() => deleteEvent(event.id)}>{t('Delete')}</button>
    </div>
  )
}

export default EventItem
