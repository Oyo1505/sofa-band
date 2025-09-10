import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import authConfig from './lib/auth.config';

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('NEXT_LOCALE') || 'ja';
  const handleI18nRouting = createMiddleware({
    locales: ['ja', 'en'],
    defaultLocale: defaultLocale as 'ja' | 'en'
  });

  const response = handleI18nRouting(request);
  response.headers.set('NEXT_LOCALE', defaultLocale);
  response.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=300');
  return response;
});


export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/', '/(ja|en)/:path*']
};