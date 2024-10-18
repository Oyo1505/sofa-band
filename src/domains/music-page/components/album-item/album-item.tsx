'use client'
import Image, { StaticImageData } from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Text from '../../../ui/components/text/text';
import ButtonPlay from '../button-play/button-play';
import AudioComponent from '../audio/audio';

interface Song {
  track:string,
  sound:string
}

interface Props {
  image: StaticImageData
  title:string,
  songs?:Song[],
  label : string,
  reference :string,
  releaseYear: number
  handlePlay: (songUrl: boolean) => void; 
  isPlaying:boolean,
  currentSong?: string;                       
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>; 
  handleCurrent: () => void
};

const AlbumItem = ({image, title, songs, label, reference, releaseYear, handlePlay, handleCurrent, isPlaying, currentSong, setCurrentSong}:Props) => {
  
  return (
    <div className='flex  md:flex-row flex-col justify-start md:items-start items-center w-full gap-3 pt-3'>
      <Image src={image} quality={90} priority alt={title} className=' w-40 h-40 md:max-w-48 md:max-h-48 rounded' width={200} height={200} />
      <div>
        <Text className='text-2xl font-bold'>{title}</Text>
        <div className='pt-4 max-w-64'>
            {songs && songs?.map((item, index)=>(
            <div   key={`${index}-${item?.track}-div`} className='flex w-full justify-between'>
              <Text key={`${index}-${item?.track}`}  type='p' className='text-base flex items-end justify-start h-5 w-full truncate'>
               {index +1 }. {item?.track} 
               </Text> 
               <ButtonPlay  
                handlePlay={(newPlay) => {
                  if (newPlay) {
                    // Si une nouvelle chanson est jouée, stoppe la précédente
                    setCurrentSong(item.sound);
                  }
                  handlePlay(newPlay);
                }}  
                currentPlay={currentSong === item.sound && isPlaying} 
                songUrl={item?.sound} 
                setCurrentSong={setCurrentSong}
                currentSong={currentSong} 
                key={`${index}-${item?.track}-play`} /> 
             
              </div> 
            ))}
            <Text className='text-sm pt-2'>Label : {label}</Text>
            <Text className='text-sm'>Ref : {reference}</Text>
            <Text className='text-sm'>Date : {releaseYear}</Text>
      
        </div>
      </div>
    </div>
  )
}

export default AlbumItem