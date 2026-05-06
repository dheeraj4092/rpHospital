import { useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconBriefcase2, IconMapPin, IconClockHour4, IconUsersGroup, IconSend, IconX } from '@tabler/icons-react';
import PageHero from '../components/PageHero';
import PageNavigation from '../components/PageNavigation';
import Seo from '../components/ui/Seo';
import { api } from '../services/api';
import type { CreateCareerApplicationData } from '../services/api';
import { breadcrumbJsonLd, buildPageMeta } from '../lib/seo';

type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  experience: string;
  department: string;
  summary: string;
};

const jobs: Job[] = [
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Pharmacy',
    summary: 'Dispense medications, counsel patients on usage, and ensure compliance with hospital pharmacy standards.',
  },
  {
    id: 'optometrist',
    title: 'Optometrist',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Ophthalmology',
    summary: 'Conduct eye examinations, assist in diagnosis, and coordinate with ophthalmologists for treatment plans.',
  },
  {
    id: 'ot-assistant',
    title: 'OT Assistant',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Operation Theatre',
    summary: 'Support OT procedures with instrument readiness, sterile protocols, and peri-operative coordination.',
  },
  {
    id: 'hospital-management-supervisor',
    title: 'Hospital Management Supervisor',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Administration',
    summary: 'Oversee front-line operations, manage schedules and reporting, and ensure service excellence across units.',
  },
  {
    id: 'staff-nurse',
    title: 'Staff Nurse - Critical Care',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'ICU',
    summary: 'Deliver compassionate bedside care, monitor patients, and coordinate with consultants in ICU shifts.',
  },
  {
    id: 'lab-technician',
    title: 'Lab Technician',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Diagnostics',
    summary: 'Perform sample processing and reporting with strong quality standards in biochemistry and pathology.',
  },
  {
    id: 'front-office',
    title: 'Front Office Executive',
    type: 'Full Time',
    location: 'Nizamabad, Telangana',
    experience: '2-5 Years',
    department: 'Administration',
    summary: 'Manage patient-facing desk operations, admissions support, and appointment coordination with empathy.',
  },
];

