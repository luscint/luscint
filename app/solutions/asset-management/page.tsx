import type { Metadata } from 'next'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Asset management',
  description: 'Country-level conflict forecasts 1–6 months ahead, with uncertainty, to monitor and size political-violence risk in portfolios.',
}

export default function AssetManagement() {
  return (
    <SolutionPage
      eyebrow="Solutions · Asset management"
      title="See escalation risk in the countries you hold before it is priced in."
      lead="Monthly country forecasts of political violence, 1–6 months ahead, with uncertainty bounds — built to sit alongside your own risk process."
      challenge={[
        'Conflict and unrest are low-frequency, high-impact risks. They are hard to monitor across dozens of markets and are often recognised only after prices have moved.',
        'Ratings and news alerts tell you where things are bad now. Risk committees also need to know where they are likely to get worse, how confident that view is, and when it changed.',
      ]}
      provides={[
        'Forecasts for 130+ countries, updated monthly, 1–6 months ahead (extended horizons on request)',
        'Uncertainty bounds, so you can separate a likely escalation from a possible one',
        'Month-on-month change and rankings to focus attention on the movers',
        'A versioned archive of past releases, so you can study how forecasts evolved',
        'Country detail pages with the forecast path and comparable past episodes',
      ]}
      usage={[
        { title: 'Watchlist and escalation flags', text: 'Rank holdings by forecast risk and change; flag countries crossing thresholds you define, for review at your next risk meeting.' },
        { title: 'Limits and stress tests', text: 'Use forecast paths and their uncertainty as an input when setting country limits or designing political-violence stress scenarios.' },
        { title: 'Research input', text: 'Load the data into your own models and test whether it adds information for your universe, horizon and instruments.' },
      ]}
      delivery={[
        'Dashboard for analysts and risk committees',
        'CSV and JSON files you can load in Excel, Python or R',
        'Point-in-time history for backtesting your own use cases',
        'Mapping forecasts to your holdings or lists of locations, on request',
      ]}
      notClaimed="Luscint forecasts are not trading signals and we make no claims about returns. Their purpose is earlier, better-quantified awareness of conflict risk. How much that is worth depends on your portfolio, and we encourage you to test it on your own data — we will support that."
      relatedHref="/forecasts"
      relatedLabel="Explore live forecasts"
    />
  )
}
