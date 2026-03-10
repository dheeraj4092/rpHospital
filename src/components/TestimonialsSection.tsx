import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Lakshmi Narayana',
    role: 'Pulmonology Patient (COPD)',
    rating: 5,
    text: "I came in with severe breathlessness and the pulmonology team acted within minutes. Nebulisation, oxygen support, and clear guidance helped me stabilise. It felt like family taking care of me, right here in Nizamabad.",
  },
  {
    id: 2,
    name: 'Anjali Singh',
    role: 'Asthma Care',
    rating: 5,
    text: "The chest physician adjusted my inhaler plan and taught me how to avoid local triggers. Within a week my night-time wheezing reduced, and the follow-up calls from the nurses kept me confident.",
  },
  {
    id: 3,
    name: 'Mohammed Arif',
    role: 'Respiratory Infection',
    rating: 5,
    text: "I was worried about a persistent cough. The doctors quickly did a chest X-ray and started the right antibiotics. No unnecessary tests, just clear answers and respectful care for my family and me.",
  },
  {
    id: 4,
    name: 'Sunita Reddy',
    role: 'Sleep Apnea Evaluation',
    rating: 5,
    text: "Their sleep study and CPAP counselling were so practical. The pulmonology team explained everything in Telugu and English, making it easy for my parents to understand and support me at home.",
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

const starPath = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <span
            className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase mb-3 block"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
          >
            Patient Stories
          </span>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            What our patients say about us
          </h2>
        </ScrollReveal>

        {/* Carousel */}
        <div className="max-w-[760px] mx-auto">
          {/* Card */}
          <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="rounded-[20px] md:rounded-[24px] p-6 sm:p-8 md:p-10 flex flex-col gap-5"
                style={{
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 8px 40px rgba(26,36,114,0.10)',
                  border: '1px solid rgba(26,36,114,0.06)',
                }}
              >
                {/* Quote mark */}
                <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                  <path d="M0 26V15.6C0 11.2 1.2 7.73333 3.6 5.2C6 2.66667 9.46667 1.06667 14 0.4L15.6 3.6C12.8 4.26667 10.7333 5.4 9.4 7C8.06667 8.6 7.4 10.4667 7.4 12.6H13.6V26H0ZM18.4 26V15.6C18.4 11.2 19.6 7.73333 22 5.2C24.4 2.66667 27.8667 1.06667 32.4 0.4L34 3.6C31.2 4.26667 29.1333 5.4 27.8 7C26.4667 8.6 25.8 10.4667 25.8 12.6H32V26H18.4Z" fill="var(--color-brand-orange)" fillOpacity="0.25"/>
                </svg>

                <p
                  className="text-[15px] sm:text-[16px] font-medium leading-[1.75] tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-dark)' }}
                >
                  {t.text}
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="w-[52px] h-[52px] rounded-full shrink-0 flex items-center justify-center font-extrabold text-[16px]"
                    style={{
                      backgroundColor: 'rgba(26,36,114,0.08)',
                      color: 'var(--color-brand-navy)',
                      border: '1px solid rgba(26,36,114,0.12)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                    aria-hidden
                  >
                    {getInitials(t.name)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="text-[15px] font-extrabold leading-none tracking-[-0.01em]"
                      style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                    >
                      {t.name}
                    </span>
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {t.role}
                    </span>
                    <div className="flex gap-[4px]">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24">
                          <path d={starPath} fill="#ffa526" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Prev / Next */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors"
                style={{
                  borderColor: 'var(--color-brand-navy)',
                  color: 'var(--color-brand-navy)',
                  backgroundColor: 'transparent',
                }}
                aria-label="Previous"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'var(--color-brand-navy)',
                  color: '#FFFFFF',
                }}
                aria-label="Next"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === current ? 'var(--color-brand-orange)' : 'rgba(26,36,114,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Counter */}
            <span
              className="text-[13px] font-semibold"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-text-muted)' }}
            >
              {current + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
