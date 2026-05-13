import SEO from '@/components/shared/SEO'
import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '@/api/products'
import type { Product, Category } from '@/types'
import ProductCard from '@/components/shared/ProductCard'
import PageLoader from '@/components/shared/PageLoader'
import { setBreadcrumbLd } from '@/lib/jsonld'

const materialOptions = ['All', '100% Cotton', '100% Combed Cotton', 'Cotton-Poly Blend', 'Non-woven', 'Various']
const weightOptions = ['All', '380gsm', '500gsm', '600gsm', '700gsm', '800gsm']

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedMaterial, setSelectedMaterial] = useState('All')
  const [selectedWeight, setSelectedWeight] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        if (!cancelled) {
          setProducts(prods)
          setCategories(cats)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (selectedMaterial !== 'All') {
      result = result.filter((p) => p.material.includes(selectedMaterial))
    }
    if (selectedWeight !== 'All') {
      result = result.filter((p) => p.weight === selectedWeight)
    }
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'moq-low') result.sort((a, b) => a.moq - b.moq)
    if (sortBy === 'moq-high') result.sort((a, b) => b.moq - a.moq)
    return result
  }, [products, selectedCategory, selectedMaterial, selectedWeight, sortBy])

  const activeFilterCount = [selectedCategory, selectedMaterial, selectedWeight].filter((v) => v !== 'All').length

  const clearFilters = () => {
    setSelectedCategory('All')
    setSelectedMaterial('All')
    setSelectedWeight('All')
  }

  useEffect(() => {
    setBreadcrumbLd([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
    ])
    return () => { document.getElementById('ld-breadcrumb')?.remove() }
  }, [])

  return (
    <>
      <SEO
        title="Hotel Supply Catalog"
        description="Browse our complete hotel supply catalog: bedding, towels, bathrobes, amenities, and more. OEM/ODM available with low MOQ."
        path="/products"
      />

      {/* Breadcrumb */}
      <div className="py-3 md:py-3.5 border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6 flex gap-2 text-[12px] md:text-[13px]">
          <Link to="/" className="text-text-secondary hover:text-navy">Home</Link>
          <span className="text-[#C5D5E5]">/</span>
          <span className="text-navy font-medium">Products</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="bg-bg-light py-8 md:py-10 border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <span className="section-label">Our Products</span>
          <h1 className="section-title">Hotel Supply Catalog</h1>
          <p className="section-desc">
            Browse our complete range of hospitality products. Use filters to find exactly what you need.
          </p>
        </div>
      </div>

      <PageLoader loading={loading}>
        <div className="max-w-container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col lg:flex-row gap-8 md:gap-10">
          {/* MOBILE: Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-between w-full bg-bg-light border border-border p-3.5 text-sm font-medium text-navy cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-gold text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <span className="text-text-secondary text-xs">{filtered.length} products</span>
          </button>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="lg:hidden border border-border bg-white p-4 space-y-5">
              {/* Category */}
              <div>
                <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-3 pb-2 border-b border-border">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['All', ...categories.map((c) => c.name)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[13px] py-1.5 px-3 no-underline border cursor-pointer transition-colors ${
                        selectedCategory === cat
                          ? 'text-gold font-semibold bg-gold-pale/40 border-gold/30'
                          : 'text-text-secondary hover:text-navy bg-white border-border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-3 pb-2 border-b border-border">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  {materialOptions.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`text-[13px] py-1.5 px-3 no-underline border cursor-pointer transition-colors ${
                        selectedMaterial === mat
                          ? 'text-gold font-semibold bg-gold-pale/40 border-gold/30'
                          : 'text-text-secondary hover:text-navy bg-white border-border'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight */}
              <div>
                <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-3 pb-2 border-b border-border">
                  Weight
                </h3>
                <div className="flex flex-wrap gap-2">
                  {weightOptions.map((wt) => (
                    <button
                      key={wt}
                      onClick={() => setSelectedWeight(wt)}
                      className={`text-[13px] py-1.5 px-3 no-underline border cursor-pointer transition-colors ${
                        selectedWeight === wt
                          ? 'text-gold font-semibold bg-gold-pale/40 border-gold/30'
                          : 'text-text-secondary hover:text-navy bg-white border-border'
                      }`}
                    >
                      {wt}
                    </button>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gold font-semibold underline bg-transparent border-none cursor-pointer"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* LEFT: Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Category */}
            <div className="mb-8">
              <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-4 pb-2 border-b border-border">
                Category
              </h3>
              <div className="flex flex-col gap-2">
                {['All', ...categories.map((c) => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm py-1.5 px-2 no-underline border-none cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? 'text-gold font-semibold bg-gold-pale/30'
                        : 'text-text-secondary hover:text-navy bg-transparent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-8">
              <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-4 pb-2 border-b border-border">
                Material
              </h3>
              <div className="flex flex-col gap-2">
                {materialOptions.map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`text-left text-sm py-1.5 px-2 no-underline border-none cursor-pointer transition-colors ${
                      selectedMaterial === mat
                        ? 'text-gold font-semibold bg-gold-pale/30'
                        : 'text-text-secondary hover:text-navy bg-transparent'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div className="mb-8">
              <h3 className="font-heading text-[13px] font-bold text-navy uppercase tracking-wider mb-4 pb-2 border-b border-border">
                Weight
              </h3>
              <div className="flex flex-col gap-2">
                {weightOptions.map((wt) => (
                  <button
                    key={wt}
                    onClick={() => setSelectedWeight(wt)}
                    className={`text-left text-sm py-1.5 px-2 no-underline border-none cursor-pointer transition-colors ${
                      selectedWeight === wt
                        ? 'text-gold font-semibold bg-gold-pale/30'
                        : 'text-text-secondary hover:text-navy bg-transparent'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gold font-semibold underline bg-transparent border-none cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* RIGHT: Results */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="text-sm text-text-secondary">
                Showing <strong className="text-navy">{filtered.length}</strong> products
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-text-secondary hidden sm:block">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm text-navy font-medium bg-white border border-border px-3 py-2 cursor-pointer focus:outline-none focus:border-navy"
                >
                  <option value="name">Name A-Z</option>
                  <option value="moq-low">MOQ: Low to High</option>
                  <option value="moq-high">MOQ: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-4xl text-border-light mb-4">+</div>
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">No products found</h3>
                <p className="text-sm text-text-secondary mb-4">Try adjusting your filters to find what you&apos;re looking for.</p>
                <button onClick={clearFilters} className="btn-outline btn-sm">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </PageLoader>
    </>
  )
}
