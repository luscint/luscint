import type { Metadata } from 'next'
import SolutionPage from '@/components/SolutionPage'

export const metadata: Metadata = {
  title: 'Governments & NGOs',
  description: 'Sub-national early warning of political violence, built on published methods and openly available data.',
}

export default function PublicSector() {
  return (
    <SolutionPage
      eyebrow="Solutions · Governments & NGOs"
      title="Sub-national early warning for planning and pre-positioning."
      lead="Forecasts of political violence at country and 0.5° grid level, 1–6 months ahead — with open methods and data you can inspect, share and build on."
      challenge={[
        'Humanitarian, development and foreign-policy teams must commit people and resources before a crisis is visible in the news, often with limited analytical capacity.',
        'They also need forecasts they can explain to partners and funders — which means transparent methods, not black boxes.',
      ]}
      provides={[
        'Monthly country and sub-national forecasts, 1–6 months ahead',
        'Published methodology, so results can be scrutinised and explained',
        'Free, openly licensed data for non-commercial use (CC BY-NC 4.0)',
        'Forecast paths and comparable past episodes to support scenario discussions',
      ]}
      usage={[
        { title: 'Contingency planning', text: 'Identify areas where risk is rising to inform contingency plans and scenario exercises.' },
        { title: 'Pre-positioning and access planning', text: 'Use sub-national forecasts as one input to decisions about where to place stocks, staff and partners.' },
        { title: 'Briefing and reporting', text: 'Use the dashboard and monthly data to ground briefings in a consistent, transparent forecast.' },
      ]}
      delivery={[
        'Dashboard and open data downloads at no cost for non-commercial use',
        'CSV and JSON for GIS and analysis tools',
        'Custom briefings, regional focus or adapted outputs, on request',
        'Evaluation support for pilots with your own data',
      ]}
      notClaimed="Forecasts are probabilistic and will sometimes be wrong. They are not a substitute for local knowledge, and must not be the sole basis for decisions affecting people’s safety. They are designed to complement field information and expert judgement."
      relatedHref="/data"
      relatedLabel="Get the open data"
    />
  )
}
