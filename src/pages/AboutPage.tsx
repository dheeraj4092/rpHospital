import { IconInfoCircle } from '@tabler/icons-react';
import MissionVisionSection from '../components/MissionVisionSection';
import KeyHighlightsSection from '../components/KeyHighlightsSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';

export default function AboutPage() {
  return (
    <>
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
