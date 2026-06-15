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
  sessionDate: string;
  sessionTitle: string;
  sessionDescription: string;
  education?: string;
  appointmentUrl: string;
  videoUrl?: string;
  sessionUuid?: string;
  profileUid?: number;
}

export interface SupportStaff {
  id: number;
  name: string;
  credentials: string;
  role: string;
  email?: string;
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
  uuid?: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  presenter: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  regLink?: string;
  shortUrl?: string;
}

const VANDERBILT_URL = 'https://www.vanderbilthealth.com/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Muhamed Baljevic',
    credentials: 'MD, FACP',
    title: 'Associate Professor of Medicine · Director, Multiple Myeloma Program · Director, VAMP',
    specialty: 'Hematology-Oncology · Plasma Cell Disorders · Multiple Myeloma · AL Amyloidosis',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Baljevic is Associate Professor of Medicine in Hematology-Oncology and Director of the Vanderbilt Amyloidosis Multidisciplinary Program. The draft material describes his research interests around chemotherapy resistance, post-transplant immune recovery, genetic factors in plasma cell cancers, and novel therapies for relapsed/refractory multiple myeloma and AL amyloidosis. Final public copy should be reviewed and approved by VAMP.',
    hasVideo: false,
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: VANDERBILT_URL,
  },
  {
    id: 2,
    name: 'Dr. Hasan Siddiqi',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine · Director of Cardiac Amyloidosis',
    specialty: 'Cardiology · Heart Failure · Cardiac Amyloidosis · Transplantation · LVAD',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Siddiqi is listed in the VAMP draft as a cardiology lead for cardiac amyloidosis. The current notes mention possible cardiology topics including demystifying cardiac biopsies for amyloidosis-CM. Final title, intro copy, and approved headshot are still needed.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'August 5',
    sessionTitle: 'Cardiology topic TBD',
    sessionDescription: 'Draft options include demystifying cardiac biopsies for amyloidosis-CM or another cardiology topic. Avoid using a VAMP co-directorship label unless Vanderbilt confirms it.',
    appointmentUrl: VANDERBILT_URL,
    sessionUuid: 'vamp-2026-08-05',
  },
  {
    id: 3,
    name: 'Dr. Salyka Sengsayadeth',
    credentials: 'MD',
    title: 'Associate Professor of Medicine · SCT and Cellular Therapy',
    specialty: 'Hematology · Plasma Cell Disorders · Stem Cell Transplantation · CAR-T',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Sengsayadeth is included in the VAMP August draft for a session focused on CAR-T and autologous stem cell transplantation. Final session copy, approved bio, and public profile assets are still needed.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'August 26',
    sessionTitle: 'CAR-T vs AutoSCT: when to consider and where the field is heading',
    sessionDescription: 'A placeholder education session on when CAR-T and autologous stem cell transplantation may be considered in amyloidosis care and where the field is heading.',
    appointmentUrl: VANDERBILT_URL,
    sessionUuid: 'vamp-2026-08-26',
  },
  {
    id: 4,
    name: 'Dr. Amanda Peltier',
    credentials: 'MD',
    title: 'Professor of Neurology and Medicine · Chief, Neuromuscular Division',
    specialty: 'Neurology · Peripheral Neuropathy · Autonomic Neuropathy · Amyloidosis',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Peltier is listed in the draft VAMP material for neurology expertise, including peripheral and autonomic neuropathy. Final approved copy should confirm the exact session scope and public-facing biography.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'August 12',
    sessionTitle: 'How neurology evaluates amyloidosis-related peripheral neuropathy',
    sessionDescription: 'A placeholder neurology session on evaluation of amyloidosis-related peripheral neuropathy and related neurologic symptoms.',
    appointmentUrl: VANDERBILT_URL,
    sessionUuid: 'vamp-2026-08-12',
  },
  {
    id: 5,
    name: 'Dr. Anthony Langone',
    credentials: 'MD',
    title: 'Associate Professor of Medicine · Founding VAMP Member',
    specialty: 'Nephrology · Kidney Transplantation · Renal Amyloidosis · Multiple Myeloma',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Langone is listed in the VAMP draft as a founding member with nephrology and transplant expertise. The draft material still needs final public copy, approved role wording, and any current appointment or profile link.',
    hasVideo: false,
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: VANDERBILT_URL,
  },
  {
    id: 6,
    name: 'Dr. Sara Horst',
    credentials: 'MD',
    title: 'Professor, Gastroenterology, Hepatology, and Nutrition',
    specialty: 'Gastroenterology · GI Symptoms · Symptom Management · Digital Health',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Horst is listed in the VAMP August draft for gastrointestinal symptoms in amyloidosis. Final session framing, public biography, and any supporting resources still need approval.',
    hasVideo: false,
    hasSession: true,
    sessionDate: 'August 19',
    sessionTitle: 'GI symptoms in amyloidosis',
    sessionDescription: 'A placeholder education session on gastrointestinal symptoms in amyloidosis and practical symptom-management considerations.',
    appointmentUrl: VANDERBILT_URL,
    sessionUuid: 'vamp-2026-08-19',
  },
];

