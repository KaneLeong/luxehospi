import SEO from '@/components/shared/SEO'
import { Link } from 'react-router-dom'

export default function OEMService() {
  const capabilities = [
    { icon: '\u270E', title: 'Custom Branding', desc: 'Woven labels, printed tags, embroidered logos, jacquard borders. Your brand identity on every product.' },
    { icon: '\u2699', title: 'Custom Fabric', desc: 'Bespoke yarn blends, custom GSM, special weaves. From concept to production in-house.' },
    { icon: '\u25A1', title: 'Custom Size', desc: 'Any dimension to fit your specific requirements. From standard hospitality sizes to bespoke specifications.' },
    { icon: '\u25CE', title: 'Custom Color', desc: 'Pantone color matching with lab dip approval process. Standard and custom dyeing options available.' },
    { icon: '\u2302', title: 'Custom Packaging', desc: 'Branded polybags, gift boxes, retail packaging, bulk packaging. Complete packaging solutions.' },
    { icon: '\u2742', title: 'Design Support', desc: 'In-house design team for pattern development, colorway suggestions, and trend forecasting.' },
  ]

  const process = [
    { step: 1, title: 'Inquiry & Brief', desc: 'Share your requirements: product type, quantity, specs, branding needs, and timeline expectations.' },
    { step: 2, title: 'Proposal & Quote', desc: 'Our team prepares a detailed proposal with specifications, pricing, lead time, and customization options.' },
    { step: 3, title: 'Sample Development', desc: 'Pre-production samples for approval. Standard items: 3-5 days. Custom items: 7-10 days.' },
    { step: 4, title: 'Production', desc: 'Full-scale production with in-line QC. Real-time progress updates and photo documentation.' },
    { step: 5, title: 'QC & Delivery', desc: 'Pre-shipment inspection, custom packaging, and logistics coordination. FOB/CIF/DDP shipping worldwide.' },
  ]

  const advantages = [
    { icon: '\u2605', title: '5-7 Day Samples', desc: 'Industry-leading sample turnaround. Test before you commit to bulk orders.' },
    { icon: '\u2699', title: 'Full Control', desc: 'Everything in-house from spinning to finished product. No subcontracting, no quality compromises.' },
    { icon: '\u2713', title: 'Low MOQ', desc: 'Flexible minimum orders starting from 300-500 pieces for most custom items.' },
    { icon: '\u23F1', title: '15-25 Day Delivery', desc: 'Standard lead time with on-time delivery rate of 98%+ over the past 3 years.' },
  ]

  const faqs = [
    { q: 'What is the minimum order quantity for OEM orders?', a: 'MOQ varies by product type. Most custom items start at 300-500 pieces. Custom fabric development may require 1,000-2,000 pieces. We offer flexible trial orders for new clients.' },
    { q: 'How long does sample development take?', a: 'Standard products with custom labeling: 3-5 working days. Fully custom products (new fabric/size/color): 7-10 working days. Expedited service available on request.' },
    { q: 'Can you help with product design?', a: 'Yes. Our in-house design team can assist with pattern development, colorway recommendations, trend forecasting, and technical specifications at no extra charge for confirmed orders.' },
    { q: 'What customization options are available?', a: 'Full customization including: material/yarn blend, GSM/weight, size/dimension, color (Pantone matching), weave pattern, branding (label/tag/embroidery), and packaging.' },
    { q: 'Do you provide quality assurance documentation?', a: 'Yes. We provide full QC documentation including inspection reports, test certificates (OEKO-TEX, SGS), material composition analysis, and wash durability test results.' },
  ]

  return (
    <>
      <SEO
        title="OEM / ODM Services"
        description="Custom hotel supplies manufacturing: branding, labeling, packaging, bespoke fabrics. 5-7 day samples, low MOQ, integrated factory-direct production."
        path="/oem-odm"
        image="/images/hero-oem.webp"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            OEM / ODM Services
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            Your Brand, <span className="text-gold">Our Factory</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            From custom labeling to fully bespoke product development -- our integrated
            manufacturing capabilities make your vision a reality.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-pad bg-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Our Capabilities</span>
            <h2 className="section-title">Full-Spectrum Customization</h2>
            <p className="section-desc mx-auto text-center">
              Six core capabilities covering every aspect of product customization, all managed under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12">
            {capabilities.map((cap) => (
              <div key={cap.title} className="border border-border p-5 md:p-8 hover:border-gold hover:shadow-lg transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gold-pale flex items-center justify-center text-xl md:text-2xl text-gold mb-3 md:mb-5">
                  {cap.icon}
                </div>
                <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-2 md:mb-2.5">{cap.title}</h3>
                <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-bg-light">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">From Concept to Delivery</h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            {process.map((item, idx) => (
              <div key={item.step} className="flex gap-4 md:gap-6 pb-6 md:pb-8 relative">
                {idx < process.length - 1 && (
                  <div className="absolute left-[18px] md:left-[22px] top-9 md:top-10 bottom-0 w-0.5 bg-border" />
                )}
                <div className="w-10 h-10 md:w-11 md:h-11 bg-navy text-white font-heading text-xs md:text-sm font-bold flex items-center justify-center flex-shrink-0 z-10">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-pad bg-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">The OEM Advantage</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
            {advantages.map((adv) => (
              <div key={adv.title} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gold-pale mx-auto mb-3 md:mb-4 flex items-center justify-center text-2xl md:text-3xl text-gold">
                  {adv.icon}
                </div>
                <h3 className="font-heading text-[13px] md:text-[15px] font-semibold text-navy mb-1.5 md:mb-2">{adv.title}</h3>
                <p className="text-[12px] md:text-sm text-text-secondary leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-bg-light">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-3.5 md:py-5 border-b border-border">
                <h3 className="font-heading text-[13px] md:text-sm font-semibold text-navy mb-1 md:mb-2">{faq.q}</h3>
                <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-pale py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-xl md:text-[28px] font-bold text-navy mb-2 md:mb-3">
            Ready to Start Your Custom Project?
          </h2>
          <p className="text-sm md:text-base text-text-primary mb-6 md:mb-8 max-w-lg mx-auto">
            Submit your requirements and receive a detailed proposal with samples within 5 business days.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center">
            <Link to="/rfq" className="btn-cta">Start Your OEM Project</Link>
            <Link to="/contact" className="btn-primary">Talk to Our Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}
