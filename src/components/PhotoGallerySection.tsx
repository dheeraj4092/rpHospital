import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal, { StaggerContainer, staggerItemVariants } from './ui/ScrollReveal';

type Category = 'Doctors' | 'Infrastructure';

type GalleryItem = {
  id: string;
  url: string;
  title: string;
  category: Category;
};

type ManifestImage = {
  key?: string;
  url?: string;
  title?: string;
  description?: string;
};

type ManifestImageEntry = ManifestImage | string;

type GalleryManifest = {
  doctors?: ManifestImageEntry[];
  infrastructure?: ManifestImageEntry[];
  infra?: ManifestImageEntry[]; // allow alternate key
};

const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL || 'https://rphospital.s3.ap-south-1.amazonaws.com';
const S3_DOCTORS_PREFIX = import.meta.env.VITE_S3_DOCTORS_PREFIX || 'doctors/';
const S3_INFRA_PREFIX = import.meta.env.VITE_S3_INFRA_PREFIX || 'infrastructure/';
const MANIFEST_URL = import.meta.env.VITE_GALLERY_MANIFEST_URL;

const fallbackDoctors: GalleryItem[] = [
  {
    id: 'doctor-1',
    url: 'https://images.unsplash.com/photo-1527610276290-f1c927ff3a08?w=800&q=80',
    title: 'Lead Pulmonologist',
    category: 'Doctors',
  },
  {
    id: 'doctor-2',
    url: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80',
    title: 'Senior Ophthalmologist',
    category: 'Doctors',
  },
];

const fallbackInfrastructure: GalleryItem[] = [
  {
    id: 'infra-1',
    url: 'https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=800&q=80',
    title: 'Reception & Waiting Lounge',
    category: 'Infrastructure',
  },
  {
    id: 'infra-2',
    url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    title: 'Modular Operation Theater',
    category: 'Infrastructure',
  },
  {
    id: 'infra-3',
    url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80',
    title: 'ICU & Critical Care',
    category: 'Infrastructure',
  },
  {
    id: 'infra-4',
    url: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=80',
    title: 'Premium Patient Rooms',
    category: 'Infrastructure',
  },
];

function buildUrl(keyOrUrl?: string, prefix?: string) {
  if (!keyOrUrl) return undefined;
  if (keyOrUrl.startsWith('http')) return keyOrUrl;
  const trimmed = keyOrUrl.replace(/^\/+/, '');
  return `${S3_BASE_URL}/${(prefix || '').replace(/\/+$/, '')}/${trimmed}`;
}

