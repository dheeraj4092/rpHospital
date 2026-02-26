import { useState } from 'react';
import HospitalLogo from './HospitalLogo';
import { scrollToSection, scrollToTop } from '../utils/scroll';

const navLinks = [
  { label: 'About us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Doctors', id: 'doctors' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contacts', id: 'contacts' },
];

interface NavbarProps {
  onAppointmentClick: () => void;
}

export default function Navbar({ onAppointmentClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 py-4 max-w-[1440px] mx-auto">
        {/* Logo */}
        <a
          href="#"
          className="flex-shrink-0 z-50"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        >
          <HospitalLogo height={40} />
        </a>

        {/* Hamburger Button - Mobile Only */}
        <button
          className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
            style={{ color: 'var(--color-brand-navy)' }}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
            style={{ color: 'var(--color-brand-navy)' }}
          />
          <span
            className={`w-6 h-0.5 bg-current transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
            style={{ color: 'var(--color-brand-navy)' }}
          />
        </button>

        {/* Nav Links - Desktop */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.id}>
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
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop */}
        <button
          onClick={onAppointmentClick}
          className="hidden lg:block rounded-[8px] px-5 xl:px-6 py-3 text-[14px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all"
          style={{
            fontFamily: 'var(--font-manrope)',
            backgroundColor: 'var(--color-brand-orange)',
            color: '#ffffff',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d97a0e')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-brand-orange)')}
        >
          Make Appointment
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Mobile Nav Links */}
          <ul className="flex flex-col gap-1 list-none">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-[16px] font-semibold leading-none tracking-[-0.01em] no-underline transition-colors block py-4 px-4 rounded-lg hover:bg-gray-50"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile CTA Button */}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              onAppointmentClick();
            }}
            className="mt-6 rounded-[8px] px-6 py-4 text-[16px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all w-full"
            style={{
              fontFamily: 'var(--font-manrope)',
              backgroundColor: 'var(--color-brand-orange)',
              color: '#ffffff',
            }}
          >
            Make Appointment
          </button>
        </div>
      </div>
    </nav>
  );
}
