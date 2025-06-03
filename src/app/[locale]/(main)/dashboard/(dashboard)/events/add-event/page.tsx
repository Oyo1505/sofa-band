import { addEvent } from '@/domains/dashboard/action'
import FormEvent from '@/domains/dashboard/components/form-event/form-event'
import { Event } from '@/shared/models/event'
import React from 'react'

const Page = () => {
  const addEventAction = async ({ event, user }: { event: Event, user: any }): Promise<number> => {
    'use server'
    const { status } = await addEvent({ event, user })
    return status
  }
  return (<FormEvent addEvent={addEventAction} />)
}

export default Page
