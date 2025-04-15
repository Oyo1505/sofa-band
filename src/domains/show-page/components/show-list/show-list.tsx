import React from 'react'
import ShowItem from '../show-item/show-item'
import { Event } from '@/models/show/show'
import { headers } from 'next/headers'

const ShowList = async ({events}: {events: Event[]}) => {
   const userAgent = (await headers()).get('user-agent');
   const isChromeBrowser = userAgent?.includes('Chrome') || false

  return (
    <div className='rounded-2xl w-full'>
   {events?.map((event: Event, index: number) => (
      <ShowItem key={index} event={event}  isChromeBrowser={isChromeBrowser} />
    ))}
    </div>
  )
}

export default ShowList