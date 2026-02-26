// In-memory data store for the application
// This can be easily replaced with a database later

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Department {
  id: string;
  name: string;
  description: string;
  services: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  qualifications: string[];
  specialty: string;
  experience: number;
  procedures: string[];
  timings: string;
  isGoldMedalist: boolean;
  memberships: string[];
  photoUrl?: string;
  bio?: string;
  isActive: boolean;
  departmentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  status: AppointmentStatus;
  doctorId?: string;
  departmentId?: string;
  notes?: string;
  preferredDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface HospitalInfo {
  id: string;
  name: string;
  tagline: string;
  established: number;
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  weekdayHours: string;
  saturdayHours: string;
  sundayHours: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  review: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Helper to generate unique IDs
let idCounter = 1;
const generateId = () => `id_${Date.now()}_${idCounter++}`;

// In-memory data stores
export const dataStore = {
  departments: [] as Department[],
  doctors: [] as Doctor[],
  appointments: [] as Appointment[],
  hospitalInfo: null as HospitalInfo | null,
  testimonials: [] as Testimonial[],
};

// Initialize with default data
export function initializeData() {
  // Clear existing data
  dataStore.departments = [];
  dataStore.doctors = [];
  dataStore.appointments = [];
  dataStore.testimonials = [];

  // Create Departments
  const pulmonologyDept: Department = {
    id: generateId(),
    name: 'Pulmonology',
    description: 'Specialized care for respiratory and lung conditions',
    services: [
      'Bronchoscopy',
      'Thoracoscopy',
      'Sleep Study',
      'Allergy Testing',
      'Pulmonary Function Tests',
      'Respiratory Care',
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const ophthalmologyDept: Department = {
    id: generateId(),
    name: 'Ophthalmology',
    description: 'Comprehensive eye care and surgical services',
    services: [
      'Phaco Surgery',
      'Pterygium Grafting',
      'DCR Surgery',
      'Cataract Surgery',
      'Retinal Treatment',
      'Laser Procedures',
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const emergencyDept: Department = {
    id: generateId(),
    name: 'Emergency Care',
    description: '24/7 emergency medical services with ICU facilities',
    services: [
      'Emergency Medical Care',
      'ICU Services',
      'Trauma Care',
      'Critical Care',
      '24/7 Ambulance',
    ],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataStore.departments.push(pulmonologyDept, ophthalmologyDept, emergencyDept);

  // Create Doctors
  const doctor1: Doctor = {
    id: generateId(),
    name: 'Dr. Rajendra Prasad Boddula',
    qualifications: ['MBBS', 'DTCD', 'DNBC(NIMS)'],
    specialty: 'Pulmonology',
    experience: 15,
    procedures: ['Bronchoscopy', 'Thoracoscopy', 'Sleep Study', 'Allergy Testing'],
    timings: '10AM–7PM',
    isGoldMedalist: true,
    memberships: [],
    photoUrl: '/dr-rajendraprasad.png', // Image loaded from /public folder
    bio: 'Gold Medalist with over 15 years of experience in pulmonology and respiratory medicine. Specializes in advanced bronchoscopy procedures and sleep disorders.',
    departmentId: pulmonologyDept.id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const doctor2: Doctor = {
    id: generateId(),
    name: 'Dr. Vanitha A',
    qualifications: ['MBBS', 'DO(OSMI)', 'DNB'],
    specialty: 'Ophthalmology',
    experience: 10,
    procedures: ['Phaco Surgery', 'Pterygium Grafting', 'DCR Surgery'],
    timings: '10AM–7PM',
    isGoldMedalist: false,
    memberships: ['TOS', 'DOS'],
    photoUrl: '/dr-vanitha.png', // Image loaded from /public folder (will show initials if not found)
    bio: 'Experienced ophthalmologist with expertise in advanced cataract surgery and oculoplastic procedures. Member of Telangana Ophthalmological Society and DOS.',
    departmentId: ophthalmologyDept.id,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataStore.doctors.push(doctor1, doctor2);

  // Create Hospital Info
  dataStore.hospitalInfo = {
    id: generateId(),
    name: 'RP Super Speciality Hospital',
    tagline: '50 Beds · ICU + Emergency · 24/7 · Super Speciality',
    established: 2025,
    address: 'Near Government Hospital, Nizamabad, Telangana - 503001, India',
    phone: '+91-98765-43210',
    email: 'contact@rphospital.com',
    emergencyPhone: '+91-98765-43211',
    weekdayHours: 'Mon-Fri: 08:00 AM - 08:00 PM',
    saturdayHours: 'Sat: 09:00 AM - 06:00 PM',
    sundayHours: 'Sun: 10:00 AM - 02:00 PM (Emergency 24/7)',
    latitude: 18.6725,
    longitude: 78.0941,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Create Sample Testimonial
  const testimonial: Testimonial = {
    id: generateId(),
    patientName: 'Dr. Irina Petrova',
    rating: 5,
    review:
      'The latest equipment, high-precision digital technologies and the best achievements of modern world medicine have allowed us to create a completely new, unprecedented level of painlessness, safety and comfort for patients.',
    isApproved: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataStore.testimonials.push(testimonial);

  // Create a sample appointment
  const sampleAppointment: Appointment = {
    id: generateId(),
    patientName: 'John Doe',
    phone: '+91-9876543212',
    status: 'PENDING',
    doctorId: doctor1.id,
    departmentId: pulmonologyDept.id,
    notes: 'Persistent cough for 2 weeks',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  dataStore.appointments.push(sampleAppointment);

  console.log('✅ In-memory data store initialized');
}

// Initialize data on module load
initializeData();

export default dataStore;
