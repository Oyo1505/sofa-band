//@ts-nocheck
'use client'
import React from 'react'
import Title from '@/domains/ui/components/title/title'
import Text from '@/domains/ui/components/text/text'
import { useLocale, useTranslations } from 'next-intl'
import {motion} from 'framer-motion'
import ButtonEvent from '../button-event/button-event'
import { hours } from '@/shared/constants/hours'
import moment from 'moment'
import { Event } from '@/models/show/show'

interface Props {
  event: Event
  isChromeBrowser: boolean
} 

const ShowItem = ({ event, isChromeBrowser }: Props) => {

  const { title, location, date, city, region, cityInJpn } = event;
  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    }
    
  };
  const timeSlot = hours[0].time_slots.filter(h => h.id === event.time)[0]
  const locale = useLocale()
  return (
    <>
      <motion.div variants={item} className={`font-shippori shadow-sm md:mb-2 pt-2 pb-2 lg:pt-0 lg:pb-0 font-bold  w-full flex-col rounded-md sm:flex sm:flex-row px-2 md:px-0 md:h-20  sm:justify-around sm:items-center opacity-90 backdrop-blur-sm ${isChromeBrowser ? 'bg-white text-black' : 'bg-white/5'}`}>
         <Text type='p' className="text-sm w-24 ">{moment(date).format('DD/MM/YYYY')}</Text>
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
              {timeSlot[locale]}
            </Text>
          </div>
          <div className="inline-flex sm:grid-cols-2 items-center gap-0.5 w-36">
          <Text type='p' className="text-sm w-auto">{locale === 'jp' && cityInJpn ? cityInJpn : city},</Text>
          <Text type='p' className="text-sm w-auto">{region}</Text>
          {/* <Text type='p' className="text-sm ">{country}</Text> */}
        </div>
     <ButtonEvent link={event.infoLink} /> 
    </motion.div>
    </>
  )
}

export default ShowItem