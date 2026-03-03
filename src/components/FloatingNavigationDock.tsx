import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingDock } from './ui/floating-dock';
import { scrollToSection } from '../utils/scroll';
import {
  IconInfoCircle,
  IconStethoscope,
  IconUserHeart,
  IconPhoto,
  IconPhone,
  IconTarget,
  IconAward,
  IconMessage,
  IconHelp,
} from '@tabler/icons-react';

export default function FloatingNavigationDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show dock after scrolling down 300px
      setVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dockLinks = [
    {
      title: 'About Us',
      icon: (
        <IconInfoCircle className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#about',
    },
    {
      title: 'Mission',
      icon: (
        <IconTarget className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#mission',
    },
    {
      title: 'Services',
      icon: (
        <IconStethoscope className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#services',
    },
    {
      title: 'Why Choose Us',
      icon: (
        <IconAward className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#highlights',
    },
    {
      title: 'Doctors',
      icon: (
        <IconUserHeart className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#doctors',
    },
    {
      title: 'Gallery',
      icon: (
        <IconPhoto className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#gallery',
    },
    {
      title: 'Testimonials',
      icon: (
        <IconMessage className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#testimonials',
    },
    {
      title: 'FAQ',
      icon: (
        <IconHelp className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#faq',
    },
    {
      title: 'Contact',
      icon: (
        <IconPhone className="h-full w-full" style={{ color: 'var(--color-brand-navy)' }} />
      ),
      href: '#contacts',
    },
  ];

  // Add click handler to dock links
  const enhancedDockLinks = dockLinks.map(link => ({
    ...link,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const sectionId = link.href.replace('#', '');
      scrollToSection(sectionId);
    }
  }));

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ 
        duration: 0.3,
        ease: 'easeOut'
      }}
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-fit"
    >
      <div className="pointer-events-auto">
        <FloatingDock
          items={enhancedDockLinks}
          desktopClassName="border shadow-2xl"
          mobileClassName="border shadow-2xl"
          style={{
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderColor: 'rgba(26,36,114,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        />
      </div>
    </motion.div>
  );
}