function deriveTitleFromKey(key?: string) {
  if (!key) return 'Hospital Photo';
  const base = key.split('/').pop() || key;
  const name = base.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function mapManifestImages(images: ManifestImageEntry[] | undefined, category: Category, prefix: string) {
  return (images || [])
    .map((entry, index) => {
      const item: ManifestImage = typeof entry === 'string' ? { key: entry } : entry;
      const url = buildUrl(item.url || item.key, prefix);
      if (!url) return null;
      return {
        id: `${category.toLowerCase()}-${index}-${item.key || item.url || 'img'}`,
        url,
        title: item.title || deriveTitleFromKey(item.key || item.url),
        category,
      } as GalleryItem;
    })
    .filter(Boolean) as GalleryItem[];
}

export default function PhotoGallerySection() {
  const [doctorsImages, setDoctorsImages] = useState<GalleryItem[]>([]);
  const [infraImages, setInfraImages] = useState<GalleryItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadManifest() {
      setLoading(true);
      setError(null);
      try {
        if (!MANIFEST_URL) {
          throw new Error('No manifest URL configured');
        }

        const response = await fetch(MANIFEST_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to fetch gallery manifest');
        }

        const manifest = (await response.json()) as GalleryManifest;
        const mappedDoctors = mapManifestImages(manifest.doctors, 'Doctors', S3_DOCTORS_PREFIX);
        const mappedInfra = mapManifestImages(manifest.infrastructure || manifest.infra, 'Infrastructure', S3_INFRA_PREFIX);

        if (!mappedDoctors.length && !mappedInfra.length) {
          throw new Error('Manifest is empty');
        }

        setDoctorsImages(mappedDoctors);
        setInfraImages(mappedInfra);
        setLoading(false);
      } catch (err: any) {
        if (err?.name === 'AbortError' || controller.signal.aborted) {
          return; // ignore aborted fetch on unmount/reload
        }
        console.error('Gallery manifest load failed:', err);
        setDoctorsImages(fallbackDoctors);
        setInfraImages(fallbackInfrastructure);
        setError('Unable to load latest gallery images. Showing fallback set.');
        setLoading(false);
      }
    }

    loadManifest();

    return () => controller.abort();
  }, [reloadKey]);

  const gallerySections = useMemo(() => ([
    { title: 'Doctors Gallery', items: doctorsImages },
    { title: 'Infrastructure Gallery', items: infraImages },
  ]), [doctorsImages, infraImages]);

  const allImages = useMemo(() => gallerySections.flatMap((s) => s.items), [gallerySections]);

  const selectedImage = selectedIndex !== null ? allImages[selectedIndex] ?? null : null;

  const navigate = (dir: -1 | 1) => {
    if (selectedIndex === null || allImages.length === 0) return;
    setSelectedIndex((selectedIndex + dir + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') navigate(-1);
      else if (e.key === 'ArrowRight') navigate(1);
      else if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, allImages.length]);

  return (
    <>
      <section id="gallery" className="bg-white">
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 max-w-[1440px] mx-auto">
          {/* Status / Actions */}
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            {loading && (
              <span className="text-[14px] font-semibold" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-manrope)' }}>
                Loading gallery...
              </span>
            )}
            {!loading && error && (
              <div className="flex flex-wrap items-center justify-center gap-3 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-full" style={{ fontFamily: 'var(--font-manrope)' }}>
                <span className="text-[13px] font-semibold">{error}</span>
                <button
                  className="px-3 py-2 rounded-full text-[13px] font-semibold text-white"
                  style={{ backgroundColor: 'var(--color-brand-orange)' }}
                  onClick={() => setReloadKey((k) => k + 1)}
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Gallery Sections */}
          <div className="space-y-12">
            {gallerySections.map((section) => (
              <div key={section.title} className="space-y-4">
                <ScrollReveal>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-brand-orange)' }} />
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-extrabold" style={{ fontFamily: 'var(--font-manrope)', color: 'var(--color-brand-navy)' }}>
                      {section.title}
                    </h3>
                  </div>
                </ScrollReveal>

                {section.items.length === 0 ? (
                  <div className="text-[14px] text-center py-6 rounded-xl" style={{ color: 'var(--color-text-muted)', backgroundColor: '#F8FAFF', fontFamily: 'var(--font-manrope)' }}>
                    No images available yet.
                  </div>
                ) : (
                  <StaggerContainer
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    staggerDelay={0.07}
                    animateImmediately
                  >
                    <AnimatePresence mode="popLayout">
                      {section.items.map((image) => (
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
                            onClick={() => setSelectedIndex(allImages.findIndex((img) => img.id === image.id))}
                          >
                            <img
                              src={image.url}
                              alt={image.title}
                              loading="lazy"
                              decoding="async"
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

                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </StaggerContainer>
                )}
              </div>
            ))}
          </div>
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
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close */}
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              onClick={() => setSelectedIndex(null)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.22)', scale: 1.1 }}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M14 4L4 14M4 4l10 10" />
              </svg>
            </motion.button>

            {/* Prev button */}
            <motion.button
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.25)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>

            {/* Next button */}
            <motion.button
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.25)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.94, opacity: 0, x: 0 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-[13px] font-semibold uppercase tracking-wider" style={{ fontFamily: 'var(--font-inter)', color: 'var(--color-brand-orange)' }}>
                    {selectedImage.category}
                  </span>
                  <span className="text-white/40 text-[13px]">·</span>
                  <span className="text-white/60 text-[13px] font-medium" style={{ fontFamily: 'var(--font-inter)' }}>
                    {selectedIndex !== null ? selectedIndex + 1 : 0} / {allImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
