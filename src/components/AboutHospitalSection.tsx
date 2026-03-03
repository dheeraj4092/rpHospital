import { motion } from 'framer-motion';
import { hospitalInfo } from '../data/hospital';
import ScrollReveal, { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';

export default function AboutHospitalSection() {
  const highlights = [
    { icon: '🏥', label: 'State-of-the-Art Infrastructure', value: 'Modern medical facilities' },
    { icon: '👨‍⚕️', label: 'Expert Medical Team', value: '50+ specialist doctors' },
    { icon: '🛏️', label: 'Bed Capacity', value: '50 beds with ICU' },
    { icon: '🚑', label: '24/7 Emergency Care', value: 'Always available for you' },
    { icon: '🔬', label: 'Advanced Diagnostics', value: 'Latest medical technology' },
    { icon: '⚡', label: 'Quick Response', value: 'Immediate medical attention' },
  ];

  return (
    <section id="about" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
            <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
              About Us
            </span>
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
          </div>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4 px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            {hospitalInfo.name}
          </h2>
          <p
            className="text-[16px] sm:text-[18px] font-semibold mb-6"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-orange)' }}
          >
            Excellence in Healthcare Since {hospitalInfo.established}
          </p>
        </ScrollReveal>

        {/* About Card */}
        <ScrollReveal delay={0.1} className="max-w-[900px] mx-auto mb-12 md:mb-16">
          <div
            className="rounded-[20px] p-6 sm:p-8 md:p-10"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 8px 32px rgba(26,36,114,0.08)' }}
          >
            {/* Orange accent */}
            <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
            <p className="text-[15px] sm:text-[16px] font-medium leading-[1.8] mb-5" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-brand-navy)' }}>R.P Super Speciality Hospital</strong> is a modern healthcare facility committed to
              delivering world-class medical services with compassion and excellence. Our hospital combines advanced medical
              technology with experienced healthcare professionals to provide comprehensive care across multiple specialties.
            </p>
            <ul className="space-y-3 text-[15px] sm:text-[16px] font-medium leading-[1.8]" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
              {[
                'Comprehensive diagnostic and treatment facilities under one roof',
                'State-of-the-art infrastructure with modern medical equipment',
                '24/7 emergency services with dedicated ICU and critical care units',
                'Team of highly qualified specialist doctors and healthcare professionals',
                'Patient-centered approach with focus on safety, quality, and satisfaction',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <motion.span
                    style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold', flexShrink: 0 }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3, type: 'spring' }}
                  >
                    ✓
                  </motion.span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Highlights Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          staggerDelay={0.07}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={staggerItemVariants}
            >
              <motion.div
                className="rounded-[16px] p-5 flex items-start gap-4 h-full"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
                whileHover={{
                  y: -4,
                  boxShadow: '0 12px 32px rgba(26,36,114,0.10)',
                  borderColor: 'rgba(247,148,29,0.4)',
                }}
                transition={{ duration: 0.22 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[24px]"
                  style={{ backgroundColor: '#FFF8F0' }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h4 className="text-[15px] font-bold mb-1" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                    {item.label}
                  </h4>
                  <p className="text-[13px] font-medium leading-[1.6]" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
