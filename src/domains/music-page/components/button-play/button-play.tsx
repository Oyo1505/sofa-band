'use client'
import { Pause, Play } from '@/domains/ui/components/icons/icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ButtonPlayProps {
  handlePlay: (songUrl: boolean) => void; 
  currentPlay: boolean;                  
  songUrl: string;                       
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>; 
}

const ButtonPlay = ({handlePlay, songUrl, setCurrentSong, currentPlay} : ButtonPlayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if(currentPlay === false) setIsPlaying(currentPlay)
  }, [currentPlay])
  return (
    isPlaying ? <Pause 
    onClick={() =>{
      const newPlay = !isPlaying
      setIsPlaying(newPlay)
      handlePlay(newPlay)
      setCurrentSong(undefined)
    }} 
    className='ml-2 size-5' /> : 
    <Play onClick={() =>{
      const newPlay = !isPlaying
      setIsPlaying(newPlay)
      setCurrentSong(songUrl)
      handlePlay(newPlay)
    }}  className='ml-2 size-5' />
  )
}

export default ButtonPlay