'use client'
import { Pause, Play } from '@/domains/ui/components/icons/icons';
import { Dispatch, SetStateAction } from 'react';

interface ButtonPlayProps {
  handlePlay: (isPlaying: boolean) => void;
  currentPlay: boolean;                  
  songUrl: string;                       
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>; 
  currentSong?:string
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

const ButtonPlay = ({handlePlay, songUrl, setCurrentSong, currentSong, isPlaying, setIsPlaying } : ButtonPlayProps) => {

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