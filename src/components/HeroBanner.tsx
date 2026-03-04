import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants, TargetAndTransition, Transition } from 'framer-motion';
import {
  IconShieldCheck,
  IconBuildingHospital,
  IconClock24,
  IconHeartbeat,
  IconArrowRight,
  IconUsers,
  IconAward,
  IconStethoscope,
} from '@tabler/icons-react';
import heroCollage from '../assets/hero-collage.svg';
import { scrollToSection } from '../utils/scroll';
import AnimatedCounter from './ui/AnimatedCounter';

interface HeroBannerProps {
  onAppointmentClick: () => void;
}

const specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics'];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const trustBadges = [
  { icon: IconBuildingHospital, label: '50 Beds' },
  { icon: IconClock24, label: '24/7 Emergency' },
  { icon: IconHeartbeat, label: 'ICU Available' },
];

const stats = [
  { value: 15000, suffix: '+', label: 'Happy Patients', icon: IconUsers },
  { value: 25, suffix: '+', label: 'Years of Excellence', icon: IconAward },
  { value: 50, suffix: '+', label: 'Expert Staff', icon: IconStethoscope },
  { value: 98, suffix: '%', label: 'Success Rate', icon: IconHeartbeat },
];

/* ─── Floating glassmorphism cards ─── */
const GlassCard = ({
  children,
  className,
  initial,
  animate,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: Transition;
}) => (
  <motion.div
    className={`absolute hidden sm:flex items-center gap-3 rounded-2xl px-4 py-3 ${className ?? ''}`}
    style={{
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid rgba(255,255,255,0.65)',
      boxShadow: '0 8px 32px rgba(26,36,114,0.13), 0 2px 8px rgba(26,36,114,0.06)',
    }}
    initial={initial}
    animate={animate}
    transition={transition}
    whileHover={{ y: -4, boxShadow: '0 14px 40px rgba(26,36,114,0.18)' }}
  >
    {children}
  </motion.div>
);

