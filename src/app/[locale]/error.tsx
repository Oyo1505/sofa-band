'use client'

import Container from '@/domains/ui/components/container/container'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('ErrorPage')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center text-white max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
          <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
          <p className="text-gray-300 mb-6">{t('description')}</p>
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
            {t('tryAgain')}
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            {t('goHome')}
          </button>
        </div>
      </div>
    </Container>
  )
}