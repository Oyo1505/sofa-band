'use client'
import { motion, useScroll } from 'framer-motion';


const scales = [0.4, 0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7];
const speeds = [90,190, 110, 90, 120];
const texts = ['Sofa Rockers', 'ソファロッカー','דיוואַן ראָקקערס', 'صوفا الروك', 'โซฟาโยก', 'सोफा रॉकर्स', '소파 락커스', '沙發搖椅', 'சோபா ராக்கர்ஸ்', 'સોફા રોકર્સ', 'დივან როკერები', 'ಸೋಫಾ ರಾಕರ್ಸ್']
const Slide = ({index, fromRight = false}:{index:number,fromRight:boolean}) => {

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  }
  const textsParallax = shuffleArray(texts)
  const scaleIndex = index % scales.length;
  const speed = speeds[scaleIndex];
  
  return (
    <div className="h-[20%] overflow-hidden flex items-center">
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_100px,_black_calc(100%-100px),transparent_100%)]">
        <div 
          className="flex items-center justify-center md:justify-start" 
          style={{
            animation: `${fromRight ? 'infinite-scroll-right' : 'infinite-scroll-left'} ${speed}s linear infinite`
          }}
        >
          {textsParallax.map((text, index) => (
            <Phrase key={`first-${index}`} text={text}/>
          ))}
        </div>
        <div 
          className="flex items-center justify-center md:justify-start " 
          style={{
            animation: `${fromRight ? 'infinite-scroll-right' : 'infinite-scroll-left'} ${speed}s linear infinite`
          }}
        >
          {textsParallax.map((text, index) => (
            <Phrase key={`second-${index}`} text={text}/>
          ))}
        </div>
      </div>
    </div>
  )
}

const Phrase = ({text}:{text:string}) => {
  return (
    <span className="text-[25vw] md:text-[7vw] text-center w-full font-staatliches uppercase font-outfit font-extrabold text-blue-900 relative whitespace-nowrap"> {text}<span className="pl-2 pr-2 text-blue-900">•</span></span>
  );
}

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  return (
    <motion.div 
      className='absolute inset-0 -z-1 overflow-hidden h-auto bg-gradient-to-b from-gray-200 to-white opacity-65'
      style={{
        y: scrollY.get() * 0.5
      }}
    >
      <div className='h-full flex flex-col justify-center'>
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