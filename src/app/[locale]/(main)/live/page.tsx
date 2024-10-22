import LiveList from '@/domains/show-page/components/live-list/live-list'
import React from 'react'

export default async function Page({params} : {params:any}) {
  const { locale } = await params
  return (
    <div className='flex flex-col lg:h-screen items-start w-full h-full justify-start pb-28 pt-28'>
      <LiveList locale={locale}/>
    </div>
  )
}