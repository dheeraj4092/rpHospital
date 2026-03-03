import { useState } from 'react'
import SimpleNavbar from './components/SimpleNavbar'
import FloatingNavigationDock from './components/FloatingNavigationDock'
import HeroBanner from './components/HeroBanner'
import LogoSection from './components/LogoSection'
import AboutHospitalSection from './components/AboutHospitalSection'
import MissionVisionSection from './components/MissionVisionSection'
import ServicesSection from './components/ServicesSection'
import KeyHighlightsSection from './components/KeyHighlightsSection'
import DoctorsSection from './components/DoctorsSection'
import PhotoGallerySection from './components/PhotoGallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import CTASection from './components/CTASection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import AppointmentModal from './components/AppointmentModal'
import FloatingActionButtons from './components/FloatingActionButtons'

function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <SimpleNavbar onAppointmentClick={() => setIsAppointmentModalOpen(true)} />
      <FloatingNavigationDock />
      <div className="pt-[60px] sm:pt-[72px]">
        <HeroBanner onAppointmentClick={() => setIsAppointmentModalOpen(true)} />
        <LogoSection />
        <AboutHospitalSection />
        <MissionVisionSection />
        <ServicesSection />
        <KeyHighlightsSection />
        <DoctorsSection />
        <PhotoGallerySection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>
      <FloatingActionButtons />
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  )
}

export default App
