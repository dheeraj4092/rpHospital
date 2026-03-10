import { IconShieldLock } from '@tabler/icons-react';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd } from '../lib/seo';

const LAST_UPDATED = 'March 10, 2026';

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'When you use our website or book an appointment, we may collect the following personal information:',
      '• **Name, phone number, and email address** — provided when filling the appointment booking form.',
      '• **Health-related information** — including symptoms, department preference, or doctor requested, solely to facilitate your consultation.',
      '• **Usage data** — such as browser type, pages visited, and time spent on the site, collected automatically via analytics tools to improve our services.',
      'We do not collect financial information (e.g. credit/debit card details) through this website.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'The information collected is used exclusively to:',
      '• Schedule and confirm appointments with our medical staff.',
      '• Contact you regarding your appointment, follow-up care, or hospital services.',
      '• Improve the performance and usability of our website.',
      '• Comply with applicable legal and regulatory obligations.',
      'We do not use your personal information for unsolicited marketing communications.',
    ],
  },
  {
    title: '3. Sharing of Information',
    body: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'Your information may be shared with:',
      '• **Treating physicians and hospital staff** — only to the extent necessary to provide medical care.',
      '• **Technology service providers** — such as hosting and analytics partners, who are contractually obligated to keep your data confidential.',
      '• **Legal authorities** — only when required by applicable law, court order, or government regulation.',
    ],
  },
  {
    title: '4. Data Security',
    body: [
      'We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, loss, alteration, or disclosure.',
      'All data transmission between your browser and our servers is encrypted using HTTPS/TLS.',
      'Despite our best efforts, no method of electronic transmission or storage is 100% secure. We encourage you to safeguard your personal information and notify us immediately if you suspect any unauthorised use.',
    ],
  },
  {
    title: '5. Cookies',
    body: [
      'Our website uses essential cookies to ensure core functionality and analytics cookies to understand usage patterns. No personally identifiable information is stored in cookies.',
      'You may configure your browser to refuse cookies; however, certain features of the website may not function correctly if cookies are disabled.',
    ],
  },
  {
    title: '6. Retention of Data',
    body: [
      'Personal data collected through appointment forms is retained only as long as required to fulfil the purpose for which it was collected, or as mandated by applicable healthcare regulations in India.',
      'Analytics and usage data is retained in anonymised or aggregated form for operational improvement purposes.',
    ],
  },
  {
    title: '7. Your Rights',
    body: [
      'You have the right to:',
      '• **Access** the personal data we hold about you.',
      '• **Correct** inaccurate or incomplete information.',
      '• **Request deletion** of your personal data, subject to legal or medical record-keeping requirements.',
      '• **Withdraw consent** for processing at any time, where processing is based on consent.',
      'To exercise any of these rights, please contact us using the details below.',
    ],
  },
  {
    title: '8. Third-Party Links',
    body: [
      'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.',
    ],
  },
  {
    title: '9. Changes to This Policy',
    body: [
      'We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised "Last Updated" date. Continued use of our website after changes constitutes your acceptance of the updated policy.',
    ],
  },
  {
    title: '10. Contact Us',
    body: [
      'If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us:',
      '• **Hospital:** RP Super Speciality Hospital, Nizamabad, Telangana, India',
      '• **Email:** contact@rphospital.com',
      '• **Phone:** +91-98765-43210',
    ],
  },
];

function renderLine(line: string, idx: number) {
  // Bold text between ** **
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | RP Super Speciality Hospital"
        description="Learn how RP Super Speciality Hospital collects, uses, and protects your personal information."
        canonicalPath="/privacy-policy"
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Privacy Policy', path: '/privacy-policy' },
          ]),
        ]}
      />
      <PageHero
        title="Privacy Policy"
        subtitle="We are committed to protecting your personal information and your right to privacy."
        tag="Legal"
        icon={IconShieldLock}
        iconColor="#3B82F6"
        accentColor="#3B82F6"
        breadcrumb={[{ label: 'Privacy Policy' }]}
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
            RP Super Speciality Hospital ("we", "our", or "us") respects your privacy and is committed to
            handling your personal information responsibly. This Privacy Policy explains what information we
            collect when you visit our website or use our services, how we use it, and the choices you have.
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
