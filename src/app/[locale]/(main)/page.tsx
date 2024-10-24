import { routing } from "@/i18n/routing";
import {setRequestLocale} from 'next-intl/server';
import TitlesContainer from "@/domains/home-page/components/titles-container/titles-container";
import { HomePageImage } from "@/domains/home-page/components/home-page-image/home-page-image";

export default async function Home({params}:{params:any}) {
  const { locale } = await params
  setRequestLocale(locale);

  return (
  <div className="flex flex-col h-screen w-full">
   <div className="flex items-center h-full flex-1  justify-between">
    <div className="text-center relative w-full lg:w-6/12">
      <TitlesContainer />
    </div>
      <HomePageImage />
    </div>
  </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}