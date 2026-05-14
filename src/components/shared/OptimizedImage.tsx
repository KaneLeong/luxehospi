import { useState, useEffect, CSSProperties } from 'react'
import { getLQIP } from '@/data/lqip'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  loading?: 'lazy' | 'eager'
  eager?: boolean
  style?: CSSProperties
  fallback?: string
  cover?: boolean
  lqip?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading: loadingProp,
  eager,
  style,
  fallback = '/images/hero-home.webp',
  cover = true,
  lqip: lqipProp,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const lqipSrc = lqipProp || getLQIP(src)

  useEffect(() => {
    setLoaded(false)
    setError(false)

    // Pre-check: if image is already cached/complete, mark as loaded immediately
    const testImg = new Image()
    testImg.src = src
    if (testImg.complete) {
      setLoaded(true)
    }
  }, [src])

  const handleError = () => {
    if (src !== fallback) {
      setError(true)
    }
  }

  const actualSrc = error ? fallback : src
  const resolvedLoading = eager ? 'eager' : (loadingProp || 'lazy')

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {lqipSrc && !loaded && (
        <img
          src={lqipSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          style={{ zIndex: 0 }}
        />
      )}

      {!loaded && !lqipSrc && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      <img
        src={actualSrc}
        alt={alt}
        width={width}
        height={height}
        loading={resolvedLoading}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full ${cover ? 'object-cover' : 'object-contain'}`}
        style={{ position: 'relative', zIndex: 1, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </div>
  )
}
