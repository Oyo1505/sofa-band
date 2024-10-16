'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import React from 'react'

const ButtonSwitchLangage = ({locale}: {locale : string}) => {
  const [isSwitching, setIsSwitching] = React.useState(false)
  const pathname = usePathname()
  const path = pathname.replace(`${locale}`, "/");
  return (
  <Link href={path}  locale={locale === 'jp' ? 'en' : 'jp'}>
    Switch Langage {locale.toLocaleUpperCase()}
  </Link>
  )
}

export default ButtonSwitchLangage

/*<label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value=""  className="sr-only peer" />
      <div className={`relative w-11 h-6 bg-gray-200  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full ${locale === "en"  ? 'rtl:peer-checked:after:-translate-x-full' : ''} peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{locale}</span>
    </label>*/