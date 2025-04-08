import React from 'react'
import ShowItem from '../show-item/show-item'
import { Event } from '@/models/show/show'

const ShowList = ({events}: {events: Event[]}) => {
  return (
    <div className='rounded-2xl w-full'>
   {events?.map((event: Event, index: number) => (
      <ShowItem key={index} event={event} />
    ))}
    </div>
  )
}

export default ShowList