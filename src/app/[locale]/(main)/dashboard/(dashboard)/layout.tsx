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
    <div className='flex pt-24 pb-10  flex-col h-screen'>
      <div className='flex h-screen justify-between p-3 overflow-scroll text-black bg-foreground rounded-lg'>
        <MenuAside />
        <div className="grow overflow-scroll">
          {children}
        </div>

      </div>

    </div>
  )
}

export default Layout
