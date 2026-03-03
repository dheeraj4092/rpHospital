import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import heroCollage from '../assets/hero-collage.svg';
import { scrollToSection } from '../utils/scroll';

interface HeroBannerProps {
  onAppointmentClick: () => void;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function HeroBanner({ onAppointmentClick }: HeroBannerProps) {
  return (
    <section id="hero" className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Decorative background orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 -left-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,36,114,0.3) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto relative">
        {/* Left content */}
        <motion.div
          className="flex flex-col gap-5 md:gap-6 w-full lg:max-w-[520px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 w-fit"
              style={{ backgroundColor: 'var(--color-bg-orange-light)' }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                style={{ backgroundColor: 'var(--color-brand-orange)' }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-[11px] sm:text-[13px] font-semibold tracking-[0.05em] uppercase"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
              >
                Nizamabad's Premier Hospital
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-extrabold leading-[1.15] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Advanced{' '}
            <span style={{ color: 'var(--color-brand-orange)' }}>Super Speciality</span>{' '}
            Care with Compassion
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[14px] sm:text-[15px] font-medium leading-[1.7] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            50-bedded hospital offering comprehensive speciality services with 
            24/7 emergency care, ICU facilities, and expert medical professionals 
            committed to your well-being.
          </motion.p>

          {/* Trust indicators row */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
            {[
              { icon: '🏥', label: '50 Bedded Hospital' },
              { icon: '🚑', label: '24/7 Emergency' },
              { icon: '🏥', label: 'ICU Available' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span className="text-[14px]">{item.icon}</span>
                <span
                  className="text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-text-muted)' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2">
            <motion.button
              onClick={onAppointmentClick}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(247,148,29,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="rounded-[10px] px-6 sm:px-7 py-4 text-[14px] sm:text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer min-h-[48px]"
              style={{
                fontFamily: 'var(--font-manrope)',
                backgroundColor: 'var(--color-brand-orange)',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(247,148,29,0.3)',
              }}
            >
              Book Appointment
            </motion.button>
            <motion.a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
              whileHover={{ x: 4 }}
              className="text-[14px] sm:text-[15px] font-semibold transition-colors text-center sm:text-left py-3 sm:py-0 flex items-center justify-center sm:justify-start gap-1.5 no-underline"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Our Services
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: hero image with floating cards */}
        <div className="w-full lg:flex-1 max-w-[500px] lg:max-w-none relative">
          <motion.img
            src={heroCollage}
            alt="Medical professionals at R.P Super Speciality Hospital"
            className="w-full h-auto object-contain"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Floating card: Happy Patients */}
          <motion.div
            className="absolute top-8 -left-4 sm:left-0 lg:-left-10 hidden sm:flex items-center gap-2.5 rounded-[14px] px-4 py-3 shadow-xl"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(26,36,114,0.08)',
            }}
            initial={{ opacity: 0, x: -20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[18px]"
              style={{ backgroundColor: 'var(--color-bg-orange-light)' }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              😊
            </motion.div>
            <div>
              <div className="text-[15px] font-extrabold leading-none" style={{ color: 'var(--color-brand-navy)' }}>
                15,000+
              </div>
              <div className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Happy Patients
              </div>
            </div>
          </motion.div>

          {/* Floating card: Years of Excellence */}
          <motion.div
            className="absolute bottom-12 -right-4 sm:right-0 lg:-right-4 hidden sm:flex items-center gap-2.5 rounded-[14px] px-4 py-3 shadow-xl"
            style={{
              backgroundColor: 'var(--color-brand-navy)',
            }}
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[18px]"
              style={{ backgroundColor: 'rgba(247,148,29,0.2)' }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🏥
            </motion.div>
            <div>
              <div className="text-[15px] font-extrabold leading-none text-white">
                25+ Years
              </div>
              <div className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                of Excellence
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
