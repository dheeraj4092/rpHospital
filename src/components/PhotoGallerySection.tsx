import { useState } from 'react';

// Placeholder gallery images - replace with actual hospital photos
const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    title: 'Hospital Reception',
    category: 'Infrastructure',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    title: 'Modern Operation Theater',
    category: 'Facilities',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    title: 'ICU Ward',
    category: 'Facilities',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80',
    title: 'Consultation Room',
    category: 'Infrastructure',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
    title: 'Diagnostic Lab',
    category: 'Facilities',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=80',
    title: 'Patient Ward',
    category: 'Infrastructure',
  },
];

export default function PhotoGallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState<'All' | 'Infrastructure' | 'Facilities'>('All');

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <>
      <section id="gallery" className="bg-white">
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
                Our Facilities
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
              Photo Gallery
            </h2>
            <p
              className="text-[14px] sm:text-[15px] font-medium leading-[1.7] max-w-[560px] mx-auto px-4"
              style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-text-muted)' }}
            >
              Take a virtual tour of our state-of-the-art facilities and infrastructure
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            {['All', 'Infrastructure', 'Facilities'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'shadow-md'
                    : 'hover:shadow-sm'
                }`}
                style={{
                  fontFamily: 'var(--font-manrope)',
                  backgroundColor: filter === cat ? 'var(--color-brand-orange)' : '#F0F4FF',
                  color: filter === cat ? '#FFFFFF' : 'var(--color-brand-navy)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative rounded-[16px] overflow-hidden cursor-pointer aspect-[4/3] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5"
                >
                  <div>
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider mb-1 block"
                      style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
                    >
                      {image.category}
                    </span>
                    <h3
                      className="text-white text-[16px] sm:text-[18px] font-bold"
                      style={{ fontFamily: 'var(--font-manrope)' }}
                    >
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3
                className="text-white text-[20px] sm:text-[24px] font-bold mb-2"
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {selectedImage.title}
              </h3>
              <span
                className="text-[13px] font-semibold uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
              >
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
