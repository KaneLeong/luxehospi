import { Link } from 'react-router-dom'
import { useQuoteStore } from '@/stores/quoteStore'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const navLinks = [
  { path: '/products', label: 'Products' },
  { path: '/oem-odm', label: 'OEM / ODM' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/rfq', label: 'Request a Quote', isCTA: true },
]

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const totalItems = useQuoteStore((s) => s.totalItems)

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] lg:hidden overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-[72px] border-b border-border">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 no-underline"
          >
            <picture>
              <source srcSet="/logo-icon.webp" type="image/webp" />
              <img src="/logo-icon.png" alt="LUXEHOSPI" className="h-8 w-auto" />
            </picture>
            <span className="font-heading text-lg font-bold text-navy tracking-wider">
              LUXEH<span className="text-gold">O</span>SPI
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-navy border-none bg-transparent cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="py-4">
          {navLinks.map((link) => {
            if ('isCTA' in link && link.isCTA) {
              return (
                <div key={link.path} className="px-5 pt-4">
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="block w-full text-center bg-gold text-white px-5 py-3 font-heading text-sm font-semibold no-underline hover:bg-gold-light transition-colors"
                  >
                    {link.label}
                    {totalItems() > 0 && (
                      <span className="ml-2 bg-navy text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {totalItems()}
                      </span>
                    )}
                  </Link>
                </div>
              )
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="block px-5 py-3 text-base font-medium text-text-primary hover:text-gold hover:bg-bg-light no-underline transition-colors"
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
