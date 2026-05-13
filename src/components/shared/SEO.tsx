import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'product'
}

const SITE_NAME = 'LUXEHOSPI'
const DEFAULT_TITLE = 'LUXEHOSPI - Hotel Supplies Manufacturer'
const DEFAULT_DESCRIPTION = 'Vertically integrated hotel supplies manufacturer from yarn to room. Bedding, towels, bathrobes, amenities — OEM/ODM for 50+ countries.'
const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://luxehospi.com'

export { BASE_URL }

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '/images/hero-home.webp',
  type = 'website',
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const url = `${BASE_URL}${path}`
  const ogImage = image.startsWith('http') ? image : `${BASE_URL}${image}`

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
