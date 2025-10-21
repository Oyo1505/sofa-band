import createMiddleware from "next-intl/middleware";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { URL_HOME } from "./lib/routes";

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const defaultLocale = request.headers.get("NEXT_LOCALE") || "ja";
  const handleI18nRouting = createMiddleware({
    locales: ["ja", "en"],
    defaultLocale: defaultLocale as "ja" | "en",
  });
  if (!session && request.nextUrl.pathname.includes("dashboard")) {
    return NextResponse.redirect(new URL(URL_HOME, request.url));
  }
  const response = handleI18nRouting(request);
  response.headers.set("NEXT_LOCALE", defaultLocale);
  response.headers.set(
    "Cache-Control",
    "public, max-age=600, stale-while-revalidate=300",
  );
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/", "/(ja|en)/:path*"],
  runtime: "nodejs",
};
