import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl md:text-5xl mb-4">Page not found</h1>
        <p className="text-slate-600 mb-8">We could not find that page. Try one of these instead.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Home</Link>
          <Link href="/forecasts" className="btn-secondary">Dashboard</Link>
          <Link href="/contact" className="btn-secondary">Contact</Link>
        </div>
      </div>
    </section>
  )
}
