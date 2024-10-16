import Container from '@/domains/ui/components/container/container'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import React from 'react'
import { getLocale } from 'next-intl/server'
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage'

const Header =  ({locale}:{locale:string}) => {
  const t = useTranslations('Header')

  return (
    <header className="group fixed w-full top-0 flex h-15  pt-2 pb-2 items-center gap-4 z-20 justify-between lg:justify-end">
    <Container>
      <div className='flex justify-between items-center h-20'>
        <nav className='flex gap-9 items-center justify-start'>
          <div><Link href="/">{t('Home')}</Link></div>
          <div><Link href="/music">{t('Music')}</Link></div>
          <div><Link href="/about">{t('About')}</Link></div>
          <div><Link href="/shows">{t('Shows')}</Link></div>
          <div><Link href="/live">{t('Live')}</Link></div>
        </nav>
        <ButtonSwitchLangage locale={locale} />
      </div>
    </Container>
    </header>
  )
}

export default Header