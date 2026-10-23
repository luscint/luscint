import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Minus } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'Open data vs. Luscint',
  description: 'The monthly forecasts are free for non-commercial use. Here is what a Luscint licence adds.',
}

const rows: Array<{ item: string; open: boolean | string; luscint: boolean | string }> = [
  { item: 'Monthly country forecasts, 1–6 months ahead', open: true, luscint: true },
  { item: 'Global 0.5° grid forecasts', open: true, luscint: true },
  { item: 'Interactive dashboard', open: true, luscint: true },
  { item: 'CSV / JSON downloads and archive', open: true, luscint: true },
  { item: 'Use in commercial products and decisions', open: false, luscint: 'Commercial licence' },
  { item: 'Historical forecasts for evaluation', open: 'Publication dates unverified', luscint: 'Provenance review required' },
  { item: 'Custom horizons, geographies, cadence', open: false, luscint: true },
  { item: 'Forecasts mapped to your holdings or locations', open: false, luscint: true },
  { item: 'Additional signals (satellite, market, shipping)', open: false, luscint: 'Scoped per client' },
  { item: 'API with service levels', open: false, luscint: true },
  { item: 'Support, briefings and evaluation on your data', open: false, luscint: true },
]

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="text-brand-blue inline" size={18} />
  if (v === false) return <Minus className="text-slate-300 inline" size={18} />
  return <span className="text-sm text-slate-700">{v}</span>
}

export default function OpenData() {
  return (
    <>
      <PageHero
        eyebrow="About · Access"
        title="Open data is the start. Luscint goes further."
        lead="The monthly forecasts are free for research and other non-commercial use. A Luscint licence is for teams that need to use them in business — and need more than the open files."
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto border border-line rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-surface text-sm text-slate-600">
                <tr>
                  <th className="px-5 py-3 font-medium">&nbsp;</th>
                  <th className="px-5 py-3 font-medium text-center">Open data<br /><span className="text-xs font-normal text-slate-500">CC BY-NC 4.0</span></th>
                  <th className="px-5 py-3 font-medium text-center text-brand-blue">Luscint<br /><span className="text-xs font-normal text-slate-500">Commercial licence</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-[15px]">
                {rows.map((r) => (
                  <tr key={r.item}>
                    <td className="px-5 py-3 text-slate-800">{r.item}</td>
                    <td className="px-5 py-3 text-center"><Cell v={r.open} /></td>
                    <td className="px-5 py-3 text-center bg-blue-50/40"><Cell v={r.luscint} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            Pricing depends on scope. <Link href="/contact" className="underline">Tell us what you need</Link> and we will propose terms.
          </p>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl mb-3">Why keep open data?</h2>
            <p className="text-slate-600">
              Open, inspectable forecasts build the trust that any forecasting service depends on, and they serve researchers,
              NGOs and public bodies who cannot pay for data. Anyone can check what we publish.
            </p>
          </div>
          <div>
            <h2 className="text-2xl mb-3">Why license?</h2>
            <p className="text-slate-600">
              Professional users need rights to use forecasts commercially, reliable delivery, history with documented limitations they can evaluate,
              and outputs shaped to their portfolio. That is the work Luscint does beyond the open files.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Not sure which you need?" text="Start with the open data, or talk to us about a licence." />
    </>
  )
}
