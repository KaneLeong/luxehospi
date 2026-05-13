export interface Product {
  id: string
  slug: string
  name: string
  category: string
  subCategory: string
  description: string
  moq: number
  moqUnit: string
  leadTime: string
  badge?: string | null
  material: string
  weight: string
  image?: string
  specs: Record<string, string>
  variants: ProductVariant[]
  images: string[]
}

export interface ProductVariant {
  size: string
  color: string
  weight: string
}

export interface QuoteItem {
  product: Product
  selectedSize: string
  selectedColor: string
  selectedWeight: string
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  count: string
  subCategories?: string[]
  image?: string
}
