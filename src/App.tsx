import { useState, useEffect } from 'react'
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
import { api } from './services/api'
import { doctors } from './data/doctors'

function App() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [appointmentPrefillData, setAppointmentPrefillData] = useState<{
    doctorId?: string;
    doctorName?: string;
    department?: string;
    source?: string;
    campaign?: string;
  } | undefined>(undefined)

  // Handle deeplink on mount
  useEffect(() => {
    const handleDeeplink = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const signed = urlParams.get('signed');
      const doctorIdParam = urlParams.get('doctorId');
      const sourceParam = urlParams.get('source');
      const campaignParam = urlParams.get('campaign');

      // Option A: Simple deeplink with query params (no signature)
      if (doctorIdParam && !signed) {
        const doctor = doctors.find(d => d.id === doctorIdParam);
        if (doctor) {
          setAppointmentPrefillData({
            doctorId: doctor.id,
            doctorName: doctor.name,
            department: doctor.department.name,
            source: sourceParam || undefined,
            campaign: campaignParam || undefined,
          });
          setIsAppointmentModalOpen(true);
          
          // Track deeplink click
          trackDeeplinkEvent('deeplink_clicked', {
            doctorId: doctor.id,
            source: sourceParam,
            campaign: campaignParam,
          });
        }
        return;
      }

      // Option B: Signed deeplink
      if (signed) {
        try {
          const response = await api.validateDeeplink(signed);
          if (response.success && response.data) {
            const { doctorId, source, campaign } = response.data;
            const doctor = doctors.find(d => d.id === doctorId);
            
            if (doctor) {
              setAppointmentPrefillData({
                doctorId: doctor.id,
                doctorName: doctor.name,
                department: doctor.department.name,
                source,
                campaign,
              });
              setIsAppointmentModalOpen(true);
              
              // Track deeplink click
              trackDeeplinkEvent('deeplink_clicked', {
                doctorId: doctor.id,
                source,
                campaign,
                type: 'signed',
              });
            } else {
              // Doctor not found - show error or fallback
              console.warn('Doctor not found for deeplink:', doctorId);
              showDeeplinkError('Doctor not available');
            }
          }
        } catch (error: any) {
          console.error('Deeplink validation error:', error);
          showDeeplinkError(error.message || 'Invalid or expired booking link');
        }
      }
    };

    handleDeeplink();
  }, []);

  const trackDeeplinkEvent = (eventName: string, data: any) => {
    // Log to console in development
    console.log('[Analytics]', eventName, data);
    
    // TODO: In production, integrate with your analytics service
    // Example: window.gtag?.('event', eventName, data);
  };

  const showDeeplinkError = (message: string) => {
    // Simple alert for now - could be replaced with a proper error modal
    alert(`Booking link error: ${message}\n\nPlease visit our website to book an appointment.`);
  };

  const handleAppointmentClose = () => {
    setIsAppointmentModalOpen(false);
    // Clear URL params after closing modal
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  const handleBookAppointment = (doctor: any) => {
    setAppointmentPrefillData({
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department.name,
    });
    setIsAppointmentModalOpen(true);
  };

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
        <DoctorsSection onBookAppointment={handleBookAppointment} />
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
        onClose={handleAppointmentClose}
        prefillData={appointmentPrefillData}
      />
    </div>
  )
}

export default App
