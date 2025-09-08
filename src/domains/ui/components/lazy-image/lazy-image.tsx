'use client'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { useState } from 'react'
import LoadingSpinner from '../loading-spinner/loading-spinner'

interface LazyImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData
  alt: string
  className?: string
  containerClassName?: string
  showSpinner?: boolean
}

const LazyImage = ({
  src,
  alt,
  className,
  containerClassName = '',
  showSpinner = true,
  loading = 'lazy',
  placeholder = 'blur',
  quality = 85,
  ...props
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-neutral-800 flex items-center justify-center ${className}`}>
        <span className="text-neutral-400 text-sm">Image non disponible</span>
      </div>
    )
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && showSpinner && (
        <div className={`absolute inset-0 flex items-center justify-center bg-neutral-800 ${className}`}>
          <LoadingSpinner />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        placeholder={placeholder}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}

export default LazyImage