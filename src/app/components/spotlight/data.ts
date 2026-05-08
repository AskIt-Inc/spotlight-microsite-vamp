export interface Clinician {
  id: number;
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  type: string;
  photo: string;
  bio: string;
  hasVideo: boolean;
  hasSession: boolean;
  sessionLabel: string;
  appointmentUrl: string;
}

export interface Trial {
  id: string;
  title: string;
  status: string;
  description: string;
  phase: string;
}

export interface Session {
  id: number;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  presenter: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const clinicians: Clinician[] = [
  // Order matches the client content document
  {
    id: 1,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Associate Professor of Medicine · Director, Amyloidosis Program',
    specialty: 'Advanced Heart Failure · Cardiac Transplantation · Cardiac Amyloidosis',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: 'Dr. Nitasha Sarswat is an associate professor of medicine specializing in advanced heart failure and cardiac transplantation with expertise in cardiac amyloidosis, and the Director of the Amyloidosis Program at the University of Chicago Medicine.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Current Approach to Treating Cardiac Amyloidosis — Disease-Modifying Therapy to Symptom Management',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 2,
    name: 'Dr. Jeremy A. Slivnick',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Cardiac Imaging · MRI · CT · Echocardiography',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/Jeremy-slivnick.webp',
    bio: 'Dr. Jeremy A. Slivnick is an assistant professor of medicine and cardiologist specializing in cardiac imaging. Dr. Slivnick uses advanced imaging, such as cardiac MRI, computed tomography (CT), and echocardiography, to accurately evaluate and diagnose a wide range of heart and vascular diseases. He has particular interest in using cardiac imaging to improve the diagnosis and evaluation of heart failure including cardiac amyloidosis, hypertrophic cardiomyopathy, and cardiac sarcoidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Current and Emerging Role of Cardiac Imaging in the Diagnosis and Management of Cardiac Amyloidosis',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 3,
    name: 'Dr. Ben Derman',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Hematology & Oncology · Plasma Cell Disorders · AL Amyloidosis',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/derman-ben-bio-261x347.webp',
    bio: 'Dr. Ben Derman is an assistant professor of medicine specializing in hematology and oncology. He is an expert in plasma cell disorders, including amyloidosis, multiple myeloma, monoclonal gammopathy of unknown significance (MGUS), plasmacytoma, and POEMS syndrome. Dr. Derman uses innovative techniques including CAR T-cell therapy and stem cell transplantation, and his research focuses on minimal residual disease (MRD), strategies to improve outcomes and quality of life, and the impact of racial disparities.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: What is the Role of Maintenance Treatment in AL Amyloidosis?',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 4,
    name: 'Dr. Kourosh Rezania',
    credentials: 'MD',
    title: 'Professor of Neurology',
    specialty: 'Neuromuscular Diseases · Peripheral Neuropathy · Amyloidosis PN',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/rezania-kourosh-bio-261x347.webp',
    bio: 'Dr. Kourosh Rezania is a professor of neurology and an expert in neuromuscular diseases. He is particularly interested in the evaluation and treatment of peripheral neuropathies, myopathies, myasthenia gravis, and amyotrophic lateral sclerosis (ALS). Dr. Rezania is also an active researcher and teacher, currently conducting clinical trials on chronic inflammatory demyelinating polyneuropathy.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: How Dr. Rezania Manages Amyloidosis Peripheral Neuropathy',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 5,
    name: 'Dr. Carlos Lara',
    credentials: 'MD',
    title: 'Assistant Professor of Neurology',
    specialty: 'Neuromuscular Medicine · EMG · Amyloidosis',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Carlos Lara is an assistant professor of neurology who specializes in the diagnosis and treatment of a broad spectrum of neurological conditions, including amyloidosis, muscular dystrophies, myopathies, myasthenia gravis, hereditary neuropathies, chronic inflammatory demyelinating polyneuropathy, and neuromuscular medicine. He is recognized for his work with neuromuscular ultrasound and electromyography (EMG), which help diagnose and manage complex neuromuscular disorders. His approach is rooted in understanding the complexities of the nervous system and delivering personalized, compassionate treatment.',
    hasVideo: false,
    hasSession: false,
    sessionLabel: '',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 6,
    name: 'Dr. Marco Bonilla',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Nephrology',
    specialty: 'Nephrology · Onconephrology · Glomerular Disease · Amyloidosis',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/marco-bonilla.webp',
    bio: 'Dr. Marco Bonilla is an assistant professor of medicine in nephrology who specializes in onconephrology — diagnosing kidney disease in cancer patients — and glomerular diseases, such as diabetic kidney disease, autoimmune diseases, amyloidosis, and genetic disorders. Dr. Bonilla sees patients at the satellite glomerular clinic at UChicago Medicine River East.',
    hasVideo: true,
    hasSession: false,
    sessionLabel: '',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 7,
    name: 'Dr. Beatrice Concepcion',
    credentials: 'MD',
    title: 'Professor of Medicine, Nephrology',
    specialty: 'Transplant Nephrology · Kidney Transplant · Amyloidosis',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/concepcion-beatrice-bio-261x347.webp',
    bio: 'Dr. Beatrice Concepcion is a professor of medicine in nephrology who specializes in transplant nephrology. She provides comprehensive, compassionate care to patients who have received kidney and pancreas transplants. Dr. Concepcion personalizes care with expertise in managing immunosuppressive medication, controlling post-transplant complications, and improving quality of life.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: When to Consider Kidney Transplantation in Patients with Amyloidosis',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 8,
    name: 'Dr. Edwin K. McDonald IV',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Gastroenterology',
    specialty: 'Gastroenterology · Small Bowel Disease · Nutrition',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/edwin-macdonald.webp',
    bio: 'Dr. Edwin K. McDonald IV is an assistant professor of medicine specializing in gastroenterology with interest in improving the health of individuals and communities through nutrition education. He works with patients with small bowel diseases, obesity, and other conditions affecting the digestive system.',
    hasVideo: true,
    hasSession: false,
    sessionLabel: '',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 9,
    name: 'Dr. Jennifer Moriatis Wolf',
    credentials: 'MD, PhD',
    title: 'Professor of Orthopedic Surgery and Rehabilitation Medicine',
    specialty: 'Orthopedic Surgery · Hand, Wrist & Elbow · Amyloidosis Complications',
    type: 'Medical Doctor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/wolf-jennifer-bio-261x347.webp',
    bio: 'Dr. Jennifer Moriatis Wolf (MD, PhD) is a professor of orthopedic surgery and rehabilitation medicine specializing in the surgical and non-surgical treatment of bone, nerve, tendon, and ligament injuries caused by trauma or overuse. She conducts basic and clinical research investigating strategies to improve patient outcomes in orthopedic hand, wrist, and elbow care.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Orthopedic Complications of Amyloidosis',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 10,
    name: 'Rachel Campagna',
    credentials: 'MS, CGC',
    title: 'Licensed, Certified Genetic Counselor — Cardiology',
    specialty: 'Hereditary ATTR · Cardiovascular Genetics · Genetic Testing',
    type: 'Genetic Counselor',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/2025-headshot-2.jpg',
    bio: 'Rachel Campagna, MS, CGC, is a board-certified genetic counselor at the University of Chicago. She sees patients in the Cardiovascular Genetics Clinic and the Amyloidosis Clinic, as well as at-risk family members, for personalized discussions on the impact of genetic testing in personal health choices. She is currently the president-elect of the Illinois Society of Genetics Professionals (ISGP), was previously co-chair of the Education Committee, and is an active member of the National Society of Genetic Counselors (NSGC) and the Heart Rhythm Society (HRS).',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: TTR & Genes — How Genes Are Inherited in ATTR, What a Genetic Counselor Does & Demystifying Genetic Testing',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
];

export const trials: Trial[] = [
  {
    id: 'NCT06563895',
    title: 'ACT-EARLY: Acoramidis Transthyretin Amyloidosis Prevention Trial in the Young',
    status: 'Recruiting',
    description: 'A Phase 3, randomized, double-blind, placebo-controlled study evaluating whether acoramidis — a TTR protein stabilizer — can prevent or delay the onset of ATTR cardiomyopathy or polyneuropathy in asymptomatic adults aged 18–75 who carry a known pathogenic TTR gene variant. Treatment begins before any symptoms develop, with the goal of halting disease progression entirely. Sponsored by Eidos Therapeutics, a BridgeBio company.',
    phase: 'Phase 3',
  },
  {
    id: 'NCT06465810',
    title: 'MaesTTRo: Non-interventional Study of Patients With Transthyretin (ATTR) Amyloidosis',
    status: 'Recruiting',
    description: 'A global, prospective, non-interventional observational study enrolling at least 1,850 patients with ATTR amyloidosis to document real-world treatment patterns and long-term outcomes — including effectiveness of eplontersen, a gene-silencing therapy targeting TTR. Participants are followed for 3–7 years through routine clinic visits only; no additional study visits are required. Sponsored by AstraZeneca.',
    phase: 'Observational',
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    month: 'JUN',
    day: '3',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Cardiac Amyloidosis — Current Approaches to Disease-Modifying Therapy',
    presenter: 'Dr. Nitasha Sarswat',
    status: 'upcoming',
  },
  {
    id: 2,
    month: 'JUN',
    day: '10',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Advanced Cardiac Imaging in Amyloidosis Diagnosis',
    presenter: 'Dr. Jeremy A. Slivnick',
    status: 'upcoming',
  },
  {
    id: 3,
    month: 'JUN',
    day: '17',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'What is the Role of Maintenance Treatment in AL Amyloidosis?',
    presenter: 'Dr. Ben Derman',
    status: 'upcoming',
  },
  {
    id: 4,
    month: 'MAY',
    day: '27',
    dayOfWeek: 'Tue',
    time: '5:00 PM CT',
    title: 'TTR & Genes — How Genes Are Inherited in ATTR, What a Genetic Counselor Does & Demystifying Genetic Testing',
    presenter: 'Rachel Campagna, MS, CGC',
    status: 'upcoming',
  },
  {
    id: 5,
    month: 'JUN',
    day: '24',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Neurological Manifestations of Amyloidosis — Managing Amyloidosis PN',
    presenter: 'Dr. Kourosh Rezania',
    status: 'upcoming',
  },
  {
    id: 6,
    month: 'JUL',
    day: '1',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'When to Consider Kidney Transplantation in Patients with Amyloidosis',
    presenter: 'Dr. Beatrice Concepcion',
    status: 'upcoming',
  },
  {
    id: 7,
    month: 'JUL',
    day: '8',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Orthopedic Complications of Amyloidosis — Surgical and Non-Surgical Approaches',
    presenter: 'Dr. Jennifer Moriatis Wolf',
    status: 'upcoming',
  },
];
