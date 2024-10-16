import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({params: {locale}} : {params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('AboutPage');

  return (
  <div>
    <h1>{t("title")}</h1>
  </div>
  );
}