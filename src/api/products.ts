/**
 * Products API — backed by local data.
 * When a real backend is ready, switch to fetch calls.
 */

import type { Product, Category } from '@/types'
import { products, categories } from '@/data/products'

const MOCK_DELAY = 200

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Products ──────────────────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  await delay(MOCK_DELAY)
  return products
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  await delay(MOCK_DELAY)
  return products.find((p) => p.slug === slug) ?? null
}

// ─── Categories ────────────────────────────────────────────

export async function fetchCategories(): Promise<Category[]> {
  await delay(MOCK_DELAY)
  return categories
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

export async function submitContactForm(_data: ContactFormData): Promise<{ success: boolean }> {
  await delay(1200)
  return { success: true }
}

export async function submitRfqForm(_data: RfqFormData): Promise<{ success: boolean }> {
  await delay(1500)
  return { success: true }
}
