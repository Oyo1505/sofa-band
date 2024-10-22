//@ts-nocheck
'use client'
import React, { useRef } from 'react'
import { motion, useCycle} from 'framer-motion'
import { MenuToggle } from '../button-toggle-menu/button-toggle-menu'
import { useDimensions } from '../../hooks/use-dimensions';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage';
import { DiscogsIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

const variantsLi = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const ItemMenu = ({item, link, onClick, lang, locale}:{ item?:string, link?:string,  onClick: () => void, lang?:boolean, locale?:string }) => {
 
  return(
      <motion.li
      onClick={onClick}
      className='text-black'
      variants={variantsLi}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      >
       {link && item && !lang ? <Link prefetch href={`${link}`}>{item}</Link> : locale && <ButtonSwitchLangage locale={locale} />} 
      </motion.li>
  )
}

const MenuMobile = ({locale}: { locale: string }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const t = useTranslations('Header');

  const variantsContainer = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

 const links = [
  {
    link:'/',
    item: t('Home')
  },
  {
    link:'/music',
    item: t('Music')
  },
  {
    link:'/shows',
    item: t('Shows')
  },
  {
    link:'/live',
    item: t('Live')
  }
 ];

  return (
    <>

    <motion.nav
        className='md:hidden fixed top-0 left-0 w-52 z-20'
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
      <motion.div className="absolute top-0 left-0 w-80 bg-foreground h-screen" variants={sidebar} />
      <motion.ul className='p-25 absolute top-24 w-56 left-4 flex flex-col gap-2' variants={variantsContainer}>
        {links && links?.map(({link, item}) => <ItemMenu onClick={toggleOpen} key={link} item={item} link={link} />)}
        <ItemMenu lang={true}  onClick={toggleOpen} locale={locale} />
        <div className='flex items-center gap-2'>
          <motion.li
          onClick={toggleOpen}
          className='text-black flex items-center gap-2'
          variants={variantsLi}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
        <a target="_blank" href="https://www.instagram.com/sofa_rockers_posse/"><InstagramIcon /></a>

       </motion.li>
       <motion.li
          onClick={toggleOpen}
          className='text-black flex items-center gap-2'
          variants={variantsLi}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
       <a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a>
       </motion.li>
       <motion.li
          onClick={toggleOpen}
          className='text-black flex items-center gap-2'
          variants={variantsLi}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
         <a target="_blank" href="http://cornerstone.shop-pro.jp/?pid=176992470"><Spotify fillcolor='black' /></a>
       </motion.li>
      </div>
      </motion.ul>
      <MenuToggle toggle={() => toggleOpen()} />
  </motion.nav>

    </>
  
  )
}

export default MenuMobile

