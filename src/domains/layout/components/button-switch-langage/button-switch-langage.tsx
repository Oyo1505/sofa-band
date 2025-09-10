'use client'
import { LanguageLogo } from '@/domains/ui/components/icons/icons'
import { Link, usePathname } from '@/i18n/routing'
import { memo } from 'react'

const ButtonSwitchLangage = memo(({ locale }: { locale: string }) => {
  const pathname = usePathname()
  // const path = pathname.replace(`${locale}`, "/");
  return (
    <Link href={pathname} className='inline-flex gap-2' locale={locale === 'jp' ? 'en' : 'jp'}>
      <LanguageLogo /> <span>{locale === 'jp' ? '🇯🇵' : '🇬🇧'}</span>
    </Link>
  )
})
ButtonSwitchLangage.displayName = 'ButtonSwitchLangage'
export default ButtonSwitchLangage
