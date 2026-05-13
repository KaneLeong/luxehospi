import SEO from '@/components/shared/SEO'
import { useState } from 'react'
import { addToast } from '@/components/shared/Toast'
import { submitContactForm } from '@/api/products'

const inquiryTypes = [
  'Product Pricing',
  'Bulk Order Quotation',
  'OEM / Custom Manufacturing',
  'Sample Request',
  'Partnership Inquiry',
  'Other',
]

interface FormData {
  name: string
  email: string
  company: string
  inquiryType: string
  message: string
}

interface FieldError {
  [key: string]: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validate = (): boolean => {
    const newErrors: FieldError = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address'
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      addToast({ type: 'error', title: 'Please fix the errors above', message: 'Required fields are highlighted.' })
      return
    }

    setSubmitting(true)

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.inquiryType,
        message: formData.message,
      })

      addToast({
        type: 'success',
        title: 'Message sent successfully!',
        message: 'Our team will get back to you within 24 business hours.',
      })

      setFormData({ name: '', email: '', company: '', inquiryType: '', message: '' })
      setErrors({})
    } catch {
      addToast({
        type: 'error',
        title: 'Failed to send message',
        message: 'Please try again or contact us directly via email.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const fieldClass = (fieldName: string) =>
    `w-full h-10 md:h-11 border px-3 md:px-3.5 text-sm text-text-primary bg-white focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)] ${
      errors[fieldName] ? 'border-red-400' : 'border-border-light'
    }`

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with LUXEHOSPI for hotel supply inquiries, bulk orders, OEM projects, and sample requests. Response within 24 hours."
        path="/contact"
        image="/images/hero-contact.webp"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            Contact Us
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            Let&apos;s Start a <span className="text-gold">Conversation</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Whether you need a quick quote, want to discuss a custom project, or have questions
            about our products -- our team is here to help.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="bg-bg-light py-8 md:py-12 border-b border-border">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 -mt-12 md:-mt-20 relative z-10">
          {[
            { icon: '\u2709', title: 'Email Us', value: 'sales@luxehospi.com', desc: 'Response within 24 hours' },
            { icon: '\u260E', title: 'Call / WhatsApp', value: '+86 138 0000 8888', desc: 'Mon-Sat 9:00-18:00 GMT+8' },
            { icon: '\u25CF', title: 'WeChat', value: 'LUXEHOSPI_Sales', desc: 'Quick response for inquiries' },
          ].map((card) => (
            <div key={card.title} className="bg-white border border-border p-5 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gold-pale mx-auto mb-3 md:mb-4 flex items-center justify-center text-xl md:text-2xl text-gold">
                {card.icon}
              </div>
              <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-1">{card.title}</h3>
              <div className="text-[13px] md:text-sm font-semibold text-text-primary mb-0.5 md:mb-1">{card.value}</div>
              <div className="text-[11px] md:text-xs text-text-secondary">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-container mx-auto px-4 md:px-6 py-10 md:py-16 flex flex-col lg:flex-row gap-10 md:gap-16">
        {/* Left: Form */}
        <div className="flex-1 min-w-0">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-navy mb-2">Send Us a Message</h2>
          <p className="text-[13px] md:text-sm text-text-secondary mb-6 md:mb-8">
            Fill out the form below and our team will get back to you within 24 business hours.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={fieldClass('name')}
                />
                {errors.name && <div className="text-[12px] text-red-500 mt-1">{errors.name}</div>}
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={fieldClass('email')}
                />
                {errors.email && <div className="text-[12px] text-red-500 mt-1">{errors.email}</div>}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className={fieldClass('company')}
                />
                {errors.company && <div className="text-[12px] text-red-500 mt-1">{errors.company}</div>}
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-semibold text-navy mb-1.5">
                  Inquiry Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={`w-full h-10 md:h-11 border px-3 md:px-3.5 text-sm text-text-primary bg-white cursor-pointer focus:outline-none focus:border-navy appearance-none ${
                    errors.inquiryType ? 'border-red-400' : 'border-border-light'
                  }`}
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 stroke=%27%2395A5B0%27 fill=%27none%27 stroke-width=%271.5%27/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px' }}
                >
                  <option value="">Select type...</option>
                  {inquiryTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.inquiryType && <div className="text-[12px] text-red-500 mt-1">{errors.inquiryType}</div>}
              </div>
            </div>

            <div className="mb-4 md:mb-4">
              <label className="block text-[13px] font-semibold text-navy mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows={5}
                className={`w-full border p-3 md:p-3.5 text-sm text-text-primary bg-white resize-y focus:outline-none focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,58,92,0.08)] ${
                  errors.message ? 'border-red-400' : 'border-border-light'
                }`}
              />
              {errors.message && <div className="text-[12px] text-red-500 mt-1">{errors.message}</div>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-cta btn-lg w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-[340px] flex-shrink-0 space-y-4 md:space-y-6">
          {/* Headquarters */}
          <div className="border border-border p-5 md:p-8">
            <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">
              Headquarters
            </h3>
            <div className="text-[13px] md:text-sm text-text-secondary leading-relaxed space-y-2.5 md:space-y-3">
              <p><strong className="text-text-primary">Address:</strong><br />Floor 8, Textile Tower,<br />Foshan, Guangdong, China 528000</p>
              <p><strong className="text-text-primary">Phone:</strong><br />+86 757 8888 8888</p>
              <p><strong className="text-text-primary">Email:</strong><br />sales@luxehospi.com</p>
            </div>
          </div>

          {/* Europe Office */}
          <div className="border border-border p-5 md:p-8">
            <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">
              European Office
            </h3>
            <div className="text-[13px] md:text-sm text-text-secondary leading-relaxed space-y-2.5 md:space-y-3">
              <p><strong className="text-text-primary">Address:</strong><br />Business Center, Kurfuerstendamm 45,<br />10719 Berlin, Germany</p>
              <p><strong className="text-text-primary">Phone:</strong><br />+49 30 1234 5678</p>
              <p><strong className="text-text-primary">Email:</strong><br />europe@luxehospi.com</p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="border border-border p-5 md:p-8">
            <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-4 md:mb-5 pb-3 border-b border-border">
              Office Hours
            </h3>
            <div className="text-[13px] md:text-sm text-text-secondary space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <strong className="text-text-primary">9:00 - 18:00</strong>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <strong className="text-text-primary">9:00 - 13:00</strong>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <strong className="text-text-primary">Closed</strong>
              </div>
              <div className="pt-2 border-t border-border text-[11px] md:text-xs text-text-muted">
                All times in GMT+8 (China Standard Time)
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-40 md:h-48 bg-bg-light border border-border flex items-center justify-center text-text-muted text-[13px] md:text-sm">
            [Map Placeholder]
          </div>
        </div>
      </div>
    </>
  )
}
