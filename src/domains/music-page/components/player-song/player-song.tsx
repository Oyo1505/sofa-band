
'use client'
import { Next, Prev } from '@/domains/ui/components/icons/icons';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, memo, SetStateAction, useEffect } from 'react';
import Text from '../../../ui/components/text/text';
import ButtonPlay from '../button-play/button-play';

interface Props {
  image: StaticImageData
  album: string,
  sound: string,
  label: string,
  reference: string,
  track: string,
  releaseYear: number
  handlePlay: (isPlaying: boolean) => void;
  isPlaying: boolean,
  currentSong?: string;
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>;
  nextSong: () => void;
  prevSong: () => void;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

const PlayerSong = memo(({ image, album, sound, track, label, releaseYear, handlePlay, isPlaying, currentSong, setCurrentSong, nextSong, prevSong, setIsPlaying }: Props) => {
  const t = useTranslations('MusicPage');
  useEffect(() => {
    if(isPlaying && currentSong !== sound) {
      setCurrentSong(sound)
    }
  }, [currentSong, isPlaying, sound, setCurrentSong])

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row  bg-neutral-800 rounded-md w-full p-5  md:h-40 truncate">
        <div className='flex items-center gap-5 truncate'>
          <Image
            src={image}
            quality={90}
            priority
            alt={album}
            className="w-24 h-24 md:w-30 md:h-30 rounded-sm object-cover"
            width={250}
            height={250}
            sizes="(max-width: 768px) 96px, 120px"
            placeholder="blur"
          />

        <div>
          <h2 className='text-white  font-bold text-ellipsis'>{track}</h2>
          <Text 
                  type="p" 
                  className="font-medium text-xs md:text-sm text-neutral-400 text-ellipsis flex-1 overflow-hidden"
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
                  <button aria-label='previous song'  className='text-white' onClick={prevSong}><Prev /></button>
                  <ButtonPlay
                    handlePlay={(newPlay) =>handlePlay(newPlay)}
                    currentPlay={currentSong === sound && isPlaying}
                    songUrl={sound}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                  <button aria-label='next song' className='text-white' onClick={nextSong}><Next /></button>
                </div>
            
          </div>
   
      </div>
    </>
  );
}, (prevProps, nextProps) => {
  if (prevProps.isPlaying !== nextProps.isPlaying ||
      prevProps.currentSong !== nextProps.currentSong ||
      prevProps.sound !== nextProps.sound) {
    return false;
  }
  if (prevProps.track !== nextProps.track ||
      prevProps.album !== nextProps.album ||
      prevProps.label !== nextProps.label ||
      prevProps.releaseYear !== nextProps.releaseYear ||
      prevProps.image !== nextProps.image) {
    return false;
  }
  if (prevProps.handlePlay !== nextProps.handlePlay ||
      prevProps.setCurrentSong !== nextProps.setCurrentSong ||
      prevProps.nextSong !== nextProps.nextSong ||
      prevProps.prevSong !== nextProps.prevSong ||
      prevProps.setIsPlaying !== nextProps.setIsPlaying) {
    return false;
  }

  return true;
});

PlayerSong.displayName = 'PlayerSong'
export default PlayerSong;