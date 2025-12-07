import "@testing-library/jest-dom";
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from 'util';

// Polyfill for Web APIs in jsdom
// @ts-ignore - TextEncoder types are compatible at runtime
global.TextEncoder = NodeTextEncoder;
// @ts-ignore - TextDecoder types are compatible at runtime
global.TextDecoder = NodeTextDecoder;

// Mock Web Request/Response for Next.js server components
if (typeof Request === 'undefined') {
  global.Request = class Request {
    constructor(public url: string, public init?: any) {}
    headers = new Headers();
    method = 'GET';
  } as any;
}

if (typeof Response === 'undefined') {
  global.Response = class Response {
    constructor(public body?: any, public init?: any) {}
    headers = new Headers();
    status = 200;
    ok = true;
    json = async () => this.body;
    text = async () => String(this.body);
  } as any;
}

if (typeof Headers === 'undefined') {
  global.Headers = class Headers {
    private map = new Map();
    get(name: string) { return this.map.get(name.toLowerCase()); }
    set(name: string, value: string) { this.map.set(name.toLowerCase(), value); }
    has(name: string) { return this.map.has(name.toLowerCase()); }
  } as any;
}

// Mock environment variables
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
process.env.YOUTUBE_API_KEY = 'test-youtube-api-key';
process.env.POSTGRES_URL = 'postgresql://test:test@localhost:5432/test';
process.env.POSTGRES_URL_NON_POOLING = 'postgresql://test:test@localhost:5432/test';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock Prisma Client
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    authorizedEmail: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    event: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    live: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Mock better-auth
jest.mock('better-auth', () => ({
  betterAuth: jest.fn(() => ({
    api: {
      getSession: jest.fn(),
    },
    $Infer: {
      Session: {},
    },
  })),
  APIError: class APIError extends Error {
    constructor(code: string, options?: { message?: string }) {
      super(options?.message || code);
      this.name = 'APIError';
    }
  },
}));

jest.mock('better-auth/adapters/prisma', () => ({
  prismaAdapter: jest.fn(),
}));

jest.mock('better-auth/next-js', () => ({
  nextCookies: jest.fn(() => ({})),
}));

// Note: error-utils is NOT mocked to allow testing real error handling behavior
// Tests will use the actual error utilities and classes

// Mock Next.js headers
jest.mock('next/headers', () => ({
  headers: jest.fn(() => Promise.resolve(new Headers())),
  cookies: jest.fn(() => Promise.resolve({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));
