import { Event } from '@/shared/models/event'
import React from 'react'
import EventItem from '../event-item/event-item'
import { deleteEventById } from '../../action'

const ListEvents = ({events}: {events: Event[]}) => {
  const deleteEvent = async (id:string) =>{
    'use server'
      await  deleteEventById(id)
  }

  return (
    <div>{events.map((event, index) => <EventItem key={index} event={event} deleteEvent={deleteEvent}/>)}</div>
  )
}

export default ListEvents