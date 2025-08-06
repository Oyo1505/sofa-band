//@ts-nocheck
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { animate, motion, useCycle } from 'framer-motion'
import { MenuToggle } from '../button-toggle-menu/button-toggle-menu'
import { useDimensions } from '../../hooks/use-dimensions';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ButtonSwitchLangage from '../button-switch-langage/button-switch-langage';
import { DiscogsIcon, InstagramIcon, Spotify } from '@/domains/ui/components/icons/icons';
import { URL_HOME, URL_LIVE, URL_MUSIC, URL_SHOWS } from '@/lib/routes';

const sidebar = {
  open: () => ({
    x: 0,
    transition: {
      duration: 0.3,
    }
  }),
  animate: { x: -350, transition: { duration: 0.5 }, },
  closed: {
    x: -350,
    transition: {
      duration: 0.9,
    }
  }
};

const variantsLi = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  }
};

const ItemMenu = ({ item, link, onClick, lang, locale }: { item?: string, link?: string, onClick: () => void, lang?: boolean, locale?: string }) => {

  return (
    <motion.li
      initial={{ opacity: 0 }}
      onClick={onClick}
      className='text-black pt-1 pb-2 '
      variants={variantsLi}
    >
      {link && item && !lang ? <Link href={`${link}`}>{item}</Link> : locale && <ButtonSwitchLangage locale={locale} />}
    </motion.li>
  )
}

const MenuMobile = ({ locale, router }: { locale: string }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const t = useTranslations('Header');

  const variantsContainer = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
  };

  const links = [
    {
      link: URL_HOME,
      item: t('Home')
    }
  ];

  return (
    <>

      <motion.nav
        className='md:hidden font-shippori fixed top-0 left-0 w-52 z-20'
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div initial='hidden' animate='visible' className={`absolute top-0 ${isOpen ? 'block' : 'hidden'} -left-(350px) w-80 bg-foreground h-screen`} variants={sidebar} />
        <motion.ul className={`${isOpen ? 'block' : 'hidden'} p-25 relative top-24 w-56 left-4 flex flex-col gap-2`} variants={variantsContainer}>
          {links && links?.map(({ link, item }) => <ItemMenu onClick={toggleOpen} key={link} item={item} link={link} />)}
          <ItemMenu lang={true} locale={locale} />
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
              initial={{ opacity: 0 }}
              onClick={toggleOpen}
              className='text-black flex items-center gap-2'
              variants={variantsLi}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <a target="_blank" href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"><DiscogsIcon /></a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0 }}
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
