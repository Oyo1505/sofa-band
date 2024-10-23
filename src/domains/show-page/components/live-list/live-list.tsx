//@ts-nocheck
import React, { Suspense } from 'react';
import * as motion from 'framer-motion/client'
import LiveItem from '../live-item/live-item';
import moment from 'moment';
import { Live } from '@/models/lives/live';
import Loading from '@/app/[locale]/(main)/loading';

const LiveList = ({locale, lives}:{locale:string, lives:Live[]}) => {
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
    <Suspense fallback={<Loading />}>
    <motion.div className='grid sm:grid-cols-3 gap-6'
    variants={container}
    initial="hidden"
    animate="visible"
    >
      {lives && lives.sort((a, b)=> Number(b.date) - Number(a.date)).map((item, index) =>
        <LiveItem key={`${Number(item.date)}-${index}`} location={item.location} date={item.date} cityJp={item.cityJp} city={item.city} video={item.video} locale={locale} />
      )}
    </motion.div>
    </Suspense>
  )
}

export default LiveList