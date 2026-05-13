import { useState, useEffect, useRef, useCallback } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  suffix?: string
  once?: boolean
}

export default function useCountUp({
  end,
  duration = 2000,
  suffix = '',
  once = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (once && hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const startValue = 0

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(startValue + (end - startValue) * eased))
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }, [end, duration, once])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          if (once) observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, once])

  return { ref, count, display: `${count}${suffix}` }
}
