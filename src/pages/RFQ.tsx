import SEO from '@/components/shared/SEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuoteStore } from '@/stores/quoteStore'
import { addToast } from '@/components/shared/Toast'
import FAQAccordion from '@/components/shared/FAQAccordion'
import { useEffect } from 'react'
import { setFaqLd } from '@/lib/jsonld'
import { submitRfqForm } from '@/api/products'

interface FormErrors {
  name?: string
  email?: string
  company?: string
}

export default function RFQ() {
  const { items, removeItem, updateQuantity, clearAll, totalItems } = useQuoteStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    phone: '',
    timeline: '',
    shippingTerms: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Business email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      addToast({ type: 'error', title: 'Validation Error', message: 'Please fill in all required fields correctly.' })
      return
    }

    setIsSubmitting(true)
    try {
      await submitRfqForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        country: formData.country || undefined,
        phone: formData.phone || undefined,
        timeline: formData.timeline || undefined,
        shippingTerms: formData.shippingTerms || undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          weight: item.selectedWeight,
        })),
      })
      addToast({ type: 'success', title: 'RFQ Submitted!', message: 'We will respond within 24 business hours.' })
      setFormData({ name: '', email: '', company: '', country: '', phone: '', timeline: '', shippingTerms: '' })
      setErrors({})
      clearAll()
    } catch {
      addToast({ type: 'error', title: 'Submission Failed', message: 'Please try again or contact us directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (field?: string) =>
    `w-full h-10 md:h-11 border px-3 md:px-3.5 text-sm text-text-primary bg-white focus:outline-none transition-colors ${
      field ? 'border-red-400 focus:border-red-500' : 'border-border-light focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]'
    }`

  // JSON-LD: FAQ structured data
  useEffect(() => {
    setFaqLd([
      { q: 'Is there a minimum order quantity?', a: 'MOQ varies by product -- typically 500-1,000 pcs for standard items. Flexible trial orders for new clients.' },
      { q: 'How long until I receive my quote?', a: 'Standard RFQs within 24 hours. Complex custom orders may take 48 hours.' },
      { q: 'Can I get samples before ordering?', a: 'Yes. Free for existing products (freight collect). Custom samples with a small fee credited against bulk orders.' },
      { q: 'Do you ship internationally?', a: 'Absolutely. 50+ countries worldwide. FOB, CIF, and DDP terms available.' },
    ])
    return () => { document.getElementById('ld-faq')?.remove() }
  }, [])

  return (
    <>
      <SEO
        title="Request a Quote"
        description="Submit your hotel supply RFQ and receive a detailed quotation within 24 hours. Free samples, factory-direct pricing, worldwide shipping."
        path="/rfq"
        image="/images/hero-rfq.webp"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6 text-center">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            Request for Quotation
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            Get Your <span className="text-gold">Custom Quote</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Add products to your quote list, fill in your requirements, and receive a detailed
            quotation within 24 business hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col xl:flex-row gap-8 md:gap-12">
        {/* LEFT: Form */}
        <div className="flex-1 min-w-0">
          {/* Quote List */}
          <div className="border border-border mb-8">
            <div className="flex items-center justify-between px-4 md:px-6 py-3.5 md:py-4 bg-bg-light border-b border-border">
              <h2 className="font-heading text-sm md:text-base font-semibold text-navy">
                Quote List
                {totalItems() > 0 && (
                  <span className="ml-2 bg-gold text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {totalItems()}
                  </span>
                )}
              </h2>
              {totalItems() > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-text-secondary hover:text-red-500 bg-transparent border-none cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="py-10 md:py-16 text-center">
                <div className="text-3xl text-border-light mb-3">&#128722;</div>
                <p className="text-sm text-text-secondary mb-4">Your quote list is empty. Browse our products to add items.</p>
                <Link to="/products" className="btn-outline btn-sm">Browse Products</Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.product.id} className="px-4 md:px-6 py-3.5 md:py-4 flex items-center gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 overflow-hidden flex-shrink-0 img-skeleton">
                      <img
                        src={item.product.image || '/images/hero-home.webp'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-heading text-[13px] md:text-sm font-semibold text-navy truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] md:text-xs text-text-secondary mt-0.5">
                        {item.selectedSize} / {item.selectedColor} / {item.selectedWeight}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-8 border border-border-light text-center text-sm text-text-primary bg-white focus:outline-none focus:border-navy"
                      />
                      <span className="text-[11px] md:text-xs text-text-secondary">pcs</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-red-500 bg-transparent border-none cursor-pointer text-sm flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 1: Contact Info */}
          <div className="mb-8">
            <div className="font-heading text-base md:text-lg font-semibold text-navy mb-1.5 pb-3 border-b-2 border-gold-pale flex items-center gap-2 md:gap-2.5">
              <span className="w-6 h-6 md:w-7 md:h-7 bg-gold text-white text-[11px] md:text-[13px] font-bold flex items-center justify-center rounded-full flex-shrink-0">1</span>
              Contact Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                { name: 'email', label: 'Business Email', type: 'email', placeholder: 'you@company.com', required: true },
                { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Your hotel / company', required: true },
                { name: 'country', label: 'Country', type: 'text', placeholder: 'Your country', required: false },
                { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+1 234 567 8900', required: false },
                { name: 'timeline', label: 'Expected Timeline', type: 'select', placeholder: '', required: false },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[13px] font-semibold text-navy mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="w-full h-10 md:h-11 border border-border-light px-3 md:px-3.5 text-sm text-text-primary bg-white cursor-pointer focus:outline-none focus:border-navy appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%2395A5B0%27 fill=%27none%27 stroke-width=%271.5%27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
                    >
                      <option value="">Select timeline...</option>
                      {['Within 15 days', '15 - 30 days', '30 - 60 days', '60 - 90 days', '90+ days / Flexible'].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={inputClass(errors[field.name as keyof FormErrors])}
                    />
                  )}
                  {errors[field.name as keyof FormErrors] && (
                    <p className="text-[11px] text-red-500 mt-1">{errors[field.name as keyof FormErrors]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Shipping */}
          <div className="mb-8">
            <div className="font-heading text-base md:text-lg font-semibold text-navy mb-1.5 pb-3 border-b-2 border-gold-pale flex items-center gap-2 md:gap-2.5">
              <span className="w-6 h-6 md:w-7 md:h-7 bg-gold text-white text-[11px] md:text-[13px] font-bold flex items-center justify-center rounded-full flex-shrink-0">2</span>
              Shipping & Payment Preferences
            </div>
            <p className="text-[12px] md:text-[13px] text-text-muted mb-4">Optional -- helps us provide a more accurate quotation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Preferred Shipping Terms
                </label>
                <select
                  name="shippingTerms"
                  value={formData.shippingTerms}
                  onChange={handleChange}
                  className="w-full h-10 md:h-11 border border-border-light px-3 md:px-3.5 text-sm text-text-primary bg-white cursor-pointer focus:outline-none focus:border-navy appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%2395A5B0%27 fill=%27none%27 stroke-width=%271.5%27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
                >
                  <option value="">Select terms...</option>
                  {['FOB (Free on Board)', 'CIF (Cost + Insurance + Freight)', 'DDP (Delivered Duty Paid)', 'Not sure yet'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  placeholder="City, Country (e.g. London, UK)"
                  className="w-full h-10 md:h-11 border border-border-light px-3 md:px-3.5 text-sm text-text-primary bg-white focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Customization */}
          <div className="mb-8">
            <div className="font-heading text-base md:text-lg font-semibold text-navy mb-1.5 pb-3 border-b-2 border-gold-pale flex items-center gap-2 md:gap-2.5">
              <span className="w-6 h-6 md:w-7 md:h-7 bg-gold text-white text-[11px] md:text-[13px] font-bold flex items-center justify-center rounded-full flex-shrink-0">3</span>
              Customization & Additional Requirements
            </div>
            <p className="text-[12px] md:text-[13px] text-text-muted mb-4 md:mb-5">For OEM/ODM orders or special requests. Skip if ordering standard products.</p>

            {[
              'I need custom labeling / branded tags',
              'I need custom packaging',
              'I need custom size / specification',
              'I need Pantone color matching',
              'I need product samples first',
            ].map((label) => (
              <label key={label} className="flex items-start gap-2 md:gap-2.5 mb-2.5 md:mb-3 text-[13px] md:text-sm text-text-primary cursor-pointer">
                <input type="checkbox" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] accent-gold mt-0.5" />
                {label}
              </label>
            ))}

            <div className="mt-4 md:mt-5">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">
                Detailed Requirements <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <textarea placeholder="Describe any specific requirements: hotel star rating, room count, fabric preferences, design references, sustainability requirements, etc." rows={4} className="w-full border border-border-light p-3 md:p-3.5 text-sm text-text-primary bg-white resize-y focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)]" />
              <div className="text-[11px] text-text-muted mt-1">The more details you provide, the more accurate your quotation will be.</div>
            </div>

            <div className="mt-4 md:mt-5">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">
                Upload Reference Files <span className="text-text-muted font-normal">(optional)</span>
              </label>
              <div className="border-2 border-dashed border-border-light p-5 md:p-8 text-center cursor-pointer hover:border-gold bg-[#FAFBFC] hover:bg-[#FDFBF5] transition-all">
                <div className="text-xl md:text-2xl text-gold mb-1.5 md:mb-2">&#9650;</div>
                <div className="text-[13px] md:text-sm text-text-primary"><strong className="text-gold">Click to upload</strong> or drag & drop</div>
                <div className="text-[11px] md:text-xs text-text-muted mt-1">PDF, JPG, PNG, AI, PSD -- Max 10MB each, up to 5 files</div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mt-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-cta btn-lg w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>Submit RFQ &rarr;</>
              )}
            </button>
            <div className="text-[12px] md:text-[13px] text-text-muted text-center sm:text-left">
              We typically respond within <strong className="text-gold">24 business hours</strong>
            </div>
          </div>
        </div>

        {/* RIGHT: Side Panel */}
        <div className="w-full xl:w-[340px] flex-shrink-0 space-y-4 md:space-y-6">
          {/* How It Works */}
          <div className="bg-bg-light border border-border p-5 md:p-7">
            <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">How It Works</h3>
            {[
              { num: 1, title: 'Submit Your RFQ', desc: 'Fill in the form with your product requirements, quantities, and customization needs.' },
              { num: 2, title: 'Receive Quotation', desc: 'Our team reviews and sends a detailed quote with unit pricing and delivery timeline.' },
              { num: 3, title: 'Confirm & Sample', desc: 'Approve the quote and request samples. Free samples (freight collect) within 3-5 days.' },
              { num: 4, title: 'Production & Delivery', desc: 'Place order, we manufacture and ship. Full QC, real-time tracking, door-to-door available.' },
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
          <div className="bg-bg-light border border-border p-5 md:p-7">
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
          <div className="bg-bg-light border border-border p-5 md:p-7">
            <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">Quick FAQ</h3>
            <FAQAccordion
              items={[
                { q: 'Is there a minimum order quantity?', a: 'MOQ varies by product -- typically 500-1,000 pcs for standard items. Flexible trial orders for new clients.' },
                { q: 'How long until I receive my quote?', a: 'Standard RFQs within 24 hours. Complex custom orders may take 48 hours.' },
                { q: 'Can I get samples before ordering?', a: 'Yes. Free for existing products (freight collect). Custom samples with a small fee credited against bulk orders.' },
                { q: 'Do you ship internationally?', a: 'Absolutely. 50+ countries worldwide. FOB, CIF, and DDP terms available.' },
              ]}
            />
          </div>

          {/* Contact Alternative */}
          <div className="bg-navy p-5 md:p-7 text-white/70 text-[13px] md:text-sm leading-relaxed">
            <h3 className="font-heading text-sm md:text-base font-semibold text-gold mb-4 md:mb-5 pb-3 border-b border-white/15">Prefer to Talk Directly?</h3>
            <div className="space-y-2.5 md:space-y-3">
              <div><div className="text-white font-semibold mb-0.5">Email</div><div>sales@luxehospi.com</div></div>
              <div><div className="text-white font-semibold mb-0.5">WhatsApp</div><div>+86 138 0000 8888</div></div>
              <div><div className="text-white font-semibold mb-0.5">WeChat</div><div>LUXEHOSPI_Sales</div></div>
              <div><div className="text-white font-semibold mb-0.5">Working Hours</div><div>Mon - Sat: 9:00 AM - 6:00 PM (GMT+8)</div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
