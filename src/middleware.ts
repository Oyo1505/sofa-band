import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import authConfig from './lib/auth.config';

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('NEXT_LOCALE') || 'jp';
  const handleI18nRouting = createMiddleware({
    locales: ['jp', 'en'],
    defaultLocale: defaultLocale as 'jp' | 'en'
  });

  const response = handleI18nRouting(request);
  response.headers.set('NEXT_LOCALE', defaultLocale);

  return response;
});


export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/', '/(jp|en)/:path*']
};