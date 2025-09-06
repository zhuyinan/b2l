export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "B2L - Free URL Shortener",
    "description": "Transform long URLs into short, shareable links with B2L. Fast, secure, and completely free URL shortening service.",
    "url": "https://b2l.me",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "B2L",
      "url": "https://b2l.me"
    },
    "featureList": [
      "Free URL shortening",
      "No registration required", 
      "Fast and secure",
      "Mobile friendly"
    ],
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
