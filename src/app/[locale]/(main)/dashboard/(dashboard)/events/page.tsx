import { getEvents } from '@/domains/dashboard/action'
import ListEvents from '@/domains/dashboard/components/list-events/list-events'
import { Link } from '@/i18n/routing'
import moment from 'moment'
import React from 'react'


const getData = async () =>{
  const {events} = await getEvents()
  return events
}

const Page = async () => {
  const data = await getData();
  const sortedData = data.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
  return (
    <>
      <div className='font-shippori flex justify-between mb-5 items-center'>
        <h2 className='text-2xl font-bold '>Events</h2>
        <Link className='border-2 border-black text-black pr-3 pl-3 pt-1 pb-1 rounded-md' href={{pathname: '/dashboard/events/add-event', query: {addEvent: true}}}>Add Event</Link>
      </div>
      {sortedData &&  sortedData.length > 0 ? <ListEvents events={sortedData} /> : <div className='text-black'>No events</div>}
    </>
  )
}

export default Page