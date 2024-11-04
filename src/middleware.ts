import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';
import { createNavigation } from 'next-intl/navigation';
import NextAuth from 'next-auth';
import authConfig from './lib/auth.config';

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('NEXT_LOCALE') || 'jp';
  const handleI18nRouting = createMiddleware({
    locales: ['jp', 'en'],
    defaultLocale
  });

  const response = handleI18nRouting(request);
  response.headers.set('NEXT_LOCALE', defaultLocale);

  return response;
});

//export default createMiddleware(routing);
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/', '/(jp|en)/:path*']
};