export const supportStaff: SupportStaff[] = [
  {
    id: 1,
    name: 'Tracy Allen',
    credentials: 'RN',
    role: 'Registered Nurse — Hematology / Amyloidosis',
    note: 'Tracy Allen supports hematology patients in the Vanderbilt Amyloidosis Multidisciplinary Program by helping coordinate clinic needs, patient questions, treatment follow-up, and communication with the care team.',
  },
  {
    id: 2,
    name: 'Natalie Castillo',
    credentials: 'APRN',
    role: 'Advanced Practice Registered Nurse — Cardiology / Cardiac Amyloidosis',
    note: 'Natalie Castillo supports cardiology care for patients with cardiac amyloidosis, helping with clinical assessment, care planning, follow-up needs, and coordination across the multidisciplinary program.',
  },
  {
    id: 3,
    name: 'Brian Miller',
    credentials: 'RN',
    role: 'Registered Nurse — Cardiology / Cardiac Amyloidosis',
    note: 'Brian Miller supports cardiology patients in the Vanderbilt Amyloidosis Multidisciplinary Program by helping patients understand next steps, coordinate testing and follow-up, and stay connected with the cardiology team.',
  },
  {
    id: 4,
    name: 'Genetic Counseling',
    credentials: '',
    role: 'Genetic Counseling Team — Hereditary Amyloidosis / Family Risk',
    note: 'The genetic counseling team helps patients and families understand hereditary amyloidosis risk, genetic testing considerations, family implications, and next steps for informed care planning.',
  },
  {
    id: 5,
    name: 'Social Work & Patient Advocacy',
    credentials: '',
    role: 'Social Work and Patient Advocacy Team — Care Navigation / Support Resources',
    note: 'The social work and patient advocacy team helps VAMP patients address practical care needs, support resources, access questions, and quality-of-life concerns throughout diagnosis and treatment.',
  },
  {
    id: 6,
    name: 'Physical & Occupational Therapy',
    credentials: 'PT/OT',
    role: 'Rehabilitation Therapy Team — Mobility / Daily Function',
    note: 'The physical and occupational therapy team supports patients with mobility, strength, daily function, and rehabilitation needs related to amyloidosis and its effects on everyday life.',
  },
  {
    id: 7,
    name: 'Radiology & Pathology',
    credentials: '',
    role: 'Diagnostic Services Team — Radiology / Pathology',
    note: 'The radiology and pathology teams support VAMP by helping evaluate imaging, tissue findings, and diagnostic information that guide amyloidosis diagnosis, monitoring, and treatment planning.',
  },
];

export const trials: Trial[] = [];

export const sessions: Session[] = [
  {
    id: 1,
    uuid: 'vamp-2026-08-05',
    month: 'AUG',
    day: '5',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Cardiology topic TBD',
    presenter: 'Dr. Hasan Siddiqi',
    description: 'Draft options include demystifying cardiac biopsies for amyloidosis-CM or another cardiology topic. Final title and presenter details require VAMP approval.',
    status: 'upcoming',
  },
  {
    id: 2,
    uuid: 'vamp-2026-08-12',
    month: 'AUG',
    day: '12',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'How neurology evaluates amyloidosis-related peripheral neuropathy',
    presenter: 'Dr. Amanda Peltier',
    description: 'A placeholder neurology session on evaluation of amyloidosis-related peripheral neuropathy and related neurologic symptoms.',
    status: 'upcoming',
  },
  {
    id: 3,
    uuid: 'vamp-2026-08-19',
    month: 'AUG',
    day: '19',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'GI symptoms in amyloidosis',
    presenter: 'Dr. Sara Horst',
    description: 'A placeholder education session on gastrointestinal symptoms in amyloidosis and practical symptom-management considerations.',
    status: 'upcoming',
  },
  {
    id: 4,
    uuid: 'vamp-2026-08-26',
    month: 'AUG',
    day: '26',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'CAR-T vs AutoSCT: when to consider and where the field is heading',
    presenter: 'Dr. Salyka Sengsayadeth',
    description: 'A placeholder education session on when CAR-T and autologous stem cell transplantation may be considered and where the field is heading.',
    status: 'upcoming',
  },
  {
    id: 5,
    uuid: 'vamp-2026-08-17',
    month: 'AUG',
    day: '17',
    dayOfWeek: 'Mon',
    time: 'Time TBD',
    title: 'GI dietician topic TBD',
    presenter: 'VAMP team member TBD',
    description: 'Placeholder Monday support session from the draft planning notes. Final title and presenter details are still needed.',
    status: 'upcoming',
  },
  {
    id: 6,
    uuid: 'vamp-2026-08-06',
    month: 'AUG',
    day: '6',
    dayOfWeek: 'Thu',
    time: 'Time TBD',
    title: 'Managing expectations in rare and chronic disease',
    presenter: 'Presenter TBD',
    description: 'Placeholder Thursday support session from the draft planning notes. Final presenter and approved copy are still needed.',
    status: 'upcoming',
  },
  {
    id: 7,
    uuid: 'vamp-2026-08-13',
    month: 'AUG',
    day: '13',
    dayOfWeek: 'Thu',
    time: 'Time TBD',
    title: 'Addressing depression and treatment strategies',
    presenter: 'Presenter TBD',
    description: 'Placeholder Thursday support session from the draft planning notes. Final presenter and approved copy are still needed.',
    status: 'upcoming',
  },
];
