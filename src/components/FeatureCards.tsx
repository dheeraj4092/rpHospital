import ArrowRightIcon from '../assets/arrow-right.svg?react';
import videoConsultImg from '../assets/illustration-video-consultation.png';
import findDoctorsImg from '../assets/illustration-find-doctors.png';
import medicineImg from '../assets/illustration-medicine.png';
import labTestsImg from '../assets/illustration-lab-tests.png';

interface FeatureCard {
  title: string;
  subtitle: string;
  bg: string;
  illustration: string;
  illustrationAlt: string;
}

const cards: FeatureCard[] = [
  {
    title: 'Instant Video Consultation.',
    subtitle: 'Connect Within 60 Seconds.',
    bg: '#a3dac2',
    illustration: videoConsultImg,
    illustrationAlt: 'Video consultation illustration',
  },
  {
    title: 'Find The Doctors Near You.',
    subtitle: 'Confirmed Appointments.',
    bg: '#f0da69',
    illustration: findDoctorsImg,
    illustrationAlt: 'Find doctors illustration',
  },
  {
    title: '24/7 Medicine.',
    subtitle: 'Essentials At Your Doorstep.',
    bg: '#e7c2d4',
    illustration: medicineImg,
    illustrationAlt: 'Medicine delivery illustration',
  },
  {
    title: 'Lab Tests.',
    subtitle: 'Simple Pickup At Your Home.',
    bg: '#92bdf6',
    illustration: labTestsImg,
    illustrationAlt: 'Lab tests illustration',
  },
];

export default function FeatureCards() {
  return (
    <section className="grid grid-cols-4 gap-5 px-0">
      {cards.map((card) => (
        <div
          key={card.title}
          className="relative flex flex-col rounded-[25px] overflow-hidden min-h-[300px] pt-10 px-10 pb-0"
          style={{ backgroundColor: card.bg }}
        >
          {/* Text content */}
          <div className="flex flex-col gap-[10px] z-10">
            <h3
              className="text-[--color-navy] text-[33px] font-semibold leading-[1.2] tracking-[-0.02em] capitalize"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {card.title}
            </h3>
            <p
              className="text-[--color-navy] text-[15px] font-normal leading-[1.2] tracking-[-0.02em] capitalize"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {card.subtitle}
            </p>
          </div>

          {/* Arrow button */}
          <div className="mt-auto mb-10 z-10">
            <button
              className="w-[50px] h-[50px] rounded-full bg-[--color-navy] flex items-center justify-center border-none cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Learn more"
            >
              <ArrowRightIcon className="w-[14px] h-[14px] text-white fill-white" />
            </button>
          </div>

          {/* Illustration - positioned bottom right */}
          <div className="absolute bottom-0 right-0 w-[65%] pointer-events-none">
            <img
              src={card.illustration}
              alt={card.illustrationAlt}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
