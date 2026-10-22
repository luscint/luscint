import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Privacy notice — Luscint' }

export default function Privacy() {
  return (
    <LegalPage title="Privacy notice" updated="22 October 2026">
      <p>
        This notice explains how Luscint (&ldquo;we&rdquo;) handles personal data when you use this website or contact us.
        Questions: <a href="mailto:contact@luscint.com">contact@luscint.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Enquiries.</strong> If you use the contact form or email us, we receive the details you give us (name, work email, organisation, your message).</li>
        <li><strong>Server logs.</strong> Our hosting provider may record technical data such as IP address, browser type and pages requested, for security and operation of the service.</li>
      </ul>
      <p>We do not currently run advertising or analytics cookies on this website. If that changes we will update this notice and ask for consent where required.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and, if you ask, to discuss our services (legal basis: our legitimate interest in responding to enquiries, or steps you ask us to take before a contract).</li>
        <li>To keep the website secure and working.</li>
      </ul>
      <p>We do not sell personal data and do not use it for automated decision-making.</p>

      <h2>Sharing and transfers</h2>
      <p>
        We use service providers to host the website and to deliver form submissions and email. They process data on our
        behalf and may do so outside the EEA/UK under appropriate safeguards.
      </p>

      <h2>Retention</h2>
      <p>We keep enquiry correspondence for as long as needed to deal with it and for a reasonable period afterwards, then delete it.</p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct or delete your data, to object to or restrict
        its use, and to complain to your data-protection authority. Contact us at the address above to exercise these rights.
      </p>
    </LegalPage>
  )
}
