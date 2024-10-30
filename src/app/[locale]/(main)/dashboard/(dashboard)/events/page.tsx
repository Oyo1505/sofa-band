import { getEvents } from '@/domains/dashboard/action'
import ListEvents from '@/domains/dashboard/components/list-events/list-events'
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
    <div>
      <ListEvents events={sortedData} />
    </div>
  )
}

export default Page