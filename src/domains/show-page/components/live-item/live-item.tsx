'use client'
import { Play } from '@/domains/ui/components/icons/icons'
import Text from '@/domains/ui/components/text/text'
import Title from '@/domains/ui/components/title/title'
import React, { use, useRef, useState } from 'react'

interface Props {
  location : string
  date : number
  video : string
  locale:string
  city:string
  cityJp:string
}

const LiveItem = ({location, video, date, city, cityJp, locale}:Props) => {
  const refVideo = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideo = () =>{
    if(!isPlaying){
      setIsPlaying(true)
      refVideo.current?.play()
    }else if (isPlaying){
      setIsPlaying(false)
      refVideo.current?.pause()
    }
  }
  return (
    <div className='group flex flex-col md:flex-row gap-3 w-full md:w-80  lg:w-96 relative hover:cursor-pointer'>
      <div className="w-full flex justify-center relative md:w-full "> 
          <video ref={refVideo} 
              onClick={handleVideo} 
              onMouseEnter={()=>refVideo.current?.setAttribute("controls", "")}  
              onMouseLeave={()=>refVideo.current?.removeAttribute("controls")}  
              className='w-full h-64 object-cover rounded-md'>
            <source src={video} type="video/mp4" />
            <a href={video} >MP4</a>
      </video>
     
      {!isPlaying && 
      <div onClick={handleVideo} className='group z-8 absolute top-0 left-0 w-full h-full rounded-md bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300'>
        <div className=' w-full h-full'>
          <div className='flex flex-col justify-center h-full  items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className="text-2xl text-center font-bold mb-2" ><Play className='size-5' /></div>
            <Title type='h2' className='text-lg text-center md:text-base w-48 md:w-64 truncate'>{location} - {locale === 'jp' ? cityJp : city }</Title>
            <Text text={Number(date).toString()} type='p' className='text-sm md:text-base' />
          </div>
        </div>
      </div>
      }
    </div>
    </div>
  )
}

export default LiveItem