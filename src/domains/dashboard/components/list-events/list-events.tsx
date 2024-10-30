import { Event } from '@/shared/models/event'
import React from 'react'
import EventItem from '../event-item/event-item'

const ListEvents = ({events}: {events: Event[]}) => {
  return (
    <div>{events.map((event, index) => <EventItem key={index} event={event} />)}</div>
  )
}

export default ListEvents