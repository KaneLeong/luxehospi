/**
 * API Client — centralized HTTP layer
 * When a real backend is ready, change BASE_URL and remove mock helpers.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const DEFAULT_TIMEOUT = 15000

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  timeout?: number
}

interface ApiResponse<T> {
  ok: boolean
  data: T
  message?: string
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, timeout = DEFAULT_TIMEOUT } = options

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timer)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new ApiError(res.status, errorData.message || res.statusText, errorData)
      }

      const data = await res.json()
      return { ok: true, data }
    } catch (error) {
      clearTimeout(timer)
      if (error instanceof ApiError) throw error
      if ((error as Error).name === 'AbortError') {
        throw new ApiError(408, 'Request timeout')
      }
      throw new ApiError(0, 'Network error. Please check your connection.')
    }
  }

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body })
  }

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body })
  }

  del<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

export class ApiError extends Error {
  status: number
  data: unknown

  constructor(status: number, message: string, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const api = new ApiClient(BASE_URL)
