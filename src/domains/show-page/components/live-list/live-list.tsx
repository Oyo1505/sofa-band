//@ts-nocheck
'use client'
import Loading from '@/app/[locale]/(main)/loading';
import Title from '@/domains/ui/components/title/title';
import { Live } from '@/models/lives/live';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';
import LiveItem from '../live-item/live-item';

export const revalidate = 60;
const channelId = 'UC8xzsABKxgXbJYLhxTn8GpQ';

const LiveList = () => {
  const [livesSorted, setLives] = useState<Live[]>([])
  const [idPlaylist, setIdPlaylist] = useState(null)
  const t = useTranslations('LivePage');
 
   useQuery({
    queryKey: ['youtube-channel', channelId],
    queryFn: async () => {
      const idPlaylistUpload = await getVideosChannelYoutube();
     
      setIdPlaylist(idPlaylistUpload)
      return idPlaylistUpload
    },
  });

   useQuery({
    queryKey: ['videosFromPlaylist'],
    enabled: idPlaylist !== null,
    queryFn: async () => {
     const videos = await getVideosPlaylistYoutube()
     setLives(videos)
     return videos
    },
  });


  const getVideosChannelYoutube = async () => {
    try{
      const response = await fetch('/api/youtube/videos?action=channel');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch channel data');
      }
      return data.playlistId;
    }catch(error){
      console.error('Error fetching YouTube channel data:', error);
    }
  }

  const getVideosPlaylistYoutube = async () => {
    try {
      const response = await fetch(`/api/youtube/videos?action=playlist&playlistId=${idPlaylist}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch playlist data');
      }
      return data.videos;
    } catch(error) {
      console.error('Error fetching YouTube playlist data:', error);
      return [];
    }
  }
  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  const livesSortedAndSliced = livesSorted?.length > 3 ? livesSorted.slice(0, 2) : livesSorted
  return (
    <div className='flex flex-col gap-5 w-full'>
    <Title type='h2' text={t('title')} className='text-3xl font-bold' />
      <Suspense fallback={<Loading />}>
      <div className='grid grid-cols-1 w-full gap-4'>
        {livesSortedAndSliced && livesSortedAndSliced?.length > 0 ? livesSortedAndSliced.map((item, index) =>
          <LiveItem key={`${item.resourceId.videoId}-${index}`} title={item.title} date={item.publishedAt} videoId={item.resourceId.videoId}  />
        ) : <p>{t('NoVideo')}</p>}
      </div>
    </Suspense>
    </div>
  )
}

export default LiveList