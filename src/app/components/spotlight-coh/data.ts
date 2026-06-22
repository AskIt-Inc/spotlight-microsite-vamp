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
  photo?: string;
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
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending';
  regLink?: string;
  shortUrl?: string;
}

const VANDERBILT_URL = 'https://www.vanderbilthealth.com/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Muhamed Baljevic',
    credentials: 'MD, FACP',
    title: 'Associate Professor of Medicine',
    specialty: 'Hematology-Oncology · Plasma Cell Disorders · Multiple Myeloma · AL Amyloidosis',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Muhamed Baljevic, MD, FACP, is a hematologist and medical oncologist at Vanderbilt University Medical Center. He is Director of the Multiple Myeloma Program and Director of the Vanderbilt Amyloidosis Multidisciplinary Program (VAMP) at Vanderbilt-Ingram Cancer Center. His clinical and research interests include multiple myeloma, AL amyloidosis, and other plasma cell disorders, with research focused on therapy resistance, post-transplant immune recovery, genomic changes in plasma cell disease, and novel cellular therapy approaches.',
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
    sessionDate: 'August 26',
    sessionTitle: 'Amyloidosis Session Topic TBD',
    sessionDescription: 'Session title and description are pending approval.',
    appointmentUrl: VANDERBILT_URL,
    sessionUuid: '0ed76973-3048-4781-8c6d-46fb2c0ac6a2',
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
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: VANDERBILT_URL,
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
];

export const trials: Trial[] = [
  {
    id: 'NCT07081646',
    title: 'AZD0120 / GC012F CAR-T therapy targeting CD19 and BCMA for relapsed or refractory AL amyloidosis',
    status: 'Still recruiting',
    description: 'Phase 1b/2 study evaluating the safety, tolerability, and efficacy of AZD0120, a CAR-T cell therapy targeting CD19 and BCMA, in participants with relapsed or refractory AL amyloidosis.',
    phase: 'Phase 1/2',
  },
  {
    id: 'NCT06465810',
    title: 'MaesTTRo: AstraZeneca registry study for transthyretin (ATTR) amyloidosis',
    status: 'Recruiting',
    description: 'International, prospective, non-interventional registry study collecting real-world data on adults with ATTR amyloidosis, including ATTR-CM and hereditary ATTRv-PN. Participants are followed through routine care for 3-7 years to document disease course, treatment patterns, outcomes, and effectiveness of treatments including eplontersen.',
    phase: 'Observational',
  },
  {
    id: 'NCT06158854',
    title: 'Etentamig / ABBV-383 for adult participants with AL amyloidosis',
    status: 'Completed recruitment',
    description: 'Open-label Phase 1/2 study evaluating the safety and efficacy of etentamig (ABBV-383) in adult participants with immunoglobulin light chain (AL) amyloidosis.',
    phase: 'Phase 1/2',
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    uuid: 'c64e7e1e-b6df-4195-ab36-92c19ddb0d83',
    month: 'AUG',
    day: '3',
    dayOfWeek: 'Mon',
    time: '5:00 PM CT',
    title: 'GI specific nutrition recommendations and general diet education for amyloid/chronic disease',
    presenter: 'Julia Carlson RD, LDN',
    description: 'Progress comes from steady habits, not heroic weeks. Learn how top patients build consistency, recover from setbacks, and keep improving over time. We will create a weekly check in, a small goals system, and a reset plan. Leave with a long game routine you can sustain. Includes a reset plan for bad weeks so you bounce back faster.',
    status: 'upcoming',
    regLink: 'https://us06web.zoom.us/meeting/register/dgMFJTa1R-Ca4kJ5tbjVxA',
    shortUrl: 'https://bit.ly/4fOo3j4',
  },
  {
    id: 2,
    uuid: 'd8db7069-13ce-4211-b986-7e7210107922',
    month: 'AUG',
    day: '5',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'GI Symptoms in Amyloidosis: Understanding Causes, Management, and Treatment Options',
    presenter: 'Sara Horst MD, MPH, FACG, AGAF',
    description: 'A patient-facing session on gastrointestinal symptoms in amyloidosis, including causes, management, and treatment options.',
    status: 'upcoming',
  },
  {
    id: 3,
    uuid: 'e3c462ad-f9b5-4b4a-84cf-0d52ffce0367',
    month: 'AUG',
    day: '12',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Neuropathy Diagnosis, Treatment, and Rehabilitation',
    presenter: 'Amanda C. Peltier MD',
    description: 'A placeholder neurology session on evaluation of amyloidosis-related peripheral neuropathy and related neurologic symptoms.',
    status: 'upcoming',
  },
  {
    id: 4,
    uuid: 'c6f035c1-469c-4d3c-a472-130ce0708470',
    month: 'AUG',
    day: '19',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Amyloidosis Session Topic TBD',
    presenter: '',
    description: 'Presenter, title, and session description are pending confirmation.',
    status: 'pending',
  },
  {
    id: 5,
    uuid: '0ed76973-3048-4781-8c6d-46fb2c0ac6a2',
    month: 'AUG',
    day: '26',
    dayOfWeek: 'Wed',
    time: '5:00 PM CT',
    title: 'Amyloidosis Session Topic TBD',
    presenter: 'Hasan Siddiqi MD, MSCR, FACC',
    description: 'Session title and description are pending approval.',
    status: 'pending',
  },
];
