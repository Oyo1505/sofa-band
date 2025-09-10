import { NextRequest, NextResponse } from 'next/server';
import { logError, formatErrorMessage, ExternalApiError, DatabaseError, ValidationError } from './error-utils';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
  timestamp: string;
}

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // requests per window

// Rate limiting middleware
export function rateLimit(maxRequests: number = RATE_LIMIT_MAX_REQUESTS, windowMs: number = RATE_LIMIT_WINDOW) {
  return (identifier: string): boolean => {
    const now = Date.now();
    const current = rateLimitStore.get(identifier);
    
    if (!current || now > current.resetTime) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }
    
    if (current.count >= maxRequests) {
      return false;
    }
    
    current.count++;
    return true;
  };
}

// Get client identifier for rate limiting
function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 
           request.headers.get('x-real-ip') ||
           request.headers.get('cf-connecting-ip') ||
           'unknown';
  return ip;
}

// Generic error handler middleware
export function withErrorHandling<T>(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse | ApiResponse<T>>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    const startTime = Date.now();
    
    try {
      // Rate limiting
      const identifier = getClientIdentifier(request);
      const checkRateLimit = rateLimit();
      
      if (!checkRateLimit(identifier)) {
        return NextResponse.json(
          {
            error: 'Too many requests. Please try again later.',
            status: 429,
            timestamp: new Date().toISOString()
          } as ApiResponse,
          { 
            status: 429,
            headers: {
              'Retry-After': '60'
            }
          }
        );
      }
      
      const result = await handler(request, context);
      
      // If handler returns NextResponse directly, return it
      if (result instanceof NextResponse) {
        return result;
      }
      
      // If handler returns ApiResponse, convert to NextResponse
      const response: ApiResponse<T> = {
        ...result,
        timestamp: new Date().toISOString()
      };
      
      return NextResponse.json(response, { status: result.status });
      
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Log error with context
      logError(error as Error, `API Handler ${request.method} ${request.url} [${errorId}] (${duration}ms)`);
      
      // Determine error response based on error type
      let status = 500;
      let message = 'Internal server error';
      
      if (error instanceof ValidationError) {
        status = 400;
        message = error.message;
      } else if (error instanceof DatabaseError) {
        status = 500;
        message = 'Database operation failed';
      } else if (error instanceof ExternalApiError) {
        status = 502;
        message = `External service error: ${error.service}`;
      } else if (error instanceof Error) {
        message = error.message || message;
      }
      
      const errorResponse: ApiResponse = {
        error: message,
        status,
        timestamp: new Date().toISOString()
      };
      
      // In development, include error details
      if (process.env.NODE_ENV === 'development') {
        (errorResponse as any).debug = {
          errorId,
          duration: `${duration}ms`,
          stack: error instanceof Error ? error.stack : undefined
        };
      }
      
      return NextResponse.json(errorResponse, { status });
    }
  };
}

// YouTube API specific error handler
export function withYouTubeErrorHandling(
  handler: (request: NextRequest) => Promise<NextResponse | ApiResponse>
) {
  return withErrorHandling(async (request: NextRequest) => {
    try {
      return await handler(request);
    } catch (error) {
      // Transform YouTube API errors
      if (error instanceof Error && error.message.includes('YouTube')) {
        throw new ExternalApiError(
          error.message,
          'YouTube API',
          undefined,
          error
        );
      }
      throw error;
    }
  });
}

// Database operation error handler
export function withDatabaseErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  return operation().catch((error) => {
    if (error.code === 'P2025') {
      throw new ValidationError('Record not found');
    }
    if (error.code === 'P2002') {
      throw new ValidationError('Unique constraint violation');
    }
    if (error.code?.startsWith('P')) {
      throw new DatabaseError(`Database operation failed: ${error.code}`, error);
    }
    throw new DatabaseError('Database operation failed', error);
  });
}

// Request timeout wrapper
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
  errorMessage: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs);
    })
  ]);
}

// Validation middleware
export function validateRequest(schema: {
  body?: (data: any) => boolean;
  query?: (data: any) => boolean;
  params?: (data: any) => boolean;
}) {
  return async (request: NextRequest): Promise<void> => {
    // Validate query parameters
    if (schema.query) {
      const url = new URL(request.url);
      const queryParams = Object.fromEntries(url.searchParams);
      
      if (!schema.query(queryParams)) {
        throw new ValidationError('Invalid query parameters');
      }
    }
    
    // Validate request body for POST/PUT/PATCH
    if (schema.body && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        const body = await request.json();
        
        if (!schema.body(body)) {
          throw new ValidationError('Invalid request body');
        }
      } catch (error) {
        if (error instanceof ValidationError) throw error;
        throw new ValidationError('Invalid JSON in request body');
      }
    }
  };
}

// CORS middleware
export function withCors(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: {
    origin?: string | string[];
    methods?: string[];
    credentials?: boolean;
  } = {}
) {
  const {
    origin = '*',
    methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials = false
  } = options;
  
  return async (request: NextRequest): Promise<NextResponse> => {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': Array.isArray(origin) ? origin.join(', ') : origin,
          'Access-Control-Allow-Methods': methods.join(', '),
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': credentials.toString()
        }
      });
    }
    
    const response = await handler(request);
    
    // Add CORS headers to response
    response.headers.set('Access-Control-Allow-Origin', Array.isArray(origin) ? origin.join(', ') : origin);
    if (credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    return response;
  };
}

// Health check endpoint helper
export function createHealthCheck(dependencies: {
  name: string;
  check: () => Promise<boolean>;
}[] = []) {
  return withErrorHandling(async (): Promise<ApiResponse> => {
    const checks = await Promise.allSettled(
      dependencies.map(async (dep) => ({
        name: dep.name,
        status: await dep.check()
      }))
    );
    
    const results = checks.map((check, index) => ({
      name: dependencies[index].name,
      status: check.status === 'fulfilled' ? check.value.status : false,
      error: check.status === 'rejected' ? check.reason?.message : undefined
    }));
    
    const allHealthy = results.every(r => r.status);
    
    return {
      data: {
        status: allHealthy ? 'healthy' : 'degraded',
        checks: results,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      },
      status: allHealthy ? 200 : 503,
      timestamp: new Date().toISOString()
    };
  });
}