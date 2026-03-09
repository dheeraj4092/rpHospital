"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { Doctor } from "@/data/doctors";

interface ExpandableDoctorCardsProps {
  doctors: Doctor[];
  onBookAppointment?: (doctor: Doctor) => void;
}

export default function ExpandableDoctorCards({ doctors, onBookAppointment }: ExpandableDoctorCardsProps) {
  const [active, setActive] = useState<Doctor | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90]"
            style={{ backgroundColor: 'rgba(13,18,64,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          />
        )}
      </AnimatePresence>

      {/* Expanded card modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6">
            {/* Always-visible close button */}
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
              className="flex absolute top-4 right-4 items-center justify-center rounded-full h-9 w-9 shadow-xl cursor-pointer z-[110] border"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderColor: 'rgba(26,36,114,0.12)',
                color: 'var(--color-brand-navy)',
              }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
              style={{ maxWidth: 560, maxHeight: '86vh' }}
            >
              {/* Doctor image */}
              <motion.div
                layoutId={`image-${active.id}-${id}`}
                className="shrink-0 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #EEF1FA 0%, #E6ECFF 100%)',
                  height: 280,
                  maxHeight: '40vh',
                }}
              >
                {active.photoUrl ? (
                  <img
                    src={active.photoUrl}
                    alt={active.name}
                    className="w-full h-full object-contain"
                    style={{ padding: '12px 14px' }}
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center text-6xl font-extrabold"
                    style={{
                      height: '100%',
                      color: 'var(--color-brand-navy)',
                    }}
                  >
                    {active.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
              </motion.div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: 'thin' }}>
                <div className="p-5 sm:p-6">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="text-[20px] sm:text-[22px] font-bold mb-1"
                    style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`specialty-${active.id}-${id}`}
                    className="text-[14px] font-semibold mb-4"
                    style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
                  >
                    {active.specialty}
                  </motion.p>

                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Quick stats row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="rounded-xl p-3 text-center"
                        style={{ backgroundColor: 'var(--color-bg-light)' }}
                      >
                        <div className="text-[20px] font-extrabold" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-manrope)' }}>
                          {active.experience}+
                        </div>
                        <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                          Years Experience
                        </div>
                      </div>
                      {active.department && (
                        <div
                          className="rounded-xl p-3 text-center"
                          style={{ backgroundColor: 'rgba(247,148,29,0.07)' }}
                        >
                          <div className="text-[13px] font-bold leading-tight" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-manrope)' }}>
                            {active.department.name}
                          </div>
                          <div className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                            Department
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Qualifications */}
                    <div>
                      <h4 className="font-bold text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                        Qualifications
                      </h4>
                      <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {active.qualifications.join(', ')}
                      </p>
                    </div>

                    {/* Department description */}
                    {active.department?.description && (
                      <div>
                        <h4 className="font-bold text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                          Department
                        </h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                          {active.department.description}
                        </p>
                      </div>
                    )}

                    {/* Procedures */}
                    {active.procedures && active.procedures.length > 0 && (
                      <div>
                        <h4 className="font-bold text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                          Procedures & Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {active.procedures.map((procedure, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-[11px] font-semibold"
                              style={{ backgroundColor: 'var(--color-bg-orange-light)', color: 'var(--color-brand-orange)' }}
                            >
                              {procedure}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Memberships */}
                    {active.memberships && active.memberships.length > 0 && (
                      <div>
                        <h4 className="font-bold text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                          Professional Memberships
                        </h4>
                        <ul className="text-[13px] space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                          {active.memberships.map((membership, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span style={{ color: 'var(--color-brand-orange)', flexShrink: 0 }}>•</span>
                              {membership}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bio */}
                    {active.bio && (
                      <div>
                        <h4 className="font-bold text-[12px] uppercase tracking-wider mb-2" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                          About
                        </h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                          {active.bio}
                        </p>
                      </div>
                    )}

                    {/* Timings */}
                    {active.timings && (
                      <div
                        className="rounded-xl p-3 flex items-center gap-3"
                        style={{ backgroundColor: 'var(--color-bg-light)' }}
                      >
                        <span className="text-lg">🕐</span>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-inter)' }}>
                            Consultation Timings
                          </div>
                          <div className="text-[13px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                            {active.timings}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gold Medalist badge */}
                    {active.isGoldMedalist && (
                      <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: '#FFF8E1', border: '1px solid #FFE082' }}>
                        <span className="text-xl">🏆</span>
                        <span className="text-[13px] font-bold" style={{ color: '#B8860B' }}>
                          Gold Medalist
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <motion.button
                      onClick={() => {
                        if (onBookAppointment) {
                          onBookAppointment(active);
                          setActive(null);
                        }
                      }}
                      className="w-full rounded-xl py-3.5 text-[14px] font-bold cursor-pointer border-none"
                      style={{
                        fontFamily: 'var(--font-manrope)',
                        backgroundColor: 'var(--color-brand-orange)',
                        color: '#ffffff',
                        boxShadow: '0 4px 18px rgba(247,148,29,0.35)',
                      }}
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(247,148,29,0.45)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Appointment with Dr. {active.name.split(' ').slice(-1)[0]}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      <div
        className={`grid gap-5 md:gap-6 ${
          doctors.length === 2
            ? 'grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {doctors.map((doctor) => (
          <motion.div
            layoutId={`card-${doctor.id}-${id}`}
            key={doctor.id}
            onClick={() => setActive(doctor)}
              className="flex flex-col gap-5 bg-white rounded-[22px] overflow-hidden p-6 md:p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <motion.div
              layoutId={`image-${doctor.id}-${id}`}
              className="w-full rounded-[14px] overflow-hidden flex items-center justify-center"
              style={{
                  aspectRatio: '5 / 4',
                background: 'linear-gradient(135deg, #EEF1FA 0%, #E6ECFF 100%)',
              }}
            >
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-contain"
                    style={{ padding: '14px 16px' }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-extrabold"
                  style={{ color: 'var(--color-brand-navy)' }}
                >
                  {doctor.name.split(' ').map((n) => n[0]).join('')}
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-[6px]">
              <motion.h3
                layoutId={`title-${doctor.id}-${id}`}
                className="text-[16px] sm:text-[18px] font-bold leading-[1.2] tracking-[-0.01em]"
                style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
              >
                {doctor.name}
              </motion.h3>
              <motion.p
                layoutId={`specialty-${doctor.id}-${id}`}
                className="text-[12px] sm:text-[13px] font-semibold"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
              >
                {doctor.specialty}
              </motion.p>
              <p
                className="text-[12px] sm:text-[13px] font-medium"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-text-muted)' }}
              >
                {doctor.qualifications.slice(0, 2).join(', ')}
              </p>
              <p
                className="text-[12px] sm:text-[13px] font-medium"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-text-muted)' }}
              >
                {doctor.experience}+ Years Experience
              </p>
              {doctor.isGoldMedalist && (
                <span
                  className="text-[11px] sm:text-[12px] font-bold inline-flex items-center gap-1 mt-1"
                  style={{ color: '#B8860B' }}
                >
                  🏆 Gold Medalist
                </span>
              )}
            </div>

            <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[12px] font-semibold" style={{ color: 'var(--color-brand-orange)' }}>
                View Profile →
              </span>
              <div
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--color-bg-light)', color: 'var(--color-brand-navy)' }}
              >
                {doctor.experience}+ yrs
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
