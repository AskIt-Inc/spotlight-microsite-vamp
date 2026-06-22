import React, { useState } from 'react';
import { CalendarDays, CheckCircle, ChevronDown, HeartPulse, Users, type LucideIcon } from 'lucide-react';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';
const ACCENT = 'var(--oav-accent)';
const ACCENT_HEX = '#CFAE70';

// ─── Overview — VAMP ──────────────────────────────────────────────────────────
// Layout:
//   1. Impactful opening statement
//   2. Three visual program pillars (scannable)
//   3. Collapsible "About the Program"

const pillars: Array<{ icon: LucideIcon; label: string; text: string }> = [
  {
    icon: HeartPulse,
    label: 'Multidisciplinary Care',
    text: 'Founded in 2011, the Vanderbilt Amyloidosis Program is described by Vanderbilt as Tennessee’s first dedicated amyloidosis treatment center and a major referral center in the southeastern United States.',
  },
  {
    icon: Users,
    label: 'Coordinated Expertise',
    text: 'The program has grown to include more than a dozen collaborating specialists who provide structured, multidisciplinary care for adults navigating an amyloidosis diagnosis.',
  },
  {
    icon: CalendarDays,
    label: 'Research and Trials',
    text: 'Vanderbilt has participated in clinical trials for light chain and transthyretin amyloidosis, with ongoing work around biomarkers, advanced diagnostics, and disease monitoring.',
  },
];

const PROGRAM_ABOUT_PARAGRAPHS = [
  `Founded in 2011, the Vanderbilt Amyloidosis Program brings specialists together around patients with suspected or confirmed amyloidosis and is described by Vanderbilt as the first dedicated amyloidosis treatment center in Tennessee.`,
  `Amyloidosis can involve the heart, kidneys, liver, gastrointestinal system, peripheral nerves, and other organ systems, so diagnosis and treatment often require coordinated work across multiple specialties.`,
  `The program emphasizes accurate and timely diagnosis, access to standards of care and research treatments, and close disease monitoring. Vanderbilt also describes ongoing work in clinical trials, biomarkers, and advanced non-invasive diagnostic tools.`,
];

interface DirectorProfile {
  lastName: string;
  name: string;
  photoUrl: string;
  photoPosition?: string;
  roles: string[];
  highlights: string[];
  bio: string[];
}

const directorProfiles: DirectorProfile[] = [
  {
    lastName: 'Siddiqi',
    name: 'Hasan Siddiqi, MD, MSCR, FACC',
    photoUrl: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-03/sadiqi.png',
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
  {
    lastName: 'Baljevic',
    name: 'Muhamed Baljevic, MD, FACP',
    photoUrl: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-06/Baljevic.jpg',
    photoPosition: 'center 35%',
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
];

const DirectorSection: React.FC<{ profile: DirectorProfile }> = ({ profile }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: 'var(--oav-page-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '24px',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.12em',
          color: ACCENT,
          fontFamily: FONT,
          marginBottom: '16px',
        }}
      >
        Meet the Director
      </div>

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
              color={ACCENT_HEX}
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
          color: ACCENT,
          fontFamily: FONT,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <ChevronDown
          size={14}
          color={ACCENT_HEX}
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
          The Vanderbilt Amyloidosis Multidisciplinary Program (VAMP) brings together nationally recognized experts in hematology, cardiology, neurology, nephrology, and supportive care to provide coordinated, patient-centered treatment. Through advanced diagnostics, leading-edge therapies, clinical trials, and comprehensive support, VAMP delivers world-class care for patients living with amyloidosis.
        </p>
      </blockquote>

      <div
        style={{
          display: 'grid',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {directorProfiles.map((profile) => (
          <DirectorSection key={profile.lastName} profile={profile} />
        ))}
      </div>

      {/* Three pillars */}
      <div
        className="overview-pillars"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {pillars.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.label}
              style={{
                background: 'var(--oav-page-bg)',
                border: '1px solid var(--oav-border)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: '#F8F5EE',
                  border: `1px solid ${ACCENT}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                <Icon size={18} color={ACCENT_HEX} strokeWidth={1.8} />
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                  color: BRAND,
                  fontFamily: FONT,
                  marginBottom: '6px',
                }}
              >
                {p.label}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#000000',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: FONT,
                  textAlign: 'left' as const,
                }}
              >
                {p.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Collapsible program description */}
      <AboutProgramAccordion />
    </div>
  </section>
);
