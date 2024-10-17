'use client'
import React, { useEffect, useRef } from "react";

interface Props {
  songUrl: string,
  handleCurrent?: any
  isPlaying: boolean
}

const AudioComponent = ({songUrl, handleCurrent, isPlaying }: Props) => {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {

      if (isPlaying) {
        //@ts-ignore
        audioRef.current.play();

      } else {
       //@ts-ignore
        audioRef.current.pause();
        //@ts-ignore
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying]);

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