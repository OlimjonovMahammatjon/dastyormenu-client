import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function ImageWithFallback({ fallback = '🍽️', ...props }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setDidError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const { src, alt, style, className, ...rest } = props

  if (!src || didError) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-2 ${className ?? ''}`}
        style={style}
      >
        <span className="text-4xl" role="img" aria-label={alt || 'Rasm yuklanmadi'}>
          {fallback}
        </span>
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-surface-2 animate-pulse ${className ?? ''}`}
          style={style}
        >
          <span className="text-2xl opacity-50" role="img" aria-label="Yuklanmoqda">
            ⏳
          </span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        {...rest}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}
