import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { createNavigation } from 'next-intl/navigation';
import { auth } from './lib/auth';
 
export default async function middleware(request: NextRequest) {

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return 
  }
  const sessionT = await auth()
  if (request.nextUrl.pathname.startsWith('/jp/dashboard') || request.nextUrl.pathname.startsWith('/en/dashboard')  && sessionT === null) {
    return NextResponse.rewrite(new URL('/jp/', request.url))
  }
  return NextResponse.next();
}

//export default createMiddleware(routing);
export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(jp|en)/:path*']
};