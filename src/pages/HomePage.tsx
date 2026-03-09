import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import LogoSection from '../components/LogoSection';
import AppointmentModal from '../components/AppointmentModal';
import PageNavigation from '../components/PageNavigation';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <HeroBanner
        onAppointmentClick={() => setIsModalOpen(true)}
        onServicesClick={() => navigate('/services')}
      />
      <LogoSection />
      <PageNavigation />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
