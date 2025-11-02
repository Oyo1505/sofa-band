import cn from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

type TypeTitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Title = ({
  translationTheme,
  translationText,
  type = "h1",
  text,
  children,
  className,
  textColor,
}: {
  translationTheme?: string;
  translationText?: string;
  type?: TypeTitleType;
  text?: string;
  textColor?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const t = useTranslations(translationTheme || "");

  const Tag = React.createElement;

  const content =
    text || (translationText && translationTheme ? t(translationText) : null);

  return Tag(
    type.toLowerCase(),
    { className: cn(className, textColor) },
    content,
    children
  );
};

export default Title;
