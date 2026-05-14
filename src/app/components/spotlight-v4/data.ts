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
  education?: string;
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
    photo: 'lara-carlos-bio-261x347.png',
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
    title: 'Associate Professor of Medicine · Director, Multi-Institutional Amyloid Center of Excellence',
    specialty: 'Cardiology · Cardiac Amyloidosis',
    specialtyGroup: 'cardiology',
    site: 'both',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: 'Dr. Nitasha Sarswat is a cardiologist at UChicago Medicine specializing in advanced heart failure, transplantation, and cardiac amyloidosis. She combines clinical expertise with research to help patients better understand and manage the impact of amyloidosis on the heart.',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 108,
    name: 'Dr. Amit K. Pursnani',
    credentials: 'MD, MSc',
    title: 'Director, Cardiovascular Disease Fellowship & Advanced Cardiovascular Imaging Fellowship · Pepper Family Endowed Chair of Cardiovascular Excellence and Education',
    specialty: 'Cardiology · Cardiac Imaging · Cardio-Oncology · Cardio-Obstetrics',
    specialtyGroup: 'cardiology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Amit K. Pursnani is a cardiologist at Endeavor Health who provides care for patients with a wide range of cardiovascular conditions. He has expertise in general cardiology, cardio-oncology and cardiac imaging, with a clinical focus that includes cardiovascular disease and cardio-obstetrics. He is the inaugural holder of the Pepper Family Endowed Chair of Cardiovascular Excellence and Education. Dr. Pursnani is Director of the Cardiovascular Disease Fellowship and Advanced Cardiovascular Imaging Fellowship. He speaks English, Hindi and Sindhi, allowing him to connect with patients from diverse backgrounds and offer personalized heart care at every stage of life.',
    education: 'New York University Grossman School of Medicine 2004 | University of Chicago Medical Center, Internal Medicine Residency 2007 | NYU Langone Medical Center, Cardiovascular Disease Fellowship 2010 | Massachusetts General Hospital / Harvard Medical School, Cardiovascular Imaging Fellowship 2014 | Harvard T.H. Chan School of Public Health, MSc Clinical Epidemiology',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── HEMATOLOGY ──
  {
    id: 104,
    name: 'Dr. Robert Eisner',
    credentials: 'MD',
    title: 'Hematologist',
    specialty: 'Hematology · Blood Cancers · Hospice & Palliative Medicine Oncology',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Robert Eisner is a hematologist who specializes in blood cancers and related disorders and is certified in Hospice & Palliative Medicine Oncology. He works closely with the amyloidosis multidisciplinary team to make sure each patient\'s diagnosis has an evidence-based care plan.',
    education: 'Midwest University School of Medicine 2000 | Loyola University Medical Center, Internal Medicine 2004, Hem/Onc Fellowship 2007',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 105,
    name: 'Dr. Amy Wang',
    credentials: 'MD',
    title: 'Clinical Assistant Professor, The University of Chicago Pritzker School of Medicine',
    specialty: 'Hematology · Blood Disorders · Amyloidosis · CAR-T',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Amy Wang specializes in hematology with an expertise in a broad range of blood disorders including amyloidosis. She is involved with her patients throughout their often complex journeys helping navigate treatment and care plan options. She also is involved with advanced cancer care and supports newer treatments such as CAR-T.',
    education: 'University of Texas Medical School at Houston 2014 | University of Chicago/Comer Children\'s Hospital, Combined Internal Medicine & Pediatrics Residency 2018, Hem/Onc Fellowship 2021',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 106,
    name: 'Dr. David Grinblatt',
    credentials: 'MD',
    title: 'Clinical Associate Professor, The University of Chicago Pritzker School of Medicine',
    specialty: 'Hematology · Blood Disorders · Amyloidosis · CAR-T',
    specialtyGroup: 'hematology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. David Grinblatt specializes in hematology with an expertise in a broad range of blood disorders including amyloidosis. He is actively involved in newer innovative therapies such as CAR-T.',
    education: 'Case Western Reserve University School of Medicine 1986 | Rush-Presbyterian-St Luke\'s Medical Center, Internal Medicine Residency 1989 | McGaw Medical Center of Northwestern University, Hem/Onc Fellowship 1992',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── NEUROLOGY ──
  {
    id: 102,
    name: 'Dr. Richard Wlodarski',
    credentials: 'MD',
    title: 'Neurologist',
    specialty: 'Neuromuscular Medicine · Myopathies · Neuropathies · Amyloidosis',
    specialtyGroup: 'neurology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Richard Wlodarski is a Neurologist who specializes in Neuromuscular Medicine caring for patients with myopathies, neuropathies and conditions like myasthenia gravis and amyloidosis. He is interested in new targeted disease-modifying therapies for previously untreatable disorders.',
    education: 'University of Illinois at Chicago College of Medicine 2015 | University of Chicago Hospitals, Neurology Residency 2019, Neurophysiology Fellowship 2020, Neuromuscular Diseases Fellowship 2021',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  {
    id: 103,
    name: 'Dr. Larry Zeidman',
    credentials: 'MD',
    title: 'Director, Neuromuscular and Autonomic Section, Endeavor Health NorthShore Hospitals',
    specialty: 'Neuromuscular & Autonomic Disorders · Peripheral Neuropathies · Amyloidosis · EMG',
    specialtyGroup: 'neurology',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Larry Zeidman is a Neurologist who specializes in neuromuscular and autonomic disorders with a focus on peripheral neuropathies including Amyloidosis. He is director of Neuromuscular and Autonomic Section at Endeavor Health NorthShore Hospitals. He is an expert in EMG, autonomic testing and skin biopsies actively involved in multidisciplinary programs such as Amyloidosis and in medical education.',
    education: 'Northwestern McGaw School of Medicine 2004 | McGaw Medical Center, Neurology Residency 2008 | Rush Medical College, Clinical Neurophysiology Fellowship 2009',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
  // ── ORTHOPEDIC SURGERY ──
  {
    id: 107,
    name: 'Dr. Robert Gray',
    credentials: 'MD',
    title: 'Orthopedic Surgeon, Hand and Microvascular Surgery',
    specialty: 'Orthopedic Surgery · Hand & Microvascular Surgery · Nerve Transfers · Amyloidosis',
    specialtyGroup: 'orthopedics',
    site: 'endeavor',
    photo: 'data:image/jpeg;base64,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',
    bio: 'Dr. Robert Gray is an Orthopedic Surgeon with a specialty in Hand and Microvascular Surgery. He is an expert in treating conditions of the fingertips, shoulders, tendons and nerves and is skilled in microsurgical techniques, nerve transfers and small joint replacements. He works closely with the Amyloidosis Multidisciplinary programs to help manage the orthopedic complications such as carpal tunnel syndrome, trigger finger etc.',
    education: 'Brown University School of Medicine 2005 | Rush University Medical Center, Orthopedic Surgery 2010 | Mayo Clinic, Hand Surgery Fellowship 2011',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '',
    hasVideo: false, appointmentUrl: '',
  },
];

// ─── Support Staff ──────────────────────────────────────────────────────────
export const supportStaff: SupportStaff[] = [
  { id: 1, name: 'Elizabeth Hushka', role: 'Advanced Heart Failure NP', site: 'main' },
  { id: 2, name: 'Samantha de Santiago', role: 'Advanced Heart Failure / Amyloid RN', site: 'main' },
  { id: 3, name: 'Tracey Silverstein', role: 'Amyloid Navigator RN · Trial Coordinator', site: 'endeavor' },
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
