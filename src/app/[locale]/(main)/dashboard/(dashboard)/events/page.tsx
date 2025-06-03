import { getEvents } from '@/domains/dashboard/action'
import EventHeaderPage from '@/domains/dashboard/components/event-header-page/event-header-page'
import ListEvents from '@/domains/dashboard/components/list-events/list-events'
import Title from '@/domains/ui/components/title/title'
import { Link } from '@/i18n/routing'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React from 'react'


const getData = async () => {
  const { events } = await getEvents()
  return events
}

const Page = async () => {
  const data = await getData();
  const sortedData = data.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))

  return (
    <>
      <EventHeaderPage />
      {sortedData && sortedData.length > 0 ? <ListEvents events={sortedData} /> : <div className='text-black'>No events</div>}
    </>
  )
}

export default Page
