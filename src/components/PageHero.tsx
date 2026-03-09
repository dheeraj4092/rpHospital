import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconChevronRight, IconHome } from '@tabler/icons-react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  tag?: string;
  /** Icon component from @tabler/icons-react */
  icon?: React.ComponentType<{ size?: number; color?: string; stroke?: number }>;
  iconColor?: string;
  /** Breadcrumb items */
  breadcrumb?: { label: string; path?: string }[];
  /** Gradient accent color (hex) — defaults to brand orange */
  accentColor?: string;
}

export default function PageHero({
  title,
  subtitle,
  tag,
  icon: Icon,
  iconColor,
  breadcrumb,
  accentColor = '#F7941D',
}: PageHeroProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--color-bg-hero) 0%, #E8EEFF 50%, ${accentColor}12 100%)`,
      }}
    >
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(26,36,114,0.055) 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Accent orb top-right */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${accentColor}22 0%, ${accentColor}08 45%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Navy orb bottom-left */}
      <motion.div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(26,36,114,0.09) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 pt-10 pb-12 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 max-w-[1440px] mx-auto">

        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            className="flex items-center gap-1.5 mb-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link to="/" className="flex items-center gap-1 group">
              <IconHome size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="text-[12px] font-medium group-hover:underline"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-inter)' }}
              >
                Home
              </span>
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <IconChevronRight size={11} style={{ color: 'var(--color-text-muted)', opacity: 0.5 }} />
                {crumb.path ? (
                  <Link to={crumb.path}>
                    <span
                      className="text-[12px] font-medium hover:underline"
                      style={{
                        color: i === breadcrumb.length - 1 ? accentColor : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {crumb.label}
                    </span>
                  </Link>
                ) : (
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: accentColor, fontFamily: 'var(--font-inter)' }}
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="flex flex-col items-center text-center gap-4">
          {/* Icon circle */}
          {Icon && (
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-1"
              style={{
                backgroundColor: accentColor + '15',
                border: `1.5px solid ${accentColor}30`,
                boxShadow: `0 8px 24px ${accentColor}20`,
              }}
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Icon size={28} color={iconColor ?? accentColor} stroke={1.8} />
            </motion.div>
          )}

          {/* Tag */}
          {tag && (
            <motion.div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                backgroundColor: accentColor + '12',
                border: `1px solid ${accentColor}28`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.06 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.08em]"
                style={{ color: accentColor, fontFamily: 'var(--font-inter)' }}
              >
                {tag}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold leading-[1.15] tracking-[-0.025em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Underline accent */}
          <motion.div
            className="h-[3px] rounded-full"
            style={{ backgroundColor: accentColor, width: 48 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-[13px] sm:text-[15px] font-medium leading-[1.75] max-w-[560px]"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="h-6 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(240,244,255,0.4))' }}
      />
    </div>
  );
}
