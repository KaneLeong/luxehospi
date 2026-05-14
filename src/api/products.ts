/**
 * Products API — backed by local data.
 * Forms submitted via FormSubmit.co (free email delivery).
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

// ─── Form Submission (FormSubmit.co) ───────────────────────
// Sends form data as email to contact@luxehospi.com via FormSubmit.co

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/contact@luxehospi.com'

async function sendFormEmail(data: Record<string, string>, subject: string): Promise<{ success: boolean }> {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status}`)
  }

  return { success: true }
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
  await sendFormEmail(
    {
      Name: data.name,
      Email: data.email,
      Company: data.company,
      'Inquiry Type': data.subject,
      Phone: data.phone || 'Not provided',
      Message: data.message,
      Source: 'Contact Page',
    },
    `[LUXEHOSPI Contact] ${data.subject} - ${data.company}`,
  )
  return { success: true }
}

export async function submitRfqForm(data: RfqFormData): Promise<{ success: boolean }> {
  const itemsText = data.items
    .map((item, i) => `Item ${i + 1}: ${item.productId} | Qty: ${item.quantity} | ${item.size} | ${item.color} | ${item.weight}`)
    .join('\n')

  await sendFormEmail(
    {
      Name: data.name,
      Email: data.email,
      Company: data.company,
      Country: data.country || 'Not provided',
      Phone: data.phone || 'Not provided',
      Timeline: data.timeline || 'Not specified',
      'Shipping Terms': data.shippingTerms || 'Not specified',
      'Product Items': itemsText || 'No items specified',
      Requirements: data.requirements || 'None',
      Source: 'RFQ Page',
    },
    `[LUXEHOSPI RFQ] ${data.company} - ${data.country || 'International'}`,
  )
  return { success: true }
}
