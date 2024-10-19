import React from 'react';
import LiveItem from '../live-item/live-item';

const LiveList = ({locale}:{locale:string}) => {
  const lives = [
    {
      location: 'Baobab Bar',
      city:'Tokyo',
      cityJp:'東京都',
      date: 2022,
      video:'live_corner_2.mp4'
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: 2024,
      video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: 2023,
      video:"live_corner.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: 2023,
      video:"live_corner_3.mp4"
    },
    {
      location: 'Corner stone Bar',
      city:'Osaka',
      cityJp:'大阪市',
      date: 2023,
      video:"live_corner.mp4"
    }
    ]
  return (
    <div className='flex flex-col md:flex-row flex-wrap gap-4 w-full'>
      {lives && lives.sort((a, b)=> b.date - a.date).map((item, index) =>
        <LiveItem key={`${item.date}-${index}`} location={item.location} date={item.date} cityJp={item.cityJp} city={item.city} video={item.video} locale={locale} />
      )}
    </div>
  )
}

export default LiveList