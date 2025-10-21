"use client";
import AnimatedWord from "@/domains/ui/components/animated-word/animated-word";
import { BlurIn } from "@/domains/ui/components/blur-in/blur-in";
import { GlitchText } from "@/domains/ui/components/glitch-text/glitch-text";
import { useTranslations } from "next-intl";

const TitlesContainer = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col gap-2 items-start justify-start font-mulish">
      <GlitchText className="md:text-8xl text-6xl font-bold">SOFA</GlitchText>
      <GlitchText className="md:text-8xl text-6xl font-bold">
        ROCKERS
      </GlitchText>
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
