import Link from 'next/link'

// The old mock "Demo" page has been retired; send visitors to the live dashboard.
export default function Dashboard() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${process.env.NEXT_PUBLIC_BASE_PATH || ''}/forecasts/`} />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600 font-light">
            The dashboard has moved. <Link href="/forecasts" className="text-link">Go to the forecast dashboard</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
