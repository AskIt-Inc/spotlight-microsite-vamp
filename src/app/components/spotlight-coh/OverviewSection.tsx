import React, { useState } from 'react';
import { Calendar, CheckCircle, ChevronDown, ExternalLink, PlayCircle } from 'lucide-react';
import { buildRegUrlMap, type NormalizedSession, useSpotlightSessions } from './useSpotlightSessions';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';
const ACCENT = 'var(--oav-accent)';
const ACCENT_TEXT = 'var(--oav-accent-text)';

// ─── Overview — VAMP ──────────────────────────────────────────────────────────
// Layout:
//   1. Impactful opening statement
//   2. Three visual program pillars (scannable)
//   3. Collapsible "About the Program"
//   4. Meet the Directors

const pillars: Array<{ icon: string; label: string; text: string }> = [
  {
    icon: '🩺',
    label: 'Amyloidosis-Focused Care',
    text: 'VAMP provides coordinated care for patients with suspected or confirmed amyloidosis, including cardiac, hematologic, neurologic, renal, gastrointestinal, and supportive care needs.',
  },
  {
    icon: '🧑‍⚕️',
    label: 'Specialist Expertise',
    text: 'The program includes Vanderbilt experts focused on cardiac amyloidosis, AL amyloidosis and plasma cell disorders, ATTR neuropathy, renal involvement, and gastrointestinal symptoms.',
  },
  {
    icon: '🔬',
    label: 'Research and Trials',
    text: 'Vanderbilt participates in amyloidosis research and recruiting clinical trials, with work spanning treatment advances, biomarkers, disease monitoring, and non-invasive diagnostics.',
  },
];

const PROGRAM_ABOUT_PARAGRAPHS = [
  `Founded in 2011, the Vanderbilt Amyloidosis Program brings specialists together around patients with suspected or confirmed amyloidosis and is described by Vanderbilt as the first dedicated amyloidosis treatment center in Tennessee.`,
  `Amyloidosis can involve the heart, kidneys, liver, gastrointestinal system, peripheral nerves, and other organ systems, so diagnosis and treatment often require coordinated work across multiple specialties.`,
  `The program emphasizes accurate and timely diagnosis, access to standards of care and research treatments, and close disease monitoring. Vanderbilt also describes ongoing work in clinical trials, biomarkers, and advanced non-invasive diagnostic tools.`,
];

