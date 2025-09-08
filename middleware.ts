import { NextRequest, NextResponse } from 'next/server';
import { setCSRFToken } from '@/lib/csrf';

// Rate limiting store (in production, use Redis or database)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function getRateLimit(ip: string, windowMs: number = 60000, max: number = 100) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  
  if (record.count >= max) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: max - record.count };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Get client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const limit = getRateLimit(ip, 60000, 100); // 100 requests per minute
    
    if (!limit.allowed) {
      return new NextResponse('Rate limit exceeded', { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + 60000).toISOString(),
        }
      });
    }
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', limit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 60000).toISOString());
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' data: https:",
    "connect-src 'self' https://api.github.com https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com",
    "frame-src 'self' https://accounts.google.com https://www.youtube.com https://youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);

  // Strict Transport Security (HTTPS only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Set CSRF token for authenticated pages
  if (!pathname.startsWith('/api/') && request.method === 'GET') {
    try {
      await setCSRFToken();
    } catch (error) {
      console.error('Failed to set CSRF token:', error);
    }
  }

  // Origin validation for state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    const referer = request.headers.get('referer');

    // Allow requests from same origin
    const allowedOrigins = [
      `https://${host}`,
      `http://${host}`, // Allow HTTP in development
      process.env.NEXTAUTH_URL,
    ].filter(Boolean);

    const isValidOrigin = origin && allowedOrigins.some(allowed => 
      origin === allowed || (allowed && origin.startsWith(allowed))
    );

    const isValidReferer = referer && allowedOrigins.some(allowed => 
      allowed && referer.startsWith(allowed)
    );

    if (!isValidOrigin && !isValidReferer) {
      return new NextResponse('Invalid origin', { status: 403 });
    }
  }

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};