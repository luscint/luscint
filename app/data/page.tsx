import ForecastProvenance from '@/components/ForecastProvenance'
import { readProvenance, qualityNotice } from '@/lib/forecast-provenance'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import fs from 'fs'
import path from 'path'
import MultiFileDownloader from '@/components/MultiFileDownloader'
import ArchiveTable from '@/components/ArchiveTable'
import TabbedCodeExamples from '@/components/TabbedCodeExamples'

// Public base URL for code examples; switch to https://luscint.com once the domain points at this site
const SITE_BASE = 'https://luscint.github.io/luscint'
const GITHUB_BASE = 'https://raw.githubusercontent.com/conflictlab/Pace-map-risk/main'

function latestPeriod(): string | null {
  try {
    const p = path.join(process.cwd(), 'public', 'data', 'forecasts', 'latest', 'metadata.json')
    const j = JSON.parse(fs.readFileSync(p, 'utf-8'))
    return j?.forecast_start_date || j?.data_end_date || null
  } catch { return null }
}

function listArchive(): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'data', 'forecasts', 'archive')
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory() && /^\d{4}-\d{2}$/.test(d.name))
      .map(d => d.name)
      .sort()
      .reverse()
  } catch { return [] }
}

function listGridPeriods(): string[] {
  try {
    const dir = path.join(process.cwd(), 'public', 'data', 'grid')
    const files = fs.readdirSync(dir)
    const periods = Array.from(new Set(
      files
        .map(f => { const m = f.match(/^(\d{4}-\d{2})[-.]/) ; return m ? m[1] : null })
        .filter((p): p is string => !!p)
    )).sort()
    return periods
  } catch { return [] }
}



