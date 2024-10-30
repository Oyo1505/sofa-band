import { getEvents } from '@/domains/dashboard/action'
import React from 'react'


const getData = async () =>{
  const {events} = await getEvents()
  return events
}

const Page = async () => {
  const data = await getData();
  return (
    <div>Page</div>
  )
}

export default Page