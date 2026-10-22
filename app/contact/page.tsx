'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import companyData from '@/content/company.json'
import PageHero from '@/components/PageHero'

// Set NEXT_PUBLIC_FORM_ENDPOINT to a Formspree/Web3Forms-style URL (accepts a JSON POST) to
// deliver submissions by email. Without it the form opens the visitor's mail client instead,
// so a message is never silently dropped.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || ''

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

const interests = [
  { value: 'asset-management', label: 'Asset management / investment risk' },
  { value: 'insurance', label: 'Insurance & reinsurance' },
  { value: 'public-sector', label: 'Government, NGO or humanitarian' },
  { value: 'data-licence', label: 'Commercial data licence' },
  { value: 'custom-signals', label: 'Custom signals / bespoke model' },
  { value: 'other', label: 'Something else' },
]

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    if (data.website) return // honeypot: real visitors never fill this in

    const summary = [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Organisation: ${data.company}`,
      `Interest: ${interests.find((i) => i.value === data.interest)?.label ?? data.interest}`,
      '',
      data.message || '',
    ].join('\n')

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Luscint enquiry from ${data.company}`)
      window.location.href = `mailto:${companyData.contact.email}?subject=${subject}&body=${encodeURIComponent(summary)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `Luscint enquiry from ${data.company}`, message: summary }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const input =
    'w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-brand-blue focus:border-brand-blue'

  return (
    <>
      <PageHero eyebrow="Contact" title="Request a demo" lead="Tell us what you need to monitor and we will show you the forecasts, data and delivery options that fit. We reply personally, usually within one working day." />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {status === 'sent' ? (
              <div className="text-center py-12" role="status">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-lg font-medium text-gray-900 mb-2">Thank you — message received</h2>
                <p className="text-gray-600">We will be in touch shortly.</p>
              </div>
            ) : status === 'mailto' ? (
              <div className="py-8" role="status">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Your email app should have opened</h2>
                <p className="text-gray-600">
                  Press send there to complete your request. If nothing opened, write to{' '}
                  <a className="text-link" href={`mailto:${companyData.contact.email}`}>{companyData.contact.email}</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First name *</label>
                    <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className={input} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last name *</label>
                    <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className={input} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Work email *</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={input} />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Organisation *</label>
                  <input id="company" name="company" type="text" required autoComplete="organization" className={input} />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">I am interested in *</label>
                  <select id="interest" name="interest" required defaultValue="" className={input}>
                    <option value="" disabled>Please select…</option>
                    {interests.map((i) => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">What are you looking to monitor?</label>
                  <textarea id="message" name="message" rows={5} className={input} />
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 text-sm text-red-800 bg-red-50 border border-red-200 rounded p-3" role="alert">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>
                      Something went wrong sending your message. Please email{' '}
                      <a className="underline" href={`mailto:${companyData.contact.email}`}>{companyData.contact.email}</a> directly.
                    </span>
                  </div>
                )}

                <button type="submit" disabled={status === 'sending'} className="btn-primary flex items-center disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send request'}
                  <Send className="ml-2" size={16} />
                </button>

                <p className="text-xs text-gray-500">
                  We use your details only to reply to your enquiry. See our <a className="underline" href="/legal/privacy">privacy notice</a>.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-8 text-sm text-gray-600">
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-2">Email</h2>
              <a className="text-link" href={`mailto:${companyData.contact.email}`}>{companyData.contact.email}</a>
            </div>
            <div>
              <h2 className="text-base font-medium text-gray-900 mb-2">What we can cover</h2>
              <ul className="space-y-1">
                <li>A walkthrough of the live forecasts</li>
                <li>Data licensing and delivery (API, CSV)</li>
                <li>Mapping forecasts to your holdings or locations</li>
                <li>Adding signals relevant to your portfolio</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
