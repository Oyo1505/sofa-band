import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {unstable_setRequestLocale} from 'next-intl/server';

export default function Home({params: {locale}}:{params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  return (
   <div>
    <h1>{t('title')}</h1>
  </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}