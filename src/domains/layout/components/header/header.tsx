import Container from '@/domains/ui/components/container/container'
import React from 'react'
import MenuMobile from '../menu-mobile/menu-mobile'
import MenuNav from '../menu-nav/menu-nav'

const Header =  ({locale}:{locale:string}) => {
  return (
    <>
    <header className="hidden md:flex group fixed w-full top-0  h-15  pt-2 pb-2 items-center gap-4 z-20 justify-between lg:justify-end">
      <Container >
        <MenuNav locale={locale} />
      </Container>
    </header>
    <MenuMobile locale={locale}/> 
    </>
  )
}

export default Header