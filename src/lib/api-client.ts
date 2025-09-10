interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: Error) => boolean;
}

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = 'Network error occurred') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiError {
  constructor(message: string = 'Request timeout') {
    super(message, 408);
    this.name = 'TimeoutError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
}

const defaultOptions: RequestOptions = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: Error) => {
    if (error instanceof NetworkError) return true;
    if (error instanceof ApiError) {
      return error.status >= 500 || error.status === 429;
    }
    return false;
  }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isNetworkError = (error: any): boolean => {
  return error instanceof TypeError && error.message.includes('Failed to fetch');
};

async function fetchWithTimeout(
  url: string, 
  options: RequestOptions
): Promise<Response> {
  const { timeout = defaultOptions.timeout!, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (controller.signal.aborted) {
      throw new TimeoutError(`Request to ${url} timed out after ${timeout}ms`);
    }
    
    if (isNetworkError(error)) {
      throw new NetworkError(`Network error for ${url}: ${(error as Error).message}`);
    }
    
    throw error;
  }
}

async function apiRequest<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const mergedOptions = { ...defaultOptions, ...options };
  const { retries, retryDelay, retryCondition, ...fetchOptions } = mergedOptions;
  
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= retries!; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions);
      
      // Handle different HTTP status codes
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay!;
        
        if (attempt < retries!) {
          await sleep(delay);
          continue;
        } else {
          throw new RateLimitError('Rate limit exceeded');
        }
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response,
          errorData
        );
      }
      
      const data = await response.json();
      return {
        data,
        status: response.status
      };
      
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx except 429)
      if (error instanceof ApiError && error.status >= 400 && error.status < 500 && error.status !== 429) {
        break;
      }
      
      // Check if we should retry
      if (attempt < retries! && retryCondition!(lastError)) {
        const delay = retryDelay! * Math.pow(2, attempt); // Exponential backoff
        await sleep(delay);
        continue;
      }
      
      break;
    }
  }
  
  // If we get here, all retries failed
  return {
    status: lastError instanceof ApiError ? lastError.status : 500,
    error: lastError?.message || 'Unknown error occurred'
  };
}

// Convenience methods
export const apiClient = {
  get: <T = any>(url: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(url, { ...options, method: 'GET' }),
    
  post: <T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: data ? JSON.stringify(data) : undefined
    }),
    
  put: <T = any>(url: string, data?: any, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: data ? JSON.stringify(data) : undefined
    }),
    
  delete: <T = any>(url: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(url, { ...options, method: 'DELETE' }),
    
  // Direct request method for custom configurations
  request: apiRequest
};

// Helper function to check if an error is retryable
export const isRetryableError = (error: Error): boolean => {
  return defaultOptions.retryCondition!(error);
};

// Helper function to format API errors for user display
export const formatApiError = (error: Error, fallbackMessage: string = 'Une erreur est survenue'): string => {
  if (error instanceof TimeoutError) {
    return 'La requête a pris trop de temps. Veuillez réessayer.';
  }
  
  if (error instanceof NetworkError) {
    return 'Problème de connexion. Vérifiez votre connexion internet.';
  }
  
  if (error instanceof RateLimitError) {
    return 'Trop de requêtes. Veuillez patienter avant de réessayer.';
  }
  
  if (error instanceof ApiError) {
    return error.message || fallbackMessage;
  }
  
  return fallbackMessage;
};