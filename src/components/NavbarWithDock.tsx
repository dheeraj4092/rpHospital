import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HospitalLogo from './HospitalLogo';
import { FloatingDock } from './ui/floating-dock';
import { scrollToSection, scrollToTop } from '../utils/scroll';
import {
  IconInfoCircle,
  IconStethoscope,
  IconUserHeart,
  IconPhoto,
  IconPhone,
  IconTarget,
  IconAward,
  IconMessage,
  IconHelp,
} from '@tabler/icons-react';

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

  const dockLinks = [
    {
      title: 'About Us',
      icon: (
        <IconInfoCircle className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#about',
    },
    {
      title: 'Mission',
      icon: (
        <IconTarget className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#mission',
    },
    {
      title: 'Services',
      icon: (
        <IconStethoscope className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#services',
    },
    {
      title: 'Why Choose Us',
      icon: (
        <IconAward className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#highlights',
    },
    {
      title: 'Doctors',
      icon: (
        <IconUserHeart className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#doctors',
    },
    {
      title: 'Gallery',
      icon: (
        <IconPhoto className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#gallery',
    },
    {
      title: 'Testimonials',
      icon: (
        <IconMessage className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#testimonials',
    },
    {
      title: 'FAQ',
      icon: (
        <IconHelp className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#faq',
    },
    {
      title: 'Contact',
      icon: (
        <IconPhone className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#contacts',
    },
  ];

  // Add click handler to dock links
  const enhancedDockLinks = dockLinks.map(link => ({
    ...link,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const sectionId = link.href.replace('#', '');
      scrollToSection(sectionId);
    }
  }));

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

        {/* Desktop Floating Dock Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <FloatingDock
            items={enhancedDockLinks}
            desktopClassName="border shadow-lg"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderColor: 'rgba(26,36,114,0.1)',
            }}
          />
        </div>

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
              {dockLinks.map((link, i) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href.replace('#', ''))}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[16px] font-semibold leading-none no-underline block py-3 px-4 rounded-lg hover:bg-[#F0F4FF] transition-colors flex items-center gap-3"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  <div className="w-5 h-5">{link.icon}</div>
                  {link.title}
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
