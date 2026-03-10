import { useState } from 'react';
import { IconUserHeart } from '@tabler/icons-react';
import DoctorsSection from '../components/DoctorsSection';
import AppointmentModal from '../components/AppointmentModal';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd, buildPageMeta, doctorsJsonLd } from '../lib/seo';

export default function DoctorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<{
    doctorId?: string;
    doctorName?: string;
    department?: string;
  } | undefined>(undefined);
  const meta = buildPageMeta('/doctors');

  const handleBookAppointment = (doctor: any) => {
    setPrefillData({
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department.name,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Doctors', path: '/doctors' },
          ]),
          ...doctorsJsonLd(),
        ]}
      />
      <PageHero
        title="Meet Our Specialists"
        subtitle="A dedicated team of expert doctors committed to delivering the highest standard of personalised care."
        tag="Our Doctors"
        icon={IconUserHeart}
        iconColor="#8B5CF6"
        accentColor="#8B5CF6"
        breadcrumb={[{ label: 'Doctors' }]}
      />
      <DoctorsSection onBookAppointment={handleBookAppointment} />
      <PageNavigation />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setPrefillData(undefined); }}
        prefillData={prefillData}
      />
    </>
  );
}
