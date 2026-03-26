"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { Doctor } from "@/data/doctors";

const HOSPITAL_PHONE = '+919090900580';
const HOSPITAL_WHATSAPP = '919090900580';

interface ExpandableDoctorCardsProps {
  doctors: Doctor[];
  onBookAppointment?: (doctor: Doctor) => void;
  /** Department id from URL (?dept=dept-ophthalmology) — auto-opens matching doctor */
  activeDeptId?: string;
}

export default function ExpandableDoctorCards({
  doctors,
  onBookAppointment,
  activeDeptId,
}: ExpandableDoctorCardsProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  /**
   * clickedToOpen tracks whether the current `active` doctor was opened by a
   * manual card click (true) or auto-opened from a URL param (false).
   * This lets us conditionally apply layoutId on the expanded modal:
   *   - Manual click  → layoutId on, so the card "expands" with a shared-layout animation
   *   - Auto-open     → no layoutId, modal just fades in (avoids painting-race with framer)
   */
  const clickedToOpen = useRef(false);

  // Synchronously compute the initial active doctor from the dept param so the
  // modal appears on the very first render — no useEffect, no timing issues.
  const [active, setActive] = useState<Doctor | null>(() => {
    if (activeDeptId) {
      return doctors.find((d) => d.department.id === activeDeptId) ?? null;
    }
    return null;
  });

  const handleCardClick = (doctor: Doctor) => {
    clickedToOpen.current = true;
    setActive(doctor);
  };

  const handleClose = () => {
    clickedToOpen.current = false;
    setActive(null);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [active]);

  useOutsideClick(ref, handleClose);

  const getWhatsAppLink = (doctor: Doctor) => {
    const msg = encodeURIComponent(
      `Hello, I would like to book an appointment with ${doctor.name} (${doctor.specialty}).`
    );
    return `https://wa.me/${HOSPITAL_WHATSAPP}?text=${msg}`;
  };

  // Shared-layout props — only applied when the doctor was opened by clicking a card
  const sharedCardProps = clickedToOpen.current && active
    ? { layoutId: `card-${active.id}-${id}` }
    : {};
  const sharedImageProps = clickedToOpen.current && active
    ? { layoutId: `image-${active.id}-${id}` }
    : {};
  const sharedTitleProps = clickedToOpen.current && active
    ? { layoutId: `title-${active.id}-${id}` }
    : {};
  const sharedSpecialtyProps = clickedToOpen.current && active
    ? { layoutId: `specialty-${active.id}-${id}` }
    : {};

  // Grid columns based on doctor count
  const gridClass =
    doctors.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
      : doctors.length <= 4
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      {/* ── Backdrop ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90]"
            style={{
              backgroundColor: "rgba(13,18,64,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Expanded doctor modal ── */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6">
            {/* Close button */}
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
              className="flex absolute top-4 right-4 items-center justify-center rounded-full h-9 w-9 shadow-xl cursor-pointer z-[110] border"
              style={{
                backgroundColor: "rgba(255,255,255,0.95)",
                borderColor: "rgba(26,36,114,0.12)",
                color: "var(--color-brand-navy)",
              }}
              onClick={handleClose}
              aria-label="Close doctor profile"
            >
              <CloseIcon />
            </motion.button>

            {/* Modal card */}
            <motion.div
              {...sharedCardProps}
              ref={ref}
              initial={!clickedToOpen.current ? { opacity: 0, scale: 0.96, y: 20 } : undefined}
              animate={!clickedToOpen.current ? { opacity: 1, scale: 1, y: 0 } : undefined}
              exit={!clickedToOpen.current ? { opacity: 0, scale: 0.96, y: 20 } : undefined}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl"
              style={{ maxWidth: 560, maxHeight: "86vh" }}
            >
              {/* Doctor image */}
              <motion.div
                {...sharedImageProps}
                className="shrink-0 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #EEF1FA 0%, #E6ECFF 100%)",
                  height: 260,
                  maxHeight: "36vh",
                }}
              >
                {active.photoUrl ? (
                  <img
                    src={active.photoUrl}
                    alt={active.name}
                    className="w-full h-full object-contain"
                    style={{ padding: "12px 14px" }}
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center text-6xl font-extrabold"
                    style={{ height: "100%", color: "var(--color-brand-navy)" }}
                  >
                    {active.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </motion.div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1" style={{ scrollbarWidth: "thin" }}>
                <div className="p-5 sm:p-6">
                  {/* Name */}
                  <motion.h3
                    {...sharedTitleProps}
                    className="text-[20px] sm:text-[22px] font-bold mb-1"
                    style={{ fontFamily: "var(--font-manrope)", color: "var(--color-brand-navy)" }}
                  >
                    {active.name}
                  </motion.h3>

                  {/* Specialty */}
                  <motion.p
                    {...sharedSpecialtyProps}
                    className="text-[14px] font-semibold mb-4"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--color-brand-orange)" }}
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
                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="rounded-xl p-3 text-center"
                        style={{ backgroundColor: "var(--color-bg-light)" }}
                      >
                        <div
                          className="text-[20px] font-extrabold"
                          style={{ color: "var(--color-brand-navy)", fontFamily: "var(--font-manrope)" }}
                        >
                          {active.experience}+
                        </div>
                        <div className="text-[11px] font-semibold mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                          Years Experience
                        </div>
                      </div>
                      {active.department && (
                        <div
                          className="rounded-xl p-3 text-center"
                          style={{ backgroundColor: "rgba(247,148,29,0.07)" }}
                        >
                          <div
                            className="text-[13px] font-bold leading-tight"
                            style={{ color: "var(--color-brand-navy)", fontFamily: "var(--font-manrope)" }}
                          >
                            {active.department.name}
                          </div>
                          <div className="text-[11px] font-semibold mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                            Department
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Qualifications */}
                    <div>
                      <SectionLabel>Qualifications</SectionLabel>
                      <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                        {active.qualifications.join(", ")}
                      </p>
                    </div>

                    {/* Department description */}
                    {active.department?.description && (
                      <div>
                        <SectionLabel>Department</SectionLabel>
                        <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {active.department.description}
                        </p>
                      </div>
                    )}

                    {/* Procedures */}
                    {active.procedures.length > 0 && (
                      <div>
                        <SectionLabel>Procedures & Expertise</SectionLabel>
                        <div className="flex flex-wrap gap-2">
                          {active.procedures.map((p, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-[11px] font-semibold"
                              style={{
                                backgroundColor: "var(--color-bg-orange-light)",
                                color: "var(--color-brand-orange)",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Memberships */}
                    {active.memberships.length > 0 && (
                      <div>
                        <SectionLabel>Professional Memberships</SectionLabel>
                        <ul className="text-[13px] space-y-1" style={{ color: "var(--color-text-muted)" }}>
                          {active.memberships.map((m, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span style={{ color: "var(--color-brand-orange)", flexShrink: 0 }}>•</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bio */}
                    {active.bio && (
                      <div>
                        <SectionLabel>About</SectionLabel>
                        <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                          {active.bio}
                        </p>
                      </div>
                    )}

                    {/* Timings */}
                    {active.timings && (
                      <div
                        className="rounded-xl p-3 flex items-center gap-3"
                        style={{ backgroundColor: "var(--color-bg-light)" }}
                      >
                        <span className="text-lg">🕐</span>
                        <div>
                          <div
                            className="text-[11px] font-bold uppercase tracking-wider mb-0.5"
                            style={{ color: "var(--color-brand-navy)", fontFamily: "var(--font-inter)" }}
                          >
                            Consultation Timings
                          </div>
                          <div className="text-[13px] font-semibold" style={{ color: "var(--color-text-muted)" }}>
                            {active.timings}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Gold Medalist */}
                    {active.isGoldMedalist && (
                      <div
                        className="flex items-center gap-2 p-3 rounded-xl"
                        style={{ backgroundColor: "#FFF8E1", border: "1px solid #FFE082" }}
                      >
                        <span className="text-xl">🏆</span>
                        <span className="text-[13px] font-bold" style={{ color: "#B8860B" }}>
                          Gold Medalist
                        </span>
                      </div>
                    )}

                    {/* ── Action buttons ── */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      {/* Call */}
                      <motion.a
                        href={`tel:${HOSPITAL_PHONE}`}
                        className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold border cursor-pointer no-underline"
                        style={{
                          fontFamily: "var(--font-manrope)",
                          borderColor: "var(--color-brand-navy)",
                          color: "var(--color-brand-navy)",
                          backgroundColor: "transparent",
                          minHeight: "44px",
                        }}
                        whileHover={{ backgroundColor: "var(--color-bg-light)", scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Call hospital"
                      >
                        <PhoneIcon />
                        Call Now
                      </motion.a>

                      {/* WhatsApp */}
                      <motion.a
                        href={getWhatsAppLink(active)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-bold cursor-pointer no-underline"
                        style={{
                          fontFamily: "var(--font-manrope)",
                          backgroundColor: "#25D366",
                          color: "#ffffff",
                          boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                          minHeight: "44px",
                        }}
                        whileHover={{ opacity: 0.92, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="Chat on WhatsApp"
                      >
                        <WhatsAppIcon />
                        WhatsApp
                      </motion.a>
                    </div>

                    {/* Book Appointment */}
                    <motion.button
                      onClick={() => {
                        if (onBookAppointment) {
                          onBookAppointment(active);
                          handleClose();
                        }
                      }}
                      className="w-full rounded-xl py-3.5 text-[14px] font-bold cursor-pointer border-none"
                      style={{
                        fontFamily: "var(--font-manrope)",
                        backgroundColor: "var(--color-brand-orange)",
                        color: "#ffffff",
                        boxShadow: "0 4px 18px rgba(247,148,29,0.35)",
                        minHeight: "44px",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(247,148,29,0.45)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      📅 Book Appointment
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Cards grid ── */}
      <div className={`grid gap-5 md:gap-6 ${gridClass}`}>
        {doctors.map((doctor) => (
          <motion.div
            layoutId={`card-${doctor.id}-${id}`}
            key={doctor.id}
            onClick={() => handleCardClick(doctor)}
            className="flex flex-col gap-5 bg-white rounded-[22px] overflow-hidden p-6 md:p-7 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <motion.div
              layoutId={`image-${doctor.id}-${id}`}
              className="w-full rounded-[14px] overflow-hidden flex items-center justify-center"
              style={{
                aspectRatio: "5 / 4",
                background: "linear-gradient(135deg, #EEF1FA 0%, #E6ECFF 100%)",
              }}
            >
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-contain"
                  style={{ padding: "14px 16px" }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-extrabold"
                  style={{ color: "var(--color-brand-navy)" }}
                >
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-[6px]">
              <motion.h3
                layoutId={`title-${doctor.id}-${id}`}
                className="text-[16px] sm:text-[18px] font-bold leading-[1.2] tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-manrope)", color: "var(--color-brand-navy)" }}
              >
                {doctor.name}
              </motion.h3>
              <motion.p
                layoutId={`specialty-${doctor.id}-${id}`}
                className="text-[12px] sm:text-[13px] font-semibold"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-brand-orange)" }}
              >
                {doctor.specialty}
              </motion.p>
              <p
                className="text-[12px] sm:text-[13px] font-medium"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-text-muted)" }}
              >
                {doctor.qualifications.slice(0, 2).join(", ")}
              </p>
              <p
                className="text-[12px] sm:text-[13px] font-medium"
                style={{ fontFamily: "var(--font-inter)", color: "var(--color-text-muted)" }}
              >
                {doctor.experience}+ Years Experience
              </p>
              {doctor.isGoldMedalist && (
                <span
                  className="text-[11px] sm:text-[12px] font-bold inline-flex items-center gap-1 mt-1"
                  style={{ color: "#B8860B" }}
                >
                  🏆 Gold Medalist
                </span>
              )}
            </div>

            <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[12px] font-semibold" style={{ color: "var(--color-brand-orange)" }}>
                View Profile →
              </span>
              <div
                className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "var(--color-bg-light)", color: "var(--color-brand-navy)" }}
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

// ── Small helpers ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-bold text-[12px] uppercase tracking-wider mb-2"
      style={{ color: "var(--color-brand-navy)", fontFamily: "var(--font-inter)" }}
    >
      {children}
    </h4>
  );
}

export const CloseIcon = () => (
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

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
