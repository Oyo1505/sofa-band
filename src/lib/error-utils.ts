export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

export function handleAsyncError<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<[R, null] | [null, Error]> => {
    try {
      const result = await fn(...args)
      return [result, null]
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))]
    }
  }
}

export function handleSyncError<T extends any[], R>(
  fn: (...args: T) => R
) {
  return (...args: T): [R, null] | [null, Error] => {
    try {
      const result = fn(...args)
      return [result, null]
    } catch (error) {
      return [null, error instanceof Error ? error : new Error(String(error))]
    }
  }
}

export function logError(error: Error, context?: string) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${context ? `[${context}] ` : ''}${error.name}: ${error.message}`
  
  console.error(logMessage)
  
  if (error.stack) {
    console.error(error.stack)
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return 'An unknown error occurred'
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError
}

export function isNotFoundError(error: unknown): error is NotFoundError {
  return error instanceof NotFoundError
}

export function isUnauthorizedError(error: unknown): error is UnauthorizedError {
  return error instanceof UnauthorizedError
}

export function isForbiddenError(error: unknown): error is ForbiddenError {
  return error instanceof ForbiddenError
}

export type ErrorResult<T> = {
  success: true
  data: T
} | {
  success: false
  error: Error
}

export async function tryCatch<T>(
  promise: Promise<T>
): Promise<ErrorResult<T>> {
  try {
    const data = await promise
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error(String(error))
    }
  }
}