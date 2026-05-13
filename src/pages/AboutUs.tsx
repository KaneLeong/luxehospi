import SEO from '@/components/shared/SEO'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  const timeline = [
    { year: '2008', title: 'Founded', desc: 'Company established with first spinning factory in Guangdong, China. Focus on premium cotton yarn production.' },
    { year: '2012', title: 'Vertical Integration', desc: 'Added knitting and dyeing facilities. Full control from yarn to fabric.' },
    { year: '2015', title: 'Global Expansion', desc: 'Began exporting to Europe and Middle East. Opened European liaison office.' },
    { year: '2018', title: 'ISO & OEKO-TEX', desc: 'Achieved ISO 9001 and OEKO-TEX Standard 100 certifications. BSCI audit passed.' },
    { year: '2021', title: 'Digital Transformation', desc: 'Launched digital procurement platform. Introduced smart RFQ and online catalog systems.' },
    { year: '2024', title: 'LUXEHOSPI Brand', desc: 'Established LUXEHOSPI brand identity. Expanded to 12 product categories serving 50+ countries.' },
  ]

  return (
    <>
      <SEO
        title="About Us"
        description="LUXEHOSPI: 15+ years, 4 wholly-owned factories, 50+ countries. From Siro Compact spinning to finished hotel supplies — ISO 9001, OEKO-TEX, BSCI certified."
        path="/about"
        image="/images/hero-about.webp"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            About LUXEHOSPI
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            From <span className="text-gold">Spinning</span> to <span className="text-gold">Finished Goods</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Four wholly-owned factories, one integrated supply chain, 15+ years of manufacturing excellence
            serving hospitality partners across 50+ countries.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gold py-6 md:py-8">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {[
            { num: '15+', label: 'Years in Manufacturing' },
            { num: '4', label: 'Wholly-Owned Factories' },
            { num: '50+', label: 'Countries Served' },
            { num: '12', label: 'Product Categories' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading text-2xl md:text-[32px] font-bold text-navy">{s.num}</div>
              <div className="text-[12px] md:text-sm text-navy/70 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Supply Chain */}
      <section className="section-pad bg-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Our Supply Chain</span>
            <h2 className="section-title">Vertical Integration at Every Step</h2>
            <p className="section-desc mx-auto text-center">
              Unlike trading companies, we own and operate every stage of production. This means
              consistent quality, competitive pricing, and complete traceability.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
            {[
              {
                icon: '\u2699',
                title: 'Spinning',
                desc: 'Siro Compact spinning with 30,000 spindles. Premium combed and carded yarn production from raw cotton.',
              },
              {
                icon: '\u25A1',
                title: 'Weaving & Knitting',
                desc: '34-inch circular knitting machines for jersey, terry, waffle, and satin weaves. Jacquard capability.',
              },
              {
                icon: '\u25CE',
                title: 'Dyeing & Finishing',
                desc: 'In-house dyeing with colorfast technology. Anti-pilling, soft-touch, and wrinkle-free finishing treatments.',
              },
              {
                icon: '\u2713',
                title: 'Cutting & Sewing',
                desc: 'Automated cutting and skilled sewing lines for towels, robes, bedding, and hotel amenities. Custom labeling.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-border p-5 md:p-8 text-center hover:border-gold hover:shadow-lg transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gold-pale mx-auto mb-3 md:mb-5 flex items-center justify-center text-2xl md:text-3xl text-gold">
                  {item.icon}
                </div>
                <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-2 md:mb-3">{item.title}</h3>
                <p className="text-[13px] md:text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Showcase */}
      <section className="section-pad bg-bg-light">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Our Facilities</span>
            <h2 className="section-title">World-Class Manufacturing</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
            {[
              { title: 'Spinning Mill', area: '20,000 sqm', machines: '30,000 spindles', image: '/images/factory-spinning.webp' },
              { title: 'Knitting Factory', area: '12,000 sqm', machines: '120 circular machines', image: '/images/factory-knitting.webp' },
              { title: 'Dyeing & Finishing', area: '15,000 sqm', machines: '8 dyeing lines', image: '/images/factory-dyeing.webp' },
              { title: 'Garment Workshop', area: '10,000 sqm', machines: '200 sewing machines', image: '/images/factory-garment.webp' },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="h-36 md:h-48 relative overflow-hidden img-skeleton">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-navy/20" />
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-heading text-sm md:text-base font-semibold text-navy mb-1.5 md:mb-2">{f.title}</h3>
                  <div className="text-[13px] md:text-sm text-text-secondary">{f.area}</div>
                  <div className="text-[13px] md:text-sm text-text-secondary">{f.machines}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad bg-white">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Quality Assurance</span>
            <h2 className="section-title">Certified & Audited</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-8 md:mt-12">
            {[
              'ISO 9001\nQuality Management',
              'OEKO-TEX\nStandard 100',
              'BSCI\nSocial Audit',
              'SGS\nTested & Verified',
              'WRAP\nCertified',
              'ISO 14001\nEnvironmental',
            ].map((cert) => (
              <div key={cert} className="bg-bg-light border border-border p-4 md:p-6 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-pale mx-auto mb-2 md:mb-3 flex items-center justify-center text-lg md:text-xl text-gold">
                  +
                </div>
                <div className="text-[11px] md:text-xs font-semibold text-navy whitespace-pre-line leading-tight">{cert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad bg-bg-light">
        <div className="max-w-container mx-auto px-4 md:px-6">
          <div className="text-center">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div className="max-w-3xl mx-auto mt-8 md:mt-12">
            {timeline.map((item, idx) => (
              <div key={item.year} className="flex gap-4 md:gap-6 pb-6 md:pb-8 relative">
                {idx < timeline.length - 1 && (
                  <div className="absolute left-[18px] md:left-[22px] top-9 md:top-10 bottom-0 w-0.5 bg-border" />
                )}
                <div className="w-10 h-10 md:w-11 md:h-11 bg-navy text-white font-heading text-xs md:text-sm font-bold flex items-center justify-center flex-shrink-0 z-10">
                  {item.year}
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

      {/* CTA */}
      <section className="bg-gold-pale py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-xl md:text-[28px] font-bold text-navy mb-2 md:mb-3">
            Ready to Partner With Us?
          </h2>
          <p className="text-sm md:text-base text-text-primary mb-6 md:mb-8 max-w-lg mx-auto">
            Visit our factory, request samples, or start with a custom quotation. We are ready to support your hospitality business.
          </p>
          <div className="flex gap-3 md:gap-4 justify-center">
            <Link to="/rfq" className="btn-cta">Request a Quote</Link>
            <Link to="/contact" className="btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
