import React, { useState } from 'react';
import { CalendarDays, ChevronDown, HeartPulse, Users, type LucideIcon } from 'lucide-react';

const FONT = 'gotham, sans-serif';

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
            color: '#1C1C1C',
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
          borderLeft: '4px solid #1C1C1C',
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
                  border: '1px solid #CFAE70',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                }}
              >
                <Icon size={18} color="#CFAE70" strokeWidth={1.8} />
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                  color: '#1C1C1C',
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
