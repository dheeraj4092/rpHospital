import { useState } from 'react';
import type { FormEvent } from 'react';
import ctaDoctorsImg from '../assets/cta-doctors-images.svg';
import { api } from '../services/api';

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
    try {
      const response = await api.createAppointment({
        patientName: formData.name,
        phone: formData.phone,
      });
      if (response.success) {
        setMessage({ type: 'success', text: response.message || 'Appointment booked successfully!' });
        setFormData({ name: '', phone: '' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to book. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        <div
          className="rounded-[20px] md:rounded-[28px] lg:rounded-[32px] overflow-hidden flex flex-col lg:flex-row items-stretch"
          style={{
            backgroundColor: 'var(--color-brand-navy)',
            boxShadow: '0px 24px 48px rgba(26, 36, 114, 0.25)',
          }}
        >
          {/* Left: doctors image */}
          <div className="w-full lg:w-[44%] h-[250px] sm:h-[300px] lg:h-auto shrink-0 flex items-center justify-center bg-[#1A2472]">
            <img
              src={ctaDoctorsImg}
              alt="Medical team at R.P Super Speciality Hospital"
              className="w-full h-full object-contain lg:object-cover"
            />
          </div>

          {/* Right: heading + form */}
          <div className="flex-1 flex flex-col justify-center gap-4 md:gap-5 py-8 px-6 sm:py-10 sm:px-8 md:py-12 md:px-10 lg:py-14 lg:px-14">
            {/* Orange accent line */}
            <div
              className="w-10 md:w-12 h-1 rounded-full"
              style={{ backgroundColor: 'var(--color-brand-orange)' }}
            />

            <h2
              className="text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em]"
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              Still not sure? Let us help!
            </h2>
            <p
              className="text-[14px] sm:text-[15px] font-medium leading-[1.7]"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.65)' }}
            >
              Our care team will find a convenient schedule for you and connect you
              with the right specialist at R.P Super Speciality Hospital.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
              <input
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={loading}
                className="w-full bg-white/10 border border-white/30 rounded-[10px] px-4 sm:px-5 py-3 sm:py-[14px] text-white text-[14px] font-medium leading-none tracking-[-0.01em] placeholder:text-white/50 outline-none focus:border-orange-400 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-manrope)' }}
              />
              <input
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
                className="w-full bg-white/10 border border-white/30 rounded-[10px] px-4 sm:px-5 py-3 sm:py-[14px] text-white text-[14px] font-medium leading-none tracking-[-0.01em] placeholder:text-white/50 outline-none focus:border-orange-400 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-manrope)' }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-[10px] py-3 sm:py-[14px] text-[14px] sm:text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  backgroundColor: 'var(--color-brand-orange)',
                  color: '#ffffff',
                }}
                onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d97a0e')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-brand-orange)')}
              >
                {loading ? 'Booking...' : 'Book My Appointment'}
              </button>

              {message && (
                <div
                  className={`text-[13px] sm:text-[14px] font-medium text-center py-2 rounded-lg ${
                    message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
