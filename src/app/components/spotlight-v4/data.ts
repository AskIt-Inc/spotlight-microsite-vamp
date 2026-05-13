// ─── v4 Data — June 2026 Spotlight with dual-site teams + full trials ────────
// IMPORTANT: Every version must preserve all content from previous versions.
// Providers are ALL team members being promoted, not just session presenters.

export interface ClinicianV4 {
  id: number;
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  specialtyGroup: 'cardiology' | 'hematology' | 'neurology' | 'nephrology' | 'gastroenterology' | 'orthopedics';
  site: 'main' | 'endeavor' | 'both';
  photo: string;
  bio: string;
  hasSession: boolean;
  sessionDate: string;
  sessionTitle: string;
  sessionDescription: string;
  hasVideo: boolean;
  appointmentUrl: string;
}

export interface SupportStaff {
  id: number;
  name: string;
  role: string;
  site: 'main' | 'endeavor';
}

export interface TrialV4 {
  id: string;
  name: string;
  category: 'past-uchicago' | 'enrolling-uchicago' | 'upcoming-uchicago' | 'enrolling-endeavor' | 'al-placeholder';
  status: string;
  note?: string;
}

// ─── Main Site Providers (ALL team members, ordered by specialty) ────────────
export const mainSiteProviders: ClinicianV4[] = [
  // ── CARDIOLOGY ──
  {
    id: 1,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Associate Professor of Medicine · Director, Multi-Institutional Amyloid Center of Excellence',
    specialty: 'Advanced Heart Failure · Cardiac Transplantation · Cardiac Amyloidosis',
    specialtyGroup: 'cardiology',
    site: 'both',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: 'Dr. Nitasha Sarswat is a cardiologist at UChicago Medicine specializing in advanced heart failure, transplantation, and cardiac amyloidosis. She combines clinical expertise with research to help patients better understand and manage the impact of amyloidosis on the heart.',
    hasSession: true,
    sessionDate: 'June 3',
    sessionTitle: 'Current Approach to Management of Amyloidosis CM — Disease Modifying Therapy to Symptom Management',
    sessionDescription: 'In this session Dr. Sarswat will present her approach to treating Amyloidosis patients with Cardiomyopathy including managing symptoms.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 2,
    name: 'Dr. Jeremy A. Slivnick',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Cardiac Imaging · MRI · CT · Echocardiography',
    specialtyGroup: 'cardiology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/Jeremy-slivnick.webp',
    bio: 'Dr. Jeremy A. Slivnick is a cardiologist and cardiac imaging specialist focused on advanced MRI, CT, and echocardiography to diagnose complex heart diseases. His work includes improving the detection and evaluation of cardiac amyloidosis, heart failure, hypertrophic cardiomyopathy, and cardiac sarcoidosis.',
    hasSession: true,
    sessionDate: 'June 10',
    sessionTitle: 'Current and Emerging Role of Cardiac Imaging in the Diagnosis and Management of Cardiac Amyloidosis',
    sessionDescription: 'In this session, Dr. Slivnick will present how cardiac imaging is used to help diagnose and manage patients with Cardiac amyloidosis and what the future holds.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 11,
    name: 'Rachel Campagna',
    credentials: 'MS, CGC',
    title: 'Licensed, Certified Genetic Counselor — Cardiology',
    specialty: 'Hereditary ATTR · Cardiovascular Genetics · Genetic Testing',
    specialtyGroup: 'cardiology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/2025-headshot-2.jpg',
    bio: 'Rachel Campagna, MS, CGC, is a board-certified genetic counselor at the University of Chicago. She sees patients in the Cardiovascular Genetics Clinic and the Amyloidosis Clinic, as well as at-risk family members, for personalized discussions on the impact of genetic testing in personal health choices. She is currently the president-elect of the Illinois Society of Genetics Professionals (ISGP), was previously co-chair of the Education Committee, and is an active member of the National Society of Genetic Counselors (NSGC) and the Heart Rhythm Society (HRS).',
    hasSession: true,
    sessionDate: 'Mar 27 (Completed)',
    sessionTitle: '90-Minute Extended Session: TTR Inheritance, Genetic Testing & ACT-EARLY Trial',
    sessionDescription: 'This 90-minute extended session will help patients and families better understand how TTR gene mutations are inherited, what genetic counselors do, and how genetic testing works. The program will also include an overview of the ACT-EARLY clinical trial and the importance of identifying hereditary ATTR amyloidosis as early as possible.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  // ── HEMATOLOGY ──
  {
    id: 3,
    name: 'Dr. Ben Derman',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Hematology & Oncology · Plasma Cell Disorders · AL Amyloidosis',
    specialtyGroup: 'hematology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/derman-ben-bio-261x347.webp',
    bio: 'Ben Derman is a hematologist-oncologist specializing in plasma cell disorders, including amyloidosis, multiple myeloma, MGUS, and POEMS syndrome. He uses advanced therapies such as CAR T-cell therapy and stem cell transplantation, with research focused on MRD, quality of life, treatment outcomes, and reducing racial disparities in care.',
    hasSession: true,
    sessionDate: 'June 17',
    sessionTitle: 'What is the Role of Maintenance Therapy in AL Amyloidosis',
    sessionDescription: 'In this session, Dr. Derman will present what the current recommendations are for maintenance therapy in AL amyloidosis patients after completing initial treatment, who should be considered and what is really known.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 10,
    name: 'Dr. Jennifer Cooperrider',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Hematology & Oncology · Multiple Myeloma',
    specialtyGroup: 'hematology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-05/120122-Jennifer-Cooperrider-MD.jpg',
    bio: 'Dr. Jennifer Cooperrider is an assistant professor of medicine specializing in hematology and oncology at UChicago Medicine. Dr. Cooperrider is an expert in Multiple Myeloma and provides comprehensive care for patients with plasma cell disorders.',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    hasVideo: false,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  // ── NEUROLOGY ──
  {
    id: 4,
    name: 'Dr. Kourosh Rezania',
    credentials: 'MD',
    title: 'Professor of Neurology',
    specialty: 'Neuromuscular Diseases · Peripheral Neuropathy · Amyloidosis PN',
    specialtyGroup: 'neurology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/rezania-kourosh-bio-261x347.webp',
    bio: 'Kourosh Rezania is a neurologist specializing in peripheral neuropathy and neuromuscular disorders, with expertise in the diagnosis and management of amyloidosis-related nerve complications. His work focuses on helping patients identify and manage symptoms such as numbness, pain, weakness, and autonomic dysfunction, while advancing multidisciplinary care for individuals living with ATTR and AL amyloidosis.',
    hasSession: true,
    sessionDate: 'June 24',
    sessionTitle: 'Current Approach and Management of Amyloidosis PN',
    sessionDescription: 'In this session Dr. Rezania will present how he works up and treats Amyloidosis patients with peripheral neuropathy including managing symptoms.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 5,
    name: 'Dr. Carlos Lara',
    credentials: 'MD',
    title: 'Assistant Professor of Neurology',
    specialty: 'Neuromuscular Medicine · EMG · Amyloidosis',
    specialtyGroup: 'neurology',
    site: 'main',
    photo: '',
    bio: 'Dr. Carlos Lara is an assistant professor of neurology who specializes in the diagnosis and treatment of a broad spectrum of neurological conditions, including amyloidosis, muscular dystrophies, myopathies, myasthenia gravis, hereditary neuropathies, chronic inflammatory demyelinating polyneuropathy, and neuromuscular medicine. He is recognized for his work with neuromuscular ultrasound and electromyography (EMG), which help diagnose and manage complex neuromuscular disorders.',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    hasVideo: false,
    appointmentUrl: 'https://www.uchicagomedicine.org/find-a-physician/physician/carlos-lara',
  },
  // ── NEPHROLOGY ──
  {
    id: 6,
    name: 'Dr. Marco Bonilla',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Nephrology',
    specialty: 'Nephrology · Onconephrology · Glomerular Disease · Amyloidosis',
    specialtyGroup: 'nephrology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/marco-bonilla.webp',
    bio: 'Dr. Marco Bonilla is an assistant professor of medicine in nephrology who specializes in onconephrology — diagnosing kidney disease in cancer patients — and glomerular diseases, such as diabetic kidney disease, autoimmune diseases, amyloidosis, and genetic disorders. Dr. Bonilla sees patients at the satellite glomerular clinic at UChicago Medicine River East.',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 7,
    name: 'Dr. Beatrice Concepcion',
    credentials: 'MD',
    title: 'Professor of Medicine, Nephrology',
    specialty: 'Transplant Nephrology · Kidney Transplant · Amyloidosis',
    specialtyGroup: 'nephrology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/concepcion-beatrice-bio-261x347.webp',
    bio: 'Beatrice Concepcion is a transplant nephrologist specializing in kidney and pancreas transplantation. She provides personalized, compassionate care focused on immunosuppressive management, post-transplant complications, and improving long-term quality of life for patients with complex medical needs, including amyloidosis-related kidney disease.',
    hasSession: true,
    sessionDate: 'TBD (Swing)',
    sessionTitle: 'When to Consider Kidney Transplantation in Patients with Amyloidosis',
    sessionDescription: 'In this session, Dr. Concepcion will present the current indications and considerations when evaluating patients with Amyloidosis for kidney transplantation — what is currently known.',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  // ── GASTROENTEROLOGY ──
  {
    id: 8,
    name: 'Dr. Edwin K. McDonald IV',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Gastroenterology',
    specialty: 'Gastroenterology · Small Bowel Disease · Nutrition',
    specialtyGroup: 'gastroenterology',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/edwin-macdonald.webp',
    bio: 'Dr. Edwin K. McDonald IV is an assistant professor of medicine specializing in gastroenterology with interest in improving the health of individuals and communities through nutrition education. He works with patients with small bowel diseases, obesity, and other conditions affecting the digestive system.',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  // ── ORTHOPEDIC SURGERY ──
  {
    id: 9,
    name: 'Dr. Jennifer Moriatis Wolf',
    credentials: 'MD, PhD',
    title: 'Professor of Orthopedic Surgery and Rehabilitation Medicine',
    specialty: 'Orthopedic Surgery · Hand, Wrist & Elbow · Amyloidosis Complications',
    specialtyGroup: 'orthopedics',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/wolf-jennifer-bio-261x347.webp',
    bio: 'Dr. Jennifer Moriatis Wolf (MD, PhD) is a professor of orthopedic surgery and rehabilitation medicine specializing in the surgical and non-surgical treatment of bone, nerve, tendon, and ligament injuries caused by trauma or overuse. She conducts basic and clinical research investigating strategies to improve patient outcomes in orthopedic hand, wrist, and elbow care.',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    hasVideo: true,
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
];

// ─── Endeavor Site Providers (same specialty order) ─────────────────────────
export const endeavorProviders: ClinicianV4[] = [
  // ── CARDIOLOGY ──
  {
    id: 101,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Director, Multi-Institutional Amyloid Center of Excellence',
    specialty: 'Cardiology · Cardiac Amyloidosis',
    specialtyGroup: 'cardiology',
    site: 'both',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 108,
    name: 'TBD — Cardiac Imaging',
    credentials: '',
    title: 'Cardiac Imaging Specialist',
    specialty: 'Cardiac Imaging',
    specialtyGroup: 'cardiology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── HEMATOLOGY ──
  {
    id: 104,
    name: 'Robert Eisner',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 105,
    name: 'Amy Wang',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 106,
    name: 'David Grinblatt',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── NEUROLOGY ──
  {
    id: 102,
    name: 'Richard Wlodarski',
    credentials: '',
    title: 'Neurologist',
    specialty: 'Neuromuscular Disorders',
    specialtyGroup: 'neurology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 103,
    name: 'Larry Zeidman',
    credentials: '',
    title: 'Neurologist',
    specialty: 'Autonomic Dysfunction',
    specialtyGroup: 'neurology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── ORTHOPEDIC SURGERY ──
  {
    id: 107,
    name: 'Robert Gray',
    credentials: '',
    title: 'Orthopedic Surgeon',
    specialty: 'Orthopedic Surgery',
    specialtyGroup: 'orthopedics',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
];

// ─── Support Staff ──────────────────────────────────────────────────────────
export const supportStaff: SupportStaff[] = [
  { id: 1, name: 'Elizabeth Hushka', role: 'Advanced Heart Failure NP', site: 'main' },
  { id: 2, name: 'Samantha de Santiago', role: 'Advanced Heart Failure / Amyloid RN', site: 'main' },
  { id: 3, name: 'Tracey Silverstein', role: 'Amyloid Navigator RN', site: 'endeavor' },
];

// ─── Clinical Trials ────────────────────────────────────────────────────────
export const trialsV4: TrialV4[] = [
  { id: 'past-1', name: 'ApolloB', category: 'past-uchicago', status: 'Completed' },
  { id: 'past-2', name: 'Helios B', category: 'past-uchicago', status: 'Completed' },
  { id: 'past-3', name: 'Attribute CM', category: 'past-uchicago', status: 'Completed' },
  { id: 'enroll-uc-1', name: 'Act Early', category: 'enrolling-uchicago', status: 'Recruiting', note: 'Dr. Sarswat on steering committee' },
  { id: 'enroll-uc-2', name: 'Alnylam 007', category: 'enrolling-uchicago', status: 'Recruiting', note: 'Open label extension' },
  { id: 'enroll-uc-3', name: 'Trace AI', category: 'enrolling-uchicago', status: 'Recruiting' },
  { id: 'enroll-uc-4', name: 'MaesTTRo', category: 'enrolling-uchicago', status: 'Recruiting' },
  { id: 'upcoming-uc-1', name: 'Cleopattra', category: 'upcoming-uchicago', status: 'Coming June 2026' },
  { id: 'upcoming-uc-2', name: 'ATTRiumph', category: 'upcoming-uchicago', status: 'Coming July 2026' },
  { id: 'upcoming-uc-3', name: 'Magnitude', category: 'upcoming-uchicago', status: 'Coming July 2026' },
  { id: 'enroll-end-1', name: 'Alnylam 007', category: 'enrolling-endeavor', status: 'Recruiting', note: 'Open label extension' },
  { id: 'enroll-end-2', name: 'Cleopatrra', category: 'enrolling-endeavor', status: 'Recruiting' },
  { id: 'enroll-end-3', name: 'Triton CM', category: 'enrolling-endeavor', status: 'Recruiting' },
  { id: 'al-placeholder', name: 'AL Amyloidosis Trials', category: 'al-placeholder', status: 'Pending', note: 'Awaiting details from Dr. Derman and Dr. Cooperrider' },
];
