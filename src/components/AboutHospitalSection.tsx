import { useState, useEffect } from 'react';
import { api, type HospitalInfo } from '../services/api';

export default function AboutHospitalSection() {
  const [hospitalInfo, setHospitalInfo] = useState<HospitalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalInfo = async () => {
      try {
        const response = await api.getHospitalInfo();
        if (response.success && response.data) {
          setHospitalInfo(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch hospital info:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitalInfo();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="text-center">
          <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
        </div>
      </section>
    );
  }

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
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-6 sm:w-8 h-[2px] rounded-full inline-block"
              style={{ backgroundColor: 'var(--color-brand-orange)' }}
            />
            <span
              className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
            >
              About Us
            </span>
            <span
              className="w-6 sm:w-8 h-[2px] rounded-full inline-block"
              style={{ backgroundColor: 'var(--color-brand-orange)' }}
            />
          </div>
          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4 px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            {hospitalInfo?.name || 'RP Super Speciality Hospital'}
          </h2>
          <p
            className="text-[16px] sm:text-[18px] font-semibold mb-6"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-orange)' }}
          >
            {hospitalInfo?.tagline || 'Excellence in Healthcare Since 2025'}
          </p>
        </div>

        {/* About Description */}
        <div className="max-w-[900px] mx-auto mb-12 md:mb-16">
          <div
            className="rounded-[20px] p-6 sm:p-8 md:p-10"
            style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 24px rgba(26,36,114,0.08)' }}
          >
            <p
              className="text-[15px] sm:text-[16px] font-medium leading-[1.8] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
            >
              <strong style={{ color: 'var(--color-brand-navy)' }}>R.P Super Speciality Hospital</strong> is a modern healthcare facility committed to 
              delivering world-class medical services with compassion and excellence. Our hospital combines advanced medical 
              technology with experienced healthcare professionals to provide comprehensive care across multiple specialties.
            </p>
            <ul
              className="space-y-3 text-[15px] sm:text-[16px] font-medium leading-[1.8]"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
            >
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold' }}>✓</span>
                <span>Comprehensive diagnostic and treatment facilities under one roof</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold' }}>✓</span>
                <span>State-of-the-art infrastructure with modern medical equipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold' }}>✓</span>
                <span>24/7 emergency services with dedicated ICU and critical care units</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold' }}>✓</span>
                <span>Team of highly qualified specialist doctors and healthcare professionals</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-brand-orange)', fontWeight: 'bold' }}>✓</span>
                <span>Patient-centered approach with focus on safety, quality, and satisfaction</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="rounded-[16px] p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[24px]"
                style={{ backgroundColor: '#FFF8F0' }}
              >
                {item.icon}
              </div>
              <div>
                <h4
                  className="text-[15px] font-bold mb-1"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  {item.label}
                </h4>
                <p
                  className="text-[13px] font-medium leading-[1.6]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
