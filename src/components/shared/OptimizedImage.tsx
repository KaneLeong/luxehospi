import { useState, useRef, useEffect, CSSProperties } from 'react'

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
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

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
      {/* Skeleton placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
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
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}
