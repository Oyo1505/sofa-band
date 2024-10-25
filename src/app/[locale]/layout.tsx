import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css"
import { RocknRoll_One } from 'next/font/google'
import Header from '@/domains/layout/components/header/header';
import { cn } from '@/libs/utils';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

const rock = RocknRoll_One({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
})

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params:any
}) {

  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
    <body className={cn(rock.className, 'antialiased')}>
      <div className='relative noise-container'>
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
          {children}
      </NextIntlClientProvider>
      <div className="absolute inset-0 pointer-events-none noise z-0" /> 
    </div>
    </body>
  </html>
  );
}