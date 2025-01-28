//@ts-nocheck
'use client'
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { URL_DASHBOARD, URL_SIGNIN } from '@/lib/routes';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Template({ children } : { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const locales = useLocale();
  const pathname = usePathname();

  // Variantes pour l'animation de la page
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.9,
      rotateX: 20
    },
    enter: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      rotateX: -20,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Variantes pour l'overlay de transition
  const overlayVariants = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut" 
      }
    }
  };

  const shouldAnimate = pathname !== '/en' && 
                       pathname !== '/jp' && 
                       pathname !== `/${locales}${URL_DASHBOARD}/*` && 
                       pathname !== `/${locales}${URL_SIGNIN}` && 
                       !isMobile;

  return (
    shouldAnimate ? (
      <div className="relative">
        <motion.div
          className="fixed inset-0 bg-linear-to-tr from-[rgba(235,150,31,0.3)] to-[rgba(73,161,163,0.78)] backdrop-blur-xs z-1"
          initial="initial"
          animate="enter" 
          exit="exit"
          variants={overlayVariants}
        />
        <motion.div
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          className="relative z-1 perspective-1000"
        >
          {children}
        </motion.div>
      </div>
    ) : (
      <>{children}</>
    )
  );
}