import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal, { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';
import { faqItems } from '../data/faqs';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" style={{ backgroundColor: '#FAFBFF' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
            <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
              FAQ
            </span>
            <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
          </div>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            Everything you need to know about our services, facilities, and how to access care.
          </p>
        </ScrollReveal>

        {/* FAQ List */}
        <StaggerContainer
          className="max-w-[860px] mx-auto flex flex-col gap-3"
          staggerDelay={0.05}
        >
          {faqItems.map((faq, index) => (
            <motion.div key={index} variants={staggerItemVariants}>
              <FAQItem
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.3} className="mt-10 text-center">
          <p
            className="text-[14px] sm:text-[15px] font-medium mb-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            Still have questions? Our care team is happy to help.
          </p>
          <motion.a
            href="tel:+919876543210"
            whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(247,148,29,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[14px] font-bold no-underline"
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
        </ScrollReveal>
      </div>
    </section>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="rounded-[14px] overflow-hidden border"
      animate={{
        borderColor: isOpen ? 'var(--color-brand-orange)' : '#E5E7EB',
        boxShadow: isOpen ? '0 4px 20px rgba(247,148,29,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      transition={{ duration: 0.25 }}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="text-[14px] sm:text-[15px] font-bold leading-[1.4] flex-1"
          style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isOpen ? 'var(--color-brand-orange)' : 'var(--color-bg-light)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M2.5 5L7 9.5L11.5 5"
              stroke={isOpen ? '#FFFFFF' : 'var(--color-brand-navy)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-5 sm:px-6 pb-4 sm:pb-5 border-t"
              style={{ borderColor: 'rgba(247,148,29,0.15)' }}
            >
              <p
                className="text-[13px] sm:text-[14px] font-medium leading-[1.7] pt-4"
                style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
              >
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
