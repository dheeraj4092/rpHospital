import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HospitalLogo from './HospitalLogo';
import {
  IconHome,
  IconInfoCircle,
  IconStethoscope,
  IconUserHeart,
  IconPhoto,
  IconPhone,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';

interface MainNavbarProps {
  onAppointmentClick: () => void;
}

const navLinks = [
  { label: 'Home', path: '/', icon: IconHome, exact: true },
  { label: 'About', path: '/about', icon: IconInfoCircle, exact: false },
  { label: 'Services', path: '/services', icon: IconStethoscope, exact: false },
  { label: 'Doctors', path: '/doctors', icon: IconUserHeart, exact: false },
  { label: 'Gallery', path: '/gallery', icon: IconPhoto, exact: false },
  { label: 'Contact', path: '/contact', icon: IconPhone, exact: false },
];

export default function MainNavbar({ onAppointmentClick }: MainNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: scrolled ? 'rgba(255,255,255,0.94)' : 'rgba(255,255,255,1)',
        boxShadow: scrolled
          ? '0 4px 24px rgba(26,36,114,0.10)'
          : '0 1px 0 rgba(0,0,0,0.06)',
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-3 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 z-50"
          onClick={handleLogoClick}
        >
          <HospitalLogo height={38} />
        </a>

        {/* Desktop Nav — icons + labels always visible */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-2 list-none flex-1 justify-center">
          {navLinks.map(({ label, path, icon: Icon, exact }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={exact}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-2 px-3 xl:px-4 py-2 rounded-[10px] text-[13px] xl:text-[14px] font-semibold no-underline transition-all duration-200 group',
                    isActive
                      ? 'text-white'
                      : 'hover:bg-[#F0F4FF]',
                  ].join(' ')
                }
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-manrope)',
                  color: isActive ? '#ffffff' : 'var(--color-brand-navy)',
                  backgroundColor: isActive ? 'var(--color-brand-navy)' : undefined,
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      style={{
                        color: isActive ? '#F7941D' : 'var(--color-brand-navy)',
                        transition: 'color 0.2s',
                      }}
                      stroke={isActive ? 2.2 : 1.8}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <motion.button
          onClick={onAppointmentClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:flex items-center gap-2 rounded-[10px] px-4 xl:px-6 py-2.5 xl:py-3 text-[13px] xl:text-[14px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer whitespace-nowrap flex-shrink-0"
          style={{
            fontFamily: 'var(--font-manrope)',
            backgroundColor: 'var(--color-brand-orange)',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(247,148,29,0.35)',
          }}
        >
          Make Appointment
        </motion.button>

        {/* Hamburger — Mobile */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-[8px] z-50 relative transition-colors"
          style={{ backgroundColor: isMenuOpen ? 'var(--color-bg-light)' : 'transparent' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMenuOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <IconX size={22} style={{ color: 'var(--color-brand-navy)' }} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <IconMenu2 size={22} style={{ color: 'var(--color-brand-navy)' }} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden border-t"
            style={{
              borderColor: 'rgba(26,36,114,0.08)',
              backgroundColor: 'rgba(255,255,255,0.98)',
            }}
          >
            <div className="flex flex-col px-4 py-3 gap-1">
              {navLinks.map(({ label, path, icon: Icon, exact }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <NavLink
                    to={path}
                    end={exact}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 text-[15px] font-semibold no-underline py-3 px-4 rounded-[10px] transition-colors w-full',
                        isActive ? 'text-white' : 'hover:bg-[#F0F4FF]',
                      ].join(' ')
                    }
                    style={({ isActive }) => ({
                      fontFamily: 'var(--font-manrope)',
                      color: isActive ? '#ffffff' : 'var(--color-brand-navy)',
                      backgroundColor: isActive ? 'var(--color-brand-navy)' : undefined,
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: isActive
                              ? 'rgba(247,148,29,0.2)'
                              : 'var(--color-bg-light)',
                          }}
                        >
                          <Icon
                            size={18}
                            style={{
                              color: isActive
                                ? '#F7941D'
                                : 'var(--color-brand-navy)',
                            }}
                            stroke={1.8}
                          />
                        </div>
                        {label}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                onClick={() => {
                  setIsMenuOpen(false);
                  onAppointmentClick();
                }}
                className="mt-2 rounded-[10px] px-6 py-4 text-[15px] font-bold leading-none border-none cursor-pointer w-full min-h-[52px]"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  backgroundColor: 'var(--color-brand-orange)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(247,148,29,0.3)',
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
