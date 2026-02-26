import HospitalLogo from './HospitalLogo';

export default function LogoSection() {
  return (
    <section className="bg-white">
      <div className="px-4 py-12 sm:py-16 md:py-20 max-w-[1440px] mx-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <HospitalLogo height={80} />
          <div className="h-[2px] w-24 rounded-full" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
        </div>
      </div>
    </section>
  );
}
