import type { Metadata } from 'next'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Insurance & reinsurance',
  description: 'Sub-national (0.5°) forecasts of political violence to inform SRCC and political-violence underwriting and accumulation.',
}

export default function Insurance() {
  return (
    <SolutionPage
      eyebrow="Solutions · Insurance & reinsurance"
      title="Location-level forecasts of political violence for underwriting and accumulation."
      lead="Grid forecasts at 0.5° (about 55 km), 1–6 months ahead, to inform SRCC and political-violence risk selection, pricing discussions and aggregate monitoring."
      challenge={[
        'Strikes, riots and civil commotion cluster in space and time, and risk can change quickly within a country. Country ratings are too coarse to see which cities, ports or regions are deteriorating.',
        'Underwriters and accumulation managers need a forward-looking view at the level where the exposure sits, with an honest sense of how uncertain it is.',
      ]}
      provides={[
        'Forecast grid covering the world at 0.5° resolution, updated monthly',
        'Six monthly horizons per cell, plus country-level forecasts for context',
        'Country detail views to place a location in its national picture',
        'A versioned archive of past releases for look-back and portfolio review',
      ]}
      usage={[
        { title: 'Risk selection and pricing context', text: 'Compare forecast levels at a risk location with its surroundings and national trend as one input to underwriting discussions.' },
        { title: 'Accumulation monitoring', text: 'Overlay forecast risk on your location schedule to see where exposure is concentrated in areas trending upward.' },
        { title: 'Renewal and treaty review', text: 'Review how forecast risk evolved over past releases for the regions in a portfolio ahead of renewals.' },
      ]}
      delivery={[
        'Interactive grid map for analysts',
        'Cell-level CSV and JSON files for loading into your own models',
        'Matching your location schedule to forecast cells, on request',
        'Output formats adapted to your tools, on request',
      ]}
      notClaimed="Luscint forecasts are an additional information source, not a pricing model or a substitute for underwriting judgement, and we do not claim they predict insured loss. We are glad to work with your team to evaluate their usefulness against your own claims and event history."
      relatedHref="/forecasts-grid"
      relatedLabel="Explore the grid map"
    />
  )
}
