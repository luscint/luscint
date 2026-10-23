import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaBand from '@/components/CtaBand'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers on what Luscint forecasts, how, how reliable it is, and how to access the data.',
}

const faqs: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: 'What exactly do you forecast?',
    a: 'Levels of political violence, measured as conflict fatalities, for covered countries and available 0.5° grid cells (about 55 km north–south), for six monthly horizons from the data cutoff. Check the release metadata for the actual target months and source dates.',
  },
  {
    q: 'How are the forecasts made?',
    a: (
      <>
        A pattern-based approach: the model finds past episodes whose recent trajectory resembles the current one and follows
        them forward to form a forecast and its uncertainty. The comparable episodes can be inspected. See the{' '}
        <Link href="/methodology" className="text-link">methodology</Link>.
      </>
    ),
  },
  {
    q: 'How accurate are they?',
    a: 'Conflict is inherently hard to forecast, and no model is right every time. The approach is described and evaluated in peer-reviewed research, and uncertainty information varies by release. Latest source exports include lower and upper model outputs without documented calibrated coverage; some older archive ranges are heuristic ±30% estimates. See Data & API for provenance and limitations. We encourage prospective clients to test the forecasts against their own history and use case, and we will support that.',
  },
  {
    q: 'Can I use the forecasts for trading or investment decisions?',
    a: (
      <>
        The forecasts are information, not investment advice or trading signals, and we make no claims about returns. Commercial
        use requires a licence — see <Link href="/open-data" className="text-link">Open data vs. Luscint</Link> and our{' '}
        <Link href="/legal/disclaimer" className="text-link">disclaimer</Link>.
      </>
    ),
  },
  {
    q: 'What is free, and what needs a licence?',
    a: (
      <>
        The monthly country and grid data are free for non-commercial use under CC BY-NC 4.0, with attribution. Use in
        commercial products or decisions needs a commercial licence.{' '}
        <Link href="/data" className="text-link">Data downloads</Link>.
      </>
    ),
  },
  {
    q: 'How often is it updated, and how far ahead does it look?',
    a: 'The site checks for updates monthly, subject to source availability. Horizons are one to six months from the observation cutoff, not necessarily from today or the publication date. See the dashboard for the latest available target months.',
  },
  {
    q: 'Can you include satellite or market data?',
    a: 'The engine is signal-agnostic, and we can integrate additional signals — for example satellite-derived indicators or market and price data — into forecasts built for a specific client or portfolio. We scope each signal with you and test it against your use case.',
  },
  {
    q: 'Can forecasts be mapped to my portfolio or locations?',
    a: 'Yes, as a client engagement: we match forecasts to your holdings, location schedule or supply chain and deliver the result in a format that suits your tools.',
  },
  {
    q: 'Is this causal or predictive?',
    a: 'Predictive. The forecasts anticipate outcomes given current trajectories and historical regularities; they do not identify causes.',
  },
  {
    q: 'Can forecasts be used for safety-critical decisions?',
    a: 'No. Forecasts must not be the sole basis for decisions affecting people’s safety. Please combine them with local and expert information.',
  },
]

export default function FAQ() {
  return (
    <>
      <PageHero eyebrow="Evidence" title="Frequently asked questions" lead="Straight answers on what the forecasts are, how they are made, and how to use them." />
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-line">
          {faqs.map((f) => (
            <div key={f.q} className="py-6">
              <h2 className="text-xl mb-2">{f.q}</h2>
              <p className="text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="Another question?" text="Ask us directly — we reply personally." />
    </>
  )
}
