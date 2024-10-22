//@ts-nocheck
import React from 'react';
import * as motion from 'framer-motion/client'
import LiveItem from '../live-item/live-item';
import moment from 'moment';

const LiveList = ({locale}:{locale:string}) => {
  const lives = [
    {
      location: 'Baobab Bar',
      city:'Tokyo',
      cityJp:'東京都',
      date: moment('2024-10-26').toDate(),
      video:'live_corner_2.mp4'
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
      video:"live_corner.mp4"
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
      video:"live_corner.mp4"
    },
    {
      location: 'Olea Bar',
      city:'Tokyo',
      cityJp:'東京都',
      date: moment('2023-10-26').toDate(),
      video:'live_corner_3.mp4'
    },
    ]
    const container = {
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    };
  return (
    <motion.div className='grid sm:grid-cols-3 gap-6'
    variants={container}
    initial="hidden"
    animate="visible"
    >
      {lives && lives.sort((a, b)=> Number(b.date) - Number(a.date)).map((item, index) =>
        <LiveItem key={`${Number(item.date)}-${index}`} location={item.location} date={item.date} cityJp={item.cityJp} city={item.city} video={item.video} locale={locale} />
      )}
    </motion.div>
  )
}

export default LiveList