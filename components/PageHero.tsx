import type { ReactNode } from 'react'

export default function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: ReactNode }) {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300 mb-4">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl text-white max-w-3xl leading-[1.1]">{title}</h1>
        {lead && <p className="mt-5 text-lg md:text-xl text-slate-300 max-w-2xl">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
