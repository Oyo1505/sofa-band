import LiveList from '@/domains/show-page/components/live-list/live-list'
import React from 'react'

export const revalidate = 60

export default async function Page() {
  return (
    <div className='flex flex-col lg:h-screen items-start w-full  h-auto justify-start pb-28 pt-28'>
      <LiveList />
    </div>
  )
}