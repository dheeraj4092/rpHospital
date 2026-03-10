import { IconInfoCircle } from '@tabler/icons-react';
import MissionVisionSection from '../components/MissionVisionSection';
import KeyHighlightsSection from '../components/KeyHighlightsSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd, buildPageMeta } from '../lib/seo';

export default function AboutPage() {
  const meta = buildPageMeta('/about');

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
          ]),
        ]}
      />
      <PageHero
        title="About Our Hospital"
        subtitle="Delivering world-class healthcare with compassion and clinical excellence since 2000."
        tag="About Us"
        icon={IconInfoCircle}
        iconColor="#3B82F6"
        accentColor="#3B82F6"
        breadcrumb={[{ label: 'About' }]}
      />
      <MissionVisionSection />
      <KeyHighlightsSection />
      <PageNavigation />
    </>
  );
}
