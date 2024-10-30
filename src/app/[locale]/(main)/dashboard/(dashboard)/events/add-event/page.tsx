import { addEvent } from '@/domains/dashboard/action'
import FormEvent from '@/domains/dashboard/components/form-event/form-event'
import { Event } from '@/shared/models/event'
import React from 'react'

const Page =  () => {
  const addEventAction = async ({event,user}: {event: Event, user: any}) => {
   'use server'
    await addEvent({event, user})
  }
  return (<FormEvent addEvent={addEventAction} />)
}

export default Page