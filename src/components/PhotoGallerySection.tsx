import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal, { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', title: 'Hospital Reception', category: 'Infrastructure' },
  { id: 2, url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', title: 'Modern Operation Theater', category: 'Facilities' },
  { id: 3, url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80', title: 'ICU Ward', category: 'Facilities' },
  { id: 4, url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80', title: 'Consultation Room', category: 'Infrastructure' },
  { id: 5, url: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80', title: 'Diagnostic Lab', category: 'Facilities' },
  { id: 6, url: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=80', title: 'Patient Ward', category: 'Infrastructure' },
];

type Filter = 'All' | 'Infrastructure' | 'Facilities';

export default function PhotoGallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState<Filter>('All');

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <>
      <section id="gallery" className="bg-white">
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
          {/* Header */}
          <ScrollReveal className="text-center mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
              <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.1em] uppercase" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
                Our Facilities
              </span>
              <span className="w-6 sm:w-8 h-[2px] rounded-full inline-block" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
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
          </ScrollReveal>

          {/* Filter Buttons */}
          <ScrollReveal delay={0.1} className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            {(['All', 'Infrastructure', 'Facilities'] as Filter[]).map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-semibold transition-all duration-300"
                animate={{
                  backgroundColor: filter === cat ? 'var(--color-brand-orange)' : '#F0F4FF',
                  color: filter === cat ? '#FFFFFF' : 'var(--color-brand-navy)',
                  boxShadow: filter === cat ? '0 4px 14px rgba(247,148,29,0.3)' : 'none',
                }}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                {cat}
              </motion.button>
            ))}
          </ScrollReveal>

          {/* Gallery Grid */}
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            staggerDelay={0.07}
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={staggerItemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <motion.div
                    className="group relative rounded-[16px] overflow-hidden cursor-pointer aspect-[4/3]"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <span
                          className="text-[11px] font-bold uppercase tracking-wider mb-1 block"
                          style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}
                        >
                          {image.category}
                        </span>
                        <h3 className="text-white text-[16px] sm:text-[18px] font-bold" style={{ fontFamily: 'var(--font-manrope)' }}>
                          {image.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-2 text-white/80 text-[12px] font-medium">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                          Click to view
                        </div>
                      </div>
                    </motion.div>

                    {/* Corner shadow always visible */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </StaggerContainer>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              onClick={() => setSelectedImage(null)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.22)', scale: 1.1 }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M14 4L4 14M4 4l10 10" />
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-[20px] sm:text-[24px] font-bold mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                  {selectedImage.title}
                </h3>
                <span className="text-[13px] font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
                  {selectedImage.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
