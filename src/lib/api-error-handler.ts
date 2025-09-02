import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { AppError, ValidationError, logError } from './error-utils'

export function handleApiError(error: unknown): NextResponse {
  logError(error instanceof Error ? error : new Error(String(error)), 'API')

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: 'Invalid input data',
        details: error.errors,
      },
      { status: 400 }
    )
  }

  if (error instanceof ValidationError) {
    return NextResponse.json(
      {
        error: error.name,
        message: error.message,
        field: error.field,
      },
      { status: error.statusCode || 400 }
    )
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.name,
        message: error.message,
        code: error.code,
      },
      { status: error.statusCode || 500 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Something went wrong',
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    {
      error: 'Unknown Error',
      message: 'An unknown error occurred',
    },
    { status: 500 }
  )
}

export async function withErrorHandling<T>(
  handler: () => Promise<T>
): Promise<T | NextResponse> {
  try {
    return await handler()
  } catch (error) {
    return handleApiError(error)
  }
}