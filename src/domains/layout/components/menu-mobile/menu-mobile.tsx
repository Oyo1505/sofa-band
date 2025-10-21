"use client";
import {
  DiscogsIcon,
  InstagramIcon,
  Spotify,
} from "@/domains/ui/components/icons/icons";
import { Link } from "@/i18n/routing";
import { URL_DASHBOARD, URL_HOME } from "@/lib/routes";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import { useDimensions } from "../../hooks/use-dimensions";
import { useOutsideClick } from "../../hooks/use-ouside-click";
import useHandleMenuMobile from "../../hooks/useHandleMenuMobile";
import ButtonSwitchLangage from "../button-switch-langage/button-switch-langage";

const sidebar = {
  open: () => ({
    x: 0,
    transition: {
      duration: 0.3,
    },
  }),
  animate: { x: -350, transition: { duration: 0.5 } },
  closed: {
    x: -350,
    transition: {
      duration: 0.9,
    },
  },
};

const ItemMenu = ({
  item,
  link,
  onClick,
  lang,
  locale,
}: {
  item?: string;
  link?: string;
  onClick: () => void;
  lang?: boolean;
  locale?: string;
}) => {
  return (
    <li className="text-black w-full font-bold" onClick={onClick}>
      {link && item && !lang ? (
        <Link href={`${link}`}>{item}</Link>
      ) : (
        locale && <ButtonSwitchLangage locale={locale} />
      )}
    </li>
  );
};

const MenuMobile = ({ locale }: { locale: string }) => {
  const { closeMenuMobile, isOpen, toggleMenuMobile } = useHandleMenuMobile();
  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const t = useTranslations("Header");

  useOutsideClick(menuRef, () => {
    if (isOpen) {
      closeMenuMobile();
    }
  });

  const variantsContainer = useMemo(
    () => ({
      open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
      },
    }),
    [],
  );

  const links = useMemo(
    () => [
      {
        link: URL_HOME,
        item: t("Home"),
      },
      {
        link: URL_DASHBOARD,
        item: t("Dashboard"),
      },
    ],
    [t],
  );

  return (
    <>
      <motion.nav
        className="md:hidden fixed top-0 left-0 w-52 z-20"
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <div ref={menuRef}>
          <motion.div
            initial="hidden"
            animate="visible"
            className={`absolute top-0 ${
              isOpen ? "block" : "hidden"
            } -left-(350px) w-80 bg-foreground font-bold h-screen`}
            variants={sidebar}
          />
          <motion.ul
            className={`${
              isOpen ? "block" : "hidden"
            } p-25 relative top-24 w-80 left-4 flex flex-col gap-2`}
            variants={variantsContainer}
          >
            {links &&
              links?.map(({ link, item }) => (
                <ItemMenu
                  key={link}
                  item={item}
                  link={link}
                  onClick={() => toggleMenuMobile()}
                />
              ))}
            <ItemMenu
              lang={true}
              locale={locale}
              onClick={() => toggleMenuMobile()}
            />
            <div className="flex items-center gap-2">
              <li className="text-black flex items-center gap-2">
                <a
                  target="_blank"
                  href="https://www.instagram.com/sofa_rockers_posse/"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li className="text-black flex items-center gap-2">
                <a
                  target="_blank"
                  href="https://www.discogs.com/fr/artist/14308751-Sofa-Rockers"
                >
                  <DiscogsIcon />
                </a>
              </li>
              <li className="text-black flex items-center gap-2">
                <a
                  target="_blank"
                  href="http://cornerstone.shop-pro.jp/?pid=176992470"
                >
                  <Spotify fillcolor="black" />
                </a>
              </li>
            </div>
          </motion.ul>
        </div>
        {/* {!isOpen && <MenuToggle toggle={toggleMenu} />} */}
      </motion.nav>
    </>
  );
};

export default MenuMobile;
