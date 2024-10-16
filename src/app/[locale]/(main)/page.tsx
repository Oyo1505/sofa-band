import Text from "@/domains/ui/components/text/text";
import Title from "@/domains/ui/components/title/title";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {unstable_setRequestLocale} from 'next-intl/server';
import Image from "next/image";
import bande from "../../../public/image/front_band.jpg";
import HomePageBlock from "@/domains/home-page/home-page_bloc/home-page_bloc";
import { DiscogsIcon, EarthIcon, InstagramIcon } from "@/domains/ui/components/icons/icons";

export default function Home({params: {locale}}:{params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  return (
  <div className="flex flex-col h-full w-full">
   <div className="flex items-center h-full flex-1  justify-between">
    <div className="text-center w-6/12">
      <Title className="text-8xl" text="Sofa Rockers" textColor="text-white"/>
      <Text className="text-3xl mt-10"  text="We are from Osaka and we are here to party. We love to eat baby alive and you ?" />
    </div>
    <div className="flex w-6/12 relative h-96 items-center justify-center">
      <div className="w-full z-10 absolute h-full clip-border-patate animate-patateInverse" />
      <div className="w-full z-10 absolute bottom-2 h-full">
          <Image src={bande} priority alt={'Sofa Band'} className="z-9 object-cover grayscale clip-patate animate-patate w-full h-full" />
        </div>
    </div>
  </div>
    <div className="w-full grid grid-flow-col">
      <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a></HomePageBlock>
      <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a></HomePageBlock>
      <HomePageBlock className="flex justify-center items-center h-16"><a target="_blank" href="http://cornerstone.shop-pro.jp/?pid=176992470"><EarthIcon /></a></HomePageBlock>
    </div>
  </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}