import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Layers, Cpu, Send } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Platform',
  description: 'Signals, a pattern-based forecasting engine, and delivery by dashboard, data files and API — and how extra signals can be added for a client.',
}

const standard = [
  'Country forecasts, 1–6 months ahead, updated monthly',
  'Global 0.5° (≈55 km) grid forecasts',
  'Prediction intervals and month-on-month change',
  'Dashboard, CSV and JSON downloads',
  'Versioned archive of past monthly releases',
]

const builtForYou = [
  'Forecasts mapped to your holdings, locations or supply chain',
  'Satellite-derived and market signals integrated into your forecasts',
  'Custom horizons, geographies or delivery schedules',
  'Commercial licence, API with SLA, and support',
  'Evaluation against your own data and history',
]

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow="Product · Platform"
        title="From signals to forecasts to decisions."
        lead="One forecasting engine, a growing set of signals, and delivery that fits how your team works."
      />

      {/* Three layers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Layers, title: 'Signals', text: 'Inputs describing what is happening on the ground: conflict event history and country covariates today, with further signals integrated as needed.' },
              { icon: Cpu, title: 'Forecasting engine', text: 'Pattern-based models identify past episodes that resemble the current trajectory and follow them forward, giving forecasts and uncertainty for the months ahead.' },
              { icon: Send, title: 'Delivery', text: 'A dashboard for analysts, data files and an API for your own systems, monthly reports, and tailored outputs for your portfolio.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-line rounded-lg p-7">
                <Icon className="text-brand-blue mb-5" size={26} strokeWidth={1.5} />
                <h2 className="text-xl mb-2">{title}</h2>
                <p className="text-slate-600 text-[15px] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engine */}
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">The engine</p>
            <h2 className="text-3xl">Forecasts you can explain.</h2>
          </div>
          <div className="md:col-span-3 space-y-4 text-lg text-slate-600">
            <p>
              Rather than a black-box score, the engine looks for comparable past episodes — places and periods whose recent
              trajectory looked like today’s — and follows them forward. The forecast and its uncertainty come from what actually
              happened next, and the comparable episodes are available to inspect.
            </p>
            <p>
              The approach is published in peer-reviewed research and is not specific to a country, region or period.{' '}
              <Link href="/methodology" className="text-link">Read the methodology</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Signals */}
      <section id="signals" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">Signals</p>
          <h2 className="text-3xl md:text-4xl mb-5 max-w-3xl">Signal-agnostic by design.</h2>
          <p className="text-lg text-slate-600 max-w-3xl mb-10">
            The engine works on time series of any kind that carry recurring patterns. That is why it can take in signals beyond
            conflict history — satellite-derived indicators such as night-time lights, vegetation and crop stress, flooding and
            displacement; market and price data; shipping activity — when they are relevant to a client’s portfolio.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-line rounded-lg p-7">
              <h3 className="text-xl mb-4">Standard, every month</h3>
              <ul className="space-y-2 text-[15px] text-slate-700">
                {standard.map((t) => (
                  <li key={t} className="flex gap-2"><Check size={18} className="text-brand-blue mt-0.5 flex-shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-navy text-white rounded-lg p-7">
              <h3 className="text-xl text-white mb-4">Built for you</h3>
              <ul className="space-y-2 text-[15px] text-slate-200">
                {builtForYou.map((t) => (
                  <li key={t} className="flex gap-2"><ArrowRight size={18} className="text-blue-300 mt-0.5 flex-shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-5 max-w-3xl">
            We scope each additional signal with the client, test it against their use case, and tell you plainly what it does and does not add.
          </p>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Dashboard', text: 'Interactive country and grid maps, rankings, movers, and country detail pages.', href: '/forecasts', cta: 'Open the dashboard' },
            { title: 'Data & API', text: 'Monthly CSV and JSON files, a versioned archive, and code examples in Python, R and JavaScript.', href: '/data', cta: 'Data downloads' },
            { title: 'Reports & integration', text: 'Monthly reporting, and forecasts delivered into your own tools and workflows on request.', href: '/contact', cta: 'Talk to us' },
          ].map((d) => (
            <div key={d.title} className="bg-white border border-line rounded-lg p-7 flex flex-col">
              <h3 className="text-xl mb-2">{d.title}</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-5 flex-1">{d.text}</p>
              <Link href={d.href} className="text-link inline-flex items-center self-start">{d.cta} <ArrowRight className="ml-1" size={15} /></Link>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Want a signal added to your forecasts?" text="Tell us what you monitor and we will scope what is possible." />
    </>
  )
}
