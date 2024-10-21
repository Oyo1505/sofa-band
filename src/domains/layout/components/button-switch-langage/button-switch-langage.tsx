'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonSwitchLangage = ({locale}: {locale : string}) => {
  const [isSwitching, setIsSwitching] = React.useState(false)
  const pathname = usePathname()
  const path = pathname.replace(`${locale}`, "/");
  return (
  <Link href={path} locale={locale === 'jp' ? 'en' : 'jp'}>
    Lang : {locale === 'jp' ? '🇬🇧' : '🇯🇵' }
  </Link>
  )
}

export default ButtonSwitchLangage