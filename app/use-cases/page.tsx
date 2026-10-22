import useCasesData from '@/content/use-cases.json'

export default function UseCases() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 hero-background-network-image">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 leading-tight">
            Use Cases
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Built for organizations across finance, insurance, and humanitarian sectors, our <span className="word-highlight">predictive intelligence</span> helps anticipate geopolitical risks and make informed decisions.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCasesData.sectors.map((sector, index) => (
              <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-light text-gray-900">{sector.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{sector.useCase}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{sector.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '1–6', label: 'Months ahead' },
              { value: 'Monthly', label: 'Forecast updates' },
              { value: '0.5°', label: 'Sub-national grid' },
              { value: 'Open', label: 'Data and methods' },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <div className="text-3xl font-light text-brand-blue mb-2">{f.value}</div>
                <div className="text-gray-600 text-sm">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </>
  )
}
