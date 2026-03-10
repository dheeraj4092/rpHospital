import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import AppointmentModal from './components/AppointmentModal';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
import { api } from './services/api';
import { doctors } from './data/doctors';

function AppContent() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentPrefillData, setAppointmentPrefillData] = useState<{
    doctorId?: string;
    doctorName?: string;
    department?: string;
    source?: string;
    campaign?: string;
  } | undefined>(undefined);

  // Handle deeplink on mount
  useEffect(() => {
    const handleDeeplink = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const signed = urlParams.get('signed');
      const doctorIdParam = urlParams.get('doctorId');
      const sourceParam = urlParams.get('source');
      const campaignParam = urlParams.get('campaign');

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
          trackDeeplinkEvent('deeplink_clicked', {
            doctorId: doctor.id,
            source: sourceParam,
            campaign: campaignParam,
          });
        }
        return;
      }

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
              trackDeeplinkEvent('deeplink_clicked', {
                doctorId: doctor.id,
                source,
                campaign,
                type: 'signed',
              });
            } else {
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
    console.log('[Analytics]', eventName, data);
  };

  const showDeeplinkError = (message: string) => {
    alert(`Booking link error: ${message}\n\nPlease visit our website to book an appointment.`);
  };

  const handleAppointmentClose = () => {
    setIsAppointmentModalOpen(false);
    if (window.location.search) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return (
    <>
      <Layout>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
      {/* Global deeplink appointment modal */}
      {isAppointmentModalOpen && (
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={handleAppointmentClose}
          prefillData={appointmentPrefillData}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
