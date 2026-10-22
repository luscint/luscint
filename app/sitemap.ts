import type { MetadataRoute } from 'next'
import { readSnapshot } from '@/lib/forecasts'

export const dynamic = 'force-static'

const routes = [
  '/', '/platform', '/forecasts', '/forecasts-grid',
  '/solutions/asset-management', '/solutions/insurance', '/solutions/public-sector',
  '/methodology', '/faq', '/data', '/about', '/open-data', '/contact',
  '/legal/privacy', '/legal/terms', '/legal/disclaimer',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://luscint.com'
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const url = (p: string) => `${site}${base}${p === '/' ? '/' : p + '/'}`
  const now = new Date()

  const items: MetadataRoute.Sitemap = routes.map((r) => ({
    url: url(r),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '/' ? 1 : 0.6,
  }))

  try {
    for (const e of readSnapshot('latest').entities) {
      if (e?.id) items.push({ url: url(`/forecasts/${e.id}`), lastModified: now, changeFrequency: 'monthly', priority: 0.4 })
    }
  } catch {}
  return items
}
