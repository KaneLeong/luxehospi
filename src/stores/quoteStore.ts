import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { QuoteItem, Product } from '@/types'

interface QuoteStore {
  items: QuoteItem[]
  addItem: (product: Product, size: string, color: string, weight: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearAll: () => void
  totalItems: () => number
}

export const useQuoteStore = create<QuoteStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, weight, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { product, selectedSize: size, selectedColor: color, selectedWeight: weight, quantity }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearAll: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'luxehospi-quote',
      // Only persist the items array — actions are derived
      partialize: (state) => ({ items: state.items }),
    }
  )
)
