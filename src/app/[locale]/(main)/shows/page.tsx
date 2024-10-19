import ShowItem from '@/domains/show-page/components/show-item/show-item'
import React from 'react'

export default function Page({params: {locale}} : {params:{locale:string}}) {
  
  return (
    <div className='flex flex-col h-screen pt-32 gap-6 items-center justify-center'>
      <ShowItem  />
      <ShowItem right/>
    </div>
  )
}
