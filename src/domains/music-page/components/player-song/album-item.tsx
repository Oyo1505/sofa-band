
'use client'
import Image, { StaticImageData } from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import Text from '../../../ui/components/text/text';
import ButtonPlay from '../button-play/button-play';
import { useTranslations } from 'next-intl';
import { Next, Prev } from '@/domains/ui/components/icons/icons';

interface Props {
  index: number,
  image: StaticImageData
  album: string,
  sound: string,
  label: string,
  reference: string,
  track: string,
  releaseYear: number
  handlePlay: (songUrl: boolean) => void;
  isPlaying: boolean,
  currentSong?: string;
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>;
  nextSong: any;
  prevSong: any;
};

const PlayerSong = ({index, image, album, sound, track, label, releaseYear, handlePlay, isPlaying, currentSong, setCurrentSong, nextSong, prevSong }: Props) => {
  const t = useTranslations('MusicPage');
  return (
    <>
      <div className="flex flex-col justify-between md:flex-row  bg-neutral-800 rounded-md w-full p-5">
        <div className='flex items-center gap-5'>
          <Image
            src={image}
            quality={100}
            priority
            alt={album}
            className="w-20 h-20 object-cover"
            width={250}
            height={250}
          />

        <div>
          <h2 className='text-white  font-bold'>{track}</h2>
          <Text 
                  type="p" 
                  className="font-medium text-xs md:text-sm text-neutral-400 truncate flex-1"
                >
                {t('EP')}: {album}
          </Text>
          <Text 
                  type="p" 
                  className="font-medium text-xs md:text-sm text-neutral-400 truncate flex-1"
                >
                {t('Label')}: {label}
          </Text>
          <Text 
                  type="p" 
                  className="font-medium text-xs md:text-sm text-neutral-400 truncate flex-1"
                >
                {t('Date')}: {releaseYear}
          </Text>
        </div>
        </div>
          <div className=' flex items-center justify-center '> 
                <div className='flex items-center gap-2'>
                  <button className='text-white' onClick={() => setCurrentSong(prevSong)}><Prev /></button>
                  <ButtonPlay
                    handlePlay={(newPlay) => {
                      if (newPlay) {
                        setCurrentSong(sound);
                      }
                      handlePlay(newPlay);
                    }}
                    currentPlay={currentSong === sound && isPlaying}
                    songUrl={sound}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                  />
                  <button className='text-white' onClick={() => setCurrentSong(nextSong)}><Next /></button>
                </div>
            
          </div>
   
      </div>
    </>
  );
};

export default PlayerSong;