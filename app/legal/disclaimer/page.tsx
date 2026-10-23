import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Disclaimer — Luscint' }

export default function Disclaimer() {
  return (
    <LegalPage title="Disclaimer" updated="23 October 2026">
      <h2>Not advice</h2>
      <p>
        Luscint forecasts and related content are statistical estimates of future conflict and political-violence levels.
        They are provided for information only. They are <strong>not</strong> investment, financial, insurance, legal,
        security or humanitarian advice, and they are not a recommendation to buy, sell or hold any asset, to underwrite or
        decline any risk, or to take or avoid any action.
      </p>

      <h2>Uncertainty</h2>
      <p>
        Forecasting conflict is inherently uncertain. Forecasts can be wrong, may be revised in later releases, and depend on
        the quality and timeliness of underlying event data. Past performance of any model is not a guide to future results.
        Source-provided lower and upper outputs do not have documented calibrated coverage. Some historical archive ranges are heuristic ±30% estimates, not model-derived uncertainty. Consult each release’s metadata.
      </p>

      <h2>Not for safety-critical use</h2>
      <p>
        Forecasts must not be used as the sole basis for decisions affecting the safety of people. Local, expert and
        operational information should always be consulted.
      </p>

      <h2>No guarantee</h2>
      <p>
        We make no representation or warranty as to the accuracy, completeness or fitness for purpose of any forecast or data,
        and accept no liability for decisions made in reliance on them, to the fullest extent permitted by law.
      </p>
    </LegalPage>
  )
}
