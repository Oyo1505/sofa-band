import Container from '@/domains/ui/components/container/container'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import React from 'react'
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage'
import { DiscogsIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons'

const Header =  ({locale}:{locale:string}) => {
  const t = useTranslations('Header')

  return (
    <header className="group fixed w-full top-0 flex h-15  pt-2 pb-2 items-center gap-4 z-20 justify-between lg:justify-end">
    <Container>
      <div className='flex justify-between items-center h-20'>
        <nav className='flex text-lg gap-9 items-center justify-start'>
          <div><Link href="/">{t('Home')}</Link></div>
          <div><Link href="/music" prefetch>{t('Music')}</Link></div>
          <div><Link href="/about" prefetch>{t('About')}</Link></div>
          <div><Link href="/shows" prefetch>{t('Shows')}</Link></div>
          <div><Link href="/live" prefetch>{t('Live')}</Link></div>
        </nav>
        <div className='flex gap-4'>
          <a target="_blank" href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a>
          <a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a>
          <a target="_blank" href="http://cornerstone.shop-pro.jp/?pid=176992470"><Spotify /></a>
          <ButtonSwitchLangage locale={locale} />
        </div>
      </div>
    </Container>
    </header>
  )
}

export default Header