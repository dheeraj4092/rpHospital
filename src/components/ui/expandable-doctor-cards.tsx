"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { Doctor } from "@/services/api";

interface ExpandableDoctorCardsProps {
  doctors: Doctor[];
}

export default function ExpandableDoctorCards({ doctors }: ExpandableDoctorCardsProps) {
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
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-10 w-10 shadow-lg z-50"
              style={{ color: 'var(--color-brand-navy)' }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                {active.photoUrl ? (
                  <img
                    src={active.photoUrl}
                    alt={active.name}
                    className="w-full h-80 lg:h-96 object-cover object-top"
                  />
                ) : (
                  <div
                    className="w-full h-80 lg:h-96 flex items-center justify-center text-7xl font-extrabold"
                    style={{ 
                      backgroundColor: '#D0D9F5',
                      color: 'var(--color-brand-navy)'
                    }}
                  >
                    {active.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </motion.div>

              <div className="overflow-auto">
                <div className="p-6">
                  <motion.h3
                    layoutId={`title-${active.id}-${id}`}
                    className="text-2xl font-bold mb-2"
                    style={{ 
                      fontFamily: 'var(--font-manrope)',
                      color: 'var(--color-brand-navy)'
                    }}
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`specialty-${active.id}-${id}`}
                    className="text-lg font-semibold mb-4"
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      color: 'var(--color-brand-orange)'
                    }}
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
                    {/* Qualifications */}
                    <div>
                      <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                        Qualifications
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {active.qualifications.join(', ')}
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                        Experience
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        {active.experience}+ Years
                      </p>
                    </div>

                    {/* Department */}
                    {active.department && (
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                          Department
                        </h4>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                          {active.department.name}
                        </p>
                        {active.department.description && (
                          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                            {active.department.description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Procedures */}
                    {active.procedures && active.procedures.length > 0 && (
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                          Procedures & Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {active.procedures.map((procedure, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ 
                                backgroundColor: 'var(--color-bg-orange-light)',
                                color: 'var(--color-brand-orange)'
                              }}
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
                        <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                          Professional Memberships
                        </h4>
                        <ul className="text-sm space-y-1" style={{ color: 'var(--color-text-muted)' }}>
                          {active.memberships.map((membership, idx) => (
                            <li key={idx}>• {membership}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bio */}
                    {active.bio && (
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                          About
                        </h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                          {active.bio}
                        </p>
                      </div>
                    )}

                    {/* Timings */}
                    {active.timings && (
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                          Consultation Timings
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                          🕐 {active.timings}
                        </p>
                      </div>
                    )}

                    {/* Gold Medalist Badge */}
                    {active.isGoldMedalist && (
                      <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#FFF8E1' }}>
                        <span className="text-2xl">🏆</span>
                        <span className="text-sm font-bold" style={{ color: '#B8860B' }}>
                          Gold Medalist
                        </span>
                      </div>
                    )}

                    {/* Book Appointment Button */}
                    <button
                      className="w-full rounded-lg py-3 text-sm font-bold transition-all hover:shadow-lg mt-4"
                      style={{
                        fontFamily: 'var(--font-manrope)',
                        backgroundColor: 'var(--color-brand-orange)',
                        color: '#ffffff',
                      }}
                    >
                      Book Appointment with {active.name.split(' ')[0]}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <div className={`grid gap-5 md:gap-6 ${
        doctors.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {doctors.map((doctor) => (
          <motion.div
            layoutId={`card-${doctor.id}-${id}`}
            key={doctor.id}
            onClick={() => setActive(doctor)}
            className="flex flex-col gap-4 bg-white rounded-[20px] overflow-hidden p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <motion.div layoutId={`image-${doctor.id}-${id}`}>
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full rounded-[14px] object-cover object-top"
                  style={{ aspectRatio: '441 / 340' }}
                />
              ) : (
                <div
                  className="w-full rounded-[14px] flex items-center justify-center text-4xl sm:text-5xl font-extrabold"
                  style={{ 
                    aspectRatio: '441 / 340',
                    backgroundColor: '#D0D9F5',
                    color: 'var(--color-brand-navy)'
                  }}
                >
                  {doctor.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
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
            
            <div className="mt-auto pt-2 border-t border-gray-100">
              <span className="text-xs font-semibold" style={{ color: 'var(--color-brand-orange)' }}>
                Click to view details →
              </span>
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
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