const initialForm = (position: string): CreateCareerApplicationData => ({
  fullName: '',
  email: '',
  phone: '',
  position,
  experience: '',
  currentLocation: '',
  coverLetter: '',
});

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export default function CareersPage() {
  const meta = buildPageMeta('/careers');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<CreateCareerApplicationData>(initialForm(jobs[0].title));
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const stats = useMemo(
    () => [
      { label: 'Open Positions', value: `${jobs.length}` },
      { label: 'Growth Focus', value: 'Clinical + Non-Clinical' },
      { label: 'Work Culture', value: 'Patient First, Team Driven' },
    ],
    []
  );

  const updateField = (key: keyof CreateCareerApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onApplyToJob = (job: Job) => {
    setSelectedJob(job);
    setFormData(initialForm(job.title));
    setResumeFile(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const closeModal = () => {
    if (submitting) return;
    setSelectedJob(null);
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      return;
    }

    const extension = file.name.toLowerCase().split('.').pop() || '';
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const isSupportedMime = allowedMimeTypes.has(file.type);
    const isSupportedExtension = allowedExtensions.includes(extension);

    if (!isSupportedMime && !isSupportedExtension) {
      setErrorMessage('Please upload a PDF, DOC, or DOCX resume.');
      event.target.value = '';
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Resume size should be under 5 MB.');
      event.target.value = '';
      setResumeFile(null);
      return;
    }

    setErrorMessage('');
    setResumeFile(file);
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        const base64 = result.includes(',') ? result.split(',')[1] : '';
        if (!base64) {
          reject(new Error('Could not read resume file.'));
          return;
        }
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Could not read resume file.'));
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setSubmitting(true);

    try {
      const payload: CreateCareerApplicationData = { ...formData };

      if (resumeFile) {
        payload.resumeFileName = resumeFile.name;
        payload.resumeFileType = resumeFile.type || 'application/octet-stream';
        payload.resumeFileBase64 = await fileToBase64(resumeFile);
      }

      const response = await api.createCareerApplication(payload);
      setSuccessMessage(response.message || 'Application submitted successfully.');
      setFormData(initialForm(selectedJob?.title || jobs[0].title));
      setResumeFile(null);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Could not submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        canonicalPath={meta.canonicalPath}
        structuredData={[
          breadcrumbJsonLd([
            { label: 'Home', path: '/' },
            { label: 'Careers', path: '/careers' },
          ]),
        ]}
      />
      <PageHero
        title="Careers at RP Hospital"
        subtitle="Build a meaningful healthcare career with a team that values skill, empathy, and excellence."
        tag="Join Our Team"
        icon={IconBriefcase2}
        iconColor="#F7941D"
        accentColor="#F7941D"
        breadcrumb={[{ label: 'Careers' }]}
      />

      <section className="px-4 sm:px-6 md:px-10 lg:px-20 py-12 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.4, delay: index * 0.06 }} className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(26,36,114,0.1)', background: 'linear-gradient(145deg, #ffffff, #f6f8ff)' }}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
              <p className="mt-2 text-[20px] font-extrabold" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-manrope)' }}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10 lg:px-20 pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-[28px] sm:text-[34px] font-extrabold tracking-[-0.02em]" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-manrope)' }}>
            Current Openings
          </h2>
          <p className="mt-2 text-[15px] leading-[1.75]" style={{ color: 'var(--color-text-muted)' }}>
            Explore available roles and apply in minutes. Our HR team reviews every application.
          </p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {jobs.map((job, index) => (
              <motion.article key={job.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.45, delay: index * 0.07 }} className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'rgba(26,36,114,0.12)', backgroundColor: '#fff' }}>
                <p className="text-[13px] font-semibold" style={{ color: 'var(--color-brand-orange)' }}>{job.department}</p>
                <h3 className="mt-2 text-[22px] font-extrabold leading-[1.25]" style={{ color: 'var(--color-brand-navy)', fontFamily: 'var(--font-manrope)' }}>{job.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.7]" style={{ color: 'var(--color-text-muted)' }}>{job.summary}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-[13px] font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}><IconMapPin size={16} /> {job.location}</p>
                  <p className="text-[13px] font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}><IconClockHour4 size={16} /> {job.type}</p>
                  <p className="text-[13px] font-medium flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}><IconUsersGroup size={16} /> {job.experience}</p>
                </div>
                <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onApplyToJob(job)} className="mt-6 w-full rounded-xl px-4 py-3 text-[14px] font-bold border-none cursor-pointer" style={{ backgroundColor: 'var(--color-brand-navy)', color: '#fff' }}>
                  Apply for this role
                </motion.button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#0d1240]/55" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full sm:max-w-[860px] bg-white rounded-t-3xl sm:rounded-3xl border p-5 sm:p-8 max-h-[92vh] overflow-y-auto"
              style={{ borderColor: 'rgba(26,36,114,0.16)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[26px] sm:text-[30px] font-extrabold tracking-[-0.02em]" style={{ color: 'var(--color-brand-navy)' }}>Apply Now</h2>
                  <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.75]" style={{ color: 'var(--color-text-muted)' }}>
                    Applying for: <strong style={{ color: 'var(--color-brand-navy)' }}>{selectedJob.title}</strong>
                  </p>
                </div>
                <button type="button" onClick={closeModal} className="rounded-full p-2 border" style={{ borderColor: 'rgba(26,36,114,0.16)' }} aria-label="Close application form">
                  <IconX size={18} />
                </button>
              </div>

              <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <input className="rounded-xl border px-4 py-3 text-[15px] outline-none" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Full Name" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} required />
                <input type="email" className="rounded-xl border px-4 py-3 text-[15px] outline-none" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Email Address" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required />
                <input className="rounded-xl border px-4 py-3 text-[15px] outline-none" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Phone Number" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} required />
                <input className="rounded-xl border px-4 py-3 text-[15px] outline-none bg-[#f8faff]" style={{ borderColor: 'rgba(26,36,114,0.18)' }} value={formData.position} onChange={(e) => updateField('position', e.target.value)} required />
                <input className="rounded-xl border px-4 py-3 text-[15px] outline-none" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Experience (e.g. 3 years)" value={formData.experience} onChange={(e) => updateField('experience', e.target.value)} required />
                <input className="rounded-xl border px-4 py-3 text-[15px] outline-none" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Current Location" value={formData.currentLocation} onChange={(e) => updateField('currentLocation', e.target.value)} required />

                <div className="sm:col-span-2 rounded-xl border px-4 py-3" style={{ borderColor: 'rgba(26,36,114,0.18)' }}>
                  <label className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--color-brand-navy)' }}>
                    Upload Resume (PDF, DOC, DOCX)
                  </label>
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-[14px] font-bold cursor-pointer transition-all"
                    style={{ backgroundColor: 'var(--color-brand-navy)', color: '#fff' }}
                  >
                    Choose Resume File
                  </label>
                  {resumeFile && (
                    <p className="mt-2 text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                      Selected: {resumeFile.name}
                    </p>
                  )}
                </div>

                <textarea className="sm:col-span-2 rounded-xl border px-4 py-3 text-[15px] min-h-[140px] outline-none resize-y" style={{ borderColor: 'rgba(26,36,114,0.18)' }} placeholder="Cover Letter / Why you are a good fit in minimum 30 characters" value={formData.coverLetter} onChange={(e) => updateField('coverLetter', e.target.value)} required />

                {errorMessage && <p className="sm:col-span-2 text-[14px] font-semibold" style={{ color: '#c62828' }}>{errorMessage}</p>}
                {successMessage && <p className="sm:col-span-2 text-[14px] font-semibold" style={{ color: '#1f8f4d' }}>{successMessage}</p>}

                <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} disabled={submitting} className="sm:col-span-2 mt-1 rounded-xl px-5 py-3.5 text-[15px] font-bold border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--color-brand-orange)', color: '#fff' }}>
                  <IconSend size={18} />
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PageNavigation />
    </>
  );
}
