import { Link } from '@/i18n/routing'
import React from 'react'

const MenuAside = () => {
  return (
    <div className='w-2/12 flex flex-col gap-4'>
      <Link href='/dashboard'>Dashboard</Link>
      <Link href='/dashboard/events'>Events</Link>
      <Link href={{pathname: '/dashboard/events/add-event', query: {addEvent: true}}}>Add Event</Link>
    </div>
  )
}

export default MenuAside