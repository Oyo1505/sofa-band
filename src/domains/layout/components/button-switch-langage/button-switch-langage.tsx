'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonSwitchLangage = ({locale}, props: {locale : string}) => {
  const pathname = usePathname()
  const path = pathname.replace(`${locale}`, "/");
  return (
  <Link {...props} href={path} locale={locale === 'jp' ? 'en' : 'jp'}>
    Lang : {locale === 'jp' ? '🇯🇵' : '🇬🇧' }
  </Link>
  )
}

export default ButtonSwitchLangage