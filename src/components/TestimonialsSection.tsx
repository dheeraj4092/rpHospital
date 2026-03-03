import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ui/ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Ramesh Reddy',
    role: 'Cardiac Patient',
    avatar: 'https://i.pravatar.cc/80?u=ramesh-reddy',
    rating: 5,
    text: "The cardiology team at R.P Super Speciality Hospital gave me a new lease on life. The doctors were thorough, compassionate, and explained every step of my treatment. Truly world-class care right here in Nizamabad.",
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Maternity Patient',
    avatar: 'https://i.pravatar.cc/80?u=priya-sharma-niz',
    rating: 5,
    text: "From my first prenatal visit to delivery, the gynecology team was exceptional. The facility is modern, spotlessly clean, and the staff made me feel safe and supported throughout my entire pregnancy journey.",
  },
  {
    id: 3,
    name: 'Suresh Kumar',
    role: 'Orthopedic Patient',
    avatar: 'https://i.pravatar.cc/80?u=suresh-kumar-ortho',
    rating: 5,
    text: "I had a knee replacement surgery here and the results exceeded my expectations. The surgical team was highly skilled, recovery guidance was detailed, and I was back on my feet much sooner than anticipated.",
  },
  {
    id: 4,
    name: 'Fatima Begum',
    role: 'General Patient',
    avatar: 'https://i.pravatar.cc/80?u=fatima-begum-rph',
    rating: 5,
    text: "What impressed me most was the quick diagnosis and the doctor's ability to communicate complex conditions in simple terms. The emergency team responded within minutes when I needed them most. Highly recommended.",
  },
  {
    id: 5,
    name: 'Venkat Rao',
    role: 'Neurology Patient',
    avatar: 'https://i.pravatar.cc/80?u=venkat-rao-neuro',
    rating: 5,
    text: "The neurology department here is truly remarkable. The doctors used the latest diagnostic technology and created a personalized treatment plan. The entire staff was attentive and caring throughout my recovery.",
  },
];

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
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-[52px] h-[52px] rounded-full object-cover shrink-0 border-2 border-white shadow-sm"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
                  />
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
