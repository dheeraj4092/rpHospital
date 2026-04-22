import { IconFileText } from '@tabler/icons-react';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd } from '../lib/seo';

const LAST_UPDATED = 'March 10, 2026';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing and using the RP Super Speciality Hospital website (www.rphospitals.in), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.',
      'If you do not agree with any part of these terms, please discontinue use of the website immediately.',
    ],
  },
  {
    title: '2. Use of the Website',
    body: [
      'This website is intended solely for informational purposes and to facilitate appointment booking at RP Super Speciality Hospital.',
      'You agree not to:',
      '• Use the website for any unlawful purpose or in a way that violates applicable laws or regulations.',
      '• Attempt to gain unauthorised access to any part of the website or its underlying infrastructure.',
      '• Transmit any harmful, offensive, or disruptive content through the website.',
      '• Use automated tools (bots, scrapers) to extract content or data from the website without prior written consent.',
    ],
  },
  {
    title: '3. Medical Disclaimer',
    body: [
      'The content on this website — including text, images, and descriptions of services — is provided for **general informational purposes only** and does not constitute medical advice, diagnosis, or treatment.',
      'Always consult a qualified healthcare professional regarding any medical condition, medication, or treatment plan. Never disregard professional medical advice or delay seeking it based on information found on this website.',
      'In a medical emergency, please call emergency services (108) or visit the nearest hospital immediately.',
    ],
  },
  {
    title: '4. Appointment Booking',
    body: [
      'Submitting an appointment request through our website does **not** constitute a confirmed appointment. All bookings are subject to availability and confirmation by our hospital staff.',
      'We will contact you via the phone number or email provided to confirm, reschedule, or cancel an appointment.',
      'Please arrive at least 15 minutes before your scheduled appointment time. Failure to attend without prior notice may result in your appointment slot being forfeited.',
      'The hospital reserves the right to reschedule or cancel appointments in case of unforeseen emergencies or unavailability of the requested doctor.',
    ],
  },
  {
    title: '5. Intellectual Property',
    body: [
      'All content on this website — including the hospital name, logo, text, graphics, images, and software — is the property of RP Super Speciality Hospital and is protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, or commercially exploit any content from this website without prior written permission.',
    ],
  },
  {
    title: '6. Third-Party Links',
    body: [
      'Our website may contain links to third-party websites for your convenience. We have no control over the content, privacy practices, or availability of those sites.',
      'The inclusion of any third-party link does not imply endorsement or recommendation by RP Super Speciality Hospital.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, RP Super Speciality Hospital shall not be liable for any direct, indirect, incidental, or consequential damages arising from:',
      '• Your use of, or inability to use, the website.',
      '• Errors, omissions, or inaccuracies in website content.',
      '• Any medical decision made based on information available on this website.',
      '• Unauthorised access to or alteration of your personal data.',
    ],
  },
  {
    title: '8. Accuracy of Information',
    body: [
      'We strive to keep the information on this website accurate and up to date. However, we make no warranties — express or implied — as to the completeness, accuracy, or fitness for a particular purpose of any information provided.',
      'Doctor availability, service offerings, and contact information are subject to change without notice.',
    ],
  },
  {
    title: '9. Privacy',
    body: [
      'Your use of this website is also governed by our **Privacy Policy**, which is incorporated into these Terms & Conditions by reference. Please review the Privacy Policy to understand our data practices.',
    ],
  },
  {
    title: '10. Governing Law & Jurisdiction',
    body: [
      'These Terms & Conditions are governed by and construed in accordance with the laws of India.',
      'Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in **Nizamabad, Telangana, India**.',
    ],
  },
  {
    title: '11. Changes to These Terms',
    body: [
      'We reserve the right to modify these Terms & Conditions at any time. Updated terms will be posted on this page with the revised "Last Updated" date.',
      'Continued use of the website after changes are posted constitutes your acceptance of the revised terms.',
    ],
  },
  {
    title: '12. Contact Us',
    body: [
      'For any questions regarding these Terms & Conditions, please reach out to us:',
      '• **Hospital:** RP Super Speciality Hospital, Nizamabad, Telangana, India',
      '• **Email:** contact@rphospital.com',
      '• **Phone:** +91-9032323258',
    ],
  },
];

function renderLine(line: string, idx: number) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p
      key={idx}
      className="text-[14px] sm:text-[15px] font-medium leading-[1.8]"
      style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
    >
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color: 'var(--color-brand-navy)', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms & Conditions | RP Super Speciality Hospital"
        description="Read the Terms & Conditions governing your use of the RP Super Speciality Hospital website and services."
        canonicalPath="/terms"
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Terms & Conditions', path: '/terms' },
          ]),
        ]}
      />
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our website or booking an appointment."
        tag="Legal"
        icon={IconFileText}
        iconColor="#10B981"
        accentColor="#10B981"
        breadcrumb={[{ label: 'Terms & Conditions' }]}
      />

      <section className="bg-white">
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 max-w-[900px] mx-auto">
          {/* Last updated */}
          <p
            className="text-[13px] font-semibold mb-10 pb-6 border-b"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--color-text-muted)',
              borderColor: '#E5E9FF',
            }}
          >
            Last updated: {LAST_UPDATED}
          </p>

          {/* Intro */}
          <p
            className="text-[15px] sm:text-[16px] font-medium leading-[1.8] mb-10"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            Welcome to RP Super Speciality Hospital. These Terms & Conditions govern your access to and use
            of our website and online appointment booking service. By using this website you agree to comply
            with these terms in full.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2
                  className="text-[18px] sm:text-[20px] font-extrabold mb-3"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.body.map((line, idx) => renderLine(line, idx))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageNavigation />
    </>
  );
}
