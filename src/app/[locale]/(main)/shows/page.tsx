//@ts-nocheck
import React from 'react'
import imageFlyer from '../../../../public/image/fly.jpg'
import ShowList from '@/domains/show-page/components/show-list/show-list'
import * as motion from 'framer-motion/client'
import { getEvents } from '@/domains/dashboard/action';
import moment from 'moment';

const revalidate = 60;
const getData = async () =>{
  const {events} = await getEvents()
  return events
}
export default async function Page() {
  const events = await getData();
  const sortedData = events.sort((a, b) => moment(a.date).diff(moment(b.date)))
//     image: imageFlyer,
//     title: 'Fly',
//     location: 'Titty Bar',
//     time: '9:00 PM',
//     date: '26/10/2022',
//     infoLink: '/event-details',
//     city:"Osaka",
//     region : "Kansai",
//     country : "Japan"
//   },
//   {
//     image: imageFlyer,
//     title: 'Fly Festival',
//     location: 'Main Bar',
//     time: '9:00 PM',
//     date: '26/10/2023',
//     infoLink: '/event-details',
//     city: "Tokyo",
//     region: "Kantō",
//     country: "Japan"
//   },
//   {
//     image: imageFlyer,
//     title: 'Fly',
//     location: 'Henri-Pierre Bar',
//     time: '9:00 PM',
//     date: '26/10/2023',
//     infoLink: '/event-details',
//     city: "Fukuoka",
//     region: "Kyūshū",
//     country: "Japan"
//   },
//   {
//     image: imageFlyer,
//     title: 'Fly',
//     location: 'bAttache Bar',
//     time: '9:00 PM',
//     date: '26/10/2023',
//     infoLink: '/event-details',
//     city: "Osaka",
//     region: "Kansai",
//     country: "Japan"
//   }
// ] 
const container = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2
    }
  }
};
  return (
  <motion.div 
    variants={container}
    initial="hidden"
    animate="visible"
    className='flex flex-col lg:h-screen pt-32 gap-6 items-center justify-center'>
      <ShowList events={events} />
    </motion.div>
  )
}
