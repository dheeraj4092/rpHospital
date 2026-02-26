import { useState, useEffect } from 'react';
import locationIcon from '../assets/icon-location.svg';
import phoneIcon from '../assets/icon-phone.svg';
import emailIcon from '../assets/icon-email.svg';
import clockIcon from '../assets/icon-clock.svg';
import locationDotImg from '../assets/icon-location-dot.svg';
import mapBg from '../assets/map-background.png';
import HospitalLogo from './HospitalLogo';
import { api, type HospitalInfo } from '../services/api';

const WHITE_ICON = { filter: 'brightness(0) invert(1)' };

export default function ContactSection() {
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
      <section
        className="relative w-full flex items-center justify-center py-16 sm:py-20"
        style={{ minHeight: '400px', backgroundColor: 'var(--color-bg-light)' }}
      >
        <p style={{ color: 'var(--color-text-muted)' }}>Loading contact information...</p>
      </section>
    );
  }

  if (!hospitalInfo) return null;

  const contactItems = [
    {
      icon: locationIcon,
      label: hospitalInfo.address,
      size: [18, 20],
    },
    {
      icon: phoneIcon,
      label: hospitalInfo.phone,
      size: [20, 20],
    },
    {
      icon: emailIcon,
      label: hospitalInfo.email,
      size: [22, 16],
    },
    {
      icon: clockIcon,
      label: `${hospitalInfo.operatingHours.weekdays}\n${hospitalInfo.operatingHours.saturday}\n${hospitalInfo.operatingHours.sunday}`,
      size: [20, 20],
      multiline: true,
    },
  ];

  return (
    <section
      id="contacts"
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-0"
      style={{
        minHeight: '400px',
        backgroundColor: 'var(--color-bg-light)',
      }}
    >
      {/* Background - Hidden on mobile, shown on desktop */}
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          backgroundImage: `url(${mapBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
        }}
      >
        {/* Gradient overlay for continuity */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(240,244,255,0.55) 0%, transparent 60%)' }}
        />
      </div>

      {/* Contact card */}
      <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 py-12 lg:py-24 max-w-[1440px] mx-auto flex items-center lg:min-h-[600px]">
        <div
          className="flex flex-col gap-4 sm:gap-5 p-6 sm:p-7 md:p-8 w-full max-w-[420px] mx-auto lg:mx-0 lg:max-w-[340px]"
          style={{
            backgroundColor: 'var(--color-brand-navy)',
            borderRadius: '20px',
            boxShadow: '0 24px 48px rgba(26,36,114,0.25)',
          }}
        >
          {/* Logo in card */}
          <div className="flex items-center gap-3 pb-3 border-b border-white/20">
            <HospitalLogo height={36} inverted />
          </div>

          <h3
            className="text-white text-[16px] sm:text-[18px] font-bold leading-none tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Contact Us
          </h3>

          <div className="flex flex-col gap-3 sm:gap-4">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className={`flex gap-3 ${item.multiline ? 'items-start' : 'items-center'}`}
              >
                <div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(247,148,29,0.2)' }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    style={{
                      width: item.size[0] * 0.7,
                      height: item.size[1] * 0.7,
                      flexShrink: 0,
                      ...WHITE_ICON,
                    }}
                  />
                </div>
                <span
                  className="text-white text-[12px] sm:text-[13px] font-normal leading-[1.6]"
                  style={{
                    fontFamily: 'var(--font-manrope)',
                    whiteSpace: 'pre-line',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Orange bottom accent */}
          <div
            className="h-1 rounded-full mt-2"
            style={{ backgroundColor: 'var(--color-brand-orange)' }}
          />
        </div>
      </div>

      {/* Map location dot - Only show on desktop */}
      <div
        className="hidden lg:block absolute"
        style={{ left: '42%', top: '54%', transform: 'translate(-50%,-50%)' }}
      >
        <img src={locationDotImg} alt="Location" style={{ width: 69, height: 69 }} />
      </div>
    </section>
  );
}
