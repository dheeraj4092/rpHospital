import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { api } from '../services/api';

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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          department: '',
          message: '',
        });
        setMessage(null);
      }, 300);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Please fill in required fields (Name & Phone)' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await api.createAppointment({
        patientName: formData.name,
        phone: formData.phone,
        departmentId: formData.department,
        notes: formData.message,
      });

      if (response.success) {
        setMessage({
          type: 'success',
          text: response.message || 'Appointment request submitted successfully! We will contact you soon.',
        });
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to book appointment. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      style={{ backgroundColor: 'rgba(26, 36, 114, 0.75)' }}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'scaleIn 0.3s ease-out',
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 bg-white px-6 py-5 border-b border-gray-200 flex items-center justify-between z-10"
          style={{ borderRadius: '16px 16px 0 0' }}
        >
          <h2
            className="text-[22px] font-extrabold tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            Book Appointment
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-[13px] font-semibold mb-2"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] font-medium leading-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all disabled:opacity-50 disabled:bg-gray-50"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-[13px] font-semibold mb-2"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
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
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] font-medium leading-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all disabled:opacity-50 disabled:bg-gray-50"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block text-[13px] font-semibold mb-2"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Department
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] font-medium leading-none outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all disabled:opacity-50 disabled:bg-gray-50"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
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
            <label
              htmlFor="message"
              className="block text-[13px] font-semibold mb-2"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Additional Message
            </label>
            <textarea
              id="message"
              placeholder="Any specific concerns or requests..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              disabled={loading}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] font-medium leading-relaxed outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all disabled:opacity-50 disabled:bg-gray-50 resize-none"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            />
          </div>

          {/* Message feedback */}
          {message && (
            <div
              className={`p-4 rounded-lg text-[13px] font-medium ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {message.text}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-4 text-[15px] font-bold leading-none tracking-[-0.01em] border-none cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'var(--font-manrope)',
              backgroundColor: 'var(--color-brand-orange)',
              color: '#ffffff',
            }}
            onMouseEnter={(e) =>
              !loading && ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#d97a0e')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'var(--color-brand-orange)')
            }
          >
            {loading ? 'Submitting...' : 'Submit Appointment Request'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
