'use client'
import React, { Suspense, useState } from 'react'
import AlbumItem from '../album-item/album-item'
import { StaticImageData } from 'next/image';
import AudioComponent from '../audio/audio';
import Loading from '@/app/[locale]/(main)/loading';
import whisky from '../../../../public/audio/whisky.mp3';
import if_you from '../../../../public/audio/ifyou.mp3';
import lala from '../../../../public/audio/la_la_la_lie.mp3';
import caseof from '../../../../public/audio/caseof.mp3';
import lalalie from '../../../../public/image/lalalie.webp'
import ifyou from '../../../../public/image/if.png'
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
const albums = [{
  title: 'If You / ウイスキーが、お好きでしょ',
  image: ifyou,
  songs: [
    {
      track:'If You',
      sound: if_you
    }, 
    {
      track: 'ウイスキーが、お好きでしょ',
      sound:whisky
    }
  ],
  label: 'タカラディスク',
  ref: 'TD-005',
  releaseYear: 2022
}, {
  title: 'La la la lie / Case Of Insanity',
  image: lalalie,
  songs: [
    {
      track:'La la la lie',
      sound:lala
    }, 
    {
      track:'Case Of Insanity', 
      sound:caseof
    }],
  label : 'タカラディスク',
  ref: 'TD-006',
  releaseYear: 2023
}];


const AlbumList = () => {
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
    <div className="flex w-full  flex-col items-center gap-6 py-4 lg:flex-row lg:items-center lg:justify-center lg:gap-8">
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