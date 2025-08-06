'use client'
import AlbumList from '../album-list/album-list';
import Title from '@/domains/ui/components/title/title';
import { useTranslations } from 'next-intl';

const MusicList = () => {
  const t = useTranslations('MusicPage');

  return (
    <div className='flex flex-col gap-5 w-full'>  
      <Title type='h2' text={t('ourMusic')} className='text-2xl text-amber-50' />
      <AlbumList />
    </div>
  )
}

export default MusicList