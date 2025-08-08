'use client'
import React, { Suspense, useState } from 'react'
import { StaticImageData } from 'next/image';
import AudioComponent from '../audio/audio';
import Loading from '@/app/[locale]/(main)/loading';
import whisky from '../../../../public/audio/whisky.mp3';
import if_you from '../../../../public/audio/ifyou.mp3';
import lala from '../../../../public/audio/la_la_la_lie.mp3';
import caseof from '../../../../public/audio/caseof.mp3';
import lalalie from '../../../../public/image/lalalie.webp'
import ifyou from '../../../../public/image/if.png'
import PlayerSong from '../player-song/player-song';

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

  const handlePlay = (isPlaying:boolean) => {
    setIsPlaying(isPlaying)
  };
 
  const handleCurrent = () => {
    setIsPlaying(false)
  };

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
          nextSong={() => currentTrack < tracks.length - 1 ? setCurrentTrack(currentTrack + 1) : setCurrentTrack(0)}
          prevSong={() => currentTrack > 0 ? setCurrentTrack(currentTrack - 1) : setCurrentTrack(tracks.length - 1)}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      
        {currentSong && currentSong?.length > 0  && <AudioComponent handleCurrent={handleCurrent} isPlaying={isPlaying}  songUrl={currentSong} />} 
      </div>
     </Suspense>
  )
}

export default AlbumList