/**
 * Products API — currently backed by local data (Mock mode).
 * When a real backend is ready, set VITE_API_MOCK=false and update
 * the fetch calls to hit the real endpoints.
 */

import type { Product, Category } from '@/types'
import { products as mockProducts, categories as mockCategories } from '@/data/products'
import { ApiError } from '@/lib/api'

const MOCK_DELAY = 200
const USE_MOCK = import.meta.env.VITE_API_MOCK !== 'false'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Products ──────────────────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  if (USE_MOCK) {
    await delay(MOCK_DELAY)
    return mockProducts
  }
  const res = await fetch('/api/products')
  if (!res.ok) throw new ApiError(res.status, 'Failed to fetch products')
  return res.json()
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (USE_MOCK) {
    await delay(MOCK_DELAY)
    return mockProducts.find((p) => p.slug === slug) ?? null
  }
  const res = await fetch(`/api/products/${slug}`)
  if (res.status === 404) return null
  if (!res.ok) throw new ApiError(res.status, 'Failed to fetch product')
  return res.json()
}

// ─── Categories ────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  if (USE_MOCK) {
    await delay(MOCK_DELAY)
    return mockCategories
  }
  const res = await fetch('/api/categories')
  if (!res.ok) throw new ApiError(res.status, 'Failed to fetch categories')
  return res.json()
}

// ─── Forms ─────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  company: string
  phone?: string
  subject: string
  message: string
}

export interface RfqFormData {
  name: string
  email: string
  company: string
  country?: string
  phone?: string
  timeline?: string
  shippingTerms?: string
  items: Array<{
    productId: string
    quantity: number
    size: string
    color: string
    weight: string
  }>
  requirements?: string
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  if (USE_MOCK) {
    await delay(1200)
    return { success: true }
  }
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new ApiError(res.status, 'Failed to submit contact form')
  return res.json()
}

export async function submitRfqForm(data: RfqFormData): Promise<{ success: boolean }> {
  if (USE_MOCK) {
    await delay(1500)
    return { success: true }
  }
  const res = await fetch('/api/rfq', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new ApiError(res.status, 'Failed to submit RFQ')
  return res.json()
}
