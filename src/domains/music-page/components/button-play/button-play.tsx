'use client'
import { Pause, Play } from '@/domains/ui/components/icons/icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface ButtonPlayProps {
  handlePlay: (isPlaying: boolean) => any;
  currentPlay: boolean;                  
  songUrl: string;                       
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>; 
  currentSong?:string
}

const ButtonPlay = ({handlePlay, songUrl, setCurrentSong, currentPlay, currentSong} : ButtonPlayProps) => {

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentSong !== songUrl) {
      setIsPlaying(false);
    } else {
      setIsPlaying(currentPlay);
    }
  }, [currentPlay, currentSong, songUrl]);

  return (
    isPlaying ? (
      <Pause 
        aria-label='pause song'
        onClick={() => {
          setIsPlaying(false);
          handlePlay(false);
          setCurrentSong(undefined); 
        }} 
        className='ml-2 size-10' 
      />
    ) : (
      <Play 
        aria-label='play song'
        onClick={() => {
          if (currentSong !== songUrl) {
            setCurrentSong(songUrl);  
          }
          setIsPlaying(true);
          handlePlay(true);  
        }}  
        className='ml-2 size-10' 
      />
    )
  );
}

export default ButtonPlay