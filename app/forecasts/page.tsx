import SummaryCard from '@/components/SummaryCard'
import { getForecastsPageData, getOrCalculateMonths } from '@/lib/forecasts'
import RiskIndexTable from '@/components/RiskIndexTable'
import Collapsible from '@/components/Collapsible'
import dynamic from 'next/dynamic'
import FallbackCountryList from '@/components/FallbackCountryList'
import Link from 'next/link'
import type { Metadata } from 'next'
import LazyVisible from '@/components/LazyVisible'
import PageHero from '@/components/PageHero'

const ForecastFanChart = dynamic(() => import('@/components/ForecastFanChart'), { ssr: false })
const CountryChoropleth = dynamic(() => import('@/components/CountryChoropleth'), { ssr: false })

export const metadata: Metadata = {
  title: 'Forecast dashboard',
  description: 'Six-month, country-level forecasts of conflict fatalities with month-over-month changes and hotspots.',
}

function endPeriodFrom(start: string): string | null {
  const [y, m] = start.split('-').map(Number)
  if (!Number.isFinite(y) || !Number.isFinite(m)) return null
  const d = new Date(Date.UTC(y, m - 1, 1))
  d.setUTCMonth(d.getUTCMonth() + 5) // 6-month horizon: 1..6
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

function formatDMY(iso: string): string {
  const dt = new Date(iso)
  return `${String(dt.getDate()).padStart(2, '0')}/${String(dt.getMonth() + 1).padStart(2, '0')}/${dt.getFullYear()}`
}

export default async function ForecastsPage() {
  const { snapshot, summaryStats, rows, countryMapItems, highlights, movers } = await getForecastsPageData()
  const { total1mCurrent, deltaTotal, countriesCovered, highByThresholdCount, deltaHigh, HIGH_THRESHOLD } = summaryStats

  return (
    <div className="bg-surface">
      <PageHero
        eyebrow="Product · Dashboard"
        title="Forecasts"
        lead="Six-month forecasts of conflict fatalities at the country and sub-national level, updated monthly."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/forecasts#dashboard" className="btn-primary !bg-white !text-navy hover:!bg-blue-50">Dashboard</Link>
          <Link href="/data" className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors">
            Data &amp; downloads
          </Link>
        </div>
      </PageHero>

      {/* Forecast map */}
      <section className="py-0" id="dashboard">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <LazyVisible minHeight="300px">
            <CountryChoropleth items={countryMapItems} showHotspots={true} hideDownloadButton={true} mobileControlsButtonPosition="top-right" />
          </LazyVisible>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-6">
            <p className="text-slate-700 mb-3">
              Forecast period: {snapshot.period} to {endPeriodFrom(snapshot.period) || snapshot.period}
              <span> · </span>
              Updated: {formatDMY(snapshot.generatedAt)}
            </p>
            <p className="text-slate-600 text-sm">
              All values represent predicted <span className="font-medium text-ink">conflict fatalities</span> (deaths from
              state-based, non-state and one-sided violence) over the next 6 months. The table shows 1-month-ahead predictions
              and month-over-month changes. Forecasts are statistical estimates, not advice —{' '}
              <Link href="/legal/disclaimer" className="text-link">see disclaimer</Link>.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SummaryCard
              title="Total predicted fatalities (1-month)"
              value={Math.round(total1mCurrent)}
              subtitle="Sum of next-month predictions across all countries"
              delta={deltaTotal}
              deltaLabel="Δ total vs previous month"
            />
            <SummaryCard
              title={`High-risk countries (>${HIGH_THRESHOLD} next month)`}
              value={`${highByThresholdCount} (${countriesCovered > 0 ? Math.round((highByThresholdCount / countriesCovered) * 100) : 0}%)`}
              delta={deltaHigh}
              deltaLabel="Δ vs last month"
            />
          </div>
        </div>
      </section>

      {/* Browse by list */}
      <FallbackCountryList
        movers={movers as any}
        rows={rows.map((r) => ({ id: r.id, name: r.name, pred1m: r.pred1m })) as any}
      />

      {/* Highlighted countries: observed history + forecast */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
            {highlights.map((e) => {
              const months = getOrCalculateMonths(snapshot.period, e)
              return (
                <LazyVisible key={e.id} minHeight="200px">
                  <Link href={`/forecasts/${e.id}`} className="block hover:opacity-80 transition-opacity">
                    <ForecastFanChart title={`${e.name} — Predicted fatalities`} months={months} countryName={e.name} />
                  </Link>
                </LazyVisible>
              )
            })}
          </div>
        </div>
      </section>

      {/* Risk table */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-2">Predicted fatalities (1, 3, 6-month)</h2>
          <p className="text-sm text-slate-600 mb-4">Table shows next-month predicted fatalities per entity and Δ MoM versus the previous forecast file.</p>
          <Collapsible title="table" initiallyCollapsed={false}>
            <RiskIndexTable rows={rows} />
          </Collapsible>
        </div>
      </section>
    </div>
  )
}
