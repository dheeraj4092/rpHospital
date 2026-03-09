import { IconPhoto } from '@tabler/icons-react';
import PhotoGallerySection from '../components/PhotoGallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';

export default function GalleryPage() {
  return (
    <>
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
