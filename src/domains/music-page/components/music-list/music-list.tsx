'use client'
import AlbumList from '../album-list/album-list';
import Title from '@/domains/ui/components/title/title';
import { useTranslations } from 'next-intl';
import AnimatedSectionHomePage from '@/domains/ui/components/animated-section_home-page/animated-section_home-page';

const MusicList = () => {
  const t = useTranslations('MusicPage');

  return (
    <AnimatedSectionHomePage  className='flex flex-col gap-5 w-full' amount={0.4}>
      <Title type='h2' text={t('ourMusic')} className='text-3xl text-amber-50 font-bold' />
      <AlbumList />
    </AnimatedSectionHomePage>
  )
}

export default MusicList