'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import { URL_DASHBOARD, URL_HOME, URL_LIVE, URL_MUSIC, URL_SHOWS } from '@/lib/routes'
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage'
import { DiscogsIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons'
import { Link } from '@/i18n/routing'
import ButtonLogin from '../button-login/button-login'
import { useSession } from 'next-auth/react'

const MenuNav = ({locale}:{locale:string}) => {
  const t = useTranslations('Header')
  const session = useSession();

  return (
    <div className='flex justify-between items-center h-20'>
    <nav className='flex text-lg gap-9 items-center justify-start'>
      <div><Link href={URL_HOME} >{t('Home')}</Link></div>
      <div><Link href={URL_MUSIC} >{t('Music')}</Link></div>
      <div><Link href={URL_SHOWS} >{t('Shows')}</Link></div>
      <div><Link href={URL_LIVE} >{t('Live')}</Link></div>
    </nav>
    <div className='flex gap-4 items-center'>
      <ButtonLogin />
      {session.status === 'authenticated' && <Link href={URL_DASHBOARD} >{t('Dashboard')}</Link>}
      <a target="_blank" href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a>
      <a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a>
      <a target="_blank" href="http://cornerstone.shop-pro.jp/?pid=176992470"><Spotify /></a>
      <ButtonSwitchLangage locale={locale} />
    </div>
  </div>
  )
}

export default MenuNav