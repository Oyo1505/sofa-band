# Error Handling System

This document explains the comprehensive error handling system implemented in the Sofa Band project.

## Overview

The error handling system provides:
- Custom error pages for 404 and 500 errors
- Global error boundary for React components
- Error utilities and custom error classes
- API error handling
- React hooks for error management
- Toast notifications for errors
- Internationalization support for error messages

## Components

### 1. Custom Error Pages

#### `/app/[locale]/error.tsx`
Handles client-side errors with recovery options and internationalized messages.

#### `/app/[locale]/not-found.tsx` 
Handles 404 errors with navigation options.

#### `/app/[locale]/global-error.tsx`
Handles critical errors that occur in the root layout.

### 2. Error Boundary

**Location:** `src/domains/ui/components/error-boundary/error-boundary.tsx`

React Error Boundary component that catches JavaScript errors in the component tree and displays a fallback UI.

```tsx
import ErrorBoundary from '@/domains/ui/components/error-boundary/error-boundary'

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 3. Error Utilities

**Location:** `src/lib/error-utils.ts`

Custom error classes and utilities:
- `AppError` - Base application error
- `ValidationError` - Form validation errors
- `NotFoundError` - Resource not found errors
- `UnauthorizedError` - Authentication errors
- `ForbiddenError` - Authorization errors
- `handleAsyncError` - Wrapper for async operations
- `logError` - Centralized error logging

### 4. API Error Handler

**Location:** `src/lib/api-error-handler.ts`

Handles API route errors and returns appropriate HTTP responses:

```tsx
import { handleApiError, withErrorHandling } from '@/lib/api-error-handler'

export async function POST(request: Request) {
  return withErrorHandling(async () => {
    // Your API logic here
  })
}
```

### 5. React Error Hook

**Location:** `src/domains/ui/hooks/use-error-handler.ts`

Custom React hook for error handling in components:

```tsx
import { useErrorHandler } from '@/domains/ui/hooks/use-error-handler'

const { error, isError, clearError, handleError, handleAsyncError } = useErrorHandler()

// Handle async operations
const fetchData = async () => {
  const result = await handleAsyncError(
    () => fetch('/api/data'),
    'Fetching data'
  )
}
```

### 6. Error Toast

**Location:** `src/domains/ui/components/error-toast/error-toast.tsx`

Toast component for displaying error messages:

```tsx
import ErrorToast from '@/domains/ui/components/error-toast/error-toast'

<ErrorToast 
  error={error} 
  onClose={clearError}
  duration={5000} 
/>
```

## Usage Examples

### Server Actions

```tsx
import { handleAsyncError, ValidationError, logError } from "@/lib/error-utils"

export const addEvent = async ({ event, user }) => {
  if (!event.title) {
    const validationError = new ValidationError('Title is required', 'title')
    logError(validationError, 'addEvent')
    return { event: null, status: 400, error: validationError.message }
  }

  const [eventData, error] = await handleAsyncError(async () => {
    return await prisma.event.create({ data: event })
  })()

  if (error) {
    logError(error, 'addEvent')
    return { event: null, status: 500, error: error.message }
  }

  return { event: eventData, status: 200 }
}
```

### Client Components

```tsx
'use client'
import { useErrorHandler } from '@/domains/ui/hooks/use-error-handler'
import ErrorToast from '@/domains/ui/components/error-toast/error-toast'

export default function MyComponent() {
  const { error, clearError, handleAsyncError } = useErrorHandler()

  const submitForm = async (data) => {
    await handleAsyncError(
      () => fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
      'Submitting form'
    )
  }

  return (
    <div>
      {/* Your component JSX */}
      <ErrorToast error={error} onClose={clearError} />
    </div>
  )
}
```

### Server Components

```tsx
import { NotFoundError } from '@/lib/error-utils'

const getData = async () => {
  const result = await getEvents()
  
  if (result.status !== 200) {
    throw new Error(result.error || 'Failed to fetch events')
  }
  
  return result.events
}

export default async function Page() {
  try {
    const data = await getData()
    return <div>{/* Render data */}</div>
  } catch (error) {
    throw error // Let the error boundary handle it
  }
}
```

## Internationalization

Error messages are internationalized and available in English and Japanese:

```json
// en.json
{
  "ErrorPage": {
    "title": "Something went wrong",
    "description": "An unexpected error occurred. Please try again.",
    "reload": "Reload page",
    "tryAgain": "Try again",
    "goHome": "Go home"
  },
  "NotFoundPage": {
    "title": "Page not found",
    "description": "The page you're looking for doesn't exist or has been moved.",
    "goHome": "Go home",
    "goBack": "Go back"
  }
}
```

## Integration

The error handling system is integrated into:
- Main layout with ErrorBoundary wrapper
- Server actions with proper error handling
- Database operations with try-catch patterns
- API routes with centralized error handling

## Best Practices

1. **Always use the error utilities** instead of generic Error objects
2. **Log errors consistently** using the `logError` function
3. **Provide meaningful error messages** to users
4. **Use appropriate HTTP status codes** in API responses
5. **Handle errors at the right level** - let error boundaries catch unhandled errors
6. **Test error scenarios** to ensure proper error handling
7. **Never expose sensitive information** in error messages