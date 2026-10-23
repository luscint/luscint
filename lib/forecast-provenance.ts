import fs from 'fs'
import path from 'path'
import quality from '@/public/data/forecast-quality.json'

export interface ForecastProvenance {
  forecast_start_date?: string
  data_end_date?: string
  model_run_at?: string | null
  archive_imported_at?: string | null
  published_at?: string | null
  bounds_kind?: string
  publication_status?: string
  [key: string]: unknown
}

export function readProvenance(period: string): ForecastProvenance {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public/data/forecasts/archive', period, 'metadata.json'), 'utf8'))
  } catch { return {} }
}

export function qualityNotice(period: string): string | null {
  const entry = (quality.periods as Record<string, { status: string; message: string }>)[period]
  return entry?.status === 'under_review' ? entry.message : null
}

export function comparisonNotice(current: string, previous?: string): string | null {
  if (!previous) return 'No previous release is available for comparison.'
  const [year, month] = current.split('-').map(Number)
  const expected = new Date(Date.UTC(year, month - 2, 1)).toISOString().slice(0, 7)
  if (previous !== expected) return 'A consecutive previous monthly release is not available.'
  if (qualityNotice(current) || qualityNotice(previous)) {
    return `Changes from ${previous} to ${current} are withheld while source forecast anomalies are reviewed. A missing change is not zero.`
  }
  return null
}
