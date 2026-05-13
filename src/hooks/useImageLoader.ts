import { useEffect } from 'react'

/**
 * Automatically adds 'loaded' class to images once they finish loading.
 * This pairs with the .img-skeleton CSS class in globals.css.
 * Call once in App.tsx — no per-component setup needed.
 */
export default function useImageLoader() {
  useEffect(() => {
    const handleLoad = (e: Event) => {
      const img = e.target as HTMLImageElement
      if (img.classList.contains('skeleton-waiting')) {
        img.classList.remove('skeleton-waiting')
        img.classList.add('loaded')
      }
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLImageElement) {
            // Already loaded (e.g. cached)
            if (node.complete && node.naturalWidth > 0) {
              node.classList.add('loaded')
            } else {
              node.classList.add('skeleton-waiting')
              node.addEventListener('load', handleLoad, { once: true })
            }
          }
          // Also check child nodes
          if (node instanceof HTMLElement) {
            node.querySelectorAll('img').forEach((img) => {
              if (img.complete && img.naturalWidth > 0) {
                img.classList.add('loaded')
              } else {
                img.classList.add('skeleton-waiting')
                img.addEventListener('load', handleLoad, { once: true })
              }
            })
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Handle existing images
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('loaded')
      } else {
        img.classList.add('skeleton-waiting')
        img.addEventListener('load', handleLoad, { once: true })
      }
    })

    return () => observer.disconnect()
  }, [])
}
