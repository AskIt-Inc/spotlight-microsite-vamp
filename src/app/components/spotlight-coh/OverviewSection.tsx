import React, { useState } from 'react';
import { Calendar, CheckCircle, ChevronDown, ExternalLink } from 'lucide-react';
import { buildRegUrlMap, type NormalizedSession, useSpotlightSessions } from './useSpotlightSessions';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';
const ACCENT = 'var(--oav-accent)';
const ACCENT_TEXT = 'var(--oav-accent-text)';

// ─── Overview — VAMP ──────────────────────────────────────────────────────────
// Layout:
//   1. Impactful opening statement
//   2. Three visual program pillars (scannable)
//   3. Meet the Directors
//   4. About the Program

const pillars: Array<{ icon: string; label: string; text: string }> = [
  {
    icon: '🩺',
    label: 'Exceptional Diagnostic Rigor & Outreach',
    text: 'VAMP applies hyper-specific criteria to identify the exact type from over 40 variants mimicking other disorders. To broaden access to healthcare, VAMP uses regional outreach locations to bring elite academic diagnostics directly to patients.',
  },
  {
    icon: '🧑‍⚕️',
    label: 'True Multidisciplinary Syncing',
    text: 'VAMP streamlines complex care by bringing over a dozen collaborating specialists directly to the table. The program unites experts across Hematology, Cardiology, Neurology, Nephrology, and Gastroenterology into one cohesive, synchronized care team.',
  },
  {
    icon: '🔬',
    label: 'Advanced Front-Line Therapeutics',
    text: 'VAMP pioneers practice-changing treatment strategies that attack amyloidosis right from diagnosis. By serving as a key contributing site for landmark clinical trials, the program helps establish global first-line standard-of-care regimens that significantly optimize patient outcomes.',
  },
];

const PROGRAM_ABOUT_PARAGRAPHS = [
  `Founded in 2011, the Vanderbilt Amyloidosis Multidisciplinary Program (VAMP) integrates world-class specialists into a single, highly coordinated program for patients requiring expert amyloidosis evaluation, treatment planning, long-term follow-up, and supportive care. VAMP is built upon a vital mission: to provide comprehensive care for all clinical forms of amyloidosis. By fostering seamless collaboration across hematology, cardiology, neurology, nephrology, gastroenterology, specialized nursing, nutrition, and social work, the program focuses on precisely managing complex, organ-specific symptoms while advancing practice-changing clinical research. Notably, Vanderbilt served as a contributing site for the landmark ANDROMEDA trial published in the New England Journal of Medicine, which established the addition of daratumumab to CyBorD (DARA-CyBorD) as the international standard first-line treatment for AL amyloidosis, significantly improving complete response rates and organ function.`,
  `The VAMP team works collaboratively to raise global disease awareness, reduce critical diagnostic delays, and pioneer individualized treatment plans that place the program at the forefront of the field. Committed to health equity, VAMP actively broadens access to healthcare through dedicated outreach locations that bring elite academic expertise directly into the communities where patients live. By seamlessly connecting individuals with robust patient education, proactive disease monitoring, and premier clinical trial opportunities, VAMP provides a comprehensive ecosystem of support, proving that exceptional care is far more than just a single clinic visit.`,
];

const SectionHeading: React.FC<{ title: string; subtitle: string; strong?: boolean }> = ({ title, subtitle, strong = false }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2
      style={{
        fontSize: '28px',
        fontWeight: strong ? 700 : 300,
        color: '#000000',
        margin: 0,
        lineHeight: 1.3,
        fontFamily: FONT,
      }}
    >
      {title}
    </h2>
    <p
      style={{
        fontSize: '14px',
        fontWeight: strong ? 600 : undefined,
        color: strong ? '#1C1C1C' : '#4B5563',
        marginTop: '8px',
        marginBottom: 0,
        fontFamily: FONT,
        lineHeight: 1.5,
      }}
    >
      {subtitle}
    </p>
  </div>
);

interface DirectorProfile {
  lastName: string;
  name: string;
  sessionName: string;
  photoUrl: string;
  photoPosition?: string;
  roles: string[];
  highlights: string[];
  bio: string[];
  appointmentUrl: string;
}

