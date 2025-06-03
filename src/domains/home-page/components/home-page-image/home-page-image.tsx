//@ts-nocheck
'use client'
import Image from 'next/image'
import React from 'react'
import bande from "../../../../public/image/front_band.jpg";
import { motion } from 'framer-motion';

export const HomePageImage = () => {
  const variants = {
    initial: { opacity: 0, scale: 0.8, filter: 'blur(5px)' },
    animate: {
      opacity: 1,
      scale: [0.95, 1],
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.6, 0.05, 0.2, 0.9]
      }
    },

  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.3 }}
      variants={variants}
      className="lg:flex w-6/12 relative h-96 hidden items-center justify-center"
    >
      <div className="w-full z-10 absolute h-full clip-border-patate animate-patateInverse" />
      <div className="w-full z-10 absolute bottom-2 h-full">
        <Image src={bande} priority alt={'Sofa Band'} className="z-9 object-cover grayscale clip-patate animate-patate w-full h-full" />
      </div>
    </motion.div>
  )
}
