'use client'
import Text from '@/domains/ui/components/text/text'
import Title from '@/domains/ui/components/title/title'
import { motion } from 'framer-motion'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { memo, useState } from 'react'

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
    ssr: false
  });

interface Props {
  title: string
  date: Date
  videoId: string
  city?: string
  cityJp?: string
  locale?: string
}

const LiveItem = memo(({title, videoId, date, city, cityJp, locale}:Props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideo = () => {
    setIsPlaying(!isPlaying);
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative w-full mx-auto "
    >
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            {videoId && (
              <ReactPlayer
                playing={isPlaying}
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${videoId}`}
                className="absolute top-0 left-0"
              />
            )}
            {!isPlaying && (
              <motion.div
                onClick={handleVideo}
                className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent hover:cursor-pointer"
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="text-center px-4">
                    <Title 
                      type="h2" 
                      className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
                    >
                      {title}
                    </Title>
                    <div className="flex items-center justify-center gap-2">
                      <Text 
                        text={moment(date).format('DD/MM/YYYY')} 
                        type="p" 
                        className="text-white/90 font-medium"
                      />
                      {city && (
                        <>
                          <span className="text-purple-300">•</span>
                          <Text 
                            text={locale === 'ja' ? cityJp : city} 
                            type="p" 
                            className="text-white/90 font-medium"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
    </motion.div>
  )
});

LiveItem.displayName = 'LiveItem';

export default LiveItem