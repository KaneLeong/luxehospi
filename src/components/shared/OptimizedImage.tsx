import { useState, useRef, useEffect, CSSProperties } from 'react'
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
  /** Explicit LQIP base64 string; if omitted, auto-resolves from lqip.ts by filename */
  lqip?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  loading,
  eager,
  style,
  fallback = '/images/hero-home.webp',
  cover = true,
  lqip: lqipProp,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const lqipSrc = lqipProp || getLQIP(src)

  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [src])

  const handleError = () => {
    if (src !== fallback) {
      setError(true)
    }
  }

  const actualSrc = error ? fallback : src
  const isLoading = eager ? loading === 'eager' : loading

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {/* LQIP blur placeholder — shows instantly while full image loads */}
      {lqipSrc && !loaded && (
        <img
          src={lqipSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Skeleton shimmer (fallback when no LQIP) */}
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
        ref={imgRef}
        src={actualSrc}
        alt={alt}
        width={width}
        height={height}
        loading={isLoading as 'lazy' | 'eager' | undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${cover ? 'object-cover' : 'object-contain'}`}
        style={{ position: 'relative', zIndex: 1 }}
      />
    </div>
  )
}
