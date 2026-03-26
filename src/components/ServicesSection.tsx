import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCounter from './ui/AnimatedCounter';
import { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';

const stats = [
  { value: 2025, suffix: '', label: 'Established' },
  { value: 50, suffix: '', label: 'Bed Facility' },
  { value: 9, suffix: '+', label: 'Specialties' },
  { value: 24, suffix: '/7', label: 'Emergency & ICU' },
];

interface Service {
  emoji: string;
  title: string;
  description: string;
  accent: string;
  accentDark: string;
  departmentId: string;
}

const services: Service[] = [
  {
    emoji: '🫁',
    title: 'Pulmonology',
    description: 'Specialized care for respiratory and lung conditions including bronchoscopy, thoracoscopy, sleep study, and allergy testing.',
    accent: '#E3F2FD',
    accentDark: '#42A5F5',
    departmentId: 'dept-pulmonology',
  },
  {
    emoji: '👁️',
    title: 'Ophthalmology',
    description: 'Complete eye care — cataract surgery (Phaco), pterygium surgery, DCR surgery, and comprehensive vision assessment.',
    accent: '#FFF8E1',
    accentDark: '#FFCA28',
    departmentId: 'dept-ophthalmology',
  },
  {
    emoji: '🧠',
    title: 'Neuro & Neuro Surgery',
    description: 'Advanced neurological care and neurosurgical procedures for brain, spine, and nervous system disorders.',
    accent: '#EDE7F6',
    accentDark: '#7E57C2',
    departmentId: 'dept-neurosurgery',
  },
  {
    emoji: '🔪',
    title: 'General Surgery',
    description: 'Comprehensive surgical procedures including laparoscopic surgery, hernia repair, and gastrointestinal surgeries.',
    accent: '#E8F5E9',
    accentDark: '#66BB6A',
    departmentId: 'dept-general-surgery',
  },
  {
    emoji: '💧',
    title: 'Urology',
    description: 'Expert care for urinary tract and male reproductive system including kidney stone treatment and prostate care.',
    accent: '#E1F5FE',
    accentDark: '#29B6F6',
    departmentId: 'dept-urology',
  },
  {
    emoji: '🫘',
    title: 'Nephrology',
    description: 'Comprehensive kidney care and dialysis services for chronic kidney disease and related disorders.',
    accent: '#FFF3E0',
    accentDark: '#FFA726',
    departmentId: 'dept-nephrology',
  },
  {
    emoji: '🦴',
    title: 'Orthopaedics',
    description: 'Advanced bone, joint & muscle treatments including joint replacement, fracture care, and sports injury management.',
    accent: '#F3E5F5',
    accentDark: '#AB47BC',
    departmentId: 'dept-orthopaedics',
  },
  {
    emoji: '👂',
    title: 'ENT',
    description: 'Ear, nose, and throat specialist care including sinus treatment, hearing loss, and voice disorder management.',
    accent: '#FCE4EC',
    accentDark: '#EC407A',
    departmentId: 'dept-ent',
  },
  {
    emoji: '🚑',
    title: 'Emergency & Critical Care',
    description: '24/7 emergency services with ICU facilities, anaesthesia, rapid response teams, and critical care monitoring.',
    accent: '#FFEBEE',
    accentDark: '#EF5350',
    departmentId: 'dept-emergency',
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  const handleServiceClick = (departmentId: string) => {
    navigate(`/doctors?dept=${departmentId}`);
  };

  return (
    <section id="services" className="bg-white">
      {/* Services Grid */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
        {/* Cards Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
          staggerDelay={0.06}
          delayChildren={0.05}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItemVariants}
            >
              <ServiceCard service={service} onClick={() => handleServiceClick(service.departmentId)} />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>

      {/* Stats Band */}
      <div style={{ backgroundColor: 'var(--color-brand-navy)' }}>
        <StaggerContainer
          className="px-4 sm:px-6 md:px-10 lg:px-20 py-8 md:py-10 max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/20"
          staggerDelay={0.1}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={staggerItemVariants}
              className="flex flex-col items-center gap-1 px-4"
            >
              <span
                className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-orange)' }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </span>
              <span
                className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-center"
                style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.75)' }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ServiceCard({ service, onClick }: { service: Service; onClick: () => void }) {
  return (
    <motion.div
      className="group flex flex-col gap-4 rounded-[20px] p-5 md:p-6 border cursor-pointer h-full"
      style={{ backgroundColor: '#FAFBFF', borderColor: '#f3f4f6' }}
      onClick={onClick}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 40px rgba(26,36,114,0.12)',
        borderColor: 'var(--color-brand-orange)',
        backgroundColor: '#FFFFFF',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Icon bubble */}
      <motion.div
        className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-[14px] flex items-center justify-center text-[24px] sm:text-[26px] flex-shrink-0"
        style={{ backgroundColor: service.accent }}
        whileHover={{ scale: 1.1, rotate: 4 }}
        transition={{ duration: 0.2 }}
      >
        {service.emoji}
      </motion.div>

      {/* Text */}
      <div className="flex flex-col gap-[6px]">
        <h3 className="text-[16px] sm:text-[17px] font-bold leading-[1.2] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
          {service.title}
        </h3>
        <p className="text-[13px] sm:text-[14px] font-medium leading-[1.6]" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}>
          {service.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="mt-auto flex items-center gap-1">
        <motion.span
          className="text-[13px] font-bold"
          style={{ color: 'var(--color-brand-orange)' }}
          whileHover={{ x: 4 }}
        >
          View Specialist →
        </motion.span>
      </div>
    </motion.div>
  );
}
