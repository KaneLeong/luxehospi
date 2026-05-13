import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuoteStore } from '@/stores/quoteStore'
import MobileMenu from './MobileMenu'

const navLinks = [
  { path: '/products', label: 'Products' },
  { path: '/oem-odm', label: 'OEM / ODM' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const totalItems = useQuoteStore((s) => s.totalItems)

  const isActive = (path: string) => location.pathname.startsWith(path)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-border shadow-[0_1px_8px_rgba(0,0,0,0.06)]'
            : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 flex items-center justify-between h-[64px] md:h-[72px] transition-[height] duration-300">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 md:gap-3.5 no-underline flex-shrink-0">
            <picture>
              <source srcSet="/logo-icon.webp" type="image/webp" />
              <img
                src="/logo-icon.png"
                alt="LUXEHOSPI"
                className={`w-auto transition-[height] duration-300 ${scrolled ? 'h-6 md:h-7' : 'h-7 md:h-9'}`}
              />
            </picture>
            <span className={`font-bold text-navy tracking-wider transition-[font-size] duration-300 ${scrolled ? 'font-heading text-base md:text-lg' : 'font-heading text-lg md:text-[22px]'}`}>
              LUXEH<span className="text-gold">O</span>SPI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium py-2 border-b-2 transition-colors no-underline ${
                  isActive(link.path)
                    ? 'text-navy border-gold'
                    : 'text-text-primary border-transparent hover:text-navy hover:border-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rfq"
              className="bg-gold text-white px-5 py-2.5 font-heading text-[13px] font-semibold no-underline hover:bg-gold-light transition-colors flex items-center gap-2"
            >
              Request a Quote
              {totalItems() > 0 && (
                <span className="bg-navy text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {totalItems()}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Buttons */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              to="/rfq"
              className="relative flex items-center justify-center w-10 h-10 no-underline"
            >
              <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {totalItems()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="w-10 h-10 flex items-center justify-center border-none bg-transparent cursor-pointer lg:hidden"
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <span className="block w-5 h-[2px] bg-navy" />
                <span className="block w-5 h-[2px] bg-navy" />
                <span className="block w-5 h-[2px] bg-navy" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
