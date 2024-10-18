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
      audio.pause();  // Toujours arrêter l'audio actuel avant de modifier la source
      audio.currentTime = 0;  // Réinitialise le temps

      // On change la source seulement si l'URL change
      audio.src = songUrl;

      // Attend que l'audio puisse être lu sans interruption
      const handleCanPlayThrough = () => {
        if (isPlaying) {
          audio.play().catch((error) => {
            console.error("Erreur lors de la lecture de l'audio :", error);
          });
        }
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);

      // Nettoyage lors du démontage du composant ou du changement d'URL
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