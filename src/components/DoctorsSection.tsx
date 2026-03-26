import { doctors, type Doctor } from '../data/doctors';
import ExpandableDoctorCards from './ui/expandable-doctor-cards';

interface DoctorsSectionProps {
  onBookAppointment?: (doctor: Doctor) => void;
  activeDeptId?: string;
}

export default function DoctorsSection({ onBookAppointment, activeDeptId }: DoctorsSectionProps) {
  return (
    <section id="doctors" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Doctor cards with expandable functionality */}
        <ExpandableDoctorCards
          doctors={doctors}
          onBookAppointment={onBookAppointment}
          activeDeptId={activeDeptId}
        />
      </div>
    </section>
  );
}
