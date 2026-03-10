import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import LogoSection from '../components/LogoSection';
import AppointmentModal from '../components/AppointmentModal';
import PageNavigation from '../components/PageNavigation';
import AboutHospitalSection from '../components/AboutHospitalSection';
import Seo from '../components/ui/Seo';
import {
  buildPageMeta,
  breadcrumbJsonLd,
  doctorsJsonLd,
  faqJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '../lib/seo';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const meta = buildPageMeta('/');

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          organizationJsonLd(),
          websiteJsonLd(),
          breadcrumbJsonLd([{ label: 'Home', path: '/' }]),
          faqJsonLd(),
          ...doctorsJsonLd(),
        ]}
      />
      <HeroBanner
        onAppointmentClick={() => setIsModalOpen(true)}
        onServicesClick={() => navigate('/services')}
      />
      <LogoSection />
      <AboutHospitalSection />
      <PageNavigation />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