export default function DataApiPage() {
  const latest = latestPeriod()
  const periods = listArchive()
  const gridPeriods = listGridPeriods()

  // Pre-compute all file availability
  const archiveData = periods.map(period => {
    const hasFile = (file: string) => {
      try {
        return fs.existsSync(path.join(process.cwd(), 'public', 'data', 'forecasts', 'archive', period, file))
      } catch {
        return false
      }
    }

    return {
      period,
      boundsKind: readProvenance(period).bounds_kind || 'unavailable',
      underReview: !!qualityNotice(period),
      files: {
        bundle: hasFile(`forecasts-${period}.zip`),
        hist: hasFile('Hist.csv'),
        metadata: hasFile('metadata.json'),
        h6_mean: hasFile('forecasts_h6.csv'),
        h6_min: hasFile('forecasts_h6_min.csv'),
        h6_max: hasFile('forecasts_h6_max.csv'),
        h12_mean: hasFile('forecasts_h12.csv'),
        h12_min: hasFile('forecasts_h12_min.csv'),
        h12_max: hasFile('forecasts_h12_max.csv'),
      }
    }
  })

  // Code examples for tabbed interface
  const quickStartExamples = [
    {
      label: 'Python',
      language: 'python',
      code: `import pandas as pd
import requests

# Fetch latest forecasts and historical data
forecasts = pd.read_csv("${SITE_BASE}/data/forecasts/latest/forecasts_h12.csv")
historical = pd.read_csv("${SITE_BASE}/data/forecasts/latest/Hist.csv")
metadata = requests.get("${SITE_BASE}/data/forecasts/latest/metadata.json").json()

print(f"Forecast period: {metadata['forecast_start_date']}")
print(forecasts["Ukraine"].head())  # First 5 months for Ukraine`
    },
    {
      label: 'R',
      language: 'r',
      code: `library(readr)
library(httr)
library(jsonlite)
library(magrittr)

# Fetch latest forecasts and historical data
forecasts <- read_csv("${SITE_BASE}/data/forecasts/latest/forecasts_h12.csv")
historical <- read_csv("${SITE_BASE}/data/forecasts/latest/Hist.csv")
metadata <- GET("${SITE_BASE}/data/forecasts/latest/metadata.json") %>%
  content("text") %>% fromJSON()

cat("Forecast period:", metadata$forecast_start_date, "\\n")
head(forecasts$Ukraine)  # First 6 rows for Ukraine`
    },
    {
      label: 'JavaScript',
      language: 'javascript',
      code: `// Fetch latest forecasts and historical data
const forecasts = await fetch(
  '${SITE_BASE}/data/forecasts/latest/forecasts_h12.csv'
).then(r => r.text());
const historical = await fetch(
  '${SITE_BASE}/data/forecasts/latest/Hist.csv'
).then(r => r.text());

// Fetch metadata
const meta = await fetch(
  '${SITE_BASE}/data/forecasts/latest/metadata.json'
).then(r => r.json());

console.log('Forecast period:', meta.forecast_start_date);`
    },
    {
      label: 'curl',
      language: 'bash',
      code: `# Download latest forecasts
curl -O ${SITE_BASE}/data/forecasts/latest/forecasts_h12.csv
curl -O ${SITE_BASE}/data/forecasts/latest/Hist.csv
curl -O ${SITE_BASE}/data/forecasts/latest/metadata.json

# Download complete archive bundle
curl -O ${SITE_BASE}/data/forecasts/archive/2026-03/forecasts-2026-03.zip`
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <PageHero eyebrow="Data & API" title="Data downloads &amp; API" lead="Monthly country and grid forecasts for download, with code examples and a versioned archive. Free for non-commercial use under CC BY-NC 4.0." />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contents Navigation */}
          <div className="mb-10 text-sm text-gray-700">
            <div className="font-medium text-gray-900 mb-2">Contents</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="#country-forecasts" className="text-link">Country Forecasts</a>
              <a href="#prio-grid" className="text-link">PRIO-GRID Forecasts</a>
              <a href="#usage" className="text-link">Usage</a>
            </div>
          </div>

          {/* Quick Start with Tabbed Examples */}
          {/* Country Forecasts */}
          <div id="country-forecasts" className="mb-12 border border-gray-200 rounded-lg p-6 bg-blue-50">
            <h2 className="text-2xl font-normal text-gray-900 mb-4">Country Forecasts</h2>

            {/* Quick Start */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Start</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fetch the latest forecasts in your preferred language. Check the metadata for the observation cutoff, model run date and forecast start month. Monthly horizons do not imply delivery on a particular calendar day.
              </p>
              <TabbedCodeExamples examples={quickStartExamples} />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latest Forecasts */}
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Latest Forecasts</h3>
                  <div className="text-xs space-y-1 font-mono text-gray-700">
                    <div>/data/forecasts/latest/forecasts_h6.csv</div>
                    <div>/data/forecasts/latest/forecasts_h12.csv</div>
                    <div>/data/forecasts/latest/metadata.json</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Historical Data</h4>
                    <p className="text-xs text-gray-600 mb-1">
                      Download historical observations supplied with the export. The original training-data vintage is not verified:
                    </p>
                    <div className="text-xs space-y-1 font-mono text-gray-700">
                      <div>/data/forecasts/latest/Hist.csv</div>
                    </div>
                  </div>
                </div>

                {/* Archive */}
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Historical Archive</h3>
                  <div className="text-xs space-y-1 font-mono text-gray-700">
                    <div>/data/forecasts/archive/<span className="text-blue-600">YYYY-MM</span>/forecasts_h6.csv</div>
                    <div>/data/forecasts/archive/<span className="text-blue-600">YYYY-MM</span>/forecasts_h12.csv</div>
                    <div>/data/forecasts/archive/<span className="text-blue-600">YYYY-MM</span>/Hist.csv</div>
                    <div>/data/forecasts/archive/<span className="text-blue-600">YYYY-MM</span>/metadata.json</div>
                  </div>
                  {periods.length > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      Available from <span className="font-medium">{periods[periods.length - 1]}</span> to <span className="font-medium">{periods[0]}</span>.
                    </p>
                  )}
                </div>
              </div>

              <section id="provenance" className="scroll-mt-20 rounded border border-gray-200 p-5 space-y-4 text-sm text-gray-700">
                <h3 className="text-lg font-medium text-gray-900">Dates, provenance and uncertainty</h3>
                {latest && <ForecastProvenance period={latest} />}
                <p><strong>Forecast period is not publication date.</strong> Archive folders identify the first target month. Model run dates are shown only when supplied by the source. Archive import dates record when files were copied to this site. Original publication dates are not verified for the current archive, so it must not be presented as a verified real-time track record.</p>
                <p><strong>Backtesting.</strong> Before evaluating information that would have been available at a past date, verify the original issue timestamp, model version and observation vintage. Historical data may include later revisions; a cutoff date alone does not establish point-in-time availability.</p>
                <p><strong>Source-provided bounds.</strong> The latest <code>_min.csv</code> and <code>_max.csv</code> files contain lower and upper outputs supplied by the model. They are not documented as 10th/90th percentiles or as intervals with a calibrated coverage probability.</p>
                <p><strong>Legacy heuristic ranges.</strong> Archive rows labelled “Heuristic ±30%” contain ranges constructed as 0.7 and 1.3 times the point forecast. They are retained for compatibility and inspection; they are not model-derived uncertainty and should not be used to assess calibration. Missing bounds are left unavailable in new imports.</p>
                <p><strong>Values and horizons.</strong> Point forecasts represent fatalities for individual target months, not cumulative totals or a documented median. A zero forecast does not mean an event is impossible. Missing or withheld comparisons appear as a dash.</p>
                <p><Link href="/data/forecast-quality.json" className="text-link">Source data review notes (JSON)</Link></p>
              </section>

              {/* Historical Archive Table */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Archive Downloads</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Access any historical forecast period{periods.length > 0 ? ` from ${periods[periods.length - 1]} to ${periods[0]}` : ' from 1989-01 to present'}.
                </p>
                <div className="bg-white border border-gray-200 rounded p-4">
                  <ArchiveTable archiveData={archiveData} />
                </div>
              </div>
            </div>
          </div>

          {/* Sub-national Forecasts (PRIO-GRID) */}
          {(() => {
            let gridPeriod: string | null = null
            try {
              const gridDir = path.join(process.cwd(), 'public', 'data', 'grid')
              const files = fs.readdirSync(gridDir)
              const periods = files
                .map((f) => {
                  const m = f.match(/(\d{4}-\d{2})(?:\.geo\.json|\-m[1-6]\.json|\-m[1-6]\.csv|\.csv)$/)
                  return m ? m[1] : null
                })
                .filter((p): p is string => !!p)
                .sort()
              if (periods.length) gridPeriod = periods[periods.length - 1]
            } catch {}

            if (!gridPeriod) return null

            const gridCsvItems = [
              { path: `/data/grid/${gridPeriod}-m1.csv`, label: `${gridPeriod}-m1.csv` },
              { path: `/data/grid/${gridPeriod}-m2.csv`, label: `${gridPeriod}-m2.csv` },
              { path: `/data/grid/${gridPeriod}-m3.csv`, label: `${gridPeriod}-m3.csv` },
              { path: `/data/grid/${gridPeriod}-m4.csv`, label: `${gridPeriod}-m4.csv` },
              { path: `/data/grid/${gridPeriod}-m5.csv`, label: `${gridPeriod}-m5.csv` },
              { path: `/data/grid/${gridPeriod}-m6.csv`, label: `${gridPeriod}-m6.csv` },
              { path: `/data/grid/${gridPeriod}.csv`, label: `${gridPeriod}.csv (all months)` },
            ]
            const gridGeoJsonItems = [
              { path: `/data/grid/${gridPeriod}.geo.json`, label: `${gridPeriod}.geo.json (polygons)` },
              { path: `/data/grid/${gridPeriod}-m1.json`, label: `${gridPeriod}-m1.json` },
              { path: `/data/grid/${gridPeriod}-m2.json`, label: `${gridPeriod}-m2.json` },
              { path: `/data/grid/${gridPeriod}-m3.json`, label: `${gridPeriod}-m3.json` },
              { path: `/data/grid/${gridPeriod}-m4.json`, label: `${gridPeriod}-m4.json` },
              { path: `/data/grid/${gridPeriod}-m5.json`, label: `${gridPeriod}-m5.json` },
              { path: `/data/grid/${gridPeriod}-m6.json`, label: `${gridPeriod}-m6.json` },
              { path: `/data/grid/centroids.csv`, label: `centroids.csv` },
            ]

            const gridExamples = [
              {
                label: 'Python',
                language: 'python',
                code: `import pandas as pd
import requests

# Download grid forecasts
grid = pd.read_csv("${SITE_BASE}/data/grid/${gridPeriod}.csv")
geojson = requests.get("${SITE_BASE}/data/grid/${gridPeriod}.geo.json").json()

print(f"Grid cells: {len(grid)}")
print(grid.head())`
              },
              {
                label: 'R',
                language: 'r',
                code: `library(readr)
library(httr)
library(jsonlite)
library(magrittr)

# Download grid forecasts
grid <- read_csv("${SITE_BASE}/data/grid/${gridPeriod}.csv")
geojson <- GET("${SITE_BASE}/data/grid/${gridPeriod}.geo.json") %>%
  content("text") %>% fromJSON()

cat("Grid cells:", length(geojson$features), "\\n")
head(grid)`
              },
              {
                label: 'JavaScript',
                language: 'javascript',
                code: `// Download grid forecasts
const grid = await fetch(
  '${SITE_BASE}/data/grid/${gridPeriod}.csv'
).then(r => r.text());
const geojson = await fetch(
  '${SITE_BASE}/data/grid/${gridPeriod}.geo.json'
).then(r => r.json());

console.log('Grid cells:', geojson.features.length);`
              },
              {
                label: 'curl',
                language: 'bash',
                code: `# Download grid forecasts (CSV and GeoJSON)
curl -O ${SITE_BASE}/data/grid/${gridPeriod}.csv
curl -O ${SITE_BASE}/data/grid/${gridPeriod}.geo.json
curl -O ${SITE_BASE}/data/grid/centroids.csv

# Or download monthly files
curl -O ${SITE_BASE}/data/grid/${gridPeriod}-m1.csv
curl -O ${SITE_BASE}/data/grid/${gridPeriod}-m1.json`
              }
            ]

            return (
              <div id="prio-grid" className="mb-12 border border-gray-200 rounded-lg p-6 bg-green-50">
                <h2 className="text-2xl font-normal text-gray-900 mb-4">Sub-national Forecasts (PRIO-GRID)</h2>
                <p className="text-sm text-gray-600 mb-6">
                  High-resolution spatial forecasts on a 0.5° grid (~55 km cells). Download forecasts for period <span className="font-mono font-medium">{gridPeriod}</span> in CSV or GeoJSON format.
                </p>

                {/* Quick Start Examples for PRIO-GRID */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Start</h3>
                  <TabbedCodeExamples examples={gridExamples} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded p-4">
                    <h4 className="font-medium text-gray-900 mb-3">CSV Files</h4>
                    <MultiFileDownloader items={gridCsvItems} zipName={`Luscint-grid-${gridPeriod}-csv`} />
                  </div>
                  <div className="border border-gray-200 rounded p-4">
                    <h4 className="font-medium text-gray-900 mb-3">GeoJSON Files</h4>
                    <MultiFileDownloader items={gridGeoJsonItems} zipName={`Luscint-grid-${gridPeriod}-json`} />
                  </div>
                </div>
              </div>
            )
          })()}

          {/* License and Citation */}
          <div id="usage" className="mb-12 border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-normal text-gray-900 mb-4">License and Citation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">License</h3>
                <p className="text-sm text-gray-700">
                  <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer" className="text-link">CC BY-NC 4.0</a>. For commercial use, <Link href="/contact" className="text-link">contact us</Link>.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Update Schedule</h3>
                <p className="text-sm text-gray-700">
                  The site checks for source updates monthly. Publication depends on source availability; no fixed release time is guaranteed. Forecast periods can precede their model run or import date. Check metadata before use.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Citation</h3>
                <p className="text-sm text-gray-700">
                  Schincariol, T., Frank, H., & Chadefaux, T. (2025). JPR. <a href="https://doi.org/10.1177/00223433251330790" target="_blank" rel="noopener noreferrer" className="text-link">DOI</a>
                </p>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-600 space-y-1">
              <div>
                <span className="font-medium">Attribution example:</span>
                <code className="ml-2 px-1 py-0.5 bg-gray-50 border border-gray-200 rounded">Luscint (2025). Monthly Conflict Forecasts. https://luscint.com/data</code>
              </div>
              <div><span className="font-medium">Disclaimer:</span> Provided “as is”, without warranty; not for safety‑critical decisions.</div>
              <div><span className="font-medium">Acceptable use:</span> Do not use to target, harass, or cause harm; comply with applicable laws.</div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/contact"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
