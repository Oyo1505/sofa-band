'use client'
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface Props {
  songUrl: string,
  handleCurrent?: Dispatch<SetStateAction<void>>,
  isPlaying: boolean
}

const AudioComponent = ({songUrl, handleCurrent, isPlaying }: Props) => {
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;  
      audio.src = songUrl;

      const handleCanPlayThrough = () => {
        if (isPlaying) {
          audio.play().catch((error) => {
            console.error("Erreur lors de la lecture de l'audio :", error);
          });
        }
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, [songUrl, isPlaying]); 

  const handleEnded = () => {
    if (handleCurrent) {
      handleCurrent();
    }
  };

  return (
    <div>
      <audio ref={audioRef} hidden onEnded={handleEnded}>
        <source
          id="audio-player"
          //@ts-ignore
          name="audio-player"
          src={songUrl}
          type="audio/mp3"
          
        />
        {/* Fallback content */}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioComponent;