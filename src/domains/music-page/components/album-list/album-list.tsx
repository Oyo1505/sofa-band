'use client'
import Loading from '@/app/[locale]/(main)/loading';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useState } from 'react';
import caseof from '../../../../public/audio/caseof.mp3';
import if_you from '../../../../public/audio/ifyou.mp3';
import lala from '../../../../public/audio/la_la_la_lie.mp3';
import whisky from '../../../../public/audio/whisky.mp3';
import ifyou from '../../../../public/image/if.png';
import lalalie from '../../../../public/image/lalalie.webp';


const PlayerSong = dynamic(() => import('../player-song/player-song'), {
    ssr: false, 
    loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />
})
const AudioComponent = dynamic(() => import('../audio/audio'), {
    ssr: false, 
    loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />
})

interface Song {
  track: string;
  sound: string;
}

const tracks = [
    {
      track:'If You',
      sound: if_you,
      album: 'If You / ウイスキーが、お好きでしょ',
      label: 'タカラディスク',
      ref: 'TD-005',
      releaseYear: 2022,
      image: ifyou,
    }, 
    {
      track: 'ウイスキーが、お好きでしょ',
      sound:whisky,
      album: 'If You / ウイスキーが、お好きでしょ',
      image: ifyou,
      label: 'タカラディスク',
      ref: 'TD-005',
      releaseYear: 2022
    },
    {
      track:'La la la lie',
      sound:lala,
      album: 'La la la lie / Case Of Insanity',
      releaseYear: 2023,
      label: 'タカラディスク',
      ref: 'TD-006',
      image: lalalie,
    }, 
    {
      track:'Case Of Insanity', 
      sound:caseof,
      album: 'La la la lie / Case Of Insanity',
      releaseYear: 2023,
      label: 'タカラディスク',
      ref: 'TD-006',
      image: lalalie,
    }
];


const AlbumList = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentSong, setCurrentSong] = useState<string | undefined>(tracks[currentTrack].sound);

  const handlePlay = useCallback((isPlaying:boolean) => {
    setIsPlaying(isPlaying)
  }, []);
 
  const handleCurrent = useCallback(() => {
    setIsPlaying(false)
  }, []);

  const nextSong = useCallback(() => {
    setCurrentTrack(prev => prev < tracks.length - 1 ? prev + 1 : 0);
  }, []);

  const prevSong = useCallback(() => {
    setCurrentTrack(prev => prev > 0 ? prev - 1 : tracks.length - 1);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
    <div className="flex flex-col w-full">
        <PlayerSong
          image={tracks[currentTrack].image}
          album={tracks[currentTrack].album}
          sound={tracks[currentTrack].sound}
          label={tracks[currentTrack].label}
          reference={tracks[currentTrack].ref}
          track={tracks[currentTrack].track}
          releaseYear={tracks[currentTrack].releaseYear}
          handlePlay={handlePlay}
          nextSong={nextSong}
          prevSong={prevSong}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          setIsPlaying={setIsPlaying}
        />
      
        {currentSong && currentSong?.length > 0  && <AudioComponent handleCurrent={handleCurrent} isPlaying={isPlaying}  songUrl={currentSong} />} 
      </div>
     </Suspense>
  )
}

export default AlbumList