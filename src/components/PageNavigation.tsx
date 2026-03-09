import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IconChevronLeft,
  IconChevronRight,
  IconHome,
  IconInfoCircle,
  IconStethoscope,
  IconUserHeart,
  IconPhoto,
  IconPhone,
} from '@tabler/icons-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string; stroke?: number }>;
  color: string;
  desc: string;
}

const allPages: NavItem[] = [
  { path: '/', label: 'Home', icon: IconHome, color: '#F7941D', desc: 'Back to homepage' },
  { path: '/about', label: 'About', icon: IconInfoCircle, color: '#3B82F6', desc: 'Our story & values' },
  { path: '/services', label: 'Services', icon: IconStethoscope, color: '#10B981', desc: 'Medical specialties' },
  { path: '/doctors', label: 'Doctors', icon: IconUserHeart, color: '#8B5CF6', desc: 'Meet our specialists' },
  { path: '/gallery', label: 'Gallery', icon: IconPhoto, color: '#EC4899', desc: 'Our facility photos' },
  { path: '/contact', label: 'Contact', icon: IconPhone, color: '#F59E0B', desc: 'Reach us anytime' },
];

export default function PageNavigation() {
  const location = useLocation();
  const currentIndex = allPages.findIndex((page) => page.path === location.pathname);

  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;
  const currentPage = allPages[currentIndex];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D1240 0%, var(--color-brand-navy) 50%, #1E2D8A 100%)',
      }}
    >
      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative orbs */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.25) 0%, transparent 70%)', transform: 'translate(30%, -40%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-14 max-w-[1440px] mx-auto">

        {/* Header label */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0, margin: '200px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-1">
            <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-inter)' }}
            >
              Continue Exploring
            </span>
            <div className="h-px w-8" style={{ background: 'rgba(255,255,255,0.15)' }} />
          </div>
          {currentPage && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentPage.color + '30', border: `1px solid ${currentPage.color}50` }}
              >
                <currentPage.icon size={11} color={currentPage.color} />
              </div>
              <span
                className="text-[12px] font-semibold"
                style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-inter)' }}
              >
                Currently viewing: <span style={{ color: currentPage.color }}>{currentPage.label}</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Prev / Page Dots / Next Row */}
        <div className="flex items-stretch gap-3 sm:gap-5 mb-10">

          {/* Previous */}
          <div className="w-[140px] sm:w-[200px] shrink-0">
            {prevPage ? (
              <Link to={prevPage.path} className="group block h-full">
                <motion.div
                  className="h-full rounded-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 cursor-pointer"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.11)', x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileHover={{ backgroundColor: prevPage.color + '30' }}
                  >
                    <IconChevronLeft size={18} color="rgba(255,255,255,0.7)" />
                  </motion.div>
                  <div className="overflow-hidden min-w-0">
                    <div
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}
                    >
                      Previous
                    </div>
                    <div
                      className="text-[12px] sm:text-[13px] font-bold text-white truncate"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {prevPage.label}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="h-full rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.06)' }} />
            )}
          </div>

          {/* Center: icon progress dots */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {allPages.map((page, i) => {
                const Icon = page.icon;
                const isActive = i === currentIndex;
                const isPast = i < currentIndex;
                return (
                  <Link key={page.path} to={page.path} title={page.label}>
                    <motion.div
                      className="rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        width: isActive ? 36 : 24,
                        height: isActive ? 36 : 24,
                        backgroundColor: isActive
                          ? page.color
                          : isPast
                          ? page.color + '28'
                          : 'rgba(255,255,255,0.08)',
                        border: isActive
                          ? `2px solid ${page.color}80`
                          : isPast
                          ? `1.5px solid ${page.color}40`
                          : '1.5px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive ? `0 4px 16px ${page.color}50` : 'none',
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <Icon
                        size={isActive ? 17 : 11}
                        color={isActive ? 'white' : isPast ? page.color : 'rgba(255,255,255,0.35)'}
                        stroke={2}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            <span
              className="text-[10px] sm:text-[11px] font-medium tabular-nums"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-inter)' }}
            >
              Page {currentIndex + 1} of {allPages.length}
            </span>
          </div>

          {/* Next */}
          <div className="w-[140px] sm:w-[200px] shrink-0 flex justify-end">
            {nextPage ? (
              <Link to={nextPage.path} className="group block h-full w-full">
                <motion.div
                  className="h-full rounded-2xl p-3 sm:p-4 flex items-center justify-end gap-2 sm:gap-3 cursor-pointer"
                  style={{ backgroundColor: 'rgba(247,148,29,0.08)', border: '1px solid rgba(247,148,29,0.18)' }}
                  whileHover={{ backgroundColor: 'rgba(247,148,29,0.14)', x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="overflow-hidden text-right min-w-0">
                    <div
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}
                    >
                      Next
                    </div>
                    <div
                      className="text-[12px] sm:text-[13px] font-bold text-white truncate"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {nextPage.label}
                    </div>
                  </div>
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-brand-orange)' }}
                    whileHover={{ scale: 1.08 }}
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <IconChevronRight size={18} color="white" />
                  </motion.div>
                </motion.div>
              </Link>
            ) : (
              /* On last page, show Go Home */
              <Link to="/" className="group block h-full w-full">
                <motion.div
                  className="h-full rounded-2xl p-3 sm:p-4 flex items-center justify-end gap-2 sm:gap-3 cursor-pointer"
                  style={{ backgroundColor: 'rgba(247,148,29,0.1)', border: '1px solid rgba(247,148,29,0.22)' }}
                  whileHover={{ backgroundColor: 'rgba(247,148,29,0.18)', x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="overflow-hidden text-right min-w-0">
                    <div
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-0.5"
                      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-inter)' }}
                    >
                      Return
                    </div>
                    <div
                      className="text-[12px] sm:text-[13px] font-bold text-white"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      Homepage
                    </div>
                  </div>
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-brand-orange)' }}
                    whileHover={{ scale: 1.08 }}
                  >
                    <IconHome size={18} color="white" />
                  </motion.div>
                </motion.div>
              </Link>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />

        {/* Quick Navigation Grid */}
        <div>
          <p
            className="text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] mb-5"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)' }}
          >
            Quick Navigation
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {allPages.map((page) => {
              const Icon = page.icon;
              const isActive = page.path === location.pathname;
              return (
                <Link key={page.path} to={page.path}>
                  <motion.div
                    className="flex flex-col items-center gap-2 rounded-2xl py-4 sm:py-5 px-2 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? page.color + '22' : 'rgba(255,255,255,0.05)',
                      border: isActive ? `1.5px solid ${page.color}55` : '1.5px solid rgba(255,255,255,0.07)',
                    }}
                    whileHover={{
                      backgroundColor: isActive ? page.color + '30' : 'rgba(255,255,255,0.1)',
                      y: -4,
                      boxShadow: `0 8px 24px ${isActive ? page.color + '40' : 'rgba(0,0,0,0.3)'}`,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon bubble */}
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isActive ? page.color : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 4px 14px ${page.color}50` : 'none',
                      }}
                      whileHover={!isActive ? { backgroundColor: page.color + '30' } : {}}
                    >
                      <Icon
                        size={18}
                        color={isActive ? 'white' : 'rgba(255,255,255,0.55)'}
                        stroke={2}
                      />
                    </motion.div>

                    <div className="flex flex-col items-center gap-0.5">
                      <span
                        className="text-[11px] sm:text-[12px] font-bold text-center leading-tight"
                        style={{
                          color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {page.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="w-3 h-0.5 rounded-full"
                          style={{ backgroundColor: page.color }}
                          layoutId="nav-active-bar"
                        />
                      )}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom copyright strip */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <span
            className="text-[11px] font-medium"
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-inter)' }}
          >
            © {new Date().getFullYear()} R.P Super Speciality Hospital, Nizamabad
          </span>
          <span
            className="text-[11px] font-medium"
            style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)' }}
          >
            Advanced Healthcare with Compassion
          </span>
        </div>
      </div>
    </div>
  );
}
