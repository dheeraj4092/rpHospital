/* ServicesSection — replaces the old 4-card FeatureCards component */

const stats = [
  { value: '15,000+', label: 'Happy Patients' },
  { value: '25+', label: 'Years of Excellence' },
  { value: '50+', label: 'Specialist Doctors' },
  { value: '30+', label: 'Departments' },
];

interface Service {
  emoji: string;
  title: string;
  description: string;
  accent: string;
}

const services: Service[] = [
  {
    emoji: '🫀',
    title: 'Cardiology',
    description: 'Expert heart care with advanced diagnostics and interventional procedures.',
    accent: '#FDECEA',
  },
  {
    emoji: '🧠',
    title: 'Neurology',
    description: 'Comprehensive care for brain, spine and nervous system disorders.',
    accent: '#EDE7F6',
  },
  {
    emoji: '🦴',
    title: 'Orthopedics',
    description: 'Advanced bone, joint & muscle treatments with minimal recovery time.',
    accent: '#E3F2FD',
  },
  {
    emoji: '👶',
    title: 'Pediatrics',
    description: 'Gentle, expert healthcare for infants, children and adolescents.',
    accent: '#E8F5E9',
  },
  {
    emoji: '👁️',
    title: 'Ophthalmology',
    description: 'Complete eye care — from routine check-ups to complex surgeries.',
    accent: '#FFF8E1',
  },
  {
    emoji: '🔬',
    title: 'Oncology',
    description: 'Cutting-edge cancer diagnosis and treatment by expert oncologists.',
    accent: '#FCE4EC',
  },
  {
    emoji: '🤰',
    title: 'Gynecology',
    description: "Comprehensive women's health services and maternity care.",
    accent: '#FFF3E0',
  },
  {
    emoji: '🚑',
    title: 'Emergency Care',
    description: '24/7 emergency services with rapid response and critical care teams.',
    accent: '#FFEBEE',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white">
      {/* ── Stats Band ── */}
      <div style={{ backgroundColor: 'var(--color-brand-navy)' }}>
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 md:py-10 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-4">
              <span
                className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-orange)' }}
              >
                {s.value}
              </span>
              <span
                className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-center"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.75)' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-6 sm:w-8 h-[2px] rounded-full inline-block"
              style={{ backgroundColor: 'var(--color-brand-orange)' }}
            />
            <span
              className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
            >
              Our Specializations
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
            Comprehensive Medical Care
          </h2>
          <p
            className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto px-4"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
          >
            From preventive care to complex surgeries, our specialists are equipped
            to handle every medical need with precision and compassion.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className="group flex flex-col gap-4 rounded-[20px] p-5 md:p-6 border border-gray-100 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundColor: '#FAFBFF' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-brand-orange)';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FFFFFF';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#f3f4f6';
        (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FAFBFF';
      }}
    >
      {/* Icon bubble */}
      <div
        className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-[14px] flex items-center justify-center text-[24px] sm:text-[26px] flex-shrink-0"
        style={{ backgroundColor: service.accent }}
      >
        {service.emoji}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-[6px]">
        <h3
          className="text-[16px] sm:text-[17px] font-bold leading-[1.2] tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
        >
          {service.title}
        </h3>
        <p
          className="text-[13px] sm:text-[14px] font-medium leading-[1.6]"
          style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
        >
          {service.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="mt-auto">
        <span
          className="text-[13px] font-bold transition-colors"
          style={{ color: 'var(--color-brand-orange)' }}
        >
          Learn more →
        </span>
      </div>
    </div>
  );
}
