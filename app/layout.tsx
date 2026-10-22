import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '500', '600'] })

export const viewport: Viewport = { width: 'device-width', initialScale: 1 }

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://luscint.com'),
  title: { default: 'Luscint — Conflict risk forecasts, months ahead', template: '%s — Luscint' },
  description: 'Monthly forecasts of political violence at country and sub-national level, 1–6 months ahead, with quantified uncertainty. For investors, insurers and public-sector decision-makers.',
  keywords: 'conflict forecasting, political violence, geopolitical risk, SRCC, country risk, early warning',
  authors: [{ name: 'Luscint' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Luscint — Conflict risk forecasts, months ahead',
    description: 'Monthly forecasts of political violence at country and sub-national level, with quantified uncertainty.',
    type: 'website',
    locale: 'en_GB',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <html lang="en">
      <body className={`${inter.className} ${serif.variable}`}>
        {base && (
          <style
            // Override image URLs to respect basePath on GitHub Pages
            dangerouslySetInnerHTML={{ __html: `
              .hero-background { background: linear-gradient(135deg, rgba(30, 64, 175, 0.03) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(30, 64, 175, 0.03) 100%), url('${base}/hero-bg.svg') center/cover no-repeat; }
              .hero-background-satellite { background: linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(255, 255, 255, 0.97) 50%, rgba(30, 64, 175, 0.02) 100%), url('${base}/hero-bg-satellite.svg') center/cover no-repeat; }
              .hero-background-minimal { background: linear-gradient(135deg, rgba(30, 64, 175, 0.01) 0%, rgba(255, 255, 255, 0.99) 50%, rgba(30, 64, 175, 0.01) 100%), url('${base}/hero-bg-minimal.svg') center/cover no-repeat; }
              .hero-background-topographic { background: linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(255, 255, 255, 0.97) 50%, rgba(30, 64, 175, 0.02) 100%), url('${base}/hero-bg-topographic.svg') center/cover no-repeat; }
              .hero-background-data-viz { background: linear-gradient(135deg, rgba(30, 64, 175, 0.015) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(30, 64, 175, 0.015) 100%), url('${base}/hero-bg-data-viz.svg') center/cover no-repeat; }
              .hero-background-globe { background: linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(255, 255, 255, 0.97) 50%, rgba(30, 64, 175, 0.02) 100%), url('${base}/hero-bg-globe.svg') center/cover no-repeat; }
              .hero-background-map-light::before { background: url('${base}/accurate-world-map.svg') center/85% no-repeat; }
              .hero-background-network::before { background: url('${base}/hero-bg-network.svg') center/cover no-repeat; }
              .hero-background-network-image { background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%), url('${base}/hero-bg-network.svg') center/cover no-repeat; }
              .hero-background-network-image::before { background-image: url('${base}/network-minimalist.jpg'); }
              .hero-background-network-image::after { background-image: url('${base}/network-minimalist.jpg'); }
              .logo-watermark::after { background: url('${base}/logo.png') center/contain no-repeat; }
              .hero-background-floating { background: linear-gradient(135deg, rgba(30, 64, 175, 0.04) 0%, rgba(255, 255, 255, 0.96) 50%, rgba(30, 64, 175, 0.04) 100%), url('${base}/hero-bg-minimal.svg') center/cover no-repeat; }
              .hero-background-floating::after { background: url('${base}/logo.png') center/contain no-repeat; }
            ` }}
          />
        )}
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[3000] focus:bg-white focus:px-3 focus:py-2 focus:rounded">Skip to content</a>
        <Navigation />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
