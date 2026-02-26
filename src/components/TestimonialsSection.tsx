import QuoteIcon from '../assets/icon-quote.svg?react';
import StarIcon from '../assets/icon-star.svg?react';
import testimonialCollage from '../assets/testimonial-collage.svg';
import testimonialDoctorImg from '../assets/testimonial-doctor.png';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
        {/* Left: floating patient photos collage */}
        <div className="w-full max-w-[400px] lg:max-w-none lg:w-[44%] shrink-0">
          <img
            src={testimonialCollage}
            alt="Our patients"
            className="w-full h-auto"
          />
        </div>

        {/* Right: content */}
        <div className="flex-1 flex flex-col gap-5 md:gap-6 w-full">
          <span
            className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
          >
            Testimonials
          </span>

          <h2
            className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold leading-[1.2] tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
          >
            What our patients say about us
          </h2>

          {/* Testimonial card */}
          <div
            className="rounded-[16px] md:rounded-[20px] p-5 md:p-7 flex flex-col gap-4 md:gap-5 border border-orange-100"
            style={{ backgroundColor: 'var(--color-bg-orange-light)' }}
          >
            <QuoteIcon
              className="w-[20px] h-[17px] sm:w-[24px] sm:h-[20px]"
              style={{ fill: 'var(--color-brand-orange)' }}
            />
            <p
              className="text-[14px] sm:text-[15px] font-medium leading-[1.7] tracking-[-0.01em]"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-dark)' }}
            >
              The latest equipment, high-precision digital technologies and the
              best achievements of modern world medicine have allowed R.P Super
              Speciality Hospital to deliver a completely new level of painlessness,
              safety and comfort for every patient.
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-3">
              <img
                src={testimonialDoctorImg}
                alt="Dr. Irina Petrova"
                className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] rounded-full object-cover shrink-0 border-2 border-white shadow-sm"
              />
              <div className="flex flex-col gap-[5px]">
                <span
                  className="text-[14px] sm:text-[15px] font-extrabold leading-none tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}
                >
                  Dr. Irina Petrova
                </span>
                <div className="flex gap-[6px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-[13px] h-[12px] sm:w-[14px] sm:h-[13px]"
                      style={{ fill: '#ffa526' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
