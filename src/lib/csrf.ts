import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import crypto from 'crypto';

export class CSRFError extends Error {
  constructor(message: string = 'CSRF token validation failed') {
    super(message);
    this.name = 'CSRFError';
  }
}

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('base64url');
}

/**
 * Set CSRF token in cookies (server-side)
 */
export async function setCSRFToken(): Promise<string> {
  const token = generateCSRFToken();
  const cookieStore = await cookies();
  
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return token;
}

/**
 * Get CSRF token from cookies (server-side)
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('csrf-token');
  return token?.value || null;
}

/**
 * Validate CSRF token from request
 */
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  try {
    // Get token from cookie
    const cookieToken = request.cookies.get('csrf-token')?.value;
    if (!cookieToken) {
      return false;
    }

    // Get token from header or body
    const headerToken = request.headers.get('x-csrf-token') || 
                       request.headers.get('csrf-token');
    
    if (!headerToken) {
      // Try to get from form data if it's a POST request with form data
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/x-www-form-urlencoded')) {
        const formData = await request.clone().formData();
        const formToken = formData.get('csrf-token') as string;
        if (formToken && crypto.timingSafeEqual(
          Buffer.from(cookieToken, 'base64url'),
          Buffer.from(formToken, 'base64url')
        )) {
          return true;
        }
      }
      return false;
    }

    // Compare tokens using timing-safe comparison
    return crypto.timingSafeEqual(
      Buffer.from(cookieToken, 'base64url'),
      Buffer.from(headerToken, 'base64url')
    );
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
}

/**
 * CSRF middleware for API routes
 */
export async function withCSRFProtection<T>(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<T>
): Promise<T> {
  // Skip CSRF validation for GET requests
  if (request.method === 'GET') {
    return handler(request);
  }

  // Validate origin for state-changing requests
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (origin && !origin.includes(host || '')) {
    throw new CSRFError('Origin validation failed');
  }

  // Validate CSRF token
  const isValid = await validateCSRFToken(request);
  if (!isValid) {
    throw new CSRFError('CSRF token validation failed');
  }

  return handler(request);
}

/**
 * Client-side utility to get CSRF token for requests
 */
export function getClientCSRFToken(): string | null {
  if (typeof document === 'undefined') return null;
  
  // Try to get from meta tag first
  const metaTag = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
  if (metaTag) {
    return metaTag.content;
  }
  
  // Fallback to cookie (though it's httpOnly, this won't work in practice)
  // This is here for completeness - real implementation should use meta tag or API endpoint
  return null;
}

/**
 * Add CSRF token to fetch headers
 */
export function addCSRFHeader(headers: HeadersInit = {}, token: string): HeadersInit {
  return {
    ...headers,
    'x-csrf-token': token,
  };
}