import React from 'react'
import Title from '@/domains/ui/components/title/title'
import Text from '@/domains/ui/components/text/text'
import { useTranslations } from 'next-intl'
import {motion} from 'framer-motion'
import ButtonEvent from '../button-event/button-event'

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

  const { title, location, time, date, city, region } = event;
  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };
  return (
    <>
      <motion.div variants={item} className='w-full flex-col sm:flex sm:flex-row  sm:justify-around sm:items-center'>
         <Text type='p' className="text-sm w-24 ">{date}</Text>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center sm:gap-1 sm:w-96">
            {title && (
              <Title className="text-sm sm:w-2/3 font-semibold sm:truncate col-span-2">
                {title}
              </Title>
            )}
            <Text type="p" className="text-sm sm:w-2/3 sm:truncate col-span-2">
              @{location}
            </Text>
            <Text type="p" className="text-sm col-span-1">
              {time}
            </Text>
          </div>
          <div className="inline-flex sm:grid-cols-2 items-center gap-0.5 w-36">
          <Text type='p' className="text-sm w-auto">{city},</Text>
          <Text type='p' className="text-sm w-auto">{region}</Text>
          {/* <Text type='p' className="text-sm ">{country}</Text> */}
        </div>
        <ButtonEvent link='https://www.instagram.com/p/DBLCY7_y5Kt/' />    
    </motion.div>
    <motion.hr variants={item} className="border-t w-full border-gray-300" />
    </>
  )
}

export default ShowItem