'use client'
import React, { Suspense, useState } from 'react'
import AlbumItem from '../album-item/album-item'
import { StaticImageData } from 'next/image';
import AudioComponent from '../audio/audio';
import Loading from '@/app/[locale]/(main)/loading';

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
    <Suspense fallback={<Loading />}>
    <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-center">
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
          />))}
        {currentSong && currentSong?.length > 0  && <AudioComponent handleCurrent={handleCurrent} isPlaying={isPlaying}  songUrl={currentSong} />} 
      </div>
     </Suspense>
  )
}

export default AlbumList