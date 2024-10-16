import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 import "../globals.css"
import Header from '@/domains/layout/header/components/header/header';
import { Suspense } from 'react';
export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  const messages = await getMessages();
 
  return (
    <html lang={locale}>
    <body className='h-screen relative bg-gradient-to-r from-lime-400 via-green-500 to-teal-600'>
      <NextIntlClientProvider messages={messages}>
        <Header locale={locale} />
        <Suspense>
          {children}
        </Suspense>
      </NextIntlClientProvider>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full grain-effect"></div>
      </div>
      
    </body>
  </html>
  );
}