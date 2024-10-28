import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation'

import React from 'react'

const Page = async () => {
  const session = await auth()

  if(!session) return redirect('/')
  return (
    <div>Dashboard</div>
  )
}

export default Page