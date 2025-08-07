import { routing } from "@/i18n/routing";
import { setRequestLocale } from 'next-intl/server';
import TitlesContainer from "@/domains/home-page/components/titles-container/titles-container";
import LiveList from "@/domains/show-page/components/live-list/live-list";
import MusicList from "@/domains/music-page/components/music-list/music-list";
import { getEvents } from "@/domains/dashboard/action";
import ShowList from "@/domains/show-page/components/show-list/show-list";
import moment from "moment";
import ImageHero from "@/domains/home-page/components/image-hero/image-heo";
import AnimatedSectionHomePage from "@/domains/ui/components/animated-section_home-page/animated-section_home-page";
import { EventData } from "@/models/show/show";

const revalidate = 60;


const getData = async () => {
  const { events } = await getEvents()
  return events
}

export default async function Home({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale);
  const events = await getData();
  const sortedData: EventData[] = events.sort((a, b) => moment(b.date).diff(moment(a.date)))
  return (
    <div className=" flex flex-col md:gap-30 gap-10  items-start justify-start w-full">
      <section className='w-full h-96 flex n items-center gap-10'> 
       <TitlesContainer />
       <ImageHero />
      </section>
      <MusicList />
      <AnimatedSectionHomePage className='flex flex-col md:flex-row gap-5 w-full'> 
        <ShowList events={sortedData} />
        <LiveList />
      </AnimatedSectionHomePage>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
