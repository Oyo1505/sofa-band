import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css"
import { RocknRoll_One } from 'next/font/google'
import Header from '@/domains/layout/components/header/header';
import { cn } from '@/lib/utils';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { SessionProvider } from "next-auth/react"
import LayoutLogic from '@/domains/layout/components/layout-logic/layout-logic';
import { auth } from '@/lib/auth';
import ParallaxBackground from '@/domains/ui/components/parallax-background/parallax-background';

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
      <body className={cn(rock.className)}>
        <SessionProvider session={session}>
          <div className='relative'>
            <LayoutLogic>
              <NextIntlClientProvider messages={messages}>
                <Header locale={locale} />
                {children}
              </NextIntlClientProvider>
            </LayoutLogic>
            <ParallaxBackground />
          </div>
        </SessionProvider >
      </body>
    </html>
  );
}