const directorProfiles: DirectorProfile[] = [
  {
    lastName: 'Siddiqi',
    name: 'Hasan Siddiqi, MD, MSCR, FACC',
    sessionName: 'Hasan Siddiqi',
    photoUrl: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-03/sadiqi.png',
    appointmentUrl: 'https://www.vanderbilthealth.com/doctors/siddiqi-hasan',
    roles: [
      'Director, Cardiac Amyloidosis Program',
      'Assistant Professor of Medicine',
      'Cardiology · Heart Failure · Cardiac Amyloidosis · Transplantation · LVAD',
    ],
    highlights: [
      'Evaluates patients on both the main campus and at dedicated regional clinics to broaden healthcare access across Tennessee.',
      'Focuses on bringing cutting-edge, disease-modifying, and life-extending therapies directly to patients\' communities.',
    ],
    bio: [
      'Hasan Siddiqi, MD, MSCR, FACC, is a cardiologist specializing in patients with heart failure, cardiac amyloidosis, and those requiring advanced therapies such as heart transplantation and artificial heart pump support.',
      'He completed medical school and a clinical research degree at the University of Michigan, internal medicine residency at the Hospital of the University of Pennsylvania, and cardiovascular disease and advanced heart failure fellowships at Brigham and Women\'s Hospital / Harvard Medical School.',
      'His clinical work includes advanced heart failure, cardiac amyloidosis, heart transplantation, and LVAD care. His research interests include heart failure, heart transplantation outcomes, and collaborations related to cardiac amyloidosis.',
    ],
  },
  {
    lastName: 'Baljevic',
    name: 'Muhamed Baljevic, MD, FACP',
    sessionName: 'Muhamed Baljevic',
    photoUrl: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-06/Baljevic.jpg',
    photoPosition: 'center 35%',
    appointmentUrl: 'https://www.vanderbilthealth.com/doctors/baljevic-muhamed',
    roles: [
      'Director, Vanderbilt Amyloidosis Multidisciplinary Program (VAMP) of Vanderbilt-Ingram Cancer Center',
      'Director, Multiple Myeloma Program',
      'Co-chair, VICC Protocol Review and Monitoring System',
      'Associate Professor of Medicine',
      'Specializes in Hematology-Oncology, Plasma Cell Disorders, Multiple Myeloma and AL',
    ],
    highlights: [
      'Serves as the sole faculty member on the NCCN discussion writing committee while actively advocating for an AL patient handbook and a patient advocate on the national panel.',
      'Actively champions patient-centric resources by advocating for the creation of a dedicated AL patient education handbook.',
    ],
    bio: [
      'Muhamed Baljevic, MD, FACP, is a hematologist and medical oncologist who joined Vanderbilt University Medical Center as faculty in the Department of Medicine in 2021.',
      'He directs the Vanderbilt Amyloidosis Multidisciplinary Program and the Multiple Myeloma Program at Vanderbilt-Ingram Cancer Center.',
      'His clinical and research interests include multiple myeloma, AL amyloidosis, and other plasma cell disorders, with investigative work focused on therapy resistance, post-transplant immune recovery, and genomic events in plasma cell disease.',
    ],
  },
];

