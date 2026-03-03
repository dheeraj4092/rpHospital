export default function KeyHighlightsSection() {
  const accreditations = [
    { icon: '🏆', title: 'NABH Accredited', desc: 'National accreditation for quality healthcare' },
    { icon: '✨', title: 'ISO Certified', desc: 'International standards compliance' },
    { icon: '🎖️', title: 'Award Winning', desc: 'Excellence in medical services' },
    { icon: '🔒', title: 'Patient Safety', desc: 'Highest safety protocols maintained' },
  ];

  const insurancePartners = [
    'Star Health Insurance',
    'ICICI Lombard',
    'HDFC ERGO',
    'Bajaj Allianz',
    'Max Bupa',
    'Care Health Insurance',
    'New India Assurance',
    'United India Insurance',
    'National Insurance',
    'Oriental Insurance',
  ];

  const equipment = [
    { icon: '🔬', name: 'Advanced Diagnostic Lab', desc: 'Automated analyzers & latest testing equipment' },
    { icon: '📡', name: 'Digital Imaging Systems', desc: 'X-Ray, Ultrasound, and advanced imaging' },
    { icon: '💉', name: 'Modern Operation Theaters', desc: 'Fully equipped with latest surgical instruments' },
    { icon: '❤️', name: 'ICU & Critical Care', desc: 'State-of-the-art monitoring systems' },
  ];

  return (
    <section id="highlights" className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Accreditations & Awards */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2
              className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Accreditations & Recognition
            </h2>
            <p
              className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
            >
              Certified and recognized for maintaining the highest standards in healthcare
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {accreditations.map((item, index) => (
              <div
                key={index}
                className="rounded-[18px] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ backgroundColor: '#F0F4FF', border: '2px solid #E5E9FF' }}
              >
                <div className="text-[48px] mb-4">{item.icon}</div>
                <h3
                  className="text-[17px] font-bold mb-2"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] font-medium leading-[1.6]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Equipment */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10">
            <h2
              className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Advanced Medical Equipment
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {equipment.map((item, index) => (
              <div
                key={index}
                className="rounded-[16px] p-6 flex items-start gap-4 transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#FAFBFF', border: '1px solid #E5E7EB' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-[28px]"
                  style={{ backgroundColor: '#FFF8F0' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4
                    className="text-[16px] font-bold mb-2"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-[14px] font-medium leading-[1.6]"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Partners */}
        <div>
          <div className="text-center mb-10">
            <h2
              className="text-[28px] sm:text-[32px] md:text-[36px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            >
              Insurance Partners
            </h2>
            <p
              className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
            >
              We accept all major health insurance plans for cashless treatment
            </p>
          </div>
          <div
            className="rounded-[20px] p-6 sm:p-8 md:p-10"
            style={{ backgroundColor: 'var(--color-brand-navy)' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {insurancePartners.map((partner, index) => (
                <div
                  key={index}
                  className="rounded-[12px] p-4 flex items-center justify-center text-center min-h-[80px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <span
                    className="text-[13px] sm:text-[14px] font-semibold leading-[1.4]"
                    style={{ fontFamily: 'var(--font-manrope)', color: '#FFFFFF' }}
                  >
                    {partner}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="text-center mt-6 text-[13px] font-medium"
              style={{ fontFamily: 'var(--font-manrope)', color: 'rgba(255,255,255,0.7)' }}
            >
              + Many more insurance companies accepted. Contact us for specific inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
