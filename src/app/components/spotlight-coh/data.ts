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
  videoUrl?: string;
  appointmentLabel?: string;
}

export interface SupportStaff {
  id: number;
  name: string;
  credentials: string;
  role: string;
  note?: string;
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
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const CITY_OF_HOPE_URL = 'https://www.cityofhope.org/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Michael Rosenzweig',
    credentials: 'MD',
    title: 'Associate Professor, Hematology & Hematopoietic Cell Transplantation · Director, COH Amyloidosis Program',
    specialty: 'AL Amyloidosis · Relapsed/Refractory Disease · Venetoclax · TTR · AA · LECT2',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Rosenzweig is an associate professor in the department of Hematology & Hematopoietic Cell Transplantation and is an expert in plasma cell disorders, including Multiple Myeloma, AL amyloidosis, Waldenström macroglobulinemia, and POEMS. He is the director of the City of Hope Amyloidosis Program and is interested in caring for patients with all forms of amyloidosis—light chain (AL), transthyretin (TTR), secondary amyloidosis (AA), and LECT2. He works closely with a multidisciplinary team, including cardiology, nephrology, and neurology, to care for patients with amyloidosis. His research interests include finding new treatments for amyloidosis at various stages of the disease process.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Second-line options for relapsed/refractory disease — the COH experience with venetoclax for AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Rosenzweig',
  },
  {
    id: 2,
    name: 'Dr. Lisa Lee',
    credentials: 'MD',
    title: 'Associate Clinical Professor, Hematology & Hematopoietic Cell Transplantation',
    specialty: 'AL Amyloidosis · Earlier Diagnosis · Precision Medicine · SAVE Trial',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Lisa Lee is an associate clinical professor in the department of Hematology and Hematopoietic Cell Transplantation. Dr. Lee is interested in precision medicine and the understanding of how the immune system can be enhanced to fight cancer. She is a patient-centric physician who works closely with her patients to understand their perspectives and help guide them through their journey. She sees amyloidosis patients at the City of Hope affiliate site in Irvine, CA, and is the principal investigator leading the SAVE trial at City of Hope—a study that may support earlier diagnosis of AL amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: SAVE trial — towards earlier diagnosis of AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Lisa Lee',
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    credentials: 'MD',
    title: 'Assistant Professor, Hematology/Oncology',
    specialty: 'AL Amyloidosis · Plasma Cell Disorders · Multiple Myeloma · Bispecific Antibodies',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Sarah Lee is an assistant professor in the department of Hematology/Oncology, specializing in plasma cell disorders, multiple myeloma, and AL amyloidosis. She is a patient-centered physician who focuses on listening to her patients\' needs and helping them define their own medical treatment goals. Her clinical expertise includes second-line treatment options for relapsed/refractory AL amyloidosis, with a focus on the City of Hope experience with bispecific antibodies.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Second-line treatment options — the COH experience with bispecific antibodies for AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Sarah Lee',
  },
  {
    id: 4,
    name: 'Dr. Faizi Jamal',
    credentials: 'MD',
    title: 'Associate Clinical Professor · Chief, Division of Cardiology',
    specialty: 'Cardiac Amyloidosis · Cardiovascular Disease · Cardiac Imaging · AI Diagnostics',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Jamal is an associate clinical professor in the Division of Cardiology and Chief, Division of Cardiology at City of Hope. He is an expert in cardiovascular disease, cardiac imaging, and in managing heart failure including cardiomyopathy associated with amyloidosis. His research focuses on earlier detection of cardiotoxicity and the application of artificial intelligence algorithms to measure cardiac function—a rapidly evolving area with significant implications for diagnosing cardiac amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: AI tools for the diagnosis of cardiac amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Jamal',
  },
  {
    id: 5,
    name: 'Dr. Tibor Kovacsovics',
    credentials: 'MD',
    title: 'Professor, Hematology & Hematopoietic Cell Transplantation · Medical Director, Leukemia — COH Phoenix',
    specialty: 'Primary AL Amyloidosis · Autologous SCT · AML · ALL · COH Goodyear AZ',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Kovacsovics is a professor in the department of Hematology and Hematopoietic Cell Transplantation, and the Medical Director of Leukemia at COH Phoenix. He is an expert in the clinical management of acute myeloid leukemia (AML), acute lymphoblastic leukemia (ALL), and hematopoietic stem cell transplantation. He is also an expert in amyloidosis and an active member of the City of Hope Amyloidosis Program, managing patients at the Goodyear, AZ site. His session explores how first-line treatment for AL amyloidosis has evolved and where upfront autologous SCT remains a key consideration.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: The role of upfront autologous SCT for primary AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
    appointmentLabel: 'Schedule with Dr. Kovacsovics',
  },
];

