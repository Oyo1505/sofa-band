'use client'
import { DiscogsIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons'
import { Link } from '@/i18n/routing'
import { URL_DASHBOARD, URL_HOME } from '@/lib/routes'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import ButtonLogin from '../button-login/button-login'
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage'

const MenuNav = ({ locale }: { locale: string }) => {
  const t = useTranslations('Header')
  const session = useSession();
  const segments = usePathname()
  const dashboard = useMemo(() => segments.includes('/dashboard'),[segments])
  const auth = session.status === 'authenticated'
 
  return (
    <div className='flex justify-between items-center h-20'>
      <nav className='flex text-lg gap-9 items-center justify-start'>
      {dashboard && auth && <div><Link href={URL_HOME} >{t('Home')}</Link></div>} 
      </nav>
      <div className='flex gap-4 items-center'>
        <ButtonLogin />
        {session.status === 'authenticated' && <Link href={URL_DASHBOARD} >{t('Dashboard')}</Link>}
        <a target="_blank" aria-label='instagram'   href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a>
        <a target="_blank" aria-label='discogs' href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a>
        <a target="_blank" aria-label='spotify' href="http://cornerstone.shop-pro.jp/?pid=176992470"><Spotify /></a>
        <ButtonSwitchLangage locale={locale} />
      </div>
    </div>
  )
}

export default MenuNav
