// Static hospital information - no backend required

export interface HospitalInfo {
  id: string;
  name: string;
  tagline: string;
  established: number;
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const hospitalInfo: HospitalInfo = {
  id: 'rp-hospital',
  name: 'RP Super Speciality Hospital',
  tagline: '50 Beds · ICU + Emergency · 24/7 · Super Speciality',
  established: 2025,
  address: 'Near Government Hospital, Nizamabad, Telangana - 503001, India',
  phone: '+91-98765-43210',
  email: 'contact@rphospital.com',
  emergencyPhone: '+91-98765-43211',
  operatingHours: {
    weekdays: 'Mon-Fri: 08:00 AM - 08:00 PM',
    saturday: 'Sat: 09:00 AM - 06:00 PM',
    sunday: 'Sun: 10:00 AM - 02:00 PM (Emergency 24/7)',
  },
  coordinates: {
    lat: 18.6725,
    lng: 78.0941,
  },
};