export default function HeroBanner({ onAppointmentClick }: HeroBannerProps) {
  const [specialtyIdx, setSpecialtyIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSpecialtyIdx(i => (i + 1) % specialties.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-hero)' }}
    >
      {/* ── Dot-grid texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1.5px 1.5px, rgba(26,36,114,0.07) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Gradient orbs ── */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(247,148,29,0.18) 0%, rgba(247,148,29,0.06) 45%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 60% 60%, rgba(26,36,114,0.14) 0%, rgba(26,36,114,0.05) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 right-[30%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(247,148,29,0.1) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── Main content grid ── */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24 px-4 sm:px-6 md:px-10 lg:px-20 pt-14 sm:pt-16 md:pt-20 lg:pt-24 pb-0 max-w-[1440px] mx-auto relative">

        {/* ─────────── LEFT COLUMN ─────────── */}
        <motion.div
          className="flex flex-col gap-5 md:gap-6 w-full lg:max-w-[540px] shrink-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 w-fit"
              style={{
                background: 'rgba(247,148,29,0.1)',
                border: '1px solid rgba(247,148,29,0.25)',
              }}
              whileHover={{ scale: 1.04 }}
            >
              <IconShieldCheck
                size={15}
                style={{ color: 'var(--color-brand-orange)' }}
                stroke={2.2}
              />
              <span
                className="text-[11px] sm:text-[12px] font-bold tracking-[0.06em] uppercase"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
              >
                Nizamabad's Premier Hospital
              </span>
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--color-brand-orange)' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Headline with cycling specialty */}
          <motion.h1
            variants={itemVariants}
            className="text-[34px] sm:text-[42px] md:text-[50px] lg:text-[54px] font-extrabold leading-[1.12] tracking-[-0.025em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Advanced{' '}
            <span className="inline-flex flex-col overflow-hidden" style={{ height: '1.15em', verticalAlign: 'bottom' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={specialtyIdx}
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -36 }}
                  transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ color: 'var(--color-brand-orange)', display: 'block', lineHeight: '1.15' }}
                >
                  {specialties[specialtyIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
            {' '}Care
            <br />
            <span
              className="relative inline-block"
              style={{ color: 'var(--color-brand-navy)' }}
            >
              with Compassion
              {/* Underline accent */}
              <motion.span
                className="absolute left-0 -bottom-1 h-[3px] rounded-full"
                style={{ backgroundColor: 'var(--color-brand-orange)', width: '100%' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[14px] sm:text-[15px] font-medium leading-[1.75]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            50-bedded hospital offering comprehensive speciality services with
            24/7 emergency care, ICU facilities, and expert medical professionals
            committed to your well-being.
          </motion.p>

          {/* Trust badges */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 sm:gap-5 flex-wrap">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full px-3 py-2"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(26,36,114,0.1)',
                }}
              >
                <Icon size={15} style={{ color: 'var(--color-brand-navy)' }} stroke={2} />
                <span
                  className="text-[11px] sm:text-[12px] font-semibold whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-navy)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-1"
          >
            <motion.button
              onClick={onAppointmentClick}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 28px rgba(247,148,29,0.45)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-[12px] px-6 py-4 text-[14px] sm:text-[15px] font-bold leading-none border-none cursor-pointer min-h-[52px]"
              style={{
                fontFamily: 'var(--font-manrope)',
                backgroundColor: 'var(--color-brand-orange)',
                color: '#ffffff',
                boxShadow: '0 4px 18px rgba(247,148,29,0.35)',
              }}
            >
              Book Appointment
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconArrowRight size={16} stroke={2.5} />
              </motion.span>
            </motion.button>

            <motion.a
              href="#services"
              onClick={e => { e.preventDefault(); scrollToSection('services'); }}
              whileHover={{ x: 3 }}
              className="flex items-center justify-center sm:justify-start gap-2 text-[14px] sm:text-[15px] font-semibold py-3 sm:py-0 no-underline"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Our Services
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconArrowRight size={16} stroke={2.2} />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ─────────── RIGHT COLUMN ─────────── */}
        <div className="w-full lg:flex-1 relative flex items-end justify-center">

          {/* Decorative ring 1 — slow spin */}
          <motion.div
            className="absolute w-[88%] aspect-square rounded-full pointer-events-none"
            style={{
              border: '2px dashed rgba(247,148,29,0.2)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />

          {/* Decorative ring 2 — pulse */}
          <motion.div
            className="absolute w-[72%] aspect-square rounded-full pointer-events-none"
            style={{
              border: '1.5px solid rgba(26,36,114,0.12)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Glow behind image */}
          <div
            className="absolute w-[60%] h-[55%] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(247,148,29,0.15) 0%, transparent 70%)',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              filter: 'blur(24px)',
            }}
          />

          {/* Hero collage image */}
          <motion.div
            className="relative w-full max-w-[540px] lg:max-w-none"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={heroCollage}
              alt="Medical professionals at R.P Super Speciality Hospital"
              className="w-full h-auto object-contain relative z-10"
            />

            {/* ── Floating card: Doctors Online ── */}
            <GlassCard
              className="top-6 left-0 lg:-left-8 z-20"
              initial={{ opacity: 0, x: -24, y: -12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(26,36,114,0.08)' }}
              >
                <IconStethoscope size={18} style={{ color: 'var(--color-brand-navy)' }} stroke={1.8} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#22c55e' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-inter)', color: '#22c55e' }}
                  >
                    Online Now
                  </span>
                </div>
                <div
                  className="text-[13px] font-bold leading-none"
                  style={{ color: 'var(--color-brand-navy)' }}
                >
                  Doctors Available
                </div>
              </div>
            </GlassCard>

            {/* ── Floating card: Happy Patients ── */}
            <GlassCard
              className="bottom-28 -left-4 sm:left-0 lg:-left-10 z-20"
              initial={{ opacity: 0, x: -20, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(247,148,29,0.12)' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <IconUsers size={18} style={{ color: 'var(--color-brand-orange)' }} stroke={1.8} />
              </motion.div>
              <div>
                <div
                  className="text-[17px] font-extrabold leading-none"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  15,000+
                </div>
                <div
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Happy Patients
                </div>
              </div>
            </GlassCard>

            {/* ── Floating card: Years of Excellence ── */}
            <GlassCard
              className="bottom-12 -right-4 sm:right-0 lg:-right-6 z-20"
              initial={{ opacity: 0, x: 20, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.35, duration: 0.6 }}
            >
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-brand-navy)' }}
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity }}
              >
                <IconAward size={18} color="#F7941D" stroke={1.8} />
              </motion.div>
              <div>
                <div
                  className="text-[17px] font-extrabold leading-none text-white"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    color: 'var(--color-brand-navy)',
                  }}
                >
                  25+ Years
                </div>
                <div
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  of Excellence
                </div>
              </div>
            </GlassCard>

            {/* ── Floating card: Emergency ── */}
            <GlassCard
              className="top-6 right-0 lg:-right-6 z-20"
              initial={{ opacity: 0, x: 24, y: -12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
            >
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <IconClock24 size={18} style={{ color: '#ef4444' }} stroke={1.8} />
              </motion.div>
              <div>
                <div
                  className="text-[13px] font-extrabold leading-none"
                  style={{ color: '#ef4444', fontFamily: 'var(--font-manrope)' }}
                >
                  24 / 7
                </div>
                <div
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Emergency Ready
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ─────────── STATS STRIP ─────────── */}
      <motion.div
        className="relative mt-10 sm:mt-14 mx-4 sm:mx-6 md:mx-10 lg:mx-20 max-w-[1440px] lg:mx-auto"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--color-brand-navy)',
            boxShadow: '0 12px 40px rgba(26,36,114,0.22)',
          }}
        >
          {/* Subtle pattern overlay inside stats card */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 relative">
            {stats.map(({ value, suffix, label, icon: Icon }, i) => (
              <div key={label} className="relative">
                {/* Divider (skip first on each row) */}
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px hidden md:block"
                    style={{ height: '50%', backgroundColor: 'rgba(255,255,255,0.12)' }}
                  />
                )}
                {i === 2 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px md:hidden"
                    style={{ height: '50%', backgroundColor: 'rgba(255,255,255,0.12)' }}
                  />
                )}

                <motion.div
                  className="flex flex-col items-center justify-center gap-2 py-6 px-4 text-center"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(247,148,29,0.15)' }}
                  >
                    <Icon size={20} color="#F7941D" stroke={1.8} />
                  </div>
                  <div
                    className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold leading-none tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    <AnimatedCounter
                      target={value}
                      suffix={suffix}
                      duration={1800}
                    />
                  </div>
                  <div
                    className="text-[11px] sm:text-[12px] font-semibold tracking-wide uppercase"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-inter)' }}
                  >
                    {label}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade-out into next section */}
      <div
        className="h-10 sm:h-14 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-bg-hero) 70%)',
        }}
      />
    </section>
  );
}
