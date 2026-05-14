import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/shared/SEO'

const FAQAccordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full text-left text-[13px] md:text-sm font-semibold text-navy pb-2 border-b border-border flex items-start justify-between gap-2 cursor-pointer hover:text-gold transition-colors"
          >
            {item.q}
            <span className="text-gold text-xs flex-shrink-0 mt-0.5">{open === idx ? '\u25B2' : '\u25BC'}</span>
          </button>
          {open === idx && (
            <div className="text-[12px] md:text-[13px] text-text-secondary leading-relaxed pt-2 pb-1">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function RFQ() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    products: [] as string[],
    quantity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const productOptions = [
    'Flat Sheet',
    'Fitted Sheet',
    'Duvet Cover',
    'Pillowcase',
    'Pillow Protector',
    'Comforter / Quilt',
    'Bath Towel',
    'Face Towel',
    'Hand Towel',
    'Pool Towel',
    'Bath Mat',
    'Bathrobe (Terry)',
    'Bathrobe (Waffle)',
    'Disposable Slipper',
    'Toiletry Set',
    'Laundry Bag',
    'Custom / Other',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitted(true)

    try {
      const res = await fetch('https://formsubmit.co/ajax/contact@luxehospi.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `RFQ from ${formData.company || formData.name} - LUXEHOSPI`,
          Name: formData.name,
          Email: formData.email,
          Company: formData.company,
          Phone: formData.phone,
          Country: formData.country,
          Products: formData.products.join(', '),
          'Estimated Quantity': formData.quantity,
          Message: formData.message,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
    } catch {
      setError('Something went wrong. Please try again or contact us directly at contact@luxehospi.com')
      setSubmitted(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProductToggle = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }))
  }

  return (
    <>
      <SEO
        title="Request a Quote"
        description="Submit your RFQ for hotel textiles. Get a detailed quotation within 24 hours. Factory-direct pricing for sheets, towels, bathrobes, and amenities."
        path="/rfq"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            Request a Quote
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            Get Your <span className="text-gold">Custom Quotation</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Tell us your requirements and receive a detailed proposal with factory-direct pricing
            within 24 business hours.
          </p>
        </div>
      </section>

      {/* Form + Sidebar */}
      <div className="section-pad bg-bg-light">
        <div className="max-w-container mx-auto px-4 md:px-6 flex flex-col xl:flex-row gap-8 md:gap-12">

          {/* LEFT: Form */}
          <div className="flex-1 min-w-0">
            {submitted ? (
              <div className="bg-white border border-border p-8 md:p-12 text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-green-50 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-navy mb-3">RFQ Submitted Successfully</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  Thank you for your inquiry. Our sales team will review your requirements and
                  send a detailed quotation to <strong>{formData.email}</strong> within 24 business hours.
                </p>
                <Link to="/products" className="btn-primary">Browse Products</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-border p-5 md:p-8">
                <h2 className="font-heading text-lg md:text-xl font-bold text-navy mb-6">
                  Fill in Your Requirements
                </h2>

                {/* Row: Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="your@email.com" />
                  </div>
                </div>

                {/* Row: Company + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your company" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                      placeholder="+1 234 567 8900" />
                  </div>
                </div>

                {/* Country */}
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">Country *</label>
                  <input type="text" name="country" required value={formData.country} onChange={handleChange}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your country" />
                </div>

                {/* Product Selection */}
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-2">Products of Interest *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {productOptions.map((product) => (
                      <button key={product} type="button" onClick={() => handleProductToggle(product)}
                        className={`text-left text-[12px] md:text-[13px] px-3 py-2 border transition-colors ${
                          formData.products.includes(product)
                            ? 'border-gold bg-gold-pale text-navy font-semibold'
                            : 'border-border text-text-secondary hover:border-gold/50'
                        }`}>
                        {formData.products.includes(product) && <span className="text-gold mr-1">{'\u2713'}</span>}
                        {product}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-5">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">Estimated Quantity</label>
                  <select name="quantity" value={formData.quantity} onChange={handleChange}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors bg-white">
                    <option value="">Select range</option>
                    <option value="100-300 pcs">100 - 300 pcs</option>
                    <option value="300-500 pcs">300 - 500 pcs</option>
                    <option value="500-1,000 pcs">500 - 1,000 pcs</option>
                    <option value="1,000-5,000 pcs">1,000 - 5,000 pcs</option>
                    <option value="5,000-10,000 pcs">5,000 - 10,000 pcs</option>
                    <option value="10,000+ pcs">10,000+ pcs</option>
                  </select>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">Additional Details</label>
                  <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                    className="w-full border border-border px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Specifications, customization requirements, delivery timeline, etc." />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>
                )}

                <button type="submit" className="btn-cta w-full text-center">
                  Submit RFQ
                </button>

                <p className="text-[12px] text-text-secondary text-center mt-3">
                  You will receive a detailed quotation within <strong className="text-gold">24 business hours</strong>
                </p>
              </form>
            )}
          </div>

          {/* RIGHT: Side Panel */}
          <div className="w-full xl:w-[340px] flex-shrink-0 space-y-4 md:space-y-6">
            {/* How It Works */}
            <div className="bg-white border border-border p-5 md:p-7">
              <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">How It Works</h3>
              {[
                { num: 1, title: 'Submit Your RFQ', desc: 'Fill in the form with your product requirements, quantities, and customization needs.' },
                { num: 2, title: 'Receive Quotation', desc: 'Our team reviews and sends a detailed quote with unit pricing and delivery timeline within 24 hours.' },
                { num: 3, title: 'Confirm & Sample', desc: 'Approve the quote and request samples. Free samples (freight collect) delivered in 3-5 days.' },
                { num: 4, title: 'Production & Delivery', desc: 'Place your order, we manufacture and ship. Full QC, real-time tracking, door-to-door logistics available.' },
              ].map((item, idx) => (
                <div key={item.num} className="flex gap-3 md:gap-4 mb-4 md:mb-5 relative last:mb-0">
                  {idx < 3 && <div className="absolute left-[16px] md:left-[18px] top-8 md:top-9 bottom-0 w-0.5 bg-border" />}
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-navy text-white font-heading text-xs md:text-sm font-bold flex items-center justify-center flex-shrink-0 z-10">
                    {item.num}
                  </div>
                  <div>
                    <div className="text-[13px] md:text-sm font-semibold text-navy mb-0.5">{item.title}</div>
                    <div className="text-[12px] md:text-[13px] text-text-secondary leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Quote With Us */}
            <div className="bg-white border border-border p-5 md:p-7">
              <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">Why Quote With LUXEHOSPI</h3>
              {[
                { icon: '\u2605', title: 'Factory-Direct Pricing', desc: 'No middlemen. Transparent cost breakdowns with volume discounts.' },
                { icon: '\u270E', title: 'Full Customization', desc: 'Label, packaging, size, color, material -- all customizable with low MOQ.' },
                { icon: '\u23F1', title: '24-Hour Response', desc: 'Dedicated sales engineers respond with professional quotations.' },
                { icon: '\u2713', title: 'Free Samples', desc: 'Pre-production samples at no charge. Test before you commit.' },
                { icon: '\u2666', title: 'End-to-End Support', desc: 'From inquiry to delivery. Logistics, documentation, after-sales all covered.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5 md:gap-3 mb-3.5 md:mb-4 last:mb-0">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-gold-pale flex items-center justify-center text-sm md:text-base text-gold flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-[13px] md:text-sm font-semibold text-navy mb-0.5">{item.title}</div>
                    <div className="text-[12px] md:text-[13px] text-text-secondary leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick FAQ */}
            <div className="bg-white border border-border p-5 md:p-7">
              <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">Quick FAQ</h3>
              <FAQAccordion
                items={[
                  { q: 'Is there a minimum order quantity?', a: 'MOQ varies by product -- typically 300 pcs for standard items. Trial orders welcome for new clients.' },
                  { q: 'How long until I receive my quote?', a: 'Standard RFQs within 24 business hours. Complex custom orders may take up to 48 hours.' },
                  { q: 'Can I get samples before ordering?', a: 'Yes. Free for existing products (freight collect). Custom samples with a small fee, credited against bulk orders.' },
                  { q: 'Do you ship internationally?', a: 'Absolutely. We ship to 50+ countries worldwide. FOB, CIF, and DDP terms available.' },
                ]}
              />
            </div>

            {/* Contact Alternative */}
            <div className="bg-navy p-5 md:p-7 text-white/70 text-[13px] md:text-sm leading-relaxed">
              <h3 className="font-heading text-sm md:text-base font-semibold text-gold mb-4 md:mb-5 pb-3 border-b border-white/15">Prefer to Talk Directly?</h3>
              <div className="space-y-2.5 md:space-y-3">
                <div><div className="text-white font-semibold mb-0.5">Email</div><div>contact@luxehospi.com</div></div>
                <div><div className="text-white font-semibold mb-0.5">Phone</div><div>+86 757 8123 4567</div></div>
                <div><div className="text-white font-semibold mb-0.5">WeChat</div><div>LUXEHOSPI_Official</div></div>
                <div><div className="text-white font-semibold mb-0.5">Working Hours</div><div>Mon - Sat: 9:00 AM - 6:00 PM (GMT+8)</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
