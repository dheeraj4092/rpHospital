import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ctaDoctorsImg from '../assets/cta-doctors-images.svg';
import ScrollReveal from './ui/ScrollReveal';

export default function CTASection() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields' });
      return;
    }
    setLoading(true);
    setMessage(null);
    
    // Simulate API call with setTimeout (frontend-only)
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: 'Request submitted! We will contact you shortly.' 
      });
      setFormData({ name: '', phone: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <section style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        <ScrollReveal>
          <motion.div
            className="rounded-[20px] md:rounded-[28px] lg:rounded-[32px] overflow-hidden flex flex-col lg:flex-row items-stretch relative"
            style={{
              backgroundColor: 'var(--color-brand-navy)',
              boxShadow: '0px 24px 64px rgba(26,36,114,0.3)',
            }}
            whileHover={{ boxShadow: '0px 32px 80px rgba(26,36,114,0.4)' }}
            transition={{ duration: 0.35 }}
          >
            {/* Decorative orb */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.4) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
            />

            {/* Left: image */}
            <div className="w-full lg:w-[44%] h-[250px] sm:h-[300px] lg:h-auto shrink-0 flex items-center justify-center" style={{ backgroundColor: '#1A2472' }}>
              <img src={ctaDoctorsImg} alt="Medical team" className="w-full h-full object-contain lg:object-cover" />
            </div>

            {/* Right: form */}
            <div className="flex-1 flex flex-col justify-center gap-4 md:gap-5 py-8 px-6 sm:py-10 sm:px-8 md:py-12 md:px-10 lg:py-14 lg:px-14 relative">
              <div className="w-10 md:w-12 h-1 rounded-full" style={{ backgroundColor: 'var(--color-brand-orange)' }} />

              <h2
                className="text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                Still not sure? Let us help!
              </h2>
              <p className="text-[14px] sm:text-[15px] font-medium leading-[1.7]" style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.65)' }}>
                Our care team will find a convenient schedule and connect you with the right specialist.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  className="w-full bg-white/10 border border-white/25 rounded-[10px] px-4 sm:px-5 py-3 sm:py-[14px] text-white text-[14px] font-medium placeholder:text-white/45 outline-none transition-all disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(247,148,29,0.7)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                />
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                  className="w-full bg-white/10 border border-white/25 rounded-[10px] px-4 sm:px-5 py-3 sm:py-[14px] text-white text-[14px] font-medium placeholder:text-white/45 outline-none transition-all disabled:opacity-50"
                  style={{ fontFamily: 'var(--font-manrope)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(247,148,29,0.7)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 28px rgba(247,148,29,0.5)' } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full rounded-[10px] py-3 sm:py-[14px] text-[14px] sm:text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    backgroundColor: 'var(--color-brand-orange)',
                    color: '#ffffff',
                    boxShadow: '0 4px 16px rgba(247,148,29,0.3)',
                  }}
                >
                  {loading ? 'Booking...' : 'Book My Appointment'}
                </motion.button>

                <AnimatePresence>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`text-[13px] sm:text-[14px] font-medium text-center py-2 px-3 rounded-lg ${
                        message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {message.text}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
