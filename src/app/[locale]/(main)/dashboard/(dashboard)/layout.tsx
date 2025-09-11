import { redirect } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import dynamic from 'next/dynamic';
import React from 'react';
const MenuAside = dynamic(() => import('@/domains/dashboard/components/menu-aside/menu-aside'));

const Layout = async ({ children, params }: { children: React.ReactNode, params:  Promise<{ locale: string}> }) => {
  const session = await auth()
  const { locale } = await params
  if (!session) return redirect({ href: '/', locale })
  return (
    <>
      <div className='flex h-full justify-between gap-4 p-3 overflow-scroll text-black  rounded-lg pb-10'>
        <MenuAside />
        <div className="grow overflow-scroll min-h-96 bg-neutral-800 text-white rounded-md p-3">
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout
