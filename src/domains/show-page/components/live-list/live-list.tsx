//@ts-nocheck
'use client'
import React, { Suspense, use, useCallback, useEffect, useState } from 'react';
import * as motion from 'framer-motion/client'
import LiveItem from '../live-item/live-item';
import { Live } from '@/models/lives/live';
import Loading from '@/app/[locale]/(main)/loading';

const LiveList = () => {
  const [livesSorted, setLives] = useState<Live[]>([])
  const [idPlaylist, setIdPlaylist] = useState(null)
  const channelId = 'UC8xzsABKxgXbJYLhxTn8GpQ'

  const getVideosChannelYoutube = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
    const data = await response.json()
    return data.items[0].contentDetails.relatedPlaylists.uploads
    
  }

  const getVideosPlaylistYoutube = useCallback(async () => {
    const videos = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${idPlaylist}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50&order=date`)
    const data = await videos.json()
    return data?.items.map(item => item.snippet)
  }, [idPlaylist])

 useEffect(() => {
    const getVideos = async () => {
      const videos = await getVideosChannelYoutube()
      setIdPlaylist(videos)
    }
    getVideos()
  }, [setLives, livesSorted])


 useEffect(() => {

  const getPlyltst = async () => {
      const videos = await getVideosPlaylistYoutube();
      setLives(videos)
  }
  if(idPlaylist){
    getPlyltst()
  }

  }, [getVideosPlaylistYoutube,idPlaylist])

  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  return (
    <Suspense fallback={<Loading />}>
    <motion.div className='grid sm:grid-cols-3 w-full gap-6'
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {livesSorted && livesSorted.map((item, index) =>
        <LiveItem key={`${item.resourceId.videoId}-${index}`} title={item.title} date={item.publishedAt} videoId={item.resourceId.videoId}  />
      )}
    </motion.div>
    </Suspense>
  )
}

export default LiveList