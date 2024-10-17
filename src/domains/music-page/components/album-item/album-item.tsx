'use client'
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
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
};

const AlbumItem = ({image, title, songs, label, reference, releaseYear}:Props) => {
  const [currentSong, setCurrentSong] = useState<string | undefined>('');
  const [play, setplay] = useState(false);
  const handlePlay = (isPlaying:boolean) => {
    setplay(() => isPlaying)
  };
 
  const handleCurrent = () => {
    setplay(()=> false)
  };
  
  return (
    <div className='flex justify-start items-start w-full gap-3 pt-3'>
      <Image src={image} quality={90} priority alt={title} className='max-w-48 max-h-48 rounded' width={200} height={200} />
      <div className=''>
        <Text className='text-2xl font-bold'>{title}</Text>
        <div className='pt-4 max-w-64'>
            {songs && songs?.map((item, index)=>(
            <div   key={`${index}-${item?.track}-div`} className='flex w-full justify-between'>
              <Text key={`${index}-${item?.track}`}  type='p' className='text-base flex items-end justify-start h-5 w-full truncate'>
               {index +1 }. {item?.track} 
               </Text> 
               <ButtonPlay  handlePlay={handlePlay} currentPlay={play} songUrl={item?.sound} setCurrentSong={setCurrentSong} key={`${index}-${item?.track}-play`} /> 
             
              </div> 
            ))}
             {currentSong && currentSong?.length > 0  && <AudioComponent handleCurrent={handleCurrent} isPlaying={play}  songUrl={currentSong} />} 
            <Text className='text-sm pt-2'>Label : {label}</Text>
            <Text className='text-sm'>Ref : {reference}</Text>
            <Text className='text-sm'>Date : {releaseYear}</Text>
      
        </div>
      </div>
    </div>
  )
}

export default AlbumItem