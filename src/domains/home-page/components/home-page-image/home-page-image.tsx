//@ts-nocheck
'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import bande from "../../../../public/image/front_band.jpg";

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
      <div className="w-full z-10 absolute bottom-2 h-full">
        <Image 
          src={bande} 
          alt={'Sofa Band'} 
          className="z-9 object-cover grayscale  w-full h-full" 
          sizes="(max-width: 1024px) 0px, 50vw"
          loading="lazy"
          placeholder="blur"
        />
      </div>
    </motion.div>
  )
}
