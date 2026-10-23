import Link from 'next/link'
import { qualityNotice, readProvenance } from '@/lib/forecast-provenance'

export default function ForecastProvenance({ period }: { period: string }) {
  const meta = readProvenance(period)
  const notice = qualityNotice(period)
  const date = (value?: string | null) => value ? value.slice(0, 10) : 'Not documented'
  return (
    <div className="my-5 space-y-3 text-sm text-slate-600">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><dt className="font-medium text-slate-800">Observations through</dt><dd>{meta.data_end_date || 'Not documented'}</dd></div>
        <div><dt className="font-medium text-slate-800">Model run date</dt><dd>{date(meta.model_run_at)}</dd></div>
        <div><dt className="font-medium text-slate-800">Archive import date</dt><dd>{date(meta.archive_imported_at)}</dd></div>
        <div><dt className="font-medium text-slate-800">Original publication date</dt><dd>{date(meta.published_at)}</dd></div>
      </dl>
      <p>Forecast months are measured from the observation cutoff, not from today. An archive import date does not establish when a forecast was first available. <Link href="/data#provenance" className="text-link">Dates, provenance and uncertainty</Link>.</p>
      {notice && <p className="rounded border border-amber-200 bg-amber-50 p-3 text-amber-950"><strong>Source data under review.</strong> {notice}</p>}
    </div>
  )
}