export const supportStaff: SupportStaff[] = [
  {
    id: 1,
    name: 'Eve Celestial',
    credentials: 'RN',
    role: 'Multi-disciplinary Amyloid Clinic Registered Nurse',
  },
  {
    id: 2,
    name: 'Tricia Walker',
    credentials: 'NP',
    role: 'Amyloidosis Nurse Practitioner',
    note: 'Expertise in Smoldering Multiple Myeloma, Relapsed/Refractory Multiple Myeloma, Myeloproliferative Neoplasms, and Febrile Neutropenia.',
  },
  {
    id: 3,
    name: 'Justine Buchholz',
    credentials: 'NP',
    role: 'Amyloidosis Nurse Practitioner',
    note: 'Family nurse practitioner in advanced practice nursing with a certification in family care.',
  },
  {
    id: 4,
    name: 'Edelyn Whip',
    credentials: '',
    role: 'Nurse Navigator, Amyloid Clinic',
  },
  {
    id: 5,
    name: 'Gloria Higuera',
    credentials: '',
    role: 'Senior Site Liaison for Patient Scheduling',
  },
  {
    id: 6,
    name: 'Stephanie Goral',
    credentials: 'RN',
    role: 'Clinical Research Nurse for Amyloid Trials',
  },
  {
    id: 7,
    name: 'James Sanchez',
    credentials: 'PhD',
    role: 'Staff Scientist, Clinical & Translational Research',
    note: 'Leading research initiatives in healthcare delivery through scientific project development within City of Hope.',
  },
];

export const trials: Trial[] = [];

export const sessions: Session[] = [
  {
    id: 1,
    month: 'JUL',
    day: '1',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'Second-line options for relapsed/refractory disease: the COH experience with venetoclax for AL amyloidosis',
    presenter: 'Dr. Michael Rosenzweig',
    description: 'Dr. Rosenzweig will discuss his approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with venetoclax.',
    status: 'upcoming',
  },
  {
    id: 2,
    month: 'JUL',
    day: '8',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'SAVE trial: towards earlier diagnosis of AL amyloidosis',
    presenter: 'Dr. Lisa Lee',
    description: 'Dr. Lisa Lee will review the SAVE trial and how results could possibly lead to an earlier diagnosis of AL amyloidosis.',
    status: 'upcoming',
  },
  {
    id: 3,
    month: 'JUL',
    day: '15',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'Second-line treatment options: the COH experience with bispecific antibodies for AL amyloidosis',
    presenter: 'Dr. Sarah Lee',
    description: 'Dr. Sarah Lee will discuss her approach to second-line treatment of AL amyloidosis and specifically the City of Hope experience with bispecific antibodies.',
    status: 'upcoming',
  },
  {
    id: 4,
    month: 'JUL',
    day: '22',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'AI tools for the diagnosis of cardiac amyloidosis',
    presenter: 'Dr. Faizi Jamal',
    description: 'Dr. Jamal will discuss the current and evolving AI tools for the diagnosis of cardiac amyloidosis.',
    status: 'upcoming',
  },
  {
    id: 5,
    month: 'JUL',
    day: '29',
    dayOfWeek: 'Wed',
    time: 'Time TBD',
    title: 'The role of upfront autologous SCT for primary AL amyloidosis',
    presenter: 'Dr. Tibor Kovacsovics',
    description: 'Dr. Kovacsovics will discuss autologous SCT for the treatment of AL amyloidosis: past, present, and future, including how first-line treatment has evolved and where upfront AutoSCT is considered.',
    status: 'upcoming',
  },
];
