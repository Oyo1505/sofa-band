'use client'
import Title from "@/domains/ui/components/title/title";
import { useTranslations } from "next-intl";

const ShowTitle = () => { 
  const t = useTranslations('ShowPage');
  return (
    <Title type='h2' text={t('tour')} className='text-3xl text-amber-50 font-bold' />
  )
}

export default ShowTitle;