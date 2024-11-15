'use client'
import Container from '@/domains/ui/components/container/container'
import React, { Suspense } from 'react'
import MenuNav from '../menu-nav/menu-nav'
import dynamic from 'next/dynamic';

const MenuMobile = dynamic(() => import('../menu-mobile/menu-mobile'), {ssr: false});

const Header =  ({locale}:{locale:string}) => {
  return (
    <>
    <header className={`${locale === 'jp' ? 'font-rock' : 'font-shippori'} font-bold hidden md:flex group fixed w-full top-0  h-15  pt-2 pb-2 items-center gap-4 z-20 justify-between lg:justify-end`}>
      <Container >
        <MenuNav locale={locale} />
      </Container> 
    </header>
    <Suspense>
      <MenuMobile locale={locale} /> 
    </Suspense>
    </>
  )
}

export default Header