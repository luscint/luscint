import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import PageHero from './PageHero'
import CtaBand from './CtaBand'

type Block = { title: string; text: string }

export default function SolutionPage({
  eyebrow, title, lead, challenge, provides, usage, delivery, notClaimed, relatedHref, relatedLabel,
}: {
  eyebrow: string
  title: string
  lead: string
  challenge: string[]
  provides: string[]
  usage: Block[]
  delivery: string[]
  notClaimed: string
  relatedHref?: string
  relatedLabel?: string
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/contact" className="btn-primary !bg-white !text-navy hover:!bg-blue-50">Get in touch</Link>
          {relatedHref && (
            <Link href={relatedHref} className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
              {relatedLabel}
            </Link>
          )}
        </div>
      </PageHero>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">The challenge</p>
            <h2 className="text-3xl">What makes this hard today</h2>
          </div>
          <div className="md:col-span-3 space-y-4 text-lg text-slate-600">
            {challenge.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">What you get</p>
            <h2 className="text-3xl">Forecasts you can build into your process</h2>
          </div>
          <ul className="md:col-span-3 space-y-3 text-[17px] text-slate-700">
            {provides.map((t) => (
              <li key={t} className="flex gap-3"><Check size={20} className="text-brand-blue mt-1 flex-shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">How teams use it</p>
          <h2 className="text-3xl mb-10 max-w-2xl">Typical workflows</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {usage.map((u) => (
              <div key={u.title} className="border border-line rounded-lg p-7">
                <h3 className="text-xl mb-2">{u.title}</h3>
                <p className="text-slate-600 text-[15px] leading-relaxed">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <p className="eyebrow mb-3">Delivery</p>
            <h2 className="text-2xl mb-4">Fits how you already work</h2>
            <ul className="space-y-2 text-[15px] text-slate-700">
              {delivery.map((t) => (
                <li key={t} className="flex gap-2"><Check size={18} className="text-brand-blue mt-0.5 flex-shrink-0" />{t}</li>
              ))}
            </ul>
            <Link href="/open-data" className="mt-5 text-link inline-flex items-center">What is free, what is licensed <ArrowRight className="ml-1" size={15} /></Link>
          </div>
          <div className="bg-white border border-line rounded-lg p-7">
            <p className="eyebrow mb-3">Our position</p>
            <h2 className="text-2xl mb-3">What we do not claim</h2>
            <p className="text-slate-600 text-[15px] leading-relaxed">{notClaimed}</p>
            <p className="text-slate-500 text-sm mt-4">
              See the <Link href="/methodology" className="underline">methodology</Link> and our <Link href="/legal/disclaimer" className="underline">disclaimer</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
