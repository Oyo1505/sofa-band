'use client'
import Image from 'next/image'
import React from 'react'
import bande from "../../../../public/image/front_band.jpg";
import { motion } from 'framer-motion';

export const HomePageImage = () => {
  const variants = {
    initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    animate: {
      opacity: 1, 
      scale: [1.1, 1], // effet de rebond
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.2, 0.9] // courbe d'animation pour le rebond
      }
    },
    exit: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
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
