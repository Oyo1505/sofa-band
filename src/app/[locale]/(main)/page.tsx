import { routing } from "@/i18n/routing";
import { setRequestLocale } from 'next-intl/server';
import TitlesContainer from "@/domains/home-page/components/titles-container/titles-container";

export default async function Home({ params }: { params: any }) {
  const { locale } = await params
  setRequestLocale(locale);

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <TitlesContainer />
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
