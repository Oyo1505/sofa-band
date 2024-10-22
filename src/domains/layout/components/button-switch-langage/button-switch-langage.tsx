'use client'
import { Link, usePathname } from '@/i18n/routing'

import React from 'react'

const ButtonSwitchLangage = ({locale}: {locale : string}) => {
  const pathname = usePathname()
  const path = pathname.replace(`${locale}`, "/");
  return (
  <Link href={path} locale={locale === 'jp' ? 'en' : 'jp'}>
    Lang {locale === 'jp' ? '🇯🇵' : '🇬🇧' }
  </Link>
  )
}

export default ButtonSwitchLangage