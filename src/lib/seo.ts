import { hospitalInfo } from '../data/hospital';
import { doctors } from '../data/doctors';
import { faqItems } from '../data/faqs';

const canonicalBase = 'https://www.rphospitals.in';
const siteName = 'RP Super Speciality Hospital';
const defaultDescription = 'RP Super Speciality Hospital in Nizamabad delivers multi-speciality care with 24/7 emergency, ICU, advanced diagnostics, and expert doctors.';
const defaultImage = '/DSC02949.png';

export type Breadcrumb = { label: string; path?: string };

const trimSlashes = (value: string) => value.replace(/\/+$/, '').replace(/^\/+/, '');

export const getCanonicalUrl = (path = '/') => {
  if (path.startsWith('http')) return path;
  const sanitizedBase = trimSlashes(canonicalBase);
  const sanitizedPath = path === '/' ? '' : trimSlashes(path);
  const url = `${sanitizedBase}/${sanitizedPath}`;
  return url.endsWith('/') && sanitizedPath ? url.slice(0, -1) : url;
};

export const buildTitle = (title?: string) => {
  if (!title) return `${siteName} | Nizamabad Hospital`;
  return `${title} | ${siteName}`;
};

export const baseMeta = {
  siteName,
  defaultDescription,
  defaultImage,
  canonicalBase,
};

export const organizationJsonLd = () => {
  const addressParts = hospitalInfo.address.split(',').map((p) => p.trim());
  const streetAddress = addressParts.slice(0, -2).join(', ');
  const [city = 'Nizamabad', region = 'Telangana - 503001 India'] = addressParts.slice(-2);

  const geo = hospitalInfo.coordinates
    ? {
        '@type': 'GeoCoordinates',
        latitude: hospitalInfo.coordinates.lat,
        longitude: hospitalInfo.coordinates.lng,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': getCanonicalUrl('/#organization'),
    name: hospitalInfo.name,
    description: defaultDescription,
    url: getCanonicalUrl('/'),
    telephone: hospitalInfo.phone,
    email: hospitalInfo.email,
    image: getCanonicalUrl(defaultImage),
    priceRange: 'INR',
    medicalSpecialty: doctors.map((d) => d.specialty),
    address: {
      '@type': 'PostalAddress',
      streetAddress: streetAddress || hospitalInfo.address,
      addressLocality: city,
      addressRegion: region,
      addressCountry: 'India',
    },
    geo,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: hospitalInfo.operatingHours.weekdays.split('-')[0]?.trim() || '08:00',
        closes: hospitalInfo.operatingHours.weekdays.split('-')[1]?.trim() || '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: hospitalInfo.operatingHours.saturday.split(': ')[1]?.split(' - ')[0] || '09:00',
        closes: hospitalInfo.operatingHours.saturday.split('-')[1]?.trim() || '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: hospitalInfo.operatingHours.sunday.includes('Emergency') ? '00:00' : '10:00',
        closes: hospitalInfo.operatingHours.sunday.includes('Emergency') ? '23:59' : '14:00',
      },
    ],
    sameAs: [
      // Placeholder socials — update when real profiles are available
    ],
  };
};

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: getCanonicalUrl('/'),
  potentialAction: {
    '@type': 'SearchAction',
    target: `${getCanonicalUrl('/')}?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

export const breadcrumbJsonLd = (breadcrumb: Breadcrumb[]) => {
  const itemListElement = breadcrumb.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.label,
    item: item.path ? getCanonicalUrl(item.path) : getCanonicalUrl('/'),
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
};

export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
});

export const doctorsJsonLd = () =>
  doctors.map((doctor) => ({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    description: doctor.bio || `${doctor.specialty} with ${doctor.experience}+ years of experience`,
    medicalSpecialty: doctor.specialty,
    url: getCanonicalUrl('/doctors'),
    memberOf: doctor.memberships?.length ? doctor.memberships : undefined,
    image: doctor.photoUrl ? getCanonicalUrl(doctor.photoUrl) : undefined,
    alumniOf: doctor.qualifications,
    availableService: doctor.procedures,
    aggregateRating: undefined,
    worksFor: {
      '@type': 'Hospital',
      name: hospitalInfo.name,
      url: getCanonicalUrl('/'),
    },
  }));

export const routeMeta = {
  '/': {
    title: 'RP Super Speciality Hospital | Nizamabad Multi-Speciality Hospital',
    description: defaultDescription,
  },
  '/about': {
    title: 'About RP Super Speciality Hospital',
    description: 'Learn about RP Super Speciality Hospital, our mission, vision, and commitment to compassionate, advanced healthcare.',
  },
  '/services': {
    title: 'Medical Services & Specialties',
    description: 'Explore our medical departments including Pulmonology, Ophthalmology, Neurosurgery, General Surgery, Urology, Nephrology, Orthopaedics, ENT, and Emergency care.',
  },
  '/doctors': {
    title: 'Specialist Doctors at RP Super Speciality Hospital',
    description: 'Meet our specialist doctors with expertise across pulmonology, ophthalmology, neurosurgery, orthopaedics, and more.',
  },
  '/gallery': {
    title: 'Hospital Photo Gallery',
    description: 'View our hospital facilities, ICU, operation theaters, diagnostics, and medical team in the photo gallery.',
  },
  '/contact': {
    title: 'Contact RP Super Speciality Hospital',
    description: 'Contact RP Super Speciality Hospital in Nizamabad for appointments, emergencies, and general enquiries.',
  },
};

export const buildPageMeta = (path: keyof typeof routeMeta) => ({
  title: buildTitle(routeMeta[path].title),
  description: routeMeta[path].description,
  canonicalPath: path,
});
