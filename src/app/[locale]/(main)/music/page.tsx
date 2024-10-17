import React from 'react'
import lalalie from '../../../../public/image/lalalie.webp'
import ifyou from '../../../../public/image/if.png'
import AlbumItem from '@/domains/music-page/components/album-item/album-item'
import Title from '@/domains/ui/components/title/title'
import { useTranslations } from 'next-intl'
import { EarthIcon, Spotify } from '@/domains/ui/components/icons/icons'
import Text from '@/domains/ui/components/text/text';
import whisky from '../../../../public/audio/whisky.mp3';
import if_you from '../../../../public/audio/ifyou.mp3';
import lala from '../../../../public/audio/la_la_la_lie.mp3';
import caseof from '../../../../public/audio/caseof.mp3';

export default function Page({params: {locale}} : {params:{locale:string}}) {
  const t = useTranslations('MusicPage');

  const Eps = [{
    title: 'If You / ウイスキーが、お好きでしょ',
    image: ifyou,
    songs: [
      {
        track:'If You',
        sound: if_you
      }, 
      {
        track: 'ウイスキーが、お好きでしょ',
        sound:whisky
      }
    ],
    label: 'タカラディスク',
    ref: 'TD-005',
    releaseYear: 2022
  }, {
    title: 'La la la lie / Case Of Insanity',
    image: lalalie,
    songs: [
      {
        track:'La la la lie',
        sound:lala
      }, 
      {
        track:'Case Of Insanity', 
        sound:caseof
      }],
    label : 'タカラディスク',
    ref: 'TD-006',
    releaseYear: 2023
  }];

  return (
    <>
    <div className='flex flex-col h-screen items-start w-full justify-center'>

        {Eps?.sort((a ,b) => b.releaseYear - a.releaseYear).map((item, index)=>(
          <AlbumItem key={index} image={item.image} title={item.title} songs={item.songs} label={item.label} reference={item.ref} releaseYear={item?.releaseYear} />
        ))} 
      <div className='flex flex-row w-full justify-evenly'>
        <div className='pt-10 flex flex-col gap-2 items-start justify-center'>
          <Title type='h2' text={t('whereToListen')} className='text-2xl pt-10' />
            <a target='_blank' className='flex w-full flex-row gap-2 items-center justify-start' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
              <Spotify  className='size-7' />
              <Text text='Spotify' className='text-base' />
            </a>
        </div>
        <div className='pt-10 flex flex-col items-start gap-2 justify-start'>
          <Title type='h2' text={t('whereToBuy')} className='text-2xl pt-10' />
          <a target='_blank' className='flex w-full flex-row gap-2 items-center justify-start' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
              <EarthIcon  className='size-7' />
              <Text text='Cornerstone' className='text-base' />
            </a>
          <a target='_blank' className='flex w-full flex-row gap-2 items-center justify-start' href='https://diskunion.net/reggae/ct/detail/1008733142'>
              <EarthIcon  className='size-7' />
              <Text text='Disk Union' className='text-base' />
            </a>
        </div>
      </div>
    </div>
    </>
  )
}