'use client'

import { useCallback, useState } from 'react'
import { logError, getErrorMessage } from '@/lib/error-utils'

interface UseErrorHandlerReturn {
  error: Error | null
  isError: boolean
  clearError: () => void
  handleError: (error: unknown, context?: string) => void
  handleAsyncError: <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ) => Promise<T | null>
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<Error | null>(null)

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((error: unknown, context?: string) => {
    const errorObj = error instanceof Error ? error : new Error(getErrorMessage(error))
    
    logError(errorObj, context)
    setError(errorObj)
  }, [])

  const handleAsyncError = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      context?: string
    ): Promise<T | null> => {
      try {
        clearError()
        const result = await asyncFn()
        return result
      } catch (error) {
        handleError(error, context)
        return null
      }
    },
    [clearError, handleError]
  )

  return {
    error,
    isError: error !== null,
    clearError,
    handleError,
    handleAsyncError,
  }
}