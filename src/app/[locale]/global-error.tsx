'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="bg-neutral-900 text-white">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
              <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
              <p className="text-gray-300 mb-6">
                A critical error occurred. Please try refreshing the page.
              </p>
            </div>

            {error.digest && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                <p className="text-red-300 text-sm font-mono">
                  Error ID: {error.digest}
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}