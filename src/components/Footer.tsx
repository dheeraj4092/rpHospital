import HospitalLogo from './HospitalLogo';
import { scrollToSection, scrollToTop } from '../utils/scroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Doctors', id: 'doctors' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contacts' },
  ];

  const services = [
    'Pulmonology',
    'Ophthalmology',
    'Emergency Care',
    'ICU Services',
    'Diagnostics',
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-brand-navy)' }}>
      {/* Main Footer */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block mb-4"
            >
              <HospitalLogo height={40} inverted />
            </a>
            <p
              className="text-[14px] font-medium leading-[1.7] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
            >
              Committed to providing world-class healthcare services with compassion and excellence. 
              Your health is our priority.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {[
                { name: 'Facebook', icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' },
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'YouTube', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: 'rgba(247,148,29,0.2)' }}
                  aria-label={social.name}
                  onClick={(e) => e.preventDefault()}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="text-white text-[16px] font-bold mb-4"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    className="text-[14px] font-medium transition-colors inline-block hover:translate-x-1 duration-300"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3
              className="text-white text-[16px] font-bold mb-4"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('services');
                    }}
                    className="text-[14px] font-medium transition-colors inline-block hover:translate-x-1 duration-300"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3
              className="text-white text-[16px] font-bold mb-4"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="var(--color-brand-orange)">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span
                  className="text-[14px] font-medium leading-[1.6]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                >
                  Nizamabad, Telangana, India
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="var(--color-brand-orange)">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span
                  className="text-[14px] font-medium leading-[1.6]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                >
                  +91-98765-43210
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="var(--color-brand-orange)">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span
                  className="text-[14px] font-medium leading-[1.6]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                >
                  contact@rphospital.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t px-4 sm:px-6 md:px-10 lg:px-20 py-6"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[13px] font-medium text-center sm:text-left"
            style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.6)' }}
          >
            © {currentYear} RP Super Speciality Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy-policy"
              className="text-[13px] font-medium transition-colors"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-conditions"
              className="text-[13px] font-medium transition-colors"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onClick={(e) => e.preventDefault()}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
