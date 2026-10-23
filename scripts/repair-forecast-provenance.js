#!/usr/bin/env node
// One-time, idempotent repair of legacy import timestamps and heuristic labels.
// Forecast values are preserved. Latest source bounds replace only the overwritten
// bounds for the matching latest archive period; historical heuristics stay labelled.
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { sourceMetadata, historicalMetadata } = require('./forecast-provenance')
const root = path.join(process.cwd(), 'public/data/forecasts')
const latestDir = path.join(root, 'latest')
const latest = JSON.parse(fs.readFileSync(path.join(latestDir, 'metadata.json'), 'utf8'))
const latestPeriod = latest.forecast_start_date
const latestArchive = path.join(root, 'archive', latestPeriod)
const oldArchive = JSON.parse(fs.readFileSync(path.join(latestArchive, 'metadata.json'), 'utf8'))
const repairedLatest = sourceMetadata(latest, latest.archive_imported_at || oldArchive.archive_imported_at || oldArchive.run_date)
for (const file of fs.readdirSync(latestDir).filter(f => /^forecasts_h(6|12)(_min|_max)?\.csv$/.test(f))) {
  // Do not silently replace a point forecast from a different source version.
  if (!/_min|_max/.test(file) && fs.readFileSync(path.join(latestDir, file), 'utf8') !== fs.readFileSync(path.join(latestArchive, file), 'utf8')) {
    throw new Error(`Latest/archive point forecasts differ: ${file}; review before repair`)
  }
  fs.copyFileSync(path.join(latestDir, file), path.join(latestArchive, file))
}
fs.writeFileSync(path.join(latestDir, 'metadata.json'), JSON.stringify(repairedLatest, null, 2) + '\n')
for (const period of fs.readdirSync(path.join(root, 'archive')).filter(p => /^\d{4}-\d{2}$/.test(p))) {
  const dir = path.join(root, 'archive', period)
  const file = path.join(dir, 'metadata.json')
  const old = JSON.parse(fs.readFileSync(file, 'utf8'))
  const meta = period === latestPeriod ? repairedLatest : historicalMetadata(old)
  fs.writeFileSync(file, JSON.stringify(meta, null, 2) + '\n')
  // Keep downloadable bundles consistent with their individual files.
  const files = fs.readdirSync(dir).filter(f => /\.(csv|json)$/.test(f))
  execFileSync('zip', ['-q', `forecasts-${period}.zip`, ...files], { cwd: dir })
}
console.log('Repaired archive provenance and bundles; restored latest source-provided bounds.')
