import { IconStethoscope } from '@tabler/icons-react';
import ServicesSection from '../components/ServicesSection';
import CTASection from '../components/CTASection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd, buildPageMeta } from '../lib/seo';

export default function ServicesPage() {
  const meta = buildPageMeta('/services');

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
          ]),
        ]}
      />
      <PageHero
        title="Our Medical Services"
        subtitle="From preventive care to complex surgeries, our specialists are equipped to handle every medical need with precision."
        tag="Specializations"
        icon={IconStethoscope}
        iconColor="#10B981"
        accentColor="#10B981"
        breadcrumb={[{ label: 'Services' }]}
      />
      <ServicesSection />
      <CTASection />
      <PageNavigation />
    </>
  );
}
