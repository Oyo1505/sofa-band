import Container from '@/domains/ui/components/container/container';
import React, { Suspense } from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {

  return (
  <Suspense fallback={<p>Loading...</p>}> 
    <Container className='min-h-full sm:min-h-screen'>{children}</Container> 
  </Suspense>
  )
}

export default Layout
