#!/usr/bin/env node
/**
 * Build content/forecasts/<period>.json (and latest.json) from the monthly archive.
 *
 * Source: public/data/forecasts/archive/<YYYY-MM>/forecasts_h6.csv (rows = months ahead, columns = countries,
 * values = predicted conflict fatalities). Values are used as-is — no scaling or capping — so that totals,
 * rankings and month-over-month changes are in real fatalities.
 *
 * Usage: node scripts/build-snapshots-from-archive.js [--from 2023-12]
 */
const fs = require('fs')
const path = require('path')

const root = process.cwd()
const archiveDir = path.join(root, 'public', 'data', 'forecasts', 'archive')
const outDir = path.join(root, 'content', 'forecasts')
const fromArg = process.argv.indexOf('--from')
const from = fromArg > -1 ? process.argv[fromArg + 1] : '2023-12'

function splitLine(line) {
  const out = []
  let cur = ''
  let q = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (q) {
      if (ch === '"') { if (line[i + 1] === '"') { cur += '"'; i++ } else q = false } else cur += ch
    } else if (ch === ',') { out.push(cur); cur = '' } else if (ch === '"') q = true
    else cur += ch
  }
  out.push(cur)
  return out.map((s) => s.trim())
}

const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0 }
const round1 = (n) => Number(n.toFixed(1))
const band = (x) => (x >= 200 ? 'high' : x >= 50 ? 'medium' : 'low')

function readMatrix(file) {
  const lines = fs.readFileSync(file, 'utf-8').split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return null
  const header = splitLine(lines[0])
  const rows = lines.slice(1).map(splitLine)
  const cols = header.map((h, i) => ({ h, i })).filter((c) => c.i > 0 && c.h && !/^unnamed/i.test(c.h))
  return { cols, rows }
}

const periods = fs.readdirSync(archiveDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{4}-\d{2}$/.test(d.name) && d.name >= from)
  .map((d) => d.name)
  .sort()

fs.mkdirSync(outDir, { recursive: true })
let prev = null
let last = null
for (const period of periods) {
  const file = path.join(archiveDir, period, 'forecasts_h6.csv')
  if (!fs.existsSync(file)) continue
  const m = readMatrix(file)
  if (!m) continue
  const get = (r, i) => num((m.rows[Math.min(r, m.rows.length - 1)] || [])[i])
  const entities = m.cols.map(({ h, i }) => {
    const v1 = round1(get(0, i)), v3 = round1(get(2, i)), v6 = round1(get(5, i))
    const id = h.toUpperCase()
    const p = prev ? prev.get(id) : undefined
    return {
      id,
      name: h,
      entityType: 'country',
      index: v1,
      band: band(v1),
      confidence: null,
      deltaMoM: p !== undefined ? round1(v1 - p) : 0,
      deltaYoY: 0,
      horizons: {
        '1m': { index: v1, p10: null, p50: v1, p90: null },
        '3m': { index: v3, p10: null, p50: v3, p90: null },
        '6m': { index: v6, p10: null, p50: v6, p90: null },
      },
      drivers: [],
    }
  })
  const metaFile = path.join(archiveDir, period, 'metadata.json')
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {}
  const snapshot = { version: '2.0', generatedAt: meta.model_run_at || null, period, statistic: 'source_point_forecast', uncertainty: 'See archive metadata; p50 is a legacy field name for the point forecast, not a documented median. No percentile bounds or confidence scores are inferred.', entities }
  fs.writeFileSync(path.join(outDir, `${period}.json`), JSON.stringify(snapshot, null, 2))
  prev = new Map(entities.map((e) => [e.id, e.index]))
  last = snapshot
}

if (!last) { console.error('No archive periods found'); process.exit(1) }
fs.writeFileSync(path.join(outDir, 'latest.json'), JSON.stringify(last, null, 2))
console.log(`Built ${periods.length} snapshots; latest ${last.period} (${last.entities.length} entities)`)
