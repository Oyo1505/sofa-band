//@ts-nocheck
import React from 'react'
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
  const sortedData = events.sort((a, b) => moment(b.date).diff(moment(a.date)))


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
     <ShowList events={sortedData} />
    </motion.div>
  )
}
