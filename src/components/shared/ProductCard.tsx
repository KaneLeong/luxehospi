import { type Product } from '@/types'
import { Link } from 'react-router-dom'
import { useQuoteStore } from '@/stores/quoteStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((s) => s.addItem)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const defaultVariant = product.variants[0]
    addItem(product, defaultVariant.size, defaultVariant.color, defaultVariant.weight)
  }

  return (
    <Link
      to={`/products/${product.slug}`}
      className="border border-border bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline block group"
    >
      <div className="h-48 sm:h-56 relative overflow-hidden img-skeleton">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-border-light">+</div>
        )}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-gold text-white text-[10px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
            {product.badge}
          </span>
        )}
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-navy/90 backdrop-blur-sm text-white text-[12px] md:text-[13px] font-semibold py-2.5 px-3 flex items-center justify-center gap-1.5 hover:bg-navy transition-colors cursor-pointer border-none"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add to Quote
          </button>
        </div>
      </div>
      <div className="p-3.5 md:p-4">
        <div className="text-[11px] font-semibold text-gold uppercase tracking-wider mb-1.5">
          {product.category}
        </div>
        <div className="font-heading text-sm font-semibold text-navy mb-2 leading-snug">
          {product.name}
        </div>
        <div className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-[11px] text-text-secondary">
            MOQ: <strong className="text-text-primary">{product.moq.toLocaleString()} {product.moqUnit}</strong>
          </div>
          <span className="text-xs font-semibold text-gold font-heading group-hover:translate-x-0.5 transition-transform">
            Get Quote &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
