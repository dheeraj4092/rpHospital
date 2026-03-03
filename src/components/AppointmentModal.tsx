import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: '', phone: '', department: '', message: '' });
        setMessage(null);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Please fill in required fields (Name & Phone)' });
      return;
    }
    setLoading(true);
    setMessage(null);
    
    // Simulate API call with setTimeout (frontend-only)
    setTimeout(() => {
      setMessage({ 
        type: 'success', 
        text: 'Appointment request submitted successfully! We will contact you soon.' 
      });
      setLoading(false);
      setTimeout(onClose, 2000);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(13,18,64,0.72)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="sticky top-0 bg-white px-6 py-5 border-b border-gray-100 flex items-center justify-between z-10"
              style={{ borderRadius: '16px 16px 0 0' }}
            >
              <div>
                <h2
                  className="text-[20px] font-extrabold tracking-[-0.02em]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  Book Appointment
                </h2>
                <p className="text-[12px] font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Fill in your details and we'll confirm shortly
                </p>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, backgroundColor: '#F0F4FF' }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: '#F5F5F5' }}
                aria-label="Close modal"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="var(--color-brand-navy)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[13px] font-semibold mb-2" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={loading}
                  required
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[14px] font-medium outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(247,148,29,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-[13px] font-semibold mb-2" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={loading}
                  required
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[14px] font-medium outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(247,148,29,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-[13px] font-semibold mb-2" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                  Department
                </label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={loading}
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[14px] font-medium outline-none transition-all disabled:opacity-50 disabled:bg-gray-50"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-orange)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; }}
                >
                  <option value="">Select a department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Emergency Care">Emergency Care</option>
                  <option value="General">General Consultation</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[13px] font-semibold mb-2" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                  Additional Message
                </label>
                <textarea
                  id="message"
                  placeholder="Any specific concerns or requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={loading}
                  rows={3}
                  className="w-full border border-gray-200 rounded-[10px] px-4 py-3 text-[14px] font-medium outline-none transition-all disabled:opacity-50 disabled:bg-gray-50 resize-none"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-brand-orange)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(247,148,29,0.12)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Message feedback */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`p-4 rounded-[10px] text-[13px] font-medium ${
                      message.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                    style={{ fontFamily: 'var(--font-manrope)' }}
                  >
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 24px rgba(247,148,29,0.4)' } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full rounded-[10px] py-4 text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  fontFamily: 'var(--font-manrope)',
                  backgroundColor: 'var(--color-brand-orange)',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(247,148,29,0.3)',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Submitting...
                  </span>
                ) : (
                  'Submit Appointment Request'
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
