"use client"
import { cn } from '@/libs/utils'
import { motion } from "framer-motion";
import React from 'react'

interface Props {
  className? : string
  children: React.ReactNode
}
const Container = ({children, className}:Props) => {
  return (
    <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
   className={cn('container pr-7 pl-7 md:pr-3 md:pl-3', className)}>{children}</motion.div>
  )
}

export default Container