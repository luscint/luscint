#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve('out')
const base = process.env.BASE_PATH || '/luscint'
const missing = new Set()
let checked = 0
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8')
      for (const [, href] of html.matchAll(/href="([^"\s]+)"/g)) {
        if (!href.startsWith('/') || href.startsWith('//')) continue
        let pathname = decodeURIComponent(href.split(/[?#]/)[0])
        if (pathname === base || pathname.startsWith(`${base}/`)) pathname = pathname.slice(base.length)
        const target = path.join(root, pathname)
        checked++
        if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) missing.add(`${path.relative(root, file)}: ${href}`)
      }
    }
  }
}
walk(root)
if (missing.size) {
  console.error([...missing].join('\n'))
  process.exit(1)
}
console.log(`Export link check passed (${checked} internal page and asset links).`)
