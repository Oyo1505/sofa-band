import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css"
import { RocknRoll_One } from 'next/font/google'
import Header from '@/domains/layout/components/header/header';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { cn } from '@/libs/utils';

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
  const header = await headers()
  const localeHeader = header.get('x-next-intl-locale');
  const { locale } = await params;
  const messages = await getMessages();
  if(localeHeader === null){
    return
  }
  return (
    <html lang={locale}>
    <body className={cn(rock.className, 'antialiased')}>
      <div className='relative noise-container'>
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <Suspense>
          {children}
        </Suspense>
       
      </NextIntlClientProvider>
      <div className="absolute inset-0 pointer-events-none noise z-0" /> 
    </div>
    </body>
  </html>
  );
}