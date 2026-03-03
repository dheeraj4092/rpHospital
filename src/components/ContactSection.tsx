import { motion } from 'framer-motion';
import locationIcon from '../assets/icon-location.svg';
import phoneIcon from '../assets/icon-phone.svg';
import emailIcon from '../assets/icon-email.svg';
import clockIcon from '../assets/icon-clock.svg';
import locationDotImg from '../assets/icon-location-dot.svg';
import mapBg from '../assets/map-background.png';
import HospitalLogo from './HospitalLogo';
import { hospitalInfo } from '../data/hospital';
import ScrollReveal from './ui/ScrollReveal';

const WHITE_ICON = { filter: 'brightness(0) invert(1)' };

export default function ContactSection() {
  const contactItems = [
    { icon: locationIcon, label: hospitalInfo.address, size: [18, 20] },
    { icon: phoneIcon, label: hospitalInfo.phone, size: [20, 20] },
    { icon: emailIcon, label: hospitalInfo.email, size: [22, 16] },
    {
      icon: clockIcon,
      label: `${hospitalInfo.operatingHours.weekdays}\n${hospitalInfo.operatingHours.saturday}\n${hospitalInfo.operatingHours.sunday}`,
      size: [20, 20],
      multiline: true,
    },
  ];

  return (
    <section
      id="contacts"
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-0"
      style={{ minHeight: '400px', backgroundColor: 'var(--color-bg-light)' }}
    >
      {/* Background map - desktop only */}
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          backgroundImage: `url(${mapBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(240,244,255,0.6) 0%, transparent 60%)' }} />
      </div>

      {/* Contact card */}
      <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 py-12 lg:py-24 max-w-[1440px] mx-auto flex items-center lg:min-h-[600px]">
        <ScrollReveal direction="left">
          <motion.div
            className="flex flex-col gap-4 sm:gap-5 p-6 sm:p-7 md:p-8 w-full max-w-[420px] mx-auto lg:mx-0 lg:max-w-[360px]"
            style={{
              backgroundColor: 'var(--color-brand-navy)',
              borderRadius: '20px',
              boxShadow: '0 24px 64px rgba(26,36,114,0.3)',
            }}
            whileHover={{ boxShadow: '0 32px 80px rgba(26,36,114,0.4)', y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <HospitalLogo height={36} inverted />
            </div>

            <h3
              className="text-white text-[16px] sm:text-[18px] font-bold leading-none tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Get in Touch
            </h3>

            <div className="flex flex-col gap-3 sm:gap-4">
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex gap-3 ${item.multiline ? 'items-start' : 'items-center'}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(247,148,29,0.2)' }}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      style={{ width: item.size[0] * 0.7, height: item.size[1] * 0.7, flexShrink: 0, ...WHITE_ICON }}
                    />
                  </div>
                  <span
                    className="text-white text-[12px] sm:text-[13px] font-normal leading-[1.6]"
                    style={{ fontFamily: 'var(--font-manrope)', whiteSpace: 'pre-line', color: 'rgba(255,255,255,0.85)' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Orange accent */}
            <div className="h-1 rounded-full mt-2" style={{ backgroundColor: 'var(--color-brand-orange)' }} />

            {/* CTA */}
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(247,148,29,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-[10px] py-3 text-[14px] font-bold no-underline transition-all"
              style={{
                backgroundColor: 'var(--color-brand-orange)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-manrope)',
                boxShadow: '0 4px 14px rgba(247,148,29,0.3)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Call Us Now
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Map location dot */}
      <motion.div
        className="hidden lg:block absolute"
        style={{ left: '42%', top: '54%', transform: 'translate(-50%,-50%)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src={locationDotImg} alt="Location" style={{ width: 69, height: 69 }} />
      </motion.div>
    </section>
  );
}
