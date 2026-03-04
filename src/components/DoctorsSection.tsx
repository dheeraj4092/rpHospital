import MedicalCrossIcon from '../assets/icon-medical-cross.svg?react';
import { doctors, type Doctor } from '../data/doctors';
import ExpandableDoctorCards from './ui/expandable-doctor-cards';

interface DoctorsSectionProps {
  onBookAppointment?: (doctor: Doctor) => void;
}

export default function DoctorsSection({ onBookAppointment }: DoctorsSectionProps) {
  return (
    <section id="doctors" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MedicalCrossIcon
              className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px]"
              style={{ fill: 'var(--color-brand-orange)' }}
            />
            <span
              className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
            >
              Our Doctors
            </span>
          </div>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4 px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Meet Our Specialist Doctors
          </h2>
          <p
            className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            Our team of specialist doctors is dedicated to providing expert care
            across a wide range of medical fields. Click on any doctor to learn more.
          </p>
        </div>

        {/* Doctor cards with expandable functionality */}
        <ExpandableDoctorCards doctors={doctors} onBookAppointment={onBookAppointment} />
      </div>
    </section>
  );
}
