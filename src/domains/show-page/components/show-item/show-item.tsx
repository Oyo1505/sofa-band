import React from 'react'
import Image from 'next/image'
import Title from '@/domains/ui/components/title/title'
import Text from '@/domains/ui/components/text/text'


const ShowItem = ({ event }) => {
  const { title, location, time, date, city, region, country } = event;
  const tags = ['Tag1', 'Tag2', 'Tag3'];
  return (
    <>
    <div className='w-full flex-col sm:flex sm:flex-row sm:pr-5 sm:pl-5 sm:pt-4 sm:pb-4 sm:justify-between sm:items-center'>
         <Text type='p' className="text-sm ">{date}</Text>
         <div className='flex-col flex gap-4 sm:flex-row sm:gap-2 sm:items-center'>
          {title && <Title className="text-sm font-semibold">{title}</Title>}
          <Text type='p' className="text-sm ">@{location}</Text>
          <Text type='p' className="text-sm ">{time}</Text>
         </div>
        <div className='inline-flex gap-2 items-center'>
          <Text type='p' className="text-sm ">{city},</Text>
          <Text type='p' className="text-sm ">{region},</Text>
          <Text type='p' className="text-sm ">{country}</Text>
        </div>
        <Title className="text-sm">plus d'info</Title>
      
    </div>
    <hr className="border-t w-full border-gray-300" />
    </>
  )
}

export default ShowItem