function personNameKey(name: string): string {
  const credentialsAndSuffixes = new Set([
    'agaf',
    'aprn',
    'bsn',
    'ccrn',
    'dbh',
    'facg',
    'facc',
    'facp',
    'ii',
    'iii',
    'iv',
    'ldn',
    'lmsw',
    'md',
    'mph',
    'ms',
    'mscr',
    'msn',
    'ocn',
    'phd',
    'rd',
    'rn',
    'sw',
  ]);

  return name
    .replace(/^Dr\.?\s+/i, '')
    .replace(/[^a-z\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((part) => {
      const key = part.toLowerCase();
      return part.length > 1 && !credentialsAndSuffixes.has(key);
    })
    .join(' ')
    .toLowerCase();
}

function formatSessionDate(session?: NormalizedSession): string | undefined {
  if (!session?.month || !session.day) return undefined;
  const lower = session.month.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)} ${session.day}`;
}

const DirectorSection: React.FC<{
  profile: DirectorProfile;
  regLink?: string;
  session?: NormalizedSession;
}> = ({ profile, regLink, session }) => {
  const [expanded, setExpanded] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);
  const sessionDate = formatSessionDate(session);

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      <div
        className="director-profile-row"
        style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}
      >
        <img
          src={profile.photoUrl}
          alt={profile.name}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: profile.photoPosition ?? 'center',
            border: `3px solid ${ACCENT}`,
            flexShrink: 0,
          }}
        />
        <div style={{ fontFamily: FONT, minWidth: 0 }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000000', lineHeight: 1.2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1C1C', lineHeight: 1.5, marginTop: '4px' }}>
            {profile.roles.map((role) => (
              <React.Fragment key={role}>
                {role}
                <br />
              </React.Fragment>
            ))}
          </div>
          {sessionDate && (
            <div
              style={{
                fontSize: '12px',
                color: '#1C1C1C',
                fontFamily: FONT,
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Calendar size={11} color="#1C1C1C" />
              <span>{sessionDate}</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ margin: '0 0 12px 0' }}>
        {profile.highlights.map((highlight) => (
          <div
            key={highlight}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              marginBottom: '8px',
            }}
          >
            <CheckCircle
              size={16}
              color={ACCENT_TEXT}
              strokeWidth={1.8}
              style={{ flexShrink: 0, marginTop: '3px' }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#000000',
                lineHeight: 1.6,
                fontFamily: FONT,
              }}
            >
              {highlight}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded((value) => !value)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 0',
          fontSize: '13px',
          fontWeight: 700,
          color: ACCENT_TEXT,
          fontFamily: FONT,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <ChevronDown
          size={14}
          color={ACCENT_TEXT}
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
        <span>{expanded ? 'Show less' : `Learn more about Dr. ${profile.lastName}`}</span>
      </button>

      {expanded && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--oav-border)',
          }}
        >
          {profile.bio.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.7,
                margin: '0 0 10px 0',
                fontFamily: FONT,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          alignItems: 'center',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        {regLink && (
          <a
            href={regLink}
            target="_blank"
            rel="noopener noreferrer"
            title="Register"
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 13px',
              background: registerHovered ? '#000000' : '#1C1C1C',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 300,
              fontFamily: FONT,
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            <Calendar size={12} color="#ffffff" />
            Register
          </a>
        )}

        <a
          href={profile.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 13px',
            background: 'transparent',
            border: '1px solid #E8E8E8',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 300,
            fontFamily: FONT,
            textDecoration: 'none',
            color: '#000000',
          }}
        >
          Schedule an appointment
          <ExternalLink size={12} color="#4B5563" />
        </a>

      </div>
    </div>
  );
};

export const AboutProgramSection: React.FC = () => (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '32px 0 24px',
    }}
  >
    <details
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          padding: '18px 20px',
          fontFamily: FONT,
          listStylePosition: 'inside',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#000000' }}>About VAMP</span>
        <span
          style={{
            display: 'block',
            paddingLeft: '22px',
            marginTop: '5px',
            fontSize: '13px',
            fontWeight: 300,
            color: '#4B5563',
            lineHeight: 1.5,
          }}
        >
          Learn how Vanderbilt coordinates multidisciplinary amyloidosis care, education, and research access
        </span>
      </summary>

      <div style={{ borderTop: '1px solid var(--oav-border)', padding: '20px' }}>
        {PROGRAM_ABOUT_PARAGRAPHS.map((para, i) => (
          <p
            key={i}
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: i < PROGRAM_ABOUT_PARAGRAPHS.length - 1 ? '0 0 14px 0' : 0,
              fontFamily: FONT,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </details>
  </section>
);

export const OverviewSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
    }}
  >
    <div>
      {/* Opening statement */}
      <blockquote
        style={{
          margin: '0 0 32px 0',
          borderLeft: `4px solid ${BRAND}`,
          paddingLeft: '20px',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.5,
            margin: 0,
            fontFamily: FONT,
          }}
        >
          Founded in 2011 as Tennessee&apos;s first dedicated center, the Vanderbilt Amyloid Multidisciplinary Program (VAMP) is a premier referral powerhouse across the southeastern United States. The program mission is to provide comprehensive, individualized care for all forms of amyloidosis. By uniting world-class clinical expertise, advanced clinical trials, and an integrated specialty pharmacy into one synchronized pathway, the program reduces diagnostic delays, manages complex symptoms, and builds an accessible, lifelong partnership for every patient journey.
        </p>
      </blockquote>

      {/* Three pillars */}
      <div
        className="overview-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {pillars.map((p) => (
          <div
            key={p.label}
            style={{
              background: 'var(--oav-page-bg)',
              border: '1px solid var(--oav-border)',
              borderRadius: '8px',
              padding: '28px 26px',
              minHeight: '220px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '25px', lineHeight: 1, flexShrink: 0 }}>{p.icon}</span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.02em',
                  color: BRAND,
                  fontFamily: FONT,
                  lineHeight: 1.35,
                }}
              >
                {p.label}
              </span>
            </div>
            <p
              style={{
                fontSize: '17px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.65,
                margin: 0,
                fontFamily: FONT,
                textAlign: 'left' as const,
              }}
            >
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const DirectorsSection: React.FC = () => {
  const { sessions } = useSpotlightSessions();
  const regUrlMap = React.useMemo(() => buildRegUrlMap(sessions), [sessions]);
  const sessionByPresenterName = React.useMemo(
    () => new Map(sessions.map((session) => [personNameKey(session.presenter), session])),
    [sessions],
  );

  return (
    <section
      style={{
        background: 'var(--oav-page-bg)',
        padding: '40px 0 24px',
      }}
    >
      <SectionHeading
        title="Meet the Directors"
        subtitle="Vanderbilt University Medical Center — the leadership behind the Amyloidosis Program"
        strong
      />

      <div
        style={{
          display: 'grid',
          gap: '16px',
        }}
      >
        {directorProfiles.map((profile) => {
          const session = sessionByPresenterName.get(personNameKey(profile.sessionName));

          return (
            <DirectorSection
              key={profile.lastName}
              profile={profile}
              session={session}
              regLink={session ? regUrlMap.get(session.id) : undefined}
            />
          );
        })}
      </div>
    </section>
  );
};
