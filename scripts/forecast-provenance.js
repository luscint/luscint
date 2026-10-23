/** Metadata describes what we can establish, without inventing issue dates or coverage. */
function sourceMetadata(meta, importedAt) {
  return {
    ...meta,
    provenance_kind: 'source_export',
    model_run_at: meta.model_run_at || meta.run_date || null,
    archive_imported_at: importedAt,
    published_at: meta.published_at || null,
    publication_status: meta.published_at ? 'documented' : 'unverified',
    bounds_kind: 'source_provided',
    bounds_note: 'Lower and upper outputs supplied by the source model. No calibrated coverage probability is documented.',
    history_vintage: 'Source history supplied with this export; availability of each observation at the forecast issue date is not verified.',
  }
}

function historicalMetadata(meta, importedAt) {
  const heuristic = /30%/.test(meta.note || '')
  const { run_date, ...rest } = meta
  return {
    ...rest,
    provenance_kind: 'historical_archive_unverified',
    model_run_at: meta.model_run_at || null,
    archive_imported_at: meta.archive_imported_at || importedAt || run_date || null,
    published_at: meta.published_at || null,
    publication_status: meta.published_at ? 'documented' : 'unverified',
    bounds_kind: meta.bounds_kind || (heuristic ? 'heuristic_30_percent' : 'unavailable'),
    bounds_note: heuristic
      ? 'Legacy min/max files are the point forecast multiplied by 0.7 and 1.3. These are heuristic ranges, not model-derived intervals or calibrated uncertainty.'
      : 'No source-provided uncertainty bounds are available for this historical import.',
    history_vintage: 'Historical observations may have been revised after the forecast period. This is not a verified point-in-time training dataset.',
  }
}

module.exports = { sourceMetadata, historicalMetadata }
