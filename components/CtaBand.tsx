import Link from 'next/link'

export default function CtaBand({ title = 'Talk to us about your use case.', text = 'Tell us what you monitor and we will tell you what we can offer.' }: { title?: string; text?: string }) {
  return (
    <section className="py-20 bg-surface border-t border-line">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl mb-4">{title}</h2>
        <p className="text-lg text-slate-600 mb-8">{text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-primary">Get in touch</Link>
          <Link href="/forecasts" className="btn-secondary">Explore live forecasts</Link>
        </div>
      </div>
    </section>
  )
}
