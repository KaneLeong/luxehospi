import { useState, useEffect, useCallback } from 'react'

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastProps {
  toast: ToastMessage
  onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => onClose(toast.id), 300)
    }, toast.duration || 4000)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  const colors = {
    success: { bg: 'bg-emerald-50', border: 'border-emerald-300', icon: 'text-emerald-600', bar: 'bg-emerald-500' },
    error: { bg: 'bg-red-50', border: 'border-red-300', icon: 'text-red-600', bar: 'bg-red-500' },
    info: { bg: 'bg-blue-50', border: 'border-blue-300', icon: 'text-blue-600', bar: 'bg-blue-500' },
  }

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  }

  const c = colors[toast.type]

  return (
    <div
      className={`w-full max-w-sm ${c.bg} border ${c.border} rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        exiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      }`}
    >
      {/* Progress bar */}
      <div className={`h-0.5 ${c.bar} animate-shrink-bar`} style={{ animationDuration: `${toast.duration || 4000}ms` }} />
      <div className="flex items-start gap-3 p-4">
        <div className={`flex-shrink-0 mt-0.5 ${c.icon}`}>{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-navy">{toast.title}</div>
          {toast.message && (
            <div className="text-[13px] text-text-secondary mt-0.5">{toast.message}</div>
          )}
        </div>
        <button
          onClick={() => { setExiting(true); setTimeout(() => onClose(toast.id), 300) }}
          className="flex-shrink-0 text-text-muted hover:text-navy bg-transparent border-none cursor-pointer p-0.5"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Singleton store for toasts
let globalToasts: ToastMessage[] = []
let globalListeners: Set<(toasts: ToastMessage[]) => void> = new Set()
let idCounter = 0

function notify(listeners: Set<(toasts: ToastMessage[]) => void>) {
  listeners.forEach(fn => fn([...globalToasts]))
}

export function addToast(toast: Omit<ToastMessage, 'id'>) {
  const newToast = { ...toast, id: `toast-${++idCounter}` }
  globalToasts = [...globalToasts, newToast]
  notify(globalListeners)
}

export function removeToast(id: string) {
  globalToasts = globalToasts.filter(t => t.id !== id)
  notify(globalListeners)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    globalListeners.add(setToasts)
    setToasts([...globalToasts])
    return () => { globalListeners.delete(setToasts) }
  }, [])

  const handleClose = useCallback((id: string) => {
    removeToast(id)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 md:right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onClose={handleClose} />
        </div>
      ))}
    </div>
  )
}
