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
        staggerChildren: 0.15,
        type: "spring",
        bounce: 0.3
      }
    },
    // hover: {
    //   scale: 1.01,
    //   transition: {
    //     duration: 0.1,
    //     ease: "easeOut"
    //   }
    // }
  };

  const songItemVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.9 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg overflow-hidden max-w-xl mx-auto my-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col md:flex-row">
        <motion.div 
          className="md:w-2/5 relative group"
          whileHover={{ scale: 1.08, rotate: 2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
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
            className="text-2xl font-bold mb-4 text-gray-800 dark:text-white bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>

          <div className="space-y-3">
            {songs?.map((item, index) => (
              <motion.div 
                key={`${index}-${item?.track}-div`}
                variants={songItemVariants} 
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300 shadow-sm hover:shadow"
              >
                <Text 
                  type="p" 
                  className="font-medium text-sm text-gray-700 dark:text-gray-200 truncate flex-1"
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
            className="mt-6 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2 hover:cursor-default"
          >
            <Text className="text-xs text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">{t('Label')} : {label}</Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('Ref')} : {reference}</Text>
            <Text className="text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{t('Date')} : {releaseYear}</Text>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumItem;