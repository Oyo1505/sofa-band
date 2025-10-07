import Footer from '@/domains/layout/components/footer/footer';
import Header from '@/domains/layout/components/header/header';
import LayoutLogic from '@/domains/layout/components/layout-logic/layout-logic';
import ErrorBoundary from '@/domains/ui/components/error-boundary/error-boundary';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Locale } from '@/shared/models/locale';
import { Metadata } from 'next';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Mulish, Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import "../globals.css";

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  preload: true,
})

const mulish = Mulish({
  weight: ['400', '700'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
  preload: true,
})

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale };
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  return {
    title: 'Sofa Rockers',
    keywords: 'music, japan, osaka, rockers, sofa',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ja': '/ja',
      },
    },
  };
}


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params as { locale: Locale };
 
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={cn( ubuntu.className, mulish.className, 'bg-neutral-900')}>
  
          <div className='relative'>
            <LayoutLogic>
              <NextIntlClientProvider messages={messages}>
                <ErrorBoundary>
                  <Header locale={locale} />
                  {children}
                  <Footer />
                </ErrorBoundary>
              </NextIntlClientProvider>
            </LayoutLogic>
          </div>
      </body>
    </html>
  );
}
