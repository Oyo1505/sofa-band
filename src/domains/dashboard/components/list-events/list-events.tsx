
import React from 'react'
import EventItem from '../event-item/event-item'
import { deleteEventById } from '../../action'
import { EventData } from '@/models/show/show'

const ListEvents = ({ events }: { events: EventData[] }) => {
  const deleteEvent = async (id: string) => {
    'use server'
    await deleteEventById(id)
  }

  return (
    <div>{events.map((event, index) => <EventItem key={index} index={index} event={event} deleteEvent={deleteEvent} />)}</div>
  )
}

export default ListEvents
