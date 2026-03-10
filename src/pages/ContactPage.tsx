import { IconPhone } from '@tabler/icons-react';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd, buildPageMeta, faqJsonLd } from '../lib/seo';

export default function ContactPage() {
  const meta = buildPageMeta('/contact');

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Contact', path: '/contact' },
          ]),
          faqJsonLd(),
        ]}
      />
      <PageHero
        title="Get in Touch"
        subtitle="We're here around the clock — reach out for appointments, queries, or emergency assistance."
        tag="Contact Us"
        icon={IconPhone}
        iconColor="#F59E0B"
        accentColor="#F59E0B"
        breadcrumb={[{ label: 'Contact' }]}
      />
      <ContactSection />
      <FAQSection />
      <CTASection />
      <PageNavigation />
    </>
  );
}
