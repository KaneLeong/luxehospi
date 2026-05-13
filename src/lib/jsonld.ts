/**
 * JSON-LD Structured Data generators for Schema.org
 * https://schema.org / https://developers.google.com/search/docs/appearance/structured-data
 */

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://luxehospi.com'
const SITE_NAME = 'LUXEHOSPI'
const LOGO = `${BASE_URL}/logo-icon.png`

/** Inject a <script type="application/ld+json"> into document head */
function injectJsonLd(data: Record<string, unknown>, id: string) {
  // Remove existing script with same id to avoid duplicates on SPA navigation
  const existing = document.getElementById(id)
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

// ─── Organization ───────────────────────────────────────────
export function setOrganizationLd() {
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: LOGO,
      description:
        'Vertically integrated hotel supplies manufacturer from yarn to room. Bedding, towels, bathrobes, amenities — OEM/ODM for 50+ countries.',
      sameAs: [
        'https://www.linkedin.com/company/luxehospi',
        'https://www.facebook.com/luxehospi',
        'https://www.instagram.com/luxehospi',
        'https://www.youtube.com/@luxehospi',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'sales@luxehospi.com',
          telephone: '+86-138-0000-8888',
          availableLanguage: ['English', 'Chinese'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CN',
        addressLocality: 'Shanghai',
      },
    },
    'ld-organization',
  )
}

// ─── WebSite + SearchAction ─────────────────────────────────
export function setWebSiteLd() {
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: SITE_NAME,
      url: BASE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/products?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    'ld-website',
  )
}

// ─── BreadcrumbList ─────────────────────────────────────────
interface BreadcrumbItem {
  name: string
  url: string
}

export function setBreadcrumbLd(items: BreadcrumbItem[]) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }

  injectJsonLd(ld, 'ld-breadcrumb')
}

// ─── Product ────────────────────────────────────────────────
interface ProductLdInput {
  name: string
  slug: string
  description: string
  image: string
  category: string
  material: string
  moq: number
  moqUnit: string
  leadTime: string
}

export function setProductLd(product: ProductLdInput) {
  const url = `${BASE_URL}/products/${product.slug}`
  const imageUrl = product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`

  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      url,
      image: imageUrl,
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
      },
      manufacturer: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
      },
      category: product.category,
      material: product.material,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        lowPrice: '0',
        highPrice: '0',
        offerCount: 1,
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '0',
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
        },
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Minimum Order Quantity',
          value: `${product.moq} ${product.moqUnit}`,
        },
        {
          '@type': 'PropertyValue',
          name: 'Lead Time',
          value: product.leadTime,
        },
      ],
    },
    'ld-product',
  )
}

// ─── FAQPage ────────────────────────────────────────────────
interface FaqItem {
  q: string
  a: string
}

export function setFaqLd(items: FaqItem[]) {
  if (!items.length) return

  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
    'ld-faq',
  )
}
