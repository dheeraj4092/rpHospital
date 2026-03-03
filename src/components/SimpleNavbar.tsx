import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HospitalLogo from './HospitalLogo';
import { scrollToTop } from '../utils/scroll';

interface SimpleNavbarProps {
  onAppointmentClick: () => void;
}

export default function SimpleNavbar({ onAppointmentClick }: SimpleNavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(26,36,114,0.10)'
          : '0 1px 0 rgba(0,0,0,0.06)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-3 px-3 sm:px-6 md:px-10 lg:px-20 py-3 sm:py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="flex-shrink-0"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
        >
          <div className="h-9 sm:h-10">
            <HospitalLogo height={36} />
          </div>
        </a>

        {/* CTA Button */}
        <motion.button
          onClick={onAppointmentClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-[8px] sm:rounded-[10px] px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 text-[11px] sm:text-[14px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-manrope)',
            backgroundColor: 'var(--color-brand-orange)',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(247,148,29,0.35)',
          }}
        >
          <span className="hidden sm:inline">Make Appointment</span>
          <span className="sm:hidden">Book Now</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
