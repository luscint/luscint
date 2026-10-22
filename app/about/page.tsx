import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'
import companyData from '@/content/company.json'

export const metadata: Metadata = {
  title: 'About',
  description: 'Luscint produces forward-looking, transparent forecasts of political violence for investors, insurers and public-sector decision-makers.',
}

const principles = [
  { title: 'Forecasts, not alerts', text: 'Forward-looking, time-stamped estimates with stated uncertainty, rather than a record of what has already happened.' },
  { title: 'Transparent by default', text: 'Published methods, inspectable comparable episodes, and open monthly data. If we cannot explain a forecast, we should not sell it.' },
  { title: 'Honest about limits', text: 'Conflict is hard to forecast. We state what the forecasts can and cannot tell you, and we encourage clients to test them on their own data.' },
  { title: 'Built around your decisions', text: 'The same engine, delivered and tailored to the portfolios, locations and processes our clients actually have.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Forecasting political violence, for people who have to act on it."
        lead={companyData.description}
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">Mission</p>
            <h2 className="text-3xl">Clear intelligence on instability.</h2>
          </div>
          <div className="md:col-span-3 space-y-4 text-lg text-slate-600">
            <p>{companyData.mission}</p>
            <p>
              Luscint was founded by a researcher in conflict forecasting. The methods behind our forecasts are published in
              peer-reviewed literature, and we continue to extend them — including to new signals.
            </p>
            <p>
              The name comes from <em>lux</em> (light) and <em>intuitus</em> (insight): bringing weak signals into view.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">How we work</p>
          <h2 className="text-3xl mb-10">Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-white border border-line rounded-lg p-7">
                <h3 className="text-xl mb-2">{p.title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl mb-3">Open data and Luscint</h2>
            <p className="text-slate-600 mb-3">
              The monthly forecasts are free for non-commercial use. Luscint provides commercial licensing, tailoring to your
              portfolio, additional signals, and support.
            </p>
            <Link href="/open-data" className="text-link">Open data vs. Luscint</Link>
          </div>
          <div>
            <h2 className="text-2xl mb-3">Read the research</h2>
            <p className="text-slate-600 mb-3">
              See how the forecasts are produced and the papers behind them.
            </p>
            <Link href="/methodology" className="text-link">Methodology & papers</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
