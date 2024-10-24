import LiveList from '@/domains/show-page/components/live-list/live-list'
import moment from 'moment';
import React from 'react'


export default async function Page({params} : {params:any}) {
  const { locale } = await params
  const lives = [
    {
      location: 'Baobab Bar',
      city:'Tokyo',
      cityJp:'東京都',
      date: moment('2024-10-26').toDate(),
      video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: moment('2023-09-26').toDate(),
      video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: moment('2022-10-12').toDate(),
      video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Sapporo',
      cityJp:'大阪市',
      date: moment('2024-03-06').toDate(),
         video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: moment('2024-05-26').toDate(),
         video:"live_corner_3.mp4"
    },
    {
      location: 'Olea Bar',
      city:'Tokyo',
      cityJp:'東京都',
      date: moment('2023-10-26').toDate(),
         video:"live_corner_3.mp4"
    },
    ]
   
  return (
    <div className='flex flex-col lg:h-screen items-start w-full h-full justify-start pb-28 pt-28'>
      <LiveList locale={locale} lives={lives}/>
    </div>
  )
}