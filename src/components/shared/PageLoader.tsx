import { useEffect, useState } from 'react'

interface PageLoaderProps {
  /** Show the loader while this is true */
  loading: boolean
  /** Minimum visible duration in ms to avoid flicker (default 400) */
  minDuration?: number
  /** Optional section title shown above the skeleton */
  title?: string
  children: React.ReactNode
}

/**
 * PageLoader wraps page content with a skeleton placeholder.
 * A `minDuration` guard prevents flash-of-empty-content when
 * the API resolves too quickly.
 */
export default function PageLoader({
  loading,
  minDuration = 400,
  title,
  children,
}: PageLoaderProps) {
  const [visible, setVisible] = useState(loading)
  const [startedAt] = useState(Date.now)

  useEffect(() => {
    if (!loading) {
      // Ensure skeleton is visible for at least minDuration ms
      const elapsed = Date.now() - startedAt
      const remaining = Math.max(0, minDuration - elapsed)
      if (remaining > 0) {
        const timer = setTimeout(() => setVisible(false), remaining)
        return () => clearTimeout(timer)
      }
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [loading, minDuration, startedAt])

  if (visible) {
    return (
      <div className="max-w-container mx-auto px-4 md:px-6 py-10 md:py-16">
        {title && (
          <div className="mb-8">
            <div className="h-4 w-24 bg-bg-light animate-pulse rounded mb-2" />
            <div className="h-7 w-64 bg-bg-light animate-pulse rounded" />
          </div>
        )}
        {/* Skeleton grid for cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-bg-light rounded-lg mb-3" />
              <div className="h-4 w-3/4 bg-bg-light rounded mb-2" />
              <div className="h-3 w-1/2 bg-bg-light rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
