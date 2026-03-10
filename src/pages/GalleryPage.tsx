import { IconPhoto } from '@tabler/icons-react';
import PhotoGallerySection from '../components/PhotoGallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { breadcrumbJsonLd, buildPageMeta } from '../lib/seo';

export default function GalleryPage() {
  const meta = buildPageMeta('/gallery');

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Gallery', path: '/gallery' },
          ]),
        ]}
      />
      <PageHero
        title="Photo Gallery"
        subtitle="Take a virtual tour of our medical team and state-of-the-art facilities."
        tag="Gallery"
        icon={IconPhoto}
        iconColor="#EC4899"
        accentColor="#EC4899"
        breadcrumb={[{ label: 'Gallery' }]}
      />
      <PhotoGallerySection />
      <TestimonialsSection />
      <PageNavigation />
    </>
  );
}
