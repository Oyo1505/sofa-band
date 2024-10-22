import { routing } from "@/i18n/routing";
import {setRequestLocale} from 'next-intl/server';
import Image from "next/image";
import bande from "../../../public/image/front_band.jpg";
import TitlesContainer from "@/domains/home-page/components/titles-container/titles-container";

export default async function Home({params}:{params:any}) {
  const { locale } = await params
  setRequestLocale(locale);

  return (
  <div className="flex flex-col h-screen w-full">
   <div className="flex items-center h-full flex-1  justify-between">
    <div className="text-center relative w-full lg:w-6/12">
      <TitlesContainer />
    </div>

    <div className="lg:flex w-6/12 relative h-96 hidden  items-center justify-center">
      <div className="w-full z-10 absolute h-full clip-border-patate animate-patateInverse" />
      <div className="w-full z-10 absolute bottom-2 h-full">
        <Image src={bande} priority alt={'Sofa Band'} className="z-9 object-cover grayscale clip-patate animate-patate w-full h-full" />
      </div>
      </div>
    </div>
  </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}