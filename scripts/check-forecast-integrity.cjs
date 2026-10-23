#!/usr/bin/env node
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
const { execFileSync } = require('node:child_process')
const { sourceMetadata, historicalMetadata } = require('./forecast-provenance')

// Load the server-only TS helpers without starting Next or modifying its config.
const cache = new Map()
function load(file) {
  file = path.resolve(file)
  if (cache.has(file)) return cache.get(file).exports
  const module = { exports: {} }
  cache.set(file, module)
  const localRequire = (id) => {
    if (!id.startsWith('.') && !id.startsWith('@/')) return require(id)
    const resolved = id.startsWith('@/') ? path.resolve(id.slice(2)) : path.resolve(path.dirname(file), id)
    return resolved.endsWith('.json') ? JSON.parse(fs.readFileSync(resolved, 'utf8')) : load(resolved.endsWith('.ts') ? resolved : `${resolved}.ts`)
  }
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText
  vm.runInThisContext(`(function(require, module, exports) {${code}\n})`, { filename: file })(localRequire, module, module.exports)
  return module.exports
}

async function main() {
  const old = historicalMetadata({ run_date: '2026-10-22', note: 'estimated at ±30%' })
  assert.equal(old.model_run_at, null)
  assert.equal(old.archive_imported_at, '2026-10-22')
  assert.equal(old.run_date, undefined)
  assert.equal(old.bounds_kind, 'heuristic_30_percent')
  assert.equal(old.published_at, null)
  assert.equal(historicalMetadata({}).bounds_kind, 'unavailable')
  const source = sourceMetadata({ run_date: '2026-10-20' }, '2026-10-23')
  assert.equal(source.model_run_at, '2026-10-20')
  assert.equal(source.archive_imported_at, '2026-10-23')
  assert.equal(source.published_at, null)

  const { comparisonNotice } = load('lib/forecast-provenance.ts')
  assert.ok(comparisonNotice('2026-09', '2026-08'))
  assert.ok(comparisonNotice('2026-10', '2026-09'))
  assert.ok(comparisonNotice('2026-07', '2026-05'))
  assert.ok(comparisonNotice('2026-07'))
  assert.equal(comparisonNotice('2026-07', '2026-06'), null)
  assert.equal(comparisonNotice('2026-01', '2025-12'), null)
  const { forecastUrl } = load('lib/forecast-url.ts')
  assert.equal(forecastUrl('IRAN'), '/forecasts/iran')
  assert.equal(forecastUrl('S. SUDAN'), '/forecasts/s.%20sudan')

  const { getForecastsPageData, getEntityHorizonMonths } = load('lib/forecasts.ts')
  const data = await getForecastsPageData()
  assert.ok(data.comparisonWarning)
  assert.equal(data.summaryStats.deltaTotal, undefined)
  assert.equal(data.movers.length, 0)
  assert.ok(data.rows.every(r => r.deltaMoM === null))
  assert.ok(data.rows.length > 100, 'withheld changes must not hide country forecasts')
  assert.equal(data.rows.find(r => r.name === 'Somalia').pred1m, 299.7)
  assert.equal(data.rows.find(r => r.name === 'Iran').pred1m, 36128.7)
  assert.equal(getEntityHorizonMonths('2026-08', 'Somalia')[0], 657053.3522697054)
  assert.equal(data.snapshot.generatedAt, '2026-10-20T10:30:57.641828')
  assert.ok(data.snapshot.entities.every(e => e.confidence === null && e.horizons['1m'].p10 === null && e.horizons['1m'].p90 === null))

  const root = 'public/data/forecasts'
  for (const period of fs.readdirSync(`${root}/archive`).filter(p => /^\d{4}-\d{2}$/.test(p))) {
    const dir = `${root}/archive/${period}`
    const text = fs.readFileSync(`${dir}/metadata.json`, 'utf8')
    const meta = JSON.parse(text)
    assert.ok(meta.bounds_kind, `${period}: missing bounds provenance`)
    assert.equal(meta.published_at, null, `${period}: no invented publication date`)
    assert.equal(execFileSync('unzip', ['-p', `${dir}/forecasts-${period}.zip`, 'metadata.json'], { encoding: 'utf8' }), text, `${period}: bundle metadata differs`)
  }
  for (const horizon of ['h6', 'h12']) {
    for (const suffix of ['_min', '_max']) {
      const file = `forecasts_${horizon}${suffix}.csv`
      assert.deepEqual(fs.readFileSync(`${root}/latest/${file}`), fs.readFileSync(`${root}/archive/${data.snapshot.period}/${file}`))
    }
  }
  console.log('Forecast integrity checks passed: dates, missing uncertainty, source bounds, archive bundles, comparison gating, monthly values and canonical URLs.')
}
main().catch(error => { console.error(error); process.exit(1) })
