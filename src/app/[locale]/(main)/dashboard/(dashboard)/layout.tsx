import MenuAside from '@/domains/dashboard/components/menu-aside/menu-aside'
import { redirect } from '@/i18n/routing'
import { auth } from '@/lib/auth'
import { useLocale } from 'next-intl'
import React from 'react'

const Layout = async ({ children, params }: { children: React.ReactNode, params: any }) => {
  const session = await auth()
  const { locale } = await params
  if (!session) return redirect({ href: '/', locale })
  return (
    <>
      <div className='flex h-full justify-between gap-4 p-3 overflow-scroll text-black  rounded-lg pb-10'>
        <MenuAside />
        <div className="grow overflow-scroll h-96 bg-foreground rounded-md p-3">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
