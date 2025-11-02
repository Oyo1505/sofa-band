"use client";

import { getErrorMessage, logError } from "@/lib/error-utils";
import { useState } from "react";

interface UseErrorHandlerReturn {
  error: Error | null;
  isError: boolean;
  clearError: () => void;
  handleError: (error: unknown, context?: string) => void;
  handleAsyncError: <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ) => Promise<T | null>;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<Error | null>(null);

  const clearError = () => {
    setError(null);
  };

  const handleError = (error: unknown, context?: string) => {
    const errorObj =
      error instanceof Error ? error : new Error(getErrorMessage(error));

    logError(errorObj, context);
    setError(errorObj);
  };

  const handleAsyncError = async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      clearError();
      const result = await asyncFn();
      return result;
    } catch (error) {
      handleError(error, context);
      return null;
    }
  };

  return {
    error,
    isError: error !== null,
    clearError,
    handleError,
    handleAsyncError,
  };
}
