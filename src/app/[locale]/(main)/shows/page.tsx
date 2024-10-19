import ShowItem from '@/domains/show-page/components/show-item/show-item'
import React from 'react'
import imageFlyer from '../../../../public/image/fly.jpg'
export default function Page({params: {locale}} : {params:{locale:string}}) {
  const events = [{
    image: imageFlyer,
    title: 'Fly',
    location: 'Corner Bar',
    time: '9:00 PM - 11:00 PM',
    date: '26/10/2022',
    infoLink: '/event-details',
    city:"Osaka",
    region : "Kansai",
    country : "Japan"
  },
  {
    image: imageFlyer,
    title: 'Fly',
    location: 'Corner Bar',
    time: '9:00 PM - 11:00 PM',
    date: '26/10/2023',
    infoLink: '/event-details',
    city: "Osaka",
    region: "Kansai",
    country: "Japan"
  }] 
  
  return (
    <div className='flex flex-col h-screen pt-32 gap-6 items-center justify-center'>
     {events.sort((a, b)=> b.date - a.date).map((event, index) => (
        <ShowItem key={index} event={event} />
      ))}
    </div>
  )
}
