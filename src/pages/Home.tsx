import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '@/api/products'
import type { Product, Category } from '@/types'
import ProductCard from '@/components/shared/ProductCard'
import SEO from '@/components/shared/SEO'
import PageLoader from '@/components/shared/PageLoader'
import useCountUp from '@/hooks/useCountUp'
import OptimizedImage from '@/components/shared/OptimizedImage'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

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

  const stat1 = useCountUp({ end: 12, suffix: '+', duration: 2000 })
  const stat2 = useCountUp({ end: 80, suffix: '+', duration: 2200 })
  const stat3 = useCountUp({ end: 50, suffix: '+', duration: 2400 })
  const stat4 = useCountUp({ end: 15, suffix: '+', duration: 1800 })

  return (
    <>
      <SEO
        title="Hotel Supplies Manufacturer"
        description="Full-spectrum hotel supplies from an integrated manufacturer. Bedding, towels, bathrobes, amenities — from yarn to room. Serving 50+ countries."
        path="/"
        image="/images/hero-home.webp"
      />

      {/* HERO */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[20%] w-[600px] h-[600px] border border-gold/10 rotate-45 hidden lg:block" />
        <div className="max-w-container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-4 md:mb-5">
              Integrated Hotel Supply Manufacturer
            </span>
            <h1 className="font-heading text-3xl md:text-[42px] lg:text-[48px] font-bold text-white leading-tight mb-4 md:mb-5">
              From Yarn to Room,{' '}
              <span className="text-gold">Quality at Every Step.</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Full-spectrum hotel supplies from an integrated manufacturer with in-house spinning,
              weaving, dyeing and garment production. One source for every essential.
            </p>
            <div className="flex gap-3 md:gap-4 justify-center lg:justify-start flex-wrap">
              <Link to="/products" className="btn-cta">
                Explore Products
              </Link>
              <Link to="/rfq" className="btn bg-transparent text-white border-2 border-white/40 hover:bg-white/10">
                Get Free Samples
              </Link>
            </div>
            <div ref={stat1.ref} className="grid grid-cols-2 lg:flex lg:gap-10 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/15 gap-4 md:gap-6">
              {[
                { num: stat1.display, label: 'Product Categories' },
                { num: stat2.display, label: 'Sub-categories' },
                { num: stat3.display, label: 'Countries Served' },
                { num: stat4.display, label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-2xl md:text-[28px] font-bold text-gold">{s.num}</div>
                  <div className="text-[12px] md:text-[13px] text-white/55 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block flex-shrink-0 w-[440px]">
            <div className="w-full h-80 relative overflow-hidden img-skeleton">
              <OptimizedImage
                src="/images/hero-home.webp"
                alt="LUXEHOSPI Premium Hotel Supplies"
                className="w-full h-full"
                eager
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-bg-light py-8 md:py-12 border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6 flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {['MARRIOTT', 'HILTON', 'ACCOR', 'IHG', 'HYATT', 'WYNDHAM', 'CHOICE'].map((brand) => (
            <span
              key={brand}
              className="font-heading text-sm md:text-lg font-bold text-text-primary/30 md:text-text-primary/35 tracking-wider"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <PageLoader loading={loading}>
        <section className="section-pad bg-white">
          <div className="max-w-container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="section-label">Product Categories</span>
              <h2 className="section-title">
                Everything Your Hotel Needs,{' '}
                <br className="hidden sm:block" />In One Place.
              </h2>
              <p className="section-desc mx-auto text-center">
                12 major categories covering every essential -- from bedroom linens to disposable
                amenities. Browse our full range or request a customized catalog.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to="/products"
                  className="border border-border p-5 md:p-8 text-center bg-white hover:border-gold hover:shadow-lg hover:-translate-y-1 transition-all no-underline group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 overflow-hidden img-skeleton flex items-center justify-center">
                    <OptimizedImage
                      src={cat.image || '/images/category-bedroom-linens.webp'}
                      alt={cat.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="font-heading text-sm md:text-[15px] font-semibold text-navy mb-1.5 md:mb-2">
                    {cat.name}
                  </div>
                  <div className="text-[12px] md:text-[13px] text-text-secondary mb-2.5 md:mb-3">{cat.count}</div>
                  <span className="inline-block text-[11px] md:text-xs text-gold font-semibold tracking-wider uppercase group-hover:translate-x-1 transition-transform">
                    Explore &rarr;
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-10">
              <Link to="/products" className="btn-outline btn-sm">
                View All 12 Categories &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section-pad bg-bg-light">
          <div className="max-w-container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="section-label">Why LUXEHOSPI</span>
              <h2 className="section-title">
                Vertical Integration.{' '}
                <br className="hidden sm:block" />Horizontal Excellence.
              </h2>
              <p className="section-desc mx-auto text-center">
                We control every step of production in our own factories -- delivering consistent
                quality, competitive pricing, and flexible customization.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mt-8 md:mt-12">
              {[
                {
                  icon: '\u2699',
                  title: 'Integrated Manufacturing',
                  desc: 'From Siro Compact spinning to finished garments -- four wholly-owned factories under one roof. No middlemen, no quality gaps.',
                },
                {
                  icon: '\u270E',
                  title: 'Flexible OEM / ODM',
                  desc: 'Your brand, our factory. Custom labeling, bespoke packaging, exclusive fabric blends. Dedicated R&D team with 5-7 day sample turnaround.',
                },
                {
                  icon: '\u2713',
                  title: 'Certified Quality',
                  desc: 'ISO 9001, BSCI, OEKO-TEX certified. Rigorous 4-stage QC process from raw material inspection to pre-shipment audit.',
                },
                {
                  icon: '\u2605',
                  title: 'Competitive Factory Pricing',
                  desc: 'Direct-from-factory pricing with transparent cost breakdowns. No distributor markup. Volume discounts and flexible MOQ.',
                },
                {
                  icon: '\u23F1',
                  title: 'Reliable Delivery',
                  desc: '15-25 day lead time for standard orders. Dedicated logistics team coordinating sea freight and air shipping.',
                },
                {
                  icon: '\u2666',
                  title: 'Digital Procurement',
                  desc: 'Smart RFQ system with instant specifications comparison, online sample requests, and digital product catalogs.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 md:p-9 border-t-[3px] border-transparent hover:border-gold transition-colors"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 bg-[#EBF0F5] flex items-center justify-center text-lg md:text-xl mb-4 md:mb-5">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-base md:text-[17px] font-semibold text-navy mb-2 md:mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="section-pad bg-white">
          <div className="max-w-container mx-auto px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-12 gap-4">
              <div>
                <span className="section-label">Featured Products</span>
                <h2 className="section-title mb-0">Bestsellers</h2>
              </div>
              <Link to="/products" className="btn-outline btn-sm self-start sm:self-auto">
                View All Products &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </PageLoader>

      {/* TESTIMONIALS */}
      <section className="py-12 md:py-section bg-navy">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Trusted By Professionals
            </span>
            <h2 className="font-heading text-2xl md:text-[32px] font-bold text-white">What Our Partners Say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[
              {
                quote:
                  'Switching to LUXEHOSPI cut our linen procurement costs by 22% while improving thread quality. Their integrated supply chain means consistent quality across every batch.',
                name: 'James Henderson',
                role: 'Procurement Director, Sterling Hotel Group -- UK',
                initials: 'JH',
              },
              {
                quote:
                  'Their OEM program is exceptional. We provided our design specs and received production-ready samples within 6 days. The 700gsm towels are genuinely the best in their price range.',
                name: 'Marie Klein',
                role: 'Brand Manager, Plein Sud Hotels -- France',
                initials: 'MK',
              },
              {
                quote:
                  "We've been sourcing from LUXEHOSPI for 8 years now. Their digital RFQ system makes reordering effortless, and the lead times are consistently reliable.",
                name: 'Robert Schmidt',
                role: 'COO, Alpina Resort Collection -- Germany',
                initials: 'RS',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white/[0.06] border border-white/10 p-6 md:p-8"
              >
                <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed mb-5 md:mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/30 flex items-center justify-center text-base font-bold text-gold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gold-pale py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-center md:text-left">
          <div>
            <h2 className="font-heading text-xl md:text-[28px] font-bold text-navy mb-2">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-sm md:text-base text-text-primary">
              Get a free product catalog, sample swatches, or a custom quote -- delivered within 24
              hours.
            </p>
          </div>
          <div className="flex gap-3 md:gap-4 flex-shrink-0">
            <Link to="/rfq" className="btn-cta">
              Request Free Samples
            </Link>
            <Link to="/products" className="btn-primary">
              Download Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
