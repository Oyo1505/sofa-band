//@ts-nocheck
'use client'
import { Play } from '@/domains/ui/components/icons/icons'
import { motion } from 'framer-motion'
import Text from '@/domains/ui/components/text/text'
import Title from '@/domains/ui/components/title/title'
import moment from 'moment'
import React, { Suspense, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

interface Props {
  title : string
  date : Date
  videoId : string
}

const LiveItem = ({title, videoId, date, city, cityJp, locale}:Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideo = () =>{
    if(!isPlaying){
      setIsPlaying(true)
    }else if (isPlaying){
      setIsPlaying(false)
    }
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  
  return (
    <motion.div variants={item} className='group flex flex-col md:flex-row gap-3 w-full relative hover:cursor-pointer'>
      <div className="w-full flex justify-center relative md:w-full "> 
      {videoId && <ReactPlayer  playing={isPlaying} width="100%" height='256px' url={`https://www.youtube.com/watch?v=${videoId}`} /> }
      {!isPlaying && 
      <div onClick={handleVideo} className='group z-8 absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300'>
        <div className=' w-full h-full'>
          <div className='flex flex-col justify-center h-full  items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className="text-2xl text-center font-bold mb-2" ><Play className='size-5' /></div>
            <Title type='h2' className='text-lg text-center md:text-base w-48 md:w-64 truncate'>{title}</Title>
            <Text text={moment(date).format('DD/MM/YYYY')} type='p' className='text-sm md:text-base' />
          </div>
        </div>
      </div>
      }
    </div>
    </motion.div>
  )
}

export default LiveItem