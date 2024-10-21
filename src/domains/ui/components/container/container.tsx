"use client"
import { cn } from '@/libs/utils'

import React from 'react'

interface Props {
  className? : string
  children: React.ReactNode
}
const Container = ({children, className}:Props) => {
  return (
    <div className={cn('container pr-7 pl-7 md:pr-3 md:pl-3', className)}>{children}</div>
  )
}

export default Container