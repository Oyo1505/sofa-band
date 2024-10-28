import Container from '@/domains/ui/components/container/container';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation'

import React from 'react'

const Page = async () => {
  const session = await auth()

  if(!session) return redirect('/')
  return (
    <div className='flex flex-col h-1/2 bg-foreground rounded-sm'> d</div>
  )
}

export default Page