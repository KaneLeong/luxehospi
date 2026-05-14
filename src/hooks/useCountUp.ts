import { useState, useEffect, useRef, useCallback } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  /** If true, animate immediately on mount. Default: true */
  immediate?: boolean
  /** If true, also observe visibility via IntersectionObserver. Default: false */
  observe?: boolean
}

export default function useCountUp({
  end,
  duration = 2000,
  suffix = '',
  immediate = true,
  observe = false,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(end * eased))
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [end, duration])

  // Immediate animation on mount
  useEffect(() => {
    if (immediate) {
      // Small delay to ensure component is painted
      const timer = setTimeout(animate, 100)
      return () => clearTimeout(timer)
    }
  }, [animate, immediate])

  // Optional IntersectionObserver for scroll-triggered animation
  useEffect(() => {
    if (!observe || !immediate) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, observe, immediate])

  return { ref, count, display: `${count}${suffix}` }
}
