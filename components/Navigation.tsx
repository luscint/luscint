'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'

type NavLink = { label: string; href: string; description?: string }
type NavItem = { label: string; href: string; children?: NavLink[] }

const NAV: NavItem[] = [
  {
    label: 'Product',
    href: '/platform',
    children: [
      { label: 'Platform', href: '/platform', description: 'Signals, forecasting engine, delivery' },
      { label: 'Country dashboard', href: '/forecasts', description: 'Monthly forecasts, 1–6 months ahead' },
      { label: 'Sub-national grid', href: '/forecasts-grid', description: '0.5° (~55 km) cell forecasts' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Asset management', href: '/solutions/asset-management' },
      { label: 'Insurance & reinsurance', href: '/solutions/insurance' },
      { label: 'Governments & NGOs', href: '/solutions/public-sector' },
    ],
  },
  {
    label: 'Evidence',
    href: '/methodology',
    children: [
      { label: 'Methodology & papers', href: '/methodology' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'Data & API', href: '/data' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Company', href: '/about' },
      { label: 'Open data vs. Luscint', href: '/open-data' },
    ],
  },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const isActive = (item: NavItem) => {
    const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])]
    return hrefs.some((h) => pathname === h || pathname?.startsWith(h + '/'))
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-[2000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${base}/logo.png`} alt="" className="h-8 w-8 mr-3" />
              <span className="text-2xl font-light text-brand-blue">Luscint</span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 py-5 text-[15px] transition-colors ${
                    isActive(item) ? 'text-brand-blue' : 'text-gray-600 hover:text-brand-blue'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="opacity-60" />}
                </Link>
                {item.children && (
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity absolute left-0 top-full w-64 bg-white border border-gray-200 shadow-lg rounded-b-md py-2">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        <span className="block text-sm text-gray-900">{c.label}</span>
                        {c.description && <span className="block text-xs text-gray-500">{c.description}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" className="btn-primary !py-2 !px-4 text-sm">
              Get in touch
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-gray-700 hover:text-brand-blue"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 max-h-[80vh] overflow-auto">
          <div className="px-4 py-3 space-y-4">
            {NAV.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-1 font-medium ${isActive(item) ? 'text-brand-blue' : 'text-gray-900'}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 border-l border-gray-200 pl-3 space-y-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-1 text-sm text-gray-600 hover:text-brand-blue"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary block text-center">
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
