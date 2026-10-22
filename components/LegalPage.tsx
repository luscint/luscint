import type { ReactNode } from 'react'

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-light text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-10">Last updated {updated}</p>
        <div className="space-y-6 text-gray-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-gray-900 [&_h2]:pt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_a]:text-brand-blue [&_a]:underline">
          {children}
        </div>
      </div>
    </section>
  )
}
