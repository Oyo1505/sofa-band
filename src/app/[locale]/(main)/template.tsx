//@ts-nocheck
'use client'
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { URL_DASHBOARD, URL_SIGNIN } from '@/lib/routes';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}
