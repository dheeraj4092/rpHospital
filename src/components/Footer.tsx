import { Link } from 'react-router-dom';
import HospitalLogo from './HospitalLogo';
import { socialLinks } from '../data/socialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];

  const services = [
    { label: 'Pulmonology', path: '/services' },
    { label: 'Ophthalmology', path: '/services' },
    { label: 'Emergency Care', path: '/services' },
    { label: 'ICU Services', path: '/services' },
    { label: 'Diagnostics', path: '/services' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--color-brand-navy)' }}>
      {/* Main Footer */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <HospitalLogo height={40} inverted />
            </Link>
            <p
              className="text-[14px] font-medium leading-[1.7] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
            >
              Committed to providing world-class healthcare services with compassion and excellence.
              Your health is our priority.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                social.enabled ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                    style={{ backgroundColor: 'rgba(247,148,29,0.2)' }}
                    aria-label={`Visit our ${social.name}`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d={social.iconPath} />
                    </svg>
                  </a>
                ) : null
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
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[14px] font-medium transition-colors inline-block hover:translate-x-1 duration-300 no-underline"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {link.label}
                  </Link>
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
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="text-[14px] font-medium transition-colors inline-block hover:translate-x-1 duration-300 no-underline"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {service.label}
                  </Link>
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
                  +91-99032323258
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
            <Link
              to="/privacy-policy"
              className="text-[13px] font-medium transition-colors no-underline"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-[13px] font-medium transition-colors no-underline"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-orange)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
