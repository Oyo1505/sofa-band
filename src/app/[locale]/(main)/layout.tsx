import Container from '@/domains/ui/components/container/container';
import React from 'react'
const Layout = async ({ children }: { children: React.ReactNode }) =>
  <Container className='md:mt-[100px]'>
    {children}
  </Container>
export default Layout
