import { routing } from "@/i18n/routing";
import { setRequestLocale } from 'next-intl/server';
import TitlesContainer from "@/domains/home-page/components/titles-container/titles-container";
import LiveList from "@/domains/show-page/components/live-list/live-list";
import MusicList from "@/domains/music-page/components/music-list/music-list";
import { getEvents } from "@/domains/dashboard/action";
import ShowList from "@/domains/show-page/components/show-list/show-list";
import moment from "moment";
import Image from "next/image";
import band from '@/public/image/front_band.jpg'
const revalidate = 60;

const getData = async () => {
  const { events } = await getEvents()
  return events
}

export default async function Home({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale);
  const events = await getData();
  const sortedData = events.sort((a, b) => moment(b.date).diff(moment(a.date)))
  return (
    <div className=" flex flex-col gap-30 items-start justify-start w-full">
      <div className='w-full h-96 flex justify-between items-center gap-10'>
       <TitlesContainer />
       <div className='w-full h-full relative'>
        <Image src={band} alt='sofa-band' width={400} height={500} className='h-full w-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/50 to-transparent w-1/3 h-full'></div>
        <div className='absolute inset-0 bg-gradient-to-l from-neutral-900 via-neutral-900/50 to-transparent w-1/3 h-full ml-auto'></div>
       </div>
      </div>
      <MusicList />
      <div className='flex flex-col md:flex-row gap-5 w-full'> 
        {/* @ts-ignore */}
        <ShowList events={sortedData} />
        <LiveList />
      </div>
       
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
