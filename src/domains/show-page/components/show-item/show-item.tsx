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
import { EventData } from '@/models/show/show'

interface Props {
  event: EventData
} 

const ShowItem = ({ event }: Props) => {

  const { title, location, date, city, region, cityInJpn } = event;

  const timeSlot = hours[0].time_slots.filter(h => h.id === event.time)[0];
  const locale = useLocale();

  return (
    <div className="flex items-center justify-between  text-neutral-900 border-b-2 last:border-b-0 border-gray-300 w-full py-3 gap-4">
      {/* Date Column */}
      <div className="flex flex-col items-center justify-start min-w-[60px]">
        <Text type="p" className="text-sm text-left w-full">{moment(date).format('DD')}</Text>
        <Text type="p" className="text-md font-bold text-left w-full">{moment(date).format('MMM')}</Text>
        <Text type="p" className="text-md font-bold text-left w-full">{moment(date).format('YYYY')}</Text>
      </div>
      
      {/* Event Info Column */}
      <div className="flex-1">
        {title && (
          <div className="mb-1">
            <Text type="div" className="text-sm font-semibold">{title}</Text>
            <Text type="div" className="text-sm text-gray-600">@{location}</Text>
          </div>
        )}
        <Text type="p" className="text-sm">{timeSlot[locale]}</Text>
      </div>
      
      {/* Location Column */}
      <div className="flex flex-col items-end text-right">
        <Text type="span" className="text-sm">
          {locale === 'jp' && cityInJpn ? cityInJpn : city}, {region}
        </Text>
      </div>
      
      {/* Button Column */}
      <div className="flex items-center">
        <ButtonEvent link={event.infoLink} />
      </div>
    </div>
  )
}

export default ShowItem