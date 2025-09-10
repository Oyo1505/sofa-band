
import { EventData } from '@/models/show/show';
import dynamic from 'next/dynamic';
import { deleteEventById } from '../../action';
const EventItem = dynamic(() => import('../event-item/event-item'));

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
