import { editEventToDb, getEventById } from '@/domains/dashboard/action'
import FormEvent from '@/domains/dashboard/components/form-event/form-event'
import React from 'react'

const getData = async (id: string) => {
  const { event } = await getEventById(id)
  return event
}
interface EventData {
  event: any
}

const Page = async ({ searchParams }: { searchParams: any }) => {
  const { id } = await searchParams
  const event = await getData(id)
  const editEvent = async (eventData: EventData) => {
    'use server'
    if (!eventData) {
      return
    }

    await editEventToDb(eventData);
  }
  return (event ? <FormEvent event={event} editEvent={editEvent} /> : <div className='text-black'>Event not found</div>)
}

export default Page
