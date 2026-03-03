import { motion } from 'framer-motion';
import MedicalCrossIconSvg from '../assets/icon-medical-cross.svg?react';
import ScrollReveal, { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';

const MissionIcon = MedicalCrossIconSvg as any;

const coreValues = [
  { icon: '💙', title: 'Compassion', desc: 'Caring for every patient with empathy and kindness' },
  { icon: '⭐', title: 'Excellence', desc: 'Delivering the highest standards of medical care' },
  { icon: '🤝', title: 'Integrity', desc: 'Upholding honesty and ethical practices always' },
  { icon: '🔬', title: 'Innovation', desc: 'Embracing advanced technology and treatments' },
];

export default function MissionVisionSection() {
  return (
    <section id="mission" className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
            <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
              Our Purpose
            </span>
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
          </div>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4 px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Mission & Vision
          </h2>
        </ScrollReveal>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Mission */}
          <ScrollReveal direction="left">
            <motion.div
              className="rounded-[20px] p-6 sm:p-8 md:p-10 border-2 h-full relative overflow-hidden"
              style={{ borderColor: 'var(--color-brand-orange)', backgroundColor: '#FFF8F0' }}
              whileHover={{ boxShadow: '0 16px 48px rgba(247,148,29,0.18)', y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* BG decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
              <div className="flex items-start gap-4 mb-5 relative">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-brand-orange)' }}
                >
                  <MissionIcon className="w-6 h-6 sm:w-7 sm:h-7" style={{ fill: '#ffffff' }} />
                </div>
                <h3
                  className="text-[24px] sm:text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] mt-2"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  Our Mission
                </h3>
              </div>
              <p className="text-[15px] sm:text-[16px] font-medium leading-[1.8] relative" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
                To provide accessible, affordable, and world-class healthcare services with compassion and clinical excellence.
                We are committed to:
              </p>
              <ul className="mt-4 space-y-2 text-[14px] sm:text-[15px] font-medium leading-[1.7] relative" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-brand-orange)' }}>✓</span>
                  <span>Evidence-based care with latest medical practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-brand-orange)' }}>✓</span>
                  <span>Patient safety as our highest priority</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-brand-orange)' }}>✓</span>
                  <span>Advanced surgical & diagnostic services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-brand-orange)' }}>✓</span>
                  <span>Affordable healthcare accessible to all</span>
                </li>
              </ul>
            </motion.div>
          </ScrollReveal>

          {/* Vision */}
          <ScrollReveal direction="right">
            <motion.div
              className="rounded-[20px] p-6 sm:p-8 md:p-10 border-2 h-full relative overflow-hidden"
              style={{ borderColor: 'var(--color-brand-navy)', backgroundColor: '#F0F4FF' }}
              whileHover={{ boxShadow: '0 16px 48px rgba(26,36,114,0.14)', y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* BG decoration */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-brand-navy)' }} />
              <div className="flex items-start gap-4 mb-5 relative">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-brand-navy)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="white" />
                  </svg>
                </div>
                <h3
                  className="text-[24px] sm:text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] mt-2"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  Our Vision
                </h3>
              </div>
              <p className="text-[15px] sm:text-[16px] font-medium leading-[1.8] relative" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
                To be recognized as the most trusted healthcare provider in the region, setting the benchmark for medical
                excellence and innovation. We aspire to create a healing environment where cutting-edge technology meets
                human compassion, making quality healthcare accessible to all, regardless of their background or economic status.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Core Values */}
        <ScrollReveal className="mb-8 text-center">
          <h3
            className="text-[20px] sm:text-[24px] font-extrabold leading-[1.2] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Our Core Values
          </h3>
        </ScrollReveal>
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.08}
        >
          {coreValues.map((value) => (
            <motion.div
              key={value.title}
              variants={staggerItemVariants}
            >
              <motion.div
                className="rounded-[16px] p-5 text-center h-full"
                style={{ backgroundColor: '#FAFBFF', border: '1px solid #E5E7EB' }}
                whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(26,36,114,0.10)', borderColor: 'rgba(247,148,29,0.3)' }}
                transition={{ duration: 0.22 }}
              >
                <div className="text-[36px] mb-3">{value.icon}</div>
                <h4 className="text-[16px] font-bold mb-2" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                  {value.title}
                </h4>
                <p className="text-[13px] font-medium leading-[1.6]" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
                  {value.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
