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
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const CITY_OF_HOPE_URL = 'https://www.cityofhope.org/';

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Michael Rosenzweig',
    credentials: 'MD',
    title: 'City of Hope presenter',
    specialty: 'AL Amyloidosis · Relapsed/Refractory Disease · Venetoclax',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Presenter introduction to be provided by City of Hope. This July session focuses on second-line treatment of AL amyloidosis and the City of Hope experience with venetoclax.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Second-line options for relapsed/refractory disease',
    appointmentUrl: CITY_OF_HOPE_URL,
  },
  {
    id: 2,
    name: 'Dr. Lisa Lee',
    credentials: 'MD',
    title: 'City of Hope presenter',
    specialty: 'AL Amyloidosis · Earlier Diagnosis · SAVE Trial',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Presenter introduction to be provided by City of Hope. This July session reviews the SAVE trial and how its results could support earlier diagnosis of AL amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: SAVE trial and earlier diagnosis of AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
  },
  {
    id: 3,
    name: 'Dr. Sarah Lee',
    credentials: 'MD',
    title: 'City of Hope presenter',
    specialty: 'AL Amyloidosis · Relapsed/Refractory Disease · Bispecific Antibodies',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Presenter introduction to be provided by City of Hope. This July session focuses on second-line treatment of AL amyloidosis and the City of Hope experience with bispecific antibodies.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Bispecific antibodies for AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
  },
  {
    id: 4,
    name: 'Dr. Faizi Jamal',
    credentials: 'MD',
    title: 'City of Hope presenter',
    specialty: 'Cardiac Amyloidosis · Diagnosis · AI Tools',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Presenter introduction to be provided by City of Hope. This July session covers current and evolving AI tools for the diagnosis of cardiac amyloidosis.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: AI tools for cardiac amyloidosis diagnosis',
    appointmentUrl: CITY_OF_HOPE_URL,
  },
  {
    id: 5,
    name: 'Dr. Tibor Kovacsovics',
    credentials: 'MD',
    title: 'City of Hope presenter',
    specialty: 'Primary AL Amyloidosis · Autologous SCT · Upfront Treatment',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Presenter introduction to be provided by City of Hope. This July session discusses autologous SCT for primary AL amyloidosis, including past, present, and future treatment considerations.',
    hasVideo: false,
    hasSession: true,
    sessionLabel: 'Register: Upfront autologous SCT for primary AL amyloidosis',
    appointmentUrl: CITY_OF_HOPE_URL,
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
