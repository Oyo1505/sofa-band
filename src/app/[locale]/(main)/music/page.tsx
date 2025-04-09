'use client'
import React from 'react'
import Title from '@/domains/ui/components/title/title'
import { useTranslations } from 'next-intl'
import { DiscogsIcon, EarthIcon, Spotify } from '@/domains/ui/components/icons/icons'
import Text from '@/domains/ui/components/text/text';
import AlbumList from '@/domains/music-page/components/album-list/album-list'
import * as motion from 'framer-motion/client';
 
export default  function Page() {
  const t = useTranslations('MusicPage');
  const container = {
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };
  return (
    <>
    <motion.div variants={container} initial="hidden" animate="visible" className='flex flex-col pb-6 pt-10 md:pt-28 md:pb-0 lg:pt-0 lg:h-screen items-start w-full justify-center'>
      <AlbumList />
      <div className='flex flex-col gap-5 md:gap-0 md:flex-row w-full justify-between pt-5 md:items-start items-center md:justify-evenly'>
        <div className='flex flex-col gap-2 items-start justify-center'>
          <Title type='h2' text={t('whereToListen')} className='text-2xl' />
            <a target='_blank' className='inline-flex gap-2 items-center mt-2' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
              <Spotify  className='size-7' />
              <Text text='Spotify' className='text-base' />
            </a>
        </div>
        <div className='flex flex-col items-start gap-2 justify-start'>
          <Title type='h2' text={t('whereToBuy')} className='text-2xl ' />
          <a target="_blank" className='inline-flex gap-2 items-center mt-2' href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon className='size-7' /> Discogs</a>
          <a target='_blank' className='inline-flex gap-2 items-center' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
              <EarthIcon  className='size-7' />
              <Text text='Cornerstone' className='text-base' />
            </a>
          <a target='_blank' className='inline-flex gap-2 items-center'href='https://diskunion.net/reggae/ct/detail/1008733142'>
              <EarthIcon  className='size-7' />
              <Text text='Disk Union' className='text-base' />
            </a>
        </div>
      </div>
    </motion.div>
    </>
  )
}