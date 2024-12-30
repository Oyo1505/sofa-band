import React from 'react'
import ShowItem from '../show-item/show-item'
import { Event } from '@/models/show/show'

const ShowList = ({events}: {events: Event[]}) => {
  return (
    events?.map((event: Event, index: number) => (
      <ShowItem key={index} event={event} />
    ))
  )
}

export default ShowList