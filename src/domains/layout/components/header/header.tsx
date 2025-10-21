"use client";
import Container from "@/domains/ui/components/container/container";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { useDimensions } from "../../hooks/use-dimensions";
import useScrollPosition from "../../hooks/use-scroll-positon";
import MenuNav from "../menu-nav/menu-nav";

const MenuMobile = dynamic(() => import("../menu-mobile/menu-mobile"), {
  ssr: false,
});

const Header = ({ locale }: { locale: string }) => {
  const positionY = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(ref);
  const isScrolledAfterHeader = positionY > height;

  return (
    <>
      <header
        ref={ref}
        className={`font-bold hidden md:flex group fixed w-full top-0  h-15  pt-2 pb-2 items-center gap-4 z-20 justify-between lg:justify-end transition-all duration-300 bg-neutral-900 ${
          isScrolledAfterHeader
            ? "shadow-md shadow-neutral-800/50"
            : "shadow-none"
        }`}
      >
        <Container>
          <MenuNav locale={locale} />
        </Container>
      </header>
      <Suspense>
        <MenuMobile locale={locale} />
      </Suspense>
    </>
  );
};

export default Header;
