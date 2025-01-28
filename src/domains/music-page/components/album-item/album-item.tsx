//@ts-nocheck
'use client'
import Image, { StaticImageData } from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';
import Text from '../../../ui/components/text/text';
import ButtonPlay from '../button-play/button-play';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion'

interface Song {
  track: string,
  sound: string
}

interface Props {
  image: StaticImageData
  title: string,
  songs?: Song[],
  label: string,
  reference: string,
  releaseYear: number
  handlePlay: (songUrl: boolean) => void;
  isPlaying: boolean,
  currentSong?: string;
  setCurrentSong: Dispatch<SetStateAction<string | undefined>>;
};

const AlbumItem = ({ image, title, songs, label, reference, releaseYear, handlePlay, isPlaying, currentSong, setCurrentSong }: Props) => {
  const t = useTranslations('MusicPage');

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        staggerChildren: .15,
        type: "spring",
        bounce: 0.3
      }
    },
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-linear-to-br from-[rgba(235,150,31,0.5)] to-[rgba(73,161,163,0.9)] rounded-xl shadow-2xl overflow-hidden max-w-xl mx-auto my-6 backdrop-blur-3xl"
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-2/5 relative group"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <Image
            src={image}
            quality={90}
            priority
            alt={title}
            className="w-full h-full object-cover transform group-hover:brightness-110 transition-all duration-300"
            width={250}
            height={250}
          />
        </motion.div>

        <div className="p-6 md:w-3/5">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-2xl font-bold mb-4 text-white"
          >
            {title}
          </motion.h2>

          <div className="space-y-3">
            {songs?.map((item, index) => (
              <motion.div 
  
                key={`${index}-${item?.track}-div`}
                className="flex items-center justify-between p-2 rounded-lg bg-white/10 backdrop-blur-xs hover:bg-white/20 transition-all duration-300 shadow-xs hover:shadow-sm"
              >
                <Text 
                  type="p" 
                  className="font-medium text-sm text-white truncate flex-1"
                >
                  {index + 1}. {item?.track}
                </Text>
                <ButtonPlay
                  handlePlay={(newPlay) => {
                    if (newPlay) {
                      setCurrentSong(item.sound);
                    }
                    handlePlay(newPlay);
                  }}
                  currentPlay={currentSong === item.sound && isPlaying}
                  songUrl={item?.sound}
                  setCurrentSong={setCurrentSong}
                  currentSong={currentSong}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-6 pt-3 border-t border-white/20 space-y-2 hover:cursor-default"
          >
            <Text className="text-xs text-white/80 hover:text-white transition-colors">{t('Label')} : {label}</Text>
            <Text className="text-xs text-white/80 hover:text-white transition-colors">{t('Ref')} : {reference}</Text>
            <Text className="text-xs text-white/80 hover:text-white transition-colors">{t('Date')} : {releaseYear}</Text>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumItem;