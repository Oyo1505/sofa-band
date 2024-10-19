import React from 'react'
import fly from '../../../../public/image/fly.jpg'
import Image from 'next/image'
import Title from '@/domains/ui/components/title/title'
import Text from '@/domains/ui/components/text/text'
interface Props {
  right?: boolean
}

const ShowItem = ({right=false}:Props) => {
  return (
    <div className={`flex ${right ? 'flex-row-reverse' : 'flex-row'} gap-7 items-start justify-start w-4/6`}>
      <Image src={fly} alt='fly'  width={200} height={200} />
      <div className='flex flex-col justify-center items-center'>
        <div>
          <Title className='text-2xl' type='h6'>Fly</Title>
          <Text className='text-sm'>Corner Bar</Text>
          <Text className='text-sm'>9:00 PM - 11:00 PM</Text>
          <Text className='text-sm'>26/10/2022</Text>
          <Text className='text-sm'>Plus d'informations...</Text>
        </div>
      </div>
    </div>
  )
}

export default ShowItem