"use client";
import { LanguageLogo } from "@/domains/ui/components/icons/icons";
import { Link, usePathname } from "@/i18n/routing";

const ButtonSwitchLangage = ({ locale }: { locale: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname}
      className="inline-flex gap-2"
      locale={locale === "ja" ? "en" : "ja"}
    >
      <LanguageLogo /> <span>{locale === "ja" ? "🇯🇵" : "🇬🇧"}</span>
    </Link>
  );
};

export default ButtonSwitchLangage;
