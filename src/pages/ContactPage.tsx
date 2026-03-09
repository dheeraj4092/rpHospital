import { IconPhone } from '@tabler/icons-react';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';

export default function ContactPage() {
  return (
    <>
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