const SectionHeading: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: '24px' }}>
    <h2
      style={{
        fontSize: '28px',
        fontWeight: 300,
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
        color: '#4B5563',
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
  videoUrl?: string;
}

const directorProfiles: DirectorProfile[] = [
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
      'Director, Plasma Cell Disorders Research',
      'Co-chair, VICC Protocol Review and Monitoring System',
      'Associate Professor of Medicine',
      'Hematology-Oncology · Plasma Cell Disorders · Multiple Myeloma · AL Amyloidosis',
      'Vanderbilt University Medical Center',
    ],
    highlights: [
      'Leads the Vanderbilt Amyloidosis Multidisciplinary Program and Multiple Myeloma Program',
      'Directs the Multiple Myeloma Program at Vanderbilt-Ingram Cancer Center',
      'Serves as director of plasma cell disorders research',
      'Clinical and research interests include multiple myeloma, AL amyloidosis, and other plasma cell disorders',
      'Investigative focus includes proteasome inhibitor resistance, post-transplant immune recovery, and genomic changes in plasma cell disease',
    ],
    bio: [
      'Muhamed Baljevic, MD, FACP, is a hematologist and medical oncologist who joined Vanderbilt University Medical Center as faculty in the Department of Medicine in 2021.',
      'He directs the Vanderbilt Amyloidosis Multidisciplinary Program, the Multiple Myeloma Program, and plasma cell disorders research at Vanderbilt-Ingram Cancer Center.',
      'His clinical and research interests include multiple myeloma, AL amyloidosis, and other plasma cell disorders, with investigative work focused on therapy resistance, post-transplant immune recovery, and genomic events in plasma cell disease.',
    ],
  },
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
      'Vanderbilt University Medical Center',
    ],
    highlights: [
      'Specializes in heart failure, cardiac amyloidosis, heart transplantation, and LVAD care',
      'Completed cardiovascular disease and advanced heart failure training at Brigham and Women\'s Hospital / Harvard Medical School',
      'Clinical interests include advanced heart failure, cardiac amyloidosis, heart transplantation, and LVADs',
      'Research interests include heart failure, heart transplantation outcomes, and cardiac amyloidosis collaborations',
      'Active in the American College of Cardiology, American Heart Association, Heart Failure Society of America, and International Society for Heart and Lung Transplantation',
    ],
    bio: [
      'Hasan Siddiqi, MD, MSCR, FACC, is a cardiologist specializing in patients with heart failure, cardiac amyloidosis, and those requiring advanced therapies such as heart transplantation and artificial heart pump support.',
      'He completed medical school and a clinical research degree at the University of Michigan, internal medicine residency at the Hospital of the University of Pennsylvania, and cardiovascular disease and advanced heart failure fellowships at Brigham and Women\'s Hospital / Harvard Medical School.',
      'His clinical work includes advanced heart failure, cardiac amyloidosis, heart transplantation, and LVAD care. His research interests include heart failure, heart transplantation outcomes, and collaborations related to cardiac amyloidosis.',
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

function directorSessionLabel(session?: NormalizedSession): string | undefined {
  const date = formatSessionDate(session);
  if (!date && !session?.time) return undefined;
  return [date, session?.time].filter(Boolean).join(' · ');
}

const DirectorSection: React.FC<{
  profile: DirectorProfile;
  regLink?: string;
  session?: NormalizedSession;
}> = ({ profile, regLink, session }) => {
  const [expanded, setExpanded] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);
  const sessionDate = formatSessionDate(session);
  const sessionLabel = directorSessionLabel(session);

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
          <div style={{ fontSize: '13px', color: '#444444', lineHeight: 1.5, marginTop: '4px' }}>
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

      {session && (
        <div
          style={{
            background: '#FAFAFA',
            border: '1px solid var(--oav-border)',
            borderRadius: '6px',
            padding: '14px 16px',
            margin: '12px 0 12px 0',
            fontFamily: FONT,
          }}
        >
          {sessionLabel && (
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: '#4B5563',
                marginBottom: '5px',
              }}
            >
              Session: {sessionLabel}
            </div>
          )}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: '#000000',
              lineHeight: 1.35,
              marginBottom: session.description ? '6px' : 0,
            }}
          >
            {session.title}
          </div>
          {session.description && (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {session.description}
            </p>
          )}
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

        {profile.videoUrl && (
          <a
            href={profile.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 300,
              color: '#1C1C1C',
              fontFamily: FONT,
              textDecoration: 'none',
            }}
          >
            <PlayCircle size={13} color="#1C1C1C" />
            Watch video
          </a>
        )}
      </div>
    </div>
  );
};

const AboutProgramAccordion: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        marginTop: '28px',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'var(--oav-card-bg)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: FONT,
          textAlign: 'left' as const,
          borderBottom: open ? '1px solid var(--oav-border)' : 'none',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: BRAND,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            fontFamily: FONT,
          }}
        >
          About the Vanderbilt Amyloidosis Multidisciplinary Program
        </span>
        <ChevronDown
          size={16}
          color="#1C1C1C"
          style={{
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Accordion body */}
      {open && (
        <div
          style={{
            padding: '20px',
            background: 'var(--oav-page-bg)',
          }}
        >
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
      )}
    </div>
  );
};

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
          The Vanderbilt Amyloidosis Multidisciplinary Program (VAMP) brings together specialists in hematology, cardiology, neurology, nephrology, gastroenterology, and supportive care to diagnose and treat patients with amyloidosis across the organ systems it can affect. The program combines coordinated clinical care, disease-specific expertise, research, and access to active clinical trials for patients living with AL and ATTR amyloidosis.
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

      <AboutProgramAccordion />
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
        subtitle="Vanderbilt program leadership across AL amyloidosis, plasma cell disorders, and cardiac amyloidosis care"
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
