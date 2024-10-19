import React from 'react'
import Title from '@/domains/ui/components/title/title'
import Text from '@/domains/ui/components/text/text'
import { useTranslations } from 'next-intl'

interface Event {
  title: string
  location: string
  time: string
  date: string
  city: string
  region: string
  country: string
}

interface Props {
  event: Event
} 

const ShowItem = ({ event }: Props) => {
  const t = useTranslations('ShowPage');
  const { title, location, time, date, city, region } = event;

  return (
    <>
    <div className='w-full flex-col sm:flex sm:flex-row  sm:justify-around sm:items-center'>
         <Text type='p' className="text-sm w-24 ">{date}</Text>
         <div className='inline-flex gap-2 items-center sm:gap-1 sm:items-start sm:w-80'>
          {title && <Title className="text-sm sm:w-2/3 font-semibold sm:truncate">{title}</Title>}
          <Text type='p' className="text-sm sm:w-2/3 sm:truncate">@{location}</Text>
          <Text type='p' className="text-sm sm:w-4/12">{time}</Text>
         </div>
        <div className='inline-flex gap-2 items-center sm:gap-1 sm:items-start'>
          <Text type='p' className="text-sm ">{city},</Text>
          <Text type='p' className="text-sm ">{region}</Text>
          {/* <Text type='p' className="text-sm ">{country}</Text> */}
        </div>
        <a href='https://www.instagram.com/p/DBLCY7_y5Kt/' target='_blank'><Text type='p' className="text-sm">{t('event')}</Text></a>
      
    </div>
    <hr className="border-t w-full border-gray-300" />
    </>
  )
}

export default ShowItem