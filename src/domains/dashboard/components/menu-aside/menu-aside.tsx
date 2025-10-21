"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { RocketIcon } from "@radix-ui/react-icons";
import React from "react";
import { usePathname } from "next/navigation";

const MenuAside = () => {
  const t = useTranslations("MenuAside");
  const segments = usePathname();
  const isEvents = segments.includes("/events");
  return (
    <div className="w-2/12 flex flex-col gap-4 font-light text-white rounded-md p-3 bg-neutral-800">
      <Link
        href="/dashboard/events"
        className={`flex items-center gap-2 border-b border-gray-200 border-opacity-20 border-1 text-sm rounded-sm p-1 ${isEvents ? "bg-neutral-500" : ""}`}
      >
        <RocketIcon className="w-4 h-4" />
        {t("Events")}
      </Link>
    </div>
  );
};

export default MenuAside;
