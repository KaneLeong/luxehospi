import SEO from '@/components/shared/SEO'
import { Link } from 'react-router-dom'

export default function AboutUs() {
  const timeline = [
    { year: '2008', title: 'Founded', desc: 'Established in Foshan, Guangdong with our first spinning factory. Began producing premium combed cotton yarn for the domestic hospitality market.' },
    { year: '2012', title: 'Vertical Integration', desc: 'Expanded into circular knitting and dyeing operations. Achieved full production control from raw cotton to finished fabric.' },
    { year: '2015', title: 'Global Export', desc: 'Began exporting to Europe, Middle East, and Southeast Asia. Opened a dedicated international sales office in Foshan.' },
    { year: '2018', title: 'Quality Milestones', desc: 'Achieved ISO 9001, ISO 14001, OEKO-TEX Standard 100, and BSCI certifications. Partnered with SGS for third-party testing.' },
    { year: '2021', title: 'Digital Transformation', desc: 'Launched online product catalog and digital RFQ platform. Streamlined procurement for international buyers with real-time communication.' },
    { year: '2024', title: 'LUXEHOSPI Brand', desc: 'Established the LUXEHOSPI brand identity. Expanded to 4 product categories and 15 core product lines, serving 50+ countries.' },
  ]

  return (
    <>
      <SEO
        title="About Us"
        description="LUXEHOSPI: Vertically integrated hotel textile manufacturer since 2008. 4 wholly-owned factories, 50+ countries. From Siro Compact spinning to finished hospitality linens — ISO 9001, OEKO-TEX, BSCI certified."
        path="/about"
        image="/images/hero-about.webp"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-dark py-16 md:py-24 text-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-about.webp" alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 to-navy-dark/80" />
        </div>
        <div className="absolute -top-1/2 -right-[15%] w-[500px] h-[500px] border border-gold/10 rotate-45 hidden md:block" />
        <div className="max-w-container mx-auto px-4 md:px-6 relative z-10">
          <span className="font-heading text-[10px] md:text-xs font-bold tracking-[2px] md:tracking-[3px] uppercase text-gold block mb-3">
            About LUXEHOSPI
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] font-bold text-white mb-4">
            From <span className="text-gold">Spinning</span> to <span className="text-gold">Finished Goods</span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Four wholly-owned factories, one integrated supply chain. 18 years of manufacturing
            excellence delivering premium hotel textiles to hospitality partners in 50+ countries.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gold py-6 md:py-8">
        <div className="max-w-container mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {[
            { num: '18', label: 'Years in Manufacturing' },
            { num: '4', label: 'Wholly-Owned Factories' },
            { num: '50+', label: 'Countries Served' },
            { num: '15', label: 'Product Lines' },
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
              Unlike trading companies, we own and operate every stage of production. This ensures
              consistent quality, competitive factory-direct pricing, and complete traceability
              from raw fiber to your hotel room.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
            {[
              {
                icon: '\u2699',
                title: 'Spinning',
                desc: 'Siro Compact spinning with 30,000 spindles. Producing premium combed and carded yarn in various counts from long-staple cotton.',
              },
              {
                icon: '\u25A1',
                title: 'Weaving & Knitting',
                desc: '34-inch circular knitting machines for jersey, terry, waffle, and satin weaves. Full jacquard capability for patterned fabrics.',
              },
              {
                icon: '\u25CE',
                title: 'Dyeing & Finishing',
                desc: 'In-house dyeing with advanced colorfast technology. Anti-pilling, soft-touch, wrinkle-free, and anti-microbial finishing options.',
              },
              {
                icon: '\u2713',
                title: 'Cutting & Sewing',
                desc: 'Automated cutting and 200+ sewing machines for sheets, pillowcases, towels, bathrobes, and hotel accessories. Custom labeling available.',
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
            <p className="section-desc mx-auto text-center">
              Located in Foshan, Guangdong -- the heart of China&apos;s textile industry. Our four
              factories span over 57,000 sqm with state-of-the-art equipment.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12">
            {[
              { title: 'Spinning Mill', area: '20,000 sqm', machines: '30,000 spindles', image: '/images/factory-spinning.webp' },
              { title: 'Knitting Factory', area: '12,000 sqm', machines: '120 circular machines', image: '/images/factory-knitting.webp' },
              { title: 'Dyeing & Finishing', area: '15,000 sqm', machines: '8 dyeing lines', image: '/images/factory-dyeing.webp' },
              { title: 'Sewing Workshop', area: '10,000 sqm', machines: '200 sewing machines', image: '/images/factory-garment.webp' },
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
            <p className="section-desc mx-auto text-center">
              Our commitment to quality is validated by internationally recognized certifications
              and regular third-party audits.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-8 md:mt-12">
            {[
              { name: 'ISO 9001', desc: 'Quality Management' },
              { name: 'OEKO-TEX', desc: 'Standard 100' },
              { name: 'BSCI', desc: 'Social Audit' },
              { name: 'SGS', desc: 'Tested & Verified' },
              { name: 'WRAP', desc: 'Certified' },
              { name: 'GOTS', desc: 'Organic Standard' },
            ].map((cert) => (
              <div key={cert.name} className="bg-bg-light border border-border p-4 md:p-6 text-center hover:border-gold transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-pale mx-auto mb-2 md:mb-3 flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-[11px] md:text-xs font-bold text-navy">{cert.name}</div>
                <div className="text-[10px] md:text-[11px] text-text-secondary mt-0.5">{cert.desc}</div>
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
            Schedule a factory visit, request samples, or get a custom quotation for your hotel
            or resort. Our team is ready to support your hospitality business.
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
