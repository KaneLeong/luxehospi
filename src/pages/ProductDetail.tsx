import SEO from '@/components/shared/SEO'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductBySlug, fetchProducts } from '@/api/products'
import type { Product } from '@/types'
import { useQuoteStore } from '@/stores/quoteStore'
import ProductCard from '@/components/shared/ProductCard'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { setBreadcrumbLd, setProductLd, setFaqLd } from '@/lib/jsonld'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedWeight, setSelectedWeight] = useState('')
  const [activeTab, setActiveTab] = useState('specs')
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const addItem = useQuoteStore((s) => s.addItem)

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    fetchProductBySlug(slug).then((p) => {
      if (cancelled) return
      if (!p) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setProduct(p)
      setSelectedSize(p.variants[0]?.size ?? '')
      setSelectedColor(p.variants[0]?.color ?? '')
      setSelectedWeight(p.variants[0]?.weight ?? '')
      setLoading(false)
    }).catch(() => {
      if (!cancelled) {
        setNotFound(true)
        setLoading(false)
      }
    })

    // Fetch related products in parallel
    fetchProducts().then((prods) => {
      if (!cancelled) {
        setRelatedProducts(prods.filter((pp) => pp.slug !== slug).slice(0, 4))
      }
    })

    return () => { cancelled = true }
  }, [slug])

  // JSON-LD structured data
  useEffect(() => {
    if (!product) return
    setBreadcrumbLd([
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/products' },
      { name: product.category, url: '/products' },
      { name: product.name, url: `/products/${product.slug}` },
    ])
    setProductLd({
      name: product.name,
      slug: product.slug,
      description: product.description,
      image: product.image || '/images/hero-home.webp',
      category: product.category,
      material: product.material,
      moq: product.moq,
      moqUnit: product.moqUnit,
      leadTime: product.leadTime,
    })
    setFaqLd([
      { q: 'What is the minimum order quantity?', a: 'MOQ varies by product. Standard items start at 300 pieces. Fully custom products may require 500-1,000 pieces. Flexible trial orders are available for new clients.' },
      { q: 'Can I order custom colors?', a: 'Yes. We offer Pantone color matching for custom colors. Standard white and common colors have lower MOQ. Lab dips are provided within 5 business days for approval.' },
      { q: 'Can you add our hotel logo?', a: 'Absolutely. We offer woven labels, printed labels, embroidered logos, and jacquard border branding. Custom label setup takes 7-10 days.' },
      { q: 'How do I get a sample?', a: 'Click "Request Sample" or contact your sales representative. Free samples for existing products (freight collect). Custom samples have a small fee credited against bulk orders.' },
    ])
    return () => {
      ;['ld-breadcrumb', 'ld-product', 'ld-faq'].forEach((id) => {
        document.getElementById(id)?.remove()
      })
    }
  }, [product])

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="max-w-container mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Breadcrumb skeleton */}
        <div className="flex gap-2 mb-8 animate-pulse">
          <div className="h-3 w-12 bg-bg-light rounded" />
          <div className="h-3 w-3 bg-bg-light rounded" />
          <div className="h-3 w-16 bg-bg-light rounded" />
          <div className="h-3 w-3 bg-bg-light rounded" />
          <div className="h-3 w-24 bg-bg-light rounded" />
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Image skeleton */}
          <div className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0">
            <div className="w-full aspect-square md:aspect-auto md:h-[420px] lg:h-[480px] bg-bg-light rounded-lg animate-pulse" />
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 bg-bg-light rounded animate-pulse" />
              ))}
            </div>
          </div>
          {/* Info skeleton */}
          <div className="flex-1 space-y-4 animate-pulse">
            <div className="h-4 w-36 bg-bg-light rounded" />
            <div className="h-8 w-72 bg-bg-light rounded" />
            <div className="h-4 w-24 bg-bg-light rounded" />
            <div className="h-16 w-full bg-bg-light rounded" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-20 bg-bg-light rounded" />
              ))}
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-bg-light" />
              ))}
            </div>
            <div className="h-24 w-full bg-bg-light rounded" />
            <div className="h-12 w-48 bg-bg-light rounded" />
          </div>
        </div>
      </div>
    )
  }

  // ── 404 ──
  if (notFound || !product) {
    return (
      <div className="max-w-container mx-auto px-4 md:px-6 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold text-navy mb-4">Product Not Found</h1>
        <Link to="/products" className="btn-primary">Back to Products</Link>
      </div>
    )
  }

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [product.image || '/images/hero-home.webp']

  const activeImage = allImages[activeImageIndex] ?? allImages[0]
  const colors = [...new Set(product.variants.map((v) => v.color))]
  const sizes = [...new Set(product.variants.map((v) => v.size))]
  const weights = [...new Set(product.variants.map((v) => v.weight))]

  const handleAddToQuote = () => {
    addItem(product, selectedSize, selectedColor, selectedWeight)
  }

  const tabList = [
    { id: 'specs', label: 'Specs' },
    { id: 'desc', label: 'Description' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'faq', label: 'FAQs' },
  ]

  return (
    <>
      <SEO
        title={`${product.name} - ${product.category}`}
        description={product.description}
        path={`/products/${product.slug}`}
        image={product.image || '/images/hero-home.webp'}
        type="product"
      />

      {/* Breadcrumb */}
      <div className="py-3 md:py-3.5 border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6 flex gap-1.5 md:gap-2 text-[11px] md:text-[13px] overflow-x-auto">
          <Link to="/" className="text-text-secondary hover:text-navy whitespace-nowrap">Home</Link>
          <span className="text-[#C5D5E5]">/</span>
          <Link to="/products" className="text-text-secondary hover:text-navy whitespace-nowrap">Products</Link>
          <span className="text-[#C5D5E5]">/</span>
          <Link to="/products" className="text-text-secondary hover:text-navy whitespace-nowrap">{product.category}</Link>
          <span className="text-[#C5D5E5]">/</span>
          <span className="text-navy font-medium whitespace-nowrap">{product.name}</span>
        </div>
      </div>

      {/* Product Top */}
      <div className="max-w-container mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Gallery */}
        <div className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0">
          {/* Main Image */}
          <div className="w-full aspect-square md:aspect-auto md:h-[420px] lg:h-[480px] border border-border relative overflow-hidden img-skeleton group">
            <img
              key={activeImage}
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
              loading="eager"
            />
            {product.badge && (
              <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-gold text-white text-[10px] md:text-[11px] font-bold px-3 md:px-4 py-1 tracking-wider uppercase z-10">
                {product.badge}
              </span>
            )}
            {/* Prev / Next arrows (desktop only) */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 border-none cursor-pointer"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 border-none cursor-pointer"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 md:gap-3 mt-3 md:mt-4 overflow-x-auto">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIndex(i)}
                className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] bg-bg-light border-2 overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200 ${
                  activeImageIndex === i
                    ? 'border-gold shadow-[0_0_0_2px_rgba(212,175,55,0.3)] scale-[1.05]'
                    : 'border-border-light hover:border-navy/40'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="text-[11px] md:text-xs font-semibold text-gold uppercase tracking-[1px] md:tracking-[1.5px] mb-1.5 md:mb-2">
            {product.category} / {product.subCategory}
          </div>
          <h1 className="font-heading text-xl md:text-[28px] font-bold text-navy leading-tight mb-2 md:mb-3">
            {product.name}
          </h1>
          <div className="text-[12px] md:text-[13px] text-text-muted mb-4 md:mb-5">
            SKU: <code className="bg-[#F0F3F5] px-2 py-0.5 text-[11px] md:text-xs">{product.id}</code>
          </div>
          <p className="text-[13px] md:text-[15px] text-text-secondary leading-relaxed mb-5 md:mb-6 pb-5 md:pb-6 border-b border-border">
            {product.description}
          </p>

          {/* Size */}
          <div className="mb-4 md:mb-5">
            <div className="text-[13px] font-semibold text-navy mb-2 md:mb-2.5">
              Size <span className="text-text-secondary font-normal">(required)</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`h-9 md:h-10 min-w-[56px] md:min-w-[64px] px-3 md:px-4 border-2 text-[12px] md:text-[13px] font-medium cursor-pointer font-body transition-colors ${
                    selectedSize === s
                      ? 'border-navy bg-navy text-white'
                      : 'border-border-light text-text-primary hover:border-navy bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-4 md:mb-5">
            <div className="text-[13px] font-semibold text-navy mb-2 md:mb-2.5">
              Color <span className="text-text-secondary font-normal">(required)</span>
            </div>
            <div className="flex gap-2 md:gap-2.5">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full border-2 cursor-pointer relative ${
                    selectedColor === c ? 'border-navy' : 'border-border'
                  }`}
                  title={c}
                  style={{ background: c.toLowerCase().includes('white') ? '#FFF' : c.toLowerCase().includes('navy') ? '#1B3A5C' : c.toLowerCase().includes('ivory') ? '#F5F5F5' : '#D0D8E0' }}
                />
              ))}
            </div>
            <div className="text-[11px] md:text-xs text-text-secondary mt-1.5 md:mt-2">
              Selected: <strong className="text-text-primary">{selectedColor}</strong>
            </div>
          </div>

          {/* Weight */}
          {weights.length > 1 && (
            <div className="mb-4 md:mb-5">
              <div className="text-[13px] font-semibold text-navy mb-2 md:mb-2.5">Weight</div>
              <div className="flex gap-2 flex-wrap">
                {weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`h-9 md:h-10 min-w-[56px] md:min-w-[64px] px-3 md:px-4 border-2 text-[12px] md:text-[13px] font-medium cursor-pointer font-body transition-colors ${
                      selectedWeight === w
                        ? 'border-navy bg-navy text-white'
                        : 'border-border-light text-text-primary hover:border-navy bg-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 my-5 md:my-6 py-4 md:py-5 border-y border-border">
            {[
              { label: 'Material:', value: product.material },
              { label: 'Weight:', value: product.weight },
              { label: 'Certification:', value: 'OEKO-TEX Standard 100' },
              { label: 'Lead Time:', value: product.leadTime },
            ].map((spec) => (
              <div key={spec.label} className="flex gap-1.5 md:gap-2 text-[12px] md:text-[13px]">
                <span className="text-text-muted min-w-[70px] md:min-w-[90px]">{spec.label}</span>
                <span className="text-text-primary font-medium">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Quote Box */}
          <div className="p-4 md:p-6 bg-gold-pale">
            <div className="text-[13px] md:text-sm text-text-primary mb-1">
              Minimum Order: <strong className="text-navy">{product.moq.toLocaleString()} {product.moqUnit}</strong>
            </div>
            <div className="text-[12px] md:text-[13px] text-text-secondary mb-4">
              Lead time: {product.leadTime} after order confirmation
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3">
              <Link to="/rfq" onClick={handleAddToQuote} className="btn-cta text-center sm:text-left">
                Add to Quote List
              </Link>
              <button className="btn bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white btn-sm text-center sm:text-left">
                Request Sample
              </button>
            </div>
            <div className="grid grid-cols-2 md:flex md:gap-6 mt-4 md:mt-5 gap-2">
              {[
                { icon: '\u2605', label: 'Quality Guaranteed' },
                { icon: '\u270E', label: 'Custom Labeling' },
                { icon: '\u23F1', label: 'Fast Delivery' },
                { icon: '\u2713', label: 'Free Samples' },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-[11px] md:text-xs text-text-secondary">
                  <span className="w-7 h-7 md:w-8 md:h-8 bg-[#EBF0F5] flex items-center justify-center text-sm flex-shrink-0">{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-container mx-auto px-4 md:px-6 pb-12 md:pb-16">
        <div className="flex overflow-x-auto border-b-2 border-border mb-6 md:mb-8 -mx-4 md:mx-0 px-4 md:px-0">
          {tabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 md:px-7 py-3 md:py-3.5 text-[13px] md:text-sm font-semibold border-none cursor-pointer font-body -mb-[2px] transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'text-navy border-b-2 border-gold'
                  : 'text-text-secondary hover:text-navy bg-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Specs Tab */}
        {activeTab === 'specs' && (
          <div>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full border-collapse mb-6 min-w-[400px]">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <th className="bg-bg-light text-[11px] md:text-xs font-semibold text-navy uppercase tracking-wider px-3 md:px-4 py-2.5 md:py-3 text-left border border-border w-[35%]">
                        {key}
                      </th>
                      <td className="text-[13px] md:text-sm text-text-primary px-3 md:px-4 py-2.5 md:py-3 border border-border">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="font-heading text-base md:text-lg font-semibold text-navy mb-3">Certifications</h3>
            <div className="grid grid-cols-2 md:flex md:gap-5 gap-3">
              {['OEKO-TEX\nStandard 100', 'ISO 9001\nQuality', 'BSCI\nSocial Audit', 'SGS\nTested'].map((cert) => (
                <div key={cert} className="h-[70px] md:w-[120px] md:h-[90px] bg-bg-light border border-border flex items-center justify-center text-[11px] md:text-xs font-semibold text-text-secondary text-center whitespace-pre-line">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description Tab */}
        {activeTab === 'desc' && (
          <div>
            <h3 className="font-heading text-base md:text-lg font-bold text-navy mb-3">Why Choose This Product</h3>
            <p className="text-[13px] md:text-[15px] text-text-secondary leading-relaxed mb-5">{product.description}</p>
            <p className="text-[13px] md:text-[15px] text-text-secondary leading-relaxed">
              Each product undergoes our 4-stage quality control process: raw material inspection,
              in-line production monitoring, finished product testing, and pre-shipment audit.
              Backed by our vertically integrated manufacturing from Siro Compact spinning to final packaging.
            </p>
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full border-collapse min-w-[400px]">
              <tbody>
                {[
                  ['FOB Port', 'Shanghai / Ningbo, China'],
                  ['Lead Time', product.leadTime + ' (standard) / 25-30 days (custom)'],
                  ['Sample Lead Time', '3-5 days (existing) / 7-10 days (custom)'],
                  ['Shipping Terms', 'FOB / CIF / CFR / DDP (door-to-door available)'],
                  ['Payment Terms', 'T/T 30% deposit + 70% before shipment / L/C at sight'],
                  ['Packaging', 'Individual polybag / Roll pack / Custom branded packaging'],
                ].map(([key, value]) => (
                  <tr key={key}>
                    <th className="bg-bg-light text-[11px] md:text-xs font-semibold text-navy uppercase tracking-wider px-3 md:px-4 py-2.5 md:py-3 text-left border border-border w-[35%]">
                      {key}
                    </th>
                    <td className="text-[13px] md:text-sm text-text-primary px-3 md:px-4 py-2.5 md:py-3 border border-border">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <FAQAccordion
            items={[
              {
                q: 'What is the minimum order quantity?',
                a: 'MOQ varies by product. Standard items start at 300 pieces. Fully custom products may require 500-1,000 pieces. Flexible trial orders are available for new clients.',
              },
              {
                q: 'Can I order custom colors?',
                a: 'Yes. We offer Pantone color matching for custom colors. Standard white and common colors have lower MOQ. Lab dips are provided within 5 business days for approval.',
              },
              {
                q: 'Can you add our hotel logo?',
                a: 'Absolutely. We offer woven labels, printed labels, embroidered logos, and jacquard border branding. Custom label setup takes 7-10 days.',
              },
              {
                q: 'How do I get a sample?',
                a: 'Click "Request Sample" or contact your sales representative. Free samples for existing products (freight collect). Custom samples have a small fee credited against bulk orders.',
              },
            ]}
          />
        )}

        {/* Related Products */}
        <h3 className="font-heading text-lg md:text-xl font-bold text-navy mt-10 md:mt-12 mb-5 md:mb-6 pt-8 md:pt-12 border-t border-border">
          You May Also Like
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  )
}
