"use client";
import AnimatedSectionHomePage from "@/domains/ui/components/animated-section_home-page/animated-section_home-page";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import Title from "@/domains/ui/components/title/title";
import { useTranslations } from "next-intl";
import AlbumList from "../album-list/album-list";

const MusicList = () => {
  const t = useTranslations("MusicPage");

  return (
    <AnimatedSectionHomePage
      duration={0.2}
      className="flex flex-col gap-5 w-full"
      amount={0.4}
    >
      <BlurIn duration={0.6} blur={7}>
        <Title
          type="h2"
          text={t("ourMusic")}
          className="text-3xl text-foreground font-bold"
        />
      </BlurIn>
      <AlbumList />
    </AnimatedSectionHomePage>
  );
};

export default MusicList;
