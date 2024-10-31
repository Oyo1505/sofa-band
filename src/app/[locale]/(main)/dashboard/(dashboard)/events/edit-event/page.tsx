import { getEventById } from '@/domains/dashboard/action'
import FormEvent from '@/domains/dashboard/components/form-event/form-event'
import React from 'react'

const getData = async (id:string) =>{
  const { event } = await getEventById(id)
  return event
}

const Page = async ({searchParams}: {searchParams: { id: string }
}) => {
  const { id } = await searchParams 
  const event =  await getData(id)

  return (event ?  <FormEvent event={event} /> :  <div className='text-black'>Event not found</div>)
}

export default Page