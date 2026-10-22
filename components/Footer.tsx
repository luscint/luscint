import Link from 'next/link'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/platform' },
      { label: 'Country dashboard', href: '/forecasts' },
      { label: 'Sub-national grid', href: '/forecasts-grid' },
      { label: 'Data & API', href: '/data' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Asset management', href: '/solutions/asset-management' },
      { label: 'Insurance & reinsurance', href: '/solutions/insurance' },
      { label: 'Governments & NGOs', href: '/solutions/public-sector' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Open data vs. Luscint', href: '/open-data' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-normal text-white mb-3">Luscint</div>
            <p className="text-sm text-gray-400 max-w-sm">
              Conflict and political-violence forecasts for investors, insurers and public-sector decision-makers.
            </p>
            <a href="mailto:contact@luscint.com" className="mt-4 inline-block text-sm text-white hover:underline">
              contact@luscint.com
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 space-y-3">
          <p>
            Forecasts are statistical estimates provided for information only. They are not investment, insurance or
            safety advice and carry no guarantee of accuracy.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p>&copy; {new Date().getFullYear()} Luscint. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/legal/privacy" className="hover:text-gray-300">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-gray-300">Terms</Link>
              <Link href="/legal/disclaimer" className="hover:text-gray-300">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
