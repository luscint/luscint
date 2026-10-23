import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Layers, Cpu, Send, Briefcase, ShieldCheck, Globe2, Satellite, Check } from 'lucide-react'
import { readSnapshot, getOrCalculateMonths } from '@/lib/forecasts'

const CountryChoropleth = dynamic(() => import('@/components/CountryChoropleth'), { ssr: false })

const layers = [
  {
    icon: Layers,
    step: '01',
    title: 'Signals',
    text: 'Conflict event history and country covariates today. The engine is signal-agnostic: satellite-derived and market signals can be integrated into client-specific forecasts.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Forecasting engine',
    text: 'Pattern-based models match current trajectories to comparable past episodes and follow them forward, producing forecasts 1–6 months ahead with historical scenarios.',
  },
  {
    icon: Send,
    step: '03',
    title: 'Delivery',
    text: 'A live dashboard, CSV and JSON data access, monthly reports, and mapping of forecasts to your holdings or locations.',
  },
]

const solutions = [
  {
    icon: Briefcase,
    title: 'Asset management',
    text: 'See escalation risk in the countries you hold before it is priced in, and size exposure with an explicit view of uncertainty.',
    href: '/solutions/asset-management',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance & reinsurance',
    text: 'Location-level (≈55 km) forecasts of political violence to inform SRCC and political-violence underwriting and accumulation.',
    href: '/solutions/insurance',
  },
  {
    icon: Globe2,
    title: 'Governments & NGOs',
    text: 'Sub-national early warning for planning and pre-positioning, built on open methods and openly available data.',
    href: '/solutions/public-sector',
  },
]

export default async function Home() {
  const snapshot = readSnapshot('latest')
  const countryItems = snapshot.entities
    .filter((e) => (e.entityType || 'country') === 'country')
    .map((e) => ({ id: e.id, name: e.name, iso3: e.iso3, months: getOrCalculateMonths(snapshot.period, e) }))

  const [y, m] = snapshot.period.split('-').map(Number)
  const periodLabel = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' })

  const proof = [
    { value: String(countryItems.length), label: 'countries forecast' },
    { value: '1–6', label: 'months from data cutoff' },
    { value: '0.5°', label: 'sub-national grid (≈55 km)' },
    { value: periodLabel, label: 'latest forecast start month' },
  ]

  return (
    <>
      {/* Hero: live forecast map under a navy overlay */}
      <section className="relative bg-navy overflow-hidden">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen" aria-hidden="true">
          <CountryChoropleth
            items={countryItems}
            hideDownloadButton
            hideControls
            hideLegend
            hideSearch
            dimZoomControls
            hideMonthSlider
            hideZoomHint
            mapHeight="clamp(560px, 82vh, 760px)"
            initialZoom={3.0}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none z-[400]"
          style={{ background: 'linear-gradient(90deg, rgba(11,27,54,0.96) 0%, rgba(11,27,54,0.88) 40%, rgba(11,27,54,0.45) 100%)' }}
        />
        <div className="absolute inset-0 z-[500] flex items-center pointer-events-none">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl pointer-events-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300 mb-5">Conflict risk forecasting</p>
              <h1 className="text-4xl sm:text-5xl text-white mb-6 leading-[1.1]">
                Early warning for political violence — months ahead, not days.
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-9 max-w-xl">
                Monthly forecasts at country and sub-national level, with historical scenarios, for investors, insurers and
                public-sector decision-makers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-primary !bg-white !text-navy hover:!bg-blue-50">
                  Get in touch
                  <ArrowRight className="ml-2" size={16} />
                </Link>
                <Link href="/forecasts" className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
                  Explore forecasts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="bg-navy border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {proof.map((p) => (
            <div key={p.label}>
              <div className="font-serif text-3xl text-white">{p.value}</div>
              <div className="text-sm text-slate-400 mt-1">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="text-3xl md:text-4xl">Conflict risk is usually discovered late.</h2>
          </div>
          <div className="md:col-span-3 space-y-4 text-lg text-slate-600">
            <p>
              Most tools report what has already happened, or reduce risk to an opaque rating. By the time an alert fires,
              exposure has been taken, premiums set, or resources committed.
            </p>
            <p>
              Luscint publishes forecasts with source dates and uncertainty information where available, so risk teams can see
              escalation coming and decide with their eyes open — and check later how the forecasts performed.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl mb-4">A forecasting platform, not a feed of alerts.</h2>
            <p className="text-lg text-slate-600">Three layers that you can adopt together or separately.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {layers.map(({ icon: Icon, step, title, text }) => (
              <div key={title} className="bg-white border border-line rounded-lg p-7">
                <div className="flex items-center justify-between mb-5">
                  <Icon className="text-brand-blue" size={26} strokeWidth={1.5} />
                  <span className="font-serif text-sm text-slate-400">{step}</span>
                </div>
                <h3 className="text-xl mb-2">{title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/platform" className="text-link inline-flex items-center">
              Explore the platform <ArrowRight className="ml-1" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow mb-3">Solutions</p>
            <h2 className="text-3xl md:text-4xl">Built for the people who carry the risk.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map(({ icon: Icon, title, text, href }) => (
              <Link
                key={href}
                href={href}
                className="group block border border-line rounded-lg p-7 hover:border-brand-blue/50 hover:shadow-sm transition"
              >
                <Icon className="text-brand-blue mb-5" size={26} strokeWidth={1.5} />
                <h3 className="text-xl mb-2">{title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-5">{text}</p>
                <span className="text-sm font-medium text-brand-blue inline-flex items-center">
                  Learn more <ArrowRight className="ml-1 transition-transform group-hover:translate-x-0.5" size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Open data vs Luscint + signals */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-line rounded-lg p-8">
            <p className="eyebrow mb-3">Open data, and what goes beyond it</p>
            <h2 className="text-2xl md:text-3xl mb-4">Start free. License when you need more.</h2>
            <p className="text-slate-600 mb-5">
              The monthly country and grid forecasts are free for non-commercial use. Luscint adds what professional users need:
            </p>
            <ul className="space-y-2 text-[15px] text-slate-700 mb-6">
              {[
                'Commercial licence and documented archive access',
                'Custom horizons and delivery cadence',
                'Forecasts mapped to your holdings or locations',
                'Additional signals, API with SLA, and support',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Check size={18} className="text-brand-blue mt-0.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/open-data" className="text-link inline-flex items-center">
              Open data vs. Luscint <ArrowRight className="ml-1" size={15} />
            </Link>
          </div>

          <div className="bg-navy text-white rounded-lg p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300 mb-3">Beyond conflict history</p>
            <h2 className="text-2xl md:text-3xl text-white mb-4 flex items-start gap-3">
              <Satellite className="mt-1 flex-shrink-0 text-blue-300" size={28} strokeWidth={1.5} />
              Bring your own signals.
            </h2>
            <p className="text-slate-300 mb-5">
              Our engine is not tied to one data source. We work with design partners to integrate the signals that matter to
              their portfolio — satellite-derived indicators, market and price data, shipping activity — into forecasts built for them.
            </p>
            <Link href="/platform#signals" className="inline-flex items-center text-sm font-medium text-white border-b border-white/50 hover:border-white pb-0.5">
              Talk to us about signals <ArrowRight className="ml-1" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">Explore the latest available forecasts.</h2>
          <p className="text-slate-300 mb-8 text-lg">Tell us what you monitor and we will tell you what we can offer.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary !bg-white !text-navy hover:!bg-blue-50">Get in touch</Link>
            <Link href="/forecasts" className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
              Open the dashboard
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
