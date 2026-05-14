import { Link } from 'react-router-dom'
import SEO from '@/components/shared/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="404 - Page Not Found | LUXEHOSPI" description="The page you are looking for does not exist. Browse our hotel textile catalog or contact our team for assistance." path="/404" />

      {/* Hero section matching site brand style */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-20 md:py-28 relative overflow-hidden">
        <div className="absolute -top-1/2 -left-[20%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden lg:block" />
        <div className="max-w-container mx-auto px-4 md:px-6 text-center relative z-10">
          {/* 404 Number */}
          <div className="relative inline-block mb-6 md:mb-8">
            <span className="font-heading text-[120px] md:text-[180px] font-bold text-white/8 leading-none select-none">
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            Page Not Found
          </h1>
          <p className="text-sm md:text-base text-white/60 leading-relaxed mb-8 md:mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Link to="/" className="btn-cta w-full sm:w-auto text-center">
              Back to Home
            </Link>
            <Link to="/products" className="btn bg-transparent text-white border-2 border-white/40 hover:bg-white/10 w-full sm:w-auto text-center">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-12 md:py-16 bg-bg-light border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6 text-center">
          <p className="text-[12px] md:text-[13px] text-text-muted mb-5 md:mb-6 uppercase tracking-widest font-heading font-bold">
            Popular Pages
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { to: '/products', label: 'Product Catalog', desc: 'Browse all hotel textiles' },
              { to: '/about', label: 'About Us', desc: 'Our factories & certifications' },
              { to: '/oem-odm', label: 'OEM / ODM', desc: 'Custom manufacturing' },
              { to: '/rfq', label: 'Request a Quote', desc: 'Free samples & pricing' },
              { to: '/contact', label: 'Contact Us', desc: 'Get in touch' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block bg-white border border-border p-4 md:p-6 hover:border-gold hover:shadow-md hover:-translate-y-0.5 transition-all no-underline group text-center"
              >
                <div className="font-heading text-sm md:text-[15px] font-semibold text-navy mb-1 group-hover:text-gold transition-colors">
                  {link.label}
                </div>
                <div className="text-[11px] md:text-xs text-text-secondary">{link.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm md:text-base text-text-secondary mb-4">
            Need help finding something? Our team is ready to assist.
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-8 text-[13px] text-text-secondary">
            <a href="mailto:contact@luxehospi.com" className="hover:text-gold transition-colors">
              contact@luxehospi.com
            </a>
            <span className="w-1 h-1 bg-border rounded-full" />
            <a href="tel:+8675781234567" className="hover:text-gold transition-colors">
              +86 757 8123 4567
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
