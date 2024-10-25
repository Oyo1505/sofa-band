//@ts-nocheck
'use client'
import { useIsMobile } from '@/domains/shared/hooks/useIsMobile';
import Container from '@/domains/ui/components/container/container';
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation';

export default  function Template({ children } : { children: React.ReactNode }) {
  const  isMobile = useIsMobile();
  const pathname = usePathname();
  const anim = (variants: any,  custom=null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom
    };
  };

  const expand = {
    initial: {
        top: 0
    },
    enter : (i:number) => ({
        top: "100vh",
        transition: {
            duration: 0.4,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1],
        },
        transitionEnd: { height: "0", top: "0" }
    }),
    exit: (i:number) => ({
        height: "100vh",
        transition: {
            duration: 0.5,
            delay: 0.05 * i,
            ease: [0.215, 0.61, 0.355, 1]
        }
    })

}
 const opacity = {
    initial: {
        opacity: 0
    },
    animate: { opacity: 0, transition: { duration: 0.5 }},
}

const nbOfColumns = 4

  return (
    pathname !== '/en' &&  pathname !== '/jp' && !isMobile ?
    <>
    <div className='stairs'>
            <motion.div {...anim(opacity)} className='transition-background' />
            <div className='transition-container'>
                {
                    [...Array(nbOfColumns)].map((_, i) => (
                        <motion.div
                            key={i}
                            {...anim(expand, nbOfColumns - i)}
                            exit={{ opacity: 0 }}
                            className="relative w-full bg-black h-10"
                        />
                    ))
                }
            </div>

        <Container className='min-h-full sm:min-h-screen'>
          {children}
          </Container>
        </div>
      </>
       :
      <Container className='min-h-full sm:min-h-screen'>
        {children}
      </Container>
  );
} 