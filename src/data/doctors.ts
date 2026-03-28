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
    photoUrl: '/rp.png',
    bio: 'Gold Medalist with over 15 years of experience in pulmonology and respiratory medicine. Specializes in advanced bronchoscopy procedures, thoracoscopy, sleep disorders, and certified in allergy testing and immunology. Expertise in managing asthma, chronic lung diseases, and respiratory infections.',
    department: pulmonologyDept,
  },
  {
    id: 'doc-2',
    name: 'Dr. Vanitha A',
    qualifications: ['MBBS', 'DO (OSM)', 'DNB (Ophthalmology)'],
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
      'Member of Telangana Ophthalmological Society',
      'Member of Delhi Ophthalmological Society',
    ],
    photoUrl: '/vanitha.png',
    bio: 'Experienced ophthalmologist with over 10 years of expertise in advanced cataract surgery (Phaco), pterygium surgery, DCR surgery, and comprehensive eye care. Committed to providing evidence-based eye care and surgical excellence. Member of Telangana and Delhi Ophthalmological Societies.',
    department: ophthalmologyDept,
  },
  {
    id: 'doc-3',
    name: 'Dr. Babu',
    qualifications: ['MBBS', 'DA'],
    specialty: 'Anaesthesia & Critical Care',
    experience: 8,
    procedures: [
      'General Anaesthesia',
      'Regional Anaesthesia',
      'Spinal Anaesthesia',
      'Epidural Anaesthesia',
      'ICU Management',
      'Pain Management',
    ],
    timings: '10:00 AM – 7:00 PM',
    isGoldMedalist: false,
    memberships: [],
    bio: 'Specialist in anaesthesia and critical care with expertise in general, regional, spinal, and epidural anaesthesia techniques. Experienced in comprehensive ICU management and critical care protocols, ensuring safe and effective anaesthetic care for patients across all surgical specialties.',
    photoUrl: '/babu.png',
    department: emergencyDept,
  },
  {
    id: 'doc-4',
    name: 'Dr. B. Vinod',
    qualifications: ['MBBS', 'MS General Surgery', 'MCh Neurosurgery'],
    specialty: 'Neurosurgery & General Surgery',
    experience: 12,
    procedures: [
      'Brain Tumour Surgery',
      'Spine Surgery',
      'Peripheral Nerve Surgery',
      'Craniotomy',
      'Laparoscopic Surgery',
      'Hernia Repair',
    ],
    timings: '10:00 AM – 7:00 PM',
    isGoldMedalist: false,
    memberships: [
      'Member of Neurological Society of India (NSI)',
      'Member of Neurosurgical Society of India (NSSI)',
    ],
    bio: 'Highly trained neurosurgeon with advanced qualifications in both general surgery and neurosurgery (MCh). Specializes in complex brain tumour surgeries, spine surgeries, peripheral nerve procedures, and laparoscopic techniques. Active member of NSI and NSSI.',
    photoUrl: '/vinod.png',
    department: neuroSurgeryDept,
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
