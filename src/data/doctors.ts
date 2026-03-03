// Static doctors data - no backend required
export interface Department {
  id: string;
  name: string;
  description: string;
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
  department: Department;
}

// Departments
const pulmonologyDept: Department = {
  id: 'dept-pulmonology',
  name: 'Pulmonology',
  description: 'Specialized care for respiratory and lung conditions',
};

const ophthalmologyDept: Department = {
  id: 'dept-ophthalmology',
  name: 'Ophthalmology',
  description: 'Comprehensive eye care and surgical services',
};

const neuroSurgeryDept: Department = {
  id: 'dept-neurosurgery',
  name: 'Neuro & Neuro Surgery',
  description: 'Advanced neurological care and neurosurgical procedures',
};

const generalSurgeryDept: Department = {
  id: 'dept-general-surgery',
  name: 'General Surgery',
  description: 'Comprehensive surgical procedures and treatments',
};

const urologyDept: Department = {
  id: 'dept-urology',
  name: 'Urology',
  description: 'Expert care for urinary tract and male reproductive system',
};

const nephrologyDept: Department = {
  id: 'dept-nephrology',
  name: 'Nephrology',
  description: 'Comprehensive kidney care and dialysis services',
};

const orthopedicsDept: Department = {
  id: 'dept-orthopaedics',
  name: 'Orthopaedics',
  description: 'Advanced bone, joint, and muscle care',
};

const entDept: Department = {
  id: 'dept-ent',
  name: 'ENT',
  description: 'Ear, Nose, and Throat specialist care',
};

const emergencyDept: Department = {
  id: 'dept-emergency',
  name: 'Emergency & Critical Care',
  description: '24/7 emergency medical services with ICU facilities',
};

// Doctors Data
export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajendra Prasad Boddula',
    qualifications: ['MBBS', 'DTCD', 'DNB (NIMS)', 'Certified Allergy Specialist'],
    specialty: 'Pulmonology & Respiratory Medicine',
    experience: 15,
    procedures: [
      'Bronchoscopy',
      'Thoracoscopy',
      'Sleep Study',
      'Allergy Testing',
      'Asthma & Immunology',
    ],
    timings: '10:00 AM – 7:00 PM',
    isGoldMedalist: true,
    memberships: [
      'Indian Sleep Disorders Association',
      'Indian College of Allergy, Asthma & Applied Immunology',
    ],
    photoUrl: '/dr-rajendraprasad.png',
    bio: 'Gold Medalist with over 15 years of experience in pulmonology and respiratory medicine. Specializes in advanced bronchoscopy procedures, thoracoscopy, sleep disorders, and certified in allergy testing and immunology. Expertise in managing asthma, chronic lung diseases, and respiratory infections.',
    department: pulmonologyDept,
  },
  {
    id: 'doc-2',
    name: 'Dr. Vanitha A',
    qualifications: ['MBBS', 'DO (OSM)', 'DNB – Ophthalmology'],
    specialty: 'Ophthalmology',
    experience: 10,
    procedures: [
      'Phaco Surgery',
      'Pterygium Surgery',
      'DCR Surgery',
      'Comprehensive Eye Care',
    ],
    timings: '10:00 AM – 7:00 PM',
    isGoldMedalist: false,
    memberships: [
      'Telangana Ophthalmological Society (TOS)',
      'Delhi Ophthalmological Society (DOS)',
    ],
    photoUrl: '/dr-vanitha.png',
    bio: 'Experienced ophthalmologist with over 10 years of expertise in advanced cataract surgery (Phaco), pterygium surgery, DCR surgery, and comprehensive eye care. Committed to providing evidence-based eye care and surgical excellence. Member of Telangana and Delhi Ophthalmological Societies.',
    department: ophthalmologyDept,
  },
];

// Export departments for potential use elsewhere
export const departments: Department[] = [
  pulmonologyDept,
  ophthalmologyDept,
  neuroSurgeryDept,
  generalSurgeryDept,
  urologyDept,
  nephrologyDept,
  orthopedicsDept,
  entDept,
  emergencyDept,
];

// Utility functions
export const getDoctorsByDepartment = (departmentName: string): Doctor[] => {
  return doctors.filter(
    (doc) => doc.department.name.toLowerCase() === departmentName.toLowerCase()
  );
};

export const getDoctorsBySpecialty = (specialty: string): Doctor[] => {
  return doctors.filter(
    (doc) => doc.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find((doc) => doc.id === id);
};
