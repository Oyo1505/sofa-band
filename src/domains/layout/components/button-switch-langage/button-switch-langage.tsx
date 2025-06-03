'use client'
import { LanguageLogo } from '@/domains/ui/components/icons/icons'
import { Link, usePathname } from '@/i18n/routing'

import React from 'react'

const ButtonSwitchLangage = ({ locale }: { locale: string }) => {
  const pathname = usePathname()
  // const path = pathname.replace(`${locale}`, "/");
  return (
    <Link href={pathname} className='inline-flex gap-2' locale={locale === 'jp' ? 'en' : 'jp'}>
      <LanguageLogo /> <span>{locale === 'jp' ? '🇯🇵' : '🇬🇧'}</span>
    </Link>
  )
}

export default ButtonSwitchLangage
