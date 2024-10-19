import React from 'react';
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

  return (
    <div className='flex flex-col md:flex-row flex-wrap gap-4 w-full'>
      {lives && lives.sort((a, b)=> Number(b.date) - Number(a.date)).map((item, index) =>
        <LiveItem key={`${Number(item.date)}-${index}`} location={item.location} date={item.date} cityJp={item.cityJp} city={item.city} video={item.video} locale={locale} />
      )}
    </div>
  )
}

export default LiveList