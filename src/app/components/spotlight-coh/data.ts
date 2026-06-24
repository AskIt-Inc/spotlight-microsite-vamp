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
    id: 'NCT07223203',
    title: 'TRITON-PN: Nucresiran for hereditary transthyretin amyloidosis with polyneuropathy',
    status: 'Recruiting',
    description: 'Phase 3 study evaluating the efficacy and safety of nucresiran in patients with hereditary transthyretin-mediated amyloidosis with polyneuropathy, including effects on neurologic impairment, quality of life, nutritional status, disability, gait speed, and serum transthyretin levels.',
    phase: 'Phase 3',
  },
];
