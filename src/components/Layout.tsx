import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import Footer from './Footer';
import FloatingActionButtons from './FloatingActionButtons';
import AppointmentModal from './AppointmentModal';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

/** Scrolls to top on every route change */
function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function Layout({ children }: LayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:bg-white focus:text-[#0d1240] focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ScrollRestoration />
      <MainNavbar onAppointmentClick={() => setIsModalOpen(true)} />
      {/* top padding to clear fixed navbar (~60px on mobile, ~64px on desktop) */}
      <main id="main-content" role="main" className="pt-[60px] sm:pt-[64px]">
        {children}
        <Footer />
      </main>
      <FloatingActionButtons />
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
