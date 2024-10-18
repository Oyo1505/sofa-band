'use client'
import React, { useState } from 'react'
import AlbumItem from '../album-item/album-item'
import { StaticImageData } from 'next/image';
import AudioComponent from '../audio/audio';

interface Song {
  track: string;
  sound: string;
}

interface Media {
  title: string;  
  image: StaticImageData;  
  songs: Song[]; 
  label: string; 
  ref: string;    
  releaseYear: number;  
}
interface Props {
  albums : Media[]
}

const AlbumList = ({albums}:Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | undefined>('');

  const handlePlay = (isPlaying:boolean) => {
    setIsPlaying(isPlaying)
  };
 
  const handleCurrent = () => {
    setIsPlaying(false)
  };

  return (
    <>
    {albums?.sort((a ,b) => b.releaseYear - a.releaseYear).map((item, index)=>(
      <AlbumItem 
        key={index} 
        image={item.image} 
        title={item.title} 
        songs={item.songs} 
        label={item.label} 
        reference={item.ref} 
        releaseYear={item?.releaseYear}
        handlePlay={handlePlay}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        handleCurrent={handleCurrent}
         />))}
      {currentSong && currentSong?.length > 0  && <AudioComponent handleCurrent={handleCurrent} isPlaying={isPlaying}  songUrl={currentSong} />} 
     </>
  )
}

export default AlbumList