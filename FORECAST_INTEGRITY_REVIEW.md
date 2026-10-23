# Immediate content and data integrity fixes — 23 October 2026

## Findings and disposition

- The August source CSV itself contains Somalia's first-month estimate of 657,053.3522697054. The dashboard subtraction was arithmetically correct. No source point forecast has been changed. August and September release comparisons are withheld pending source review; the September Iran point estimate of 36,128.702019560405 is also explicitly flagged. Review status and source URLs live in `public/data/forecast-quality.json`.
- The archive importer generated min/max files as point estimate × 0.7/1.3, including overwriting the latest model's actual lower/upper exports. The latest bounds are restored from the existing source mirror. Older synthetic files remain available, prominently labelled as heuristics in the download table and metadata. New historical imports do not invent bounds.
- The snapshot builder fabricated a 75% confidence score, equal p10/p50/p90 values, and a generation date on the first day of the target month. Unknown confidence, percentile bounds and generation dates are now null. `p50` remains a legacy schema name for the source point forecast, explicitly documented as not a verified median.
- Source model runs, archive imports, observation cutoffs, and original publication dates are now distinct. Publication dates and historical observation vintages are unverified. Removed promises of fixed publication times and a verified point-in-time backtest archive.
- Canonical lowercase country links and legacy uppercase exports now coexist. The privacy link respects the GitHub Pages base path. Export link checks guard against missing targets.
- The grid summary used country-model totals and a theoretical 259,200-cell count. It now reads the grid file itself (64,818 cells in the current file) and explicitly separates grid dates and totals from country-model metadata.
- Download bundles were rebuilt to include the corrected metadata and latest bounds. Existing historical archives are preserved by future syncs. Latest source downloads must complete before their metadata is replaced.

## What remains unresolved

The upstream model and its historical backtest process have not been validated by this website repair. The source owner needs to investigate the large Somalia and Iran predictions, confirm units/transforms and model versions, and establish original publication timestamps and observation vintages. No claim of calibrated probabilities or verified real-time historical performance can be made from the current exports alone.

Review status should be cleared only after documenting that investigation; reimporting the same source file is not validation. Forecast values remain visible so the issue is not concealed.

## Verification

- `node scripts/check-forecast-integrity.cjs`: source dates, heuristic labelling, missing uncertainty, source bounds, matching bundle metadata, comparison gating, raw monthly values and URL normalization.
- Production static export with `/luscint` base path, including both uppercase and lowercase country routes.
- `node scripts/check-export-links.cjs`: exported internal links and assets.
- `git diff --check`.

These checks validate website handling and presentation, not forecast skill or model calibration.
