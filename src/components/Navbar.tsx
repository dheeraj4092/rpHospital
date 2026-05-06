import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HospitalLogo from './HospitalLogo';
import { scrollToSection, scrollToTop } from '../utils/scroll';

const navLinks = [
  { label: 'About us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Doctors', id: 'doctors' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contacts', id: 'contacts' },
  { label: 'Book Appointment', id: 'appointment' },
  
];

interface NavbarProps {
  onAppointmentClick: () => void;
}

export default function Navbar({ onAppointmentClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 transition-all duration-300"
      animate={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,1)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(26,36,114,0.10)'
          : '0 1px 0 rgba(0,0,0,0.06)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="flex-shrink-0 z-50"
          onClick={(e) => { e.preventDefault(); scrollToTop(); }}
        >
          <HospitalLogo height={40} />
        </a>

        {/* Hamburger - Mobile */}
        <button
          className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-6 h-0.5 rounded-full block"
            style={{ backgroundColor: 'var(--color-brand-navy)' }}
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-0.5 rounded-full block"
            style={{ backgroundColor: 'var(--color-brand-navy)' }}
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-6 h-0.5 rounded-full block"
            style={{ backgroundColor: 'var(--color-brand-navy)' }}
          />
        </button>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-[14px] font-semibold leading-none tracking-[-0.01em] no-underline transition-colors block py-2"
                style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-brand-navy)')}
              >
                {link.label}
              </a>
              {/* Hover underline */}
              <span
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ backgroundColor: 'var(--color-brand-orange)' }}
              />
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.button
          onClick={onAppointmentClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:block rounded-[10px] px-5 xl:px-6 py-3 text-[14px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer"
          style={{
            fontFamily: 'var(--font-manrope)',
            backgroundColor: 'var(--color-brand-orange)',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(247,148,29,0.35)',
          }}
        >
          Make Appointment
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t"
            style={{ borderColor: 'rgba(26,36,114,0.08)', backgroundColor: 'rgba(255,255,255,0.98)' }}
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[16px] font-semibold leading-none no-underline block py-3 px-4 rounded-lg hover:bg-[#F0F4FF] transition-colors"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => { setIsMenuOpen(false); onAppointmentClick(); }}
                className="mt-3 rounded-[10px] px-6 py-4 text-[16px] font-bold leading-none border-none cursor-pointer w-full"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  backgroundColor: 'var(--color-brand-orange)',
                  color: '#ffffff',
                }}
              >
                Make Appointment
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
