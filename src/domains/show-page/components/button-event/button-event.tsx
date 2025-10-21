"use client";
import Text from "@/domains/ui/components/text/text";
import { useTranslations } from "next-intl";
import React from "react";

const ButtonEvent = ({ link }: { link: string }) => {
  const t = useTranslations("ShowPage");
  return (
    <div className="rounded-sm border-2 border-neutral-800 pr-3 pl-3 pt-2 pb-2 flex items-center justify-center">
      <a
        href={link}
        target="_blank"
        className="font-extrabold text-center text-sm text-text-foreground"
      >
        <Text type="p" className="text-sm">
          {t("event")}
        </Text>
      </a>
    </div>
  );
};

export default ButtonEvent;
