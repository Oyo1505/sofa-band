export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class NetworkError extends AppError {
  constructor(message: string = "Network error occurred") {
    super(message, "NETWORK_ERROR", 0);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends AppError {
  constructor(
    message: string = "Request timeout",
    public timeoutDuration?: number,
  ) {
    super(message, "TIMEOUT_ERROR", 408);
    this.name = "TimeoutError";
  }
}

export class RateLimitError extends AppError {
  constructor(
    message: string = "Rate limit exceeded",
    public retryAfter?: number,
  ) {
    super(message, "RATE_LIMIT_ERROR", 429);
    this.name = "RateLimitError";
  }
}

export class DatabaseError extends AppError {
  constructor(
    message: string,
    public originalError?: Error,
  ) {
    super(message, "DATABASE_ERROR", 500);
    this.name = "DatabaseError";
  }
}

export class ExternalApiError extends AppError {
  constructor(
    message: string,
    public service: string,
    public originalStatus?: number,
    public originalError?: Error | Record<string, unknown>,
  ) {
    super(message, "EXTERNAL_API_ERROR", 502);
    this.name = "ExternalApiError";
  }
}

export function handleAsyncError<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
) {
  return async (...args: T): Promise<[R, null] | [null, Error]> => {
    try {
      const result = await fn(...args);
      return [result, null];
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))];
    }
  };
}

export function handleSyncError<T extends unknown[], R>(fn: (...args: T) => R) {
  return (...args: T): [R, null] | [null, Error] => {
    try {
      const result = fn(...args);
      return [result, null];
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))];
    }
  };
}

export function logError(error: Error, context?: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ""}${error.name}: ${error.message}`;

  console.error(logMessage);

  if (error.stack) {
    console.error(error.stack);
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError;
}

export function isUnauthorizedError(
  error: unknown,
): error is UnauthorizedError {
  return error instanceof UnauthorizedError;
}

export function isForbiddenError(error: unknown): error is ForbiddenError {
  return error instanceof ForbiddenError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}

export function isTimeoutError(error: unknown): error is TimeoutError {
  return error instanceof TimeoutError;
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof RateLimitError;
}

export function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof DatabaseError;
}

export function isExternalApiError(error: unknown): error is ExternalApiError {
  return error instanceof ExternalApiError;
}

export type ErrorResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: Error;
    };

export async function tryCatch<T>(
  promise: Promise<T>,
): Promise<ErrorResult<T>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

// Helper function to check if an error is retryable
export function isRetryableError(error: Error): boolean {
  return (
    isNetworkError(error) ||
    isTimeoutError(error) ||
    isDatabaseError(error) ||
    isExternalApiError(error)
  );
}

// Retry wrapper with exponential backoff
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    retryCondition?: (error: Error) => boolean;
  } = {},
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    retryCondition = (error) =>
      !isValidationError(error) && !isUnauthorizedError(error),
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxRetries || !retryCondition(lastError)) {
        throw lastError;
      }

      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Enhanced error message formatter with internationalization support
export function formatErrorMessage(
  error: unknown,
  locale: string = "en",
  fallbackMessage?: string,
): string {
  const messages = {
    en: {
      network: "Connection problem. Please check your internet connection.",
      timeout: "Request timed out. Please try again.",
      rateLimit: "Too many requests. Please wait before trying again.",
      validation: "Invalid data provided.",
      unauthorized: "You are not authorized to perform this action.",
      forbidden: "Access denied.",
      notFound: "The requested resource was not found.",
      database: "Database error occurred.",
      externalApi: "External service error.",
      default: fallbackMessage || "An error occurred.",
    },
    fr: {
      network: "Problème de connexion. Vérifiez votre connexion internet.",
      timeout: "La requête a pris trop de temps. Veuillez réessayer.",
      rateLimit: "Trop de requêtes. Veuillez patienter avant de réessayer.",
      validation: "Données invalides fournies.",
      unauthorized: "Vous n'êtes pas autorisé à effectuer cette action.",
      forbidden: "Accès refusé.",
      notFound: "La ressource demandée n'a pas été trouvée.",
      database: "Erreur de base de données.",
      externalApi: "Erreur du service externe.",
      default: fallbackMessage || "Une erreur est survenue.",
    },
    jp: {
      network: "接続に問題があります。インターネット接続を確認してください。",
      timeout: "リクエストがタイムアウトしました。もう一度お試しください。",
      rateLimit:
        "リクエストが多すぎます。しばらく待ってから再試行してください。",
      validation: "無効なデータが提供されました。",
      unauthorized: "この操作を実行する権限がありません。",
      forbidden: "アクセスが拒否されました。",
      notFound: "要求されたリソースが見つかりませんでした。",
      database: "データベースエラーが発生しました。",
      externalApi: "外部サービスエラー。",
      default: fallbackMessage || "エラーが発生しました。",
    },
  };

  const localeMessages =
    messages[locale as keyof typeof messages] || messages.en;

  if (isNetworkError(error)) return localeMessages.network;
  if (isTimeoutError(error)) return localeMessages.timeout;
  if (isRateLimitError(error)) return localeMessages.rateLimit;
  if (isValidationError(error)) return localeMessages.validation;
  if (isUnauthorizedError(error)) return localeMessages.unauthorized;
  if (isForbiddenError(error)) return localeMessages.forbidden;
  if (isNotFoundError(error)) return localeMessages.notFound;
  if (isDatabaseError(error)) return localeMessages.database;
  if (isExternalApiError(error)) return localeMessages.externalApi;

  if (error instanceof Error) {
    return error.message || localeMessages.default;
  }

  return localeMessages.default;
}
