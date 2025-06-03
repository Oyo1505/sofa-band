import clsx from 'clsx'
import React, { ReactNode } from 'react'

const HomePageBlock = ({ className, children }: { className: string, children: ReactNode }) => {
  return (
    <div className={clsx(className)}>{children}</div>
  )
}

export default HomePageBlock
