// Comprehensive API type definitions for the Sofa Band application

// ====================
// Base API Types
// ====================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
  timestamp: string;
}

export interface ApiErrorResponse {
  error: string;
  status: number;
  timestamp: string;
  debug?: {
    errorId: string;
    duration: string;
    stack?: string;
  };
}

// ====================
// Authentication Types
// ====================

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface AuthorizedEmail {
  id: string;
  email: string | null;
}

// ====================
// Event Types
// ====================

export interface Event {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  location: string;
  time: number;
  city: string;
  cityInJpn: string;
  date: string;
  infoLink: string;
  country: string | null;
  region: string;
  published: boolean;
  authorId: string;
}

export interface EventCreateData {
  title: string;
  location: string;
  time: number;
  city: string;
  cityInJpn: string;
  date: string;
  infoLink: string;
  country?: string;
  region: string;
  published?: boolean;
}

export type EventUpdateData = Partial<EventCreateData>;

export interface EventsListResponse {
  data: Event[];
  status: number;
  timestamp: string;
}

export interface EventResponse {
  data: Event;
  status: number;
  timestamp: string;
}

// ====================
// Live Performance Types
// ====================

export interface Live {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  location: string;
  city: string;
  cityInJpn: string;
  date: Date;
  video: string;
  published: boolean;
  authorId: string;
}

export interface LiveCreateData {
  title: string;
  location: string;
  city: string;
  cityInJpn: string;
  date: Date;
  video: string;
  published?: boolean;
}

export type LiveUpdateData = Partial<LiveCreateData>;

// ====================
// YouTube API Types
// ====================

export interface YouTubeVideo {
  title: string;
  publishedAt: string;
  videoId: string;
  description?: string;
  thumbnails?: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  channelTitle?: string;
  resourceId?: {
    videoId: string;
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeChannelResponse {
  data: {
    playlistId: string;
  };
  status: number;
  timestamp: string;
}

export interface YouTubePlaylistResponse {
  data: {
    videos: YouTubeVideo[];
  };
  status: number;
  timestamp: string;
}

export interface YouTubeApiError {
  error: {
    code: number;
    message: string;
    errors?: Array<{
      domain: string;
      reason: string;
      message: string;
    }>;
  };
}

// ====================
// Request/Response Wrapper Types
// ====================

export interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: Error) => boolean;
}

export interface ValidationSchema {
  body?: (data: unknown) => data is Record<string, unknown>;
  query?: (data: unknown) => data is Record<string, unknown>;
  params?: (data: unknown) => data is Record<string, unknown>;
}

export interface ApiHandlerContext {
  params?: Record<string, string>;
  searchParams?: URLSearchParams;
  user?: User;
}

export interface RateLimitConfig {
  maxRequests?: number;
  windowMs?: number;
  identifier?: string;
}

export interface CorsConfig {
  origin?: string | string[];
  methods?: string[];
  credentials?: boolean;
}

// ====================
// Health Check Types
// ====================

export interface HealthCheckDependency {
  name: string;
  check: () => Promise<boolean>;
}

export interface HealthCheckResult {
  name: string;
  status: boolean;
  error?: string;
}

export interface HealthCheckResponse {
  data: {
    status: "healthy" | "degraded";
    checks: HealthCheckResult[];
    uptime: number;
    timestamp: string;
  };
  status: number;
  timestamp: string;
}

// ====================
// Form Data Types
// ====================

export interface EventFormData extends Omit<EventCreateData, "published"> {
  published?: boolean;
}

export interface LiveFormData extends Omit<LiveCreateData, "published"> {
  published?: boolean;
}

// ====================
// Query Hook Types
// ====================

export interface QueryConfig {
  retry?: number | ((failureCount: number, error: unknown) => boolean);
  retryDelay?: number | ((attemptIndex: number) => number);
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  enabled?: boolean;
}

export interface MutationConfig {
  retry?: number | ((failureCount: number, error: unknown) => boolean);
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

// ====================
// Type Guards
// ====================

export function isApiResponse<T>(obj: unknown): obj is ApiResponse<T> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "status" in obj &&
    typeof (obj as ApiResponse<T>).status === "number"
  );
}

export function isApiErrorResponse(obj: unknown): obj is ApiErrorResponse {
  return (
    isApiResponse(obj) &&
    "error" in obj &&
    typeof (obj as ApiErrorResponse).error === "string"
  );
}

export function isEvent(obj: unknown): obj is Event {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "title" in obj &&
    "location" in obj &&
    "date" in obj
  );
}

export function isYouTubeVideo(obj: unknown): obj is YouTubeVideo {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "title" in obj &&
    "videoId" in obj &&
    "publishedAt" in obj
  );
}

// ====================
// Utility Types
// ====================

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ApiEndpoint =
  | "/api/events"
  | `/api/events/${string}`
  | "/api/youtube/videos"
  | "/api/auth/session"
  | "/api/health";

export type ApiRequestHandler<T = unknown> = (
  request: Request,
  context?: ApiHandlerContext,
) => Promise<ApiResponse<T>>;

export type ApiMiddleware<T = unknown> = (
  handler: ApiRequestHandler<T>,
) => ApiRequestHandler<T>;
