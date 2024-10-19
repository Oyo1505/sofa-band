import Container from '@/domains/ui/components/container/container';

import { unstable_setRequestLocale } from 'next-intl/server';
import React, { Suspense } from 'react'

const Layout = ({children, params: {locale}}:{children:React.ReactNode,params:{locale:string}}) => {
  unstable_setRequestLocale(locale);
  return (
   <Suspense fallback={<p>Loading...</p>}> <Container className='h-full'>{children}</Container> </Suspense>
  )
}

export default Layout
