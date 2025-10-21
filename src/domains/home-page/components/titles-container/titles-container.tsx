"use client";
import AnimatedWord from "@/domains/ui/components/animated-word/animated-word";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import { TextFade } from "@/domains/ui/components/gradual-spacing/gradual-spacing";
import { useTranslations } from "next-intl";

const TitlesContainer = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col gap-2 items-start justify-start font-mulish">
      <TextFade direction="up" className="md:text-8xl text-6xl font-bold">
        SOFA
      </TextFade>
      <AnimatedWord
        word="ROCKERS"
        duration={0.2}
        delay={0.2}
        className="md:text-8xl text-6xl font-bold"
      />
      <BlurIn duration={0.8}>
        <AnimatedWord
          word={t("desc")}
          delay={0.5}
          duration={0.5}
          className="text-2xl"
          onlyOpacity={true}
        />
      </BlurIn>
    </div>
  );
};

export default TitlesContainer;
