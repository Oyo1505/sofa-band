import React from 'react';
import live from '../../../../public/video/live_corner.mp4';
import live2 from '../../../../public/video/live_corner_3.mp4';
import live3 from '../../../../public/video/live_corner_2.mp4';
import LiveItem from '../live-item/live-item';

const lives = [
{
  location: 'Baobab Bar',
  city:'Tokyo',
  cityJp:'東京都',
  date: 2022,
  video:live
},
{
  location: 'Corner stone Bar',
  city:'Osaka',
  cityJp:'大阪市',
  date: 2024,
  video:live2
},
{
  location: 'Corner stone Bar',
  city:'Osaka',
  cityJp:'大阪市',
  date: 2023,
  video:live3
},
{
  location: 'Corner stone Bar',
  city:'Osaka',
  cityJp:'大阪市',
  date: 2023,
  video:live3
},
{
  location: 'Corner stone Bar',
  city:'Osaka',
  cityJp:'大阪市',
  date: 2023,
  video:live3
}
]

const LiveList = ({locale}:{locale:string}) => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap gap-4 w-full'>
      {lives && lives.sort((a, b)=> b.date - a.date).map(item =>
        <LiveItem key={item.date} location={item.location} date={item.date} cityJp={item.cityJp} city={item.city} video={item.video} locale={locale} />
      )}
    </div>
  )
}

export default LiveList