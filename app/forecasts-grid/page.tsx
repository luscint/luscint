import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
const PrioGridMap = dynamic(() => import('@/components/PrioGridMap'), { ssr: false })
import fs from 'fs'
import path from 'path'
import PageHero from '@/components/PageHero'
import Link from 'next/link'
// Inline download cards removed; use /data page via map button

export const metadata: Metadata = {
  title: 'Sub-national grid forecasts',
  description: 'Six‑month, sub‑national forecasts of conflict fatalities with month‑over‑month changes and hotspots.',
}

function endPeriodFrom(start: string): string | null {
  const parts = start.split('-')
  if (parts.length !== 2) return null
  const y = Number(parts[0])
  const m = Number(parts[1])
  if (!Number.isFinite(y) || !Number.isFinite(m)) return null
  const d = new Date(Date.UTC(y, (m - 1), 1))
  d.setUTCMonth(d.getUTCMonth() + 5)
  const ey = d.getUTCFullYear()
  const em = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${ey}-${em}`
}

export default async function ForecastsGridPage() {
  const gridDir = path.join(process.cwd(), 'public/data/grid')
  const periods = fs.readdirSync(gridDir).filter(f => /^\d{4}-\d{2}\.geo\.json$/.test(f)).sort()
  const period = periods[periods.length - 1]?.replace('.geo.json', '')
  const grid = period ? JSON.parse(fs.readFileSync(path.join(gridDir, `${period}.geo.json`), 'utf8')) : { features: [] }
  const cells = grid.features.filter((f: any) => Number.isFinite(f.properties?.m1))
  const total1m = cells.reduce((sum: number, f: any) => sum + f.properties.m1, 0)
  return (
    <div>
      {/* Hero */}
      <PageHero
        eyebrow="Product · Sub-national grid"
        title="Sub-national forecasts"
        lead="Forecasts of conflict fatalities for available 0.5° grid cells (about 55 km north–south), 1–6 months ahead, updated monthly."
      />

      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <PrioGridMap period={period} />
      </div>

      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-2">Monthly Conflict Forecasts</h1>
          <p className="text-gray-700 font-normal mb-4">
            Forecasts for the period {period} to {period ? endPeriodFrom(period) : '—'}

          </p>
          {/* Removed secondary view toggle below the map */}
          <p className="text-gray-600 text-sm mb-1">All values represent predicted conflict fatalities (deaths from state‑based, non‑state, and one‑sided violence) over the next 6 months. Each horizon represents one forecast month, not a cumulative total. Grid generation and original publication dates are not documented in the supplied grid files. Country-model run dates do not establish grid-model dates.</p>
          <p className="text-xs text-gray-500 mb-4">Forecasts are statistical estimates, not advice — <Link href="/legal/disclaimer" className="text-link">see disclaimer</Link>.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500">Grid total (first forecast month)</div>
              <div className="text-3xl font-normal text-gray-900">{Math.round(total1m).toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-1">Sum across cells in this grid file; separate from country-model totals</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500"><span title="0.5° map squares (~55 km)">Cells</span> in this file</div>
              <div className="text-3xl font-normal text-gray-900">{cells.length.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline download cards removed; use the centered Data button under the map */}

    </div>
  )
}
