import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://luscint.com'
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site}${base}/sitemap.xml`,
  }
}
