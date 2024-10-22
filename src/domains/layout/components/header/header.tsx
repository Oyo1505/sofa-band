import Container from '@/domains/ui/components/container/container'
import React from 'react'
import MenuMobile from '../menu-mobile/menu-mobile'
import MenuNav from '../menu-nav/menu-nav'

const Header =  ({locale}:{locale:string}) => {
  return (
    <>
    
    <MenuMobile locale={locale}/> 
    </>
  )
}

export default Header