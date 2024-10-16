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
    <body>
      <div className='relative h-screen noise-container'>
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