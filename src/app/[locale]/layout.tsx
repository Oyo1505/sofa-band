import Footer from '@/domains/layout/components/footer/footer';
import Header from '@/domains/layout/components/header/header';
import LayoutLogic from '@/domains/layout/components/layout-logic/layout-logic';
import ErrorBoundary from '@/domains/ui/components/error-boundary/error-boundary';
import { routing } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import "../globals.css";

const ubuntu = Ubuntu({
  weight: '400',
  style: 'normal',
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Sofa Rockers',
  keywords : 'music, japan, osaka, rockers, sofa',
  metadataBase: new URL(`${process.env.NEXTAUTH_URL ?? ''}`),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ja': '/ja',
    },
  },
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any
}) {

  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  const session = await auth()
  return (
    <html lang={locale}>
      <body className={cn( ubuntu.className, 'bg-neutral-900')}>
        <SessionProvider session={session}>
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
        </SessionProvider >
      </body>
    </html>
  );
}
