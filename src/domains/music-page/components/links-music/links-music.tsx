import { DiscogsIcon, EarthIcon, Spotify } from "@/domains/ui/components/icons/icons"
import Text from "@/domains/ui/components/text/text"
import Title from "@/domains/ui/components/title/title"
import { useTranslations } from "next-intl";

const LinksMusic = () => {
  const t = useTranslations('Footer');
  return (
    <div className='flex flex-col md:flex-row gap-5 w-full my-10 justify-evenly items-start'>
    <div className='flex flex-col gap-2 items-start justify-center'>
      <Title type='h2' text={t('whereToListen')} className='text-2xl' />
      <a target='_blank' className='inline-flex gap-2 items-center mt-2' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
        <Spotify className='size-7' />
        <Text text='Spotify' className='text-base' />
      </a>
    </div>
    <div className='flex flex-col items-start gap-2 justify-start'>
      <Title type='h2' text={t('whereToBuy')} className='text-2xl ' />
      <a target="_blank" className='inline-flex gap-2 items-center mt-2' href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers">
       <DiscogsIcon className='size-7' /> Discogs
      </a>
      <a target='_blank' className='inline-flex gap-2 items-center' href='http://cornerstone.shop-pro.jp/?pid=176992470'>
        <EarthIcon className='size-7' />
        <Text text='Cornerstone' className='text-base' />
      </a>
      <a target='_blank' className='inline-flex gap-2 items-center' href='https://diskunion.net/reggae/ct/detail/1008733142'>
        <EarthIcon className='size-7' />
        <Text text='Disk Union' className='text-base' />
      </a>
    </div>  
  </div>

  )
}

export default LinksMusic