import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Terms of use — Luscint' }

export default function Terms() {
  return (
    <LegalPage title="Terms of use" updated="22 October 2026">
      <p>By using this website you agree to these terms. If you do not agree, please do not use it.</p>

      <h2>Information only</h2>
      <p>
        Content and forecasts are provided for general information. They are statistical estimates, not advice of any kind
        (see the <a href="/legal/disclaimer">disclaimer</a>).
      </p>

      <h2>Data licence</h2>
      <p>
        Unless stated otherwise, the downloadable datasets on the <a href="/data">Data</a> page are licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC 4.0</a>:
        you may share and adapt them for non-commercial purposes with attribution. Commercial use requires a separate
        licence &mdash; <a href="/contact">contact us</a>. Our software, text, design and trademarks are not covered by that licence.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the website or data to target, harass or harm any person or group.</li>
        <li>Do not attempt to disrupt the service, scrape it at a rate that degrades it, or bypass any access controls.</li>
        <li>Comply with applicable laws, including sanctions and export rules.</li>
      </ul>

      <h2>No warranty and limits of liability</h2>
      <p>
        The website and data are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind.
        To the fullest extent permitted by law, we are not liable for any loss arising from use of, or reliance on, the website
        or its content. Nothing here limits liability that cannot be limited by law.
      </p>

      <h2>Third-party material</h2>
      <p>
        Maps use third-party basemaps and open datasets, each subject to its own terms and attribution requirements.
        Links to other sites are provided for convenience; we are not responsible for their content.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms; the version on this page applies from the date shown above.</p>
    </LegalPage>
  )
}
