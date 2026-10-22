import Link from 'next/link'
import { ArrowRight, Briefcase, ShieldCheck, Search } from 'lucide-react'
import companyData from '@/content/company.json'
import { readSnapshot } from '@/lib/forecasts'

const applications = [
  {
    icon: Briefcase,
    title: 'Portfolio exposure',
    text: 'Flag holdings in countries where forecast conflict risk is rising, up to six months ahead, so exposure can be reviewed before events hit prices.',
  },
  {
    icon: ShieldCheck,
    title: 'Stress tests and limits',
    text: 'Use forecast trajectories and their uncertainty to size country limits and stress-test positions — aiming for fewer surprises and smaller drawdowns.',
  },
  {
    icon: Search,
    title: 'Underwriting and due diligence',
    text: 'Screen locations, counterparties and supply chains against country and sub-national (0.5° grid) forecasts when pricing or approving risk.',
  },
]

export default function Home() {
  const snapshot = readSnapshot('latest')
  const countries = snapshot.entities.filter((e) => (e.entityType || 'country') === 'country').length
  const [y, m] = snapshot.period.split('-').map(Number)
  const periodLabel = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

  const facts = [
    { value: `${countries}`, label: 'Countries forecast' },
    { value: '1–6', label: 'Months ahead' },
    { value: '0.5°', label: 'Sub-national grid' },
    { value: periodLabel, label: 'Latest forecast' },
  ]

  return (
    <>
      {/* Hero Section (Light, minimalist) */}
      <section className="hero-background-network-image min-h-[70vh] md:min-h-[78vh] flex items-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            {companyData.tagline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
            Actionable geopolitical intelligence for investors, insurers, and decision-makers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/contact" className="btn-primary inline-flex items-center">
              Get Started
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link href="/forecasts" className="btn-secondary inline-flex items-center">
              Explore the Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-2xl md:text-3xl text-gray-700 font-light leading-relaxed">
              To equip global decision-makers with <span className="word-highlight" data-text="clear intelligence">
                <span className="typing-text">clear intelligence</span>
              </span> on political instability and conflict—transforming uncertainty into strategic foresight.
            </p>
          </div>
        </div>
      </section>

      {/* How it's used */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Managing <span className="word-emphasis">conflict risk</span>, not chasing returns
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Conflict forecasts are a risk-management tool. Their value lies in seeing escalation coming—reducing exposure to
              volatility and tail events—rather than in promising to beat the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {applications.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-lg p-6">
                <Icon className="text-clairient-blue mb-4" size={24} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {facts.map((f) => (
              <div key={f.label}>
                <div className="text-3xl font-light text-clairient-blue mb-2">{f.value}</div>
                <div className="text-gray-600 text-sm">{f.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/forecasts" className="text-link inline-flex items-center">
              See the current forecasts
              <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
