import Container from '@/domains/ui/components/container/container';
import React from 'react'
const Layout = async ({children}:{children:React.ReactNode}) => 
<Container className='min-h-full sm:min-h-screen'>
  {children}
</Container>
export default Layout
