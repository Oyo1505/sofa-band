'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const scales = [0.4, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7];
const speeds = [15, 25, 35, 45, 55, 40, 30, 20];

const Slide = ({index, fromRight = false}:{index:number,fromRight:boolean}) => {

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  }
  const textsParallax = shuffleArray(['Sofa Rockers', 'ソファロッカー','דיוואַן ראָקקערס', 'صوفا الروك', 'โซฟาโยก', 'सोफा रॉकर्स', '소파 락커스', '沙發搖椅', 'சோபா ராக்கர்ஸ்', 'સોફા રોકર્સ'])
  const scaleIndex = index % scales.length;
  const speed = speeds[scaleIndex];
  const [windowWidth, setWindowWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const contentWidth = windowWidth;   

  return (
    <div className="h-[20%] overflow-hidden">
      <motion.div
        className='inline-flex'
        animate={{
          x: fromRight ? [0, -contentWidth/2, 0] : [-contentWidth/2, 0, -contentWidth/2],
        }}
        transition={{
          x: {
            repeat: Infinity,
            duration: speed * 2, // Double la durée car nous allons dans les deux sens
            ease: "linear",
            times: [0, 0.5, 1] // Points de contrôle pour l'animation
          }
        }}
      >
        {textsParallax.map((text, index) => (
          <Phrase key={`first-${index}`} text={text}/>
        ))}
        {textsParallax.map((text, index) => (
          <Phrase key={`second-${index}`} text={text}/>
        ))}
      </motion.div>
    </div>
  )
}

const Phrase = ({text}:{text:string}) => {
  return (
    <motion.p 
      className='text-[7vw] w-full font-staatliches uppercase font-extrabold text-blue-900 relative whitespace-nowrap'
      initial={{ filter: "blur(10px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{
   
        filter: {
          duration: .8,
          ease: "easeOut"
        }
      }}
    >
      {text}•
    </motion.p>
  );
}

const ParallaxBackground = () => {
  // const { scrollY } = useScroll();
  
  return (
    <motion.div 
      className='absolute inset-0 -z-1 overflow-hidden h-screen bg-gradient-to-b from-gray-200 to-white opacity-65'
      // style={{
      //   y: scrollY.get() * 0.5
      // }}
    >
      <div className='h-full flex flex-col justify-between'>
        <Slide index={0} fromRight={true}/>
        <Slide index={1} fromRight={false}/>
        <Slide index={2} fromRight={true}/>
        <Slide index={3} fromRight={false}/>
        <Slide index={4} fromRight={true}/>
      </div>
    </motion.div>
  );
};

export default ParallaxBackground;