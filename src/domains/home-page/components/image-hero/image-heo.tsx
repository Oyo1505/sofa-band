'use client'
import band from '@/public/image/front_band.jpg';
import { motion } from "framer-motion";
import Image from "next/image";

const ImageHero = () => {
  const variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  }
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ 
        duration: 0.05,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.05,
      }}
      className='w-full h-full relative hidden md:block'>
    <Image 
      src={band} 
      alt='sofa-band' 
      width={400} 
      fetchPriority='high'
      height={500} 
      className='h-full w-full object-cover' 
      sizes="(max-width: 768px) 0px, (max-width: 1200px) 50vw, 40vw"
      priority
      placeholder="blur"
    />
    <div className='absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/50 to-transparent w-1/3 h-full'></div>
    <div className='absolute inset-0 bg-gradient-to-l from-neutral-900 via-neutral-900/50 to-transparent w-1/3 h-full ml-auto'></div>
   
   </motion.div>
  )
}

export default ImageHero