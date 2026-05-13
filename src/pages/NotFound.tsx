import { Link } from 'react-router-dom'
import SEO from '@/components/shared/SEO'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." path="/404" />

      <div className="min-h-[70vh] flex items-center justify-center px-4 md:px-6">
        <div className="text-center max-w-md">
          {/* 404 Number */}
          <div className="relative inline-block mb-6 md:mb-8">
            <span className="font-heading text-[120px] md:text-[160px] font-bold text-navy/10 leading-none select-none">
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-3">
            Page Not Found
          </h1>
          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-cta w-full sm:w-auto text-center">
              Back to Home
            </Link>
            <Link to="/products" className="btn-outline btn-sm w-full sm:w-auto text-center">
              Browse Products
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-[12px] text-text-muted mb-3">Popular pages</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { to: '/products', label: 'Products' },
                { to: '/about', label: 'About Us' },
                { to: '/oem-odm', label: 'OEM/ODM' },
                { to: '/contact', label: 'Contact' },
                { to: '/rfq', label: 'Request a Quote' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[13px] text-gold hover:text-gold-light font-medium no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
