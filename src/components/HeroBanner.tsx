import heroCollage from '../assets/hero-collage.svg';
import { scrollToSection } from '../utils/scroll';

interface HeroBannerProps {
  onAppointmentClick: () => void;
}

export default function HeroBanner({ onAppointmentClick }: HeroBannerProps) {
  return (
    <section id="hero" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Left content */}
        <div className="flex flex-col gap-5 md:gap-6 w-full lg:max-w-[520px]">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 w-fit"
            style={{ backgroundColor: 'var(--color-bg-orange-light)' }}
          >
            <span
              className="w-2 h-2 rounded-full inline-block flex-shrink-0"
              style={{ backgroundColor: 'var(--color-brand-orange)' }}
            />
            <span
              className="text-[11px] sm:text-[13px] font-semibold tracking-[0.05em] uppercase"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
            >
              Nizamabad's Premier Hospital
            </span>
          </div>

          <h1
            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-extrabold leading-[1.15] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            World-Class{' '}
            <span style={{ color: 'var(--color-brand-orange)' }}>Speciality</span>{' '}
            Medical Care
          </h1>

          <p
            className="text-[14px] sm:text-[15px] font-medium leading-[1.7] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            R.P Super Speciality Hospital offers comprehensive healthcare with
            state-of-the-art technology, expert specialists, and a compassionate
            approach — all under one roof.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2">
            <button
              onClick={onAppointmentClick}
              className="rounded-[8px] px-6 sm:px-7 py-4 text-[14px] sm:text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all min-h-[48px]"
              style={{
                fontFamily: 'var(--font-manrope)',
                backgroundColor: 'var(--color-brand-orange)',
                color: '#ffffff',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d97a0e')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-brand-orange)')}
            >
              Book Appointment
            </button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="text-[14px] sm:text-[15px] font-semibold underline-offset-2 hover:underline transition-colors text-center sm:text-left py-3 sm:py-0"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Our Services →
            </a>
          </div>
        </div>

        {/* Right: hero image collage */}
        <div className="w-full lg:flex-1 max-w-[500px] lg:max-w-none">
          <img
            src={heroCollage}
            alt="Medical professionals at R.P Super Speciality Hospital"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
