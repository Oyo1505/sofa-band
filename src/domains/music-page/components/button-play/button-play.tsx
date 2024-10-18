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
    // Si une autre chanson est jouée, on arrête la chanson actuelle
    if (currentSong !== songUrl) {
      setIsPlaying(false);
    } else {
      setIsPlaying(currentPlay);
    }
  }, [currentPlay, currentSong, songUrl]);

  return (
    isPlaying ? (
      <Pause 
        onClick={() => {
          setIsPlaying(false);
          handlePlay(false);
          setCurrentSong(undefined); // Arrête la chanson actuelle
        }} 
        className='ml-2 size-5' 
      />
    ) : (
      <Play 
        onClick={() => {
          if (currentSong !== songUrl) {
            setCurrentSong(songUrl);  // Met à jour la nouvelle chanson
          }
          setIsPlaying(true);
          handlePlay(true);  // Lance la lecture
        }}  
        className='ml-2 size-5' 
      />
    )
  );
}

export default ButtonPlay