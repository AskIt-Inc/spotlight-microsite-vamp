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
    text: 'VAMP was established to bring amyloidosis care into one coordinated program across hematology, cardiology, neurology, nephrology, gastroenterology, diagnostics, rehabilitation, and patient support.',
  },
  {
    icon: Users,
    label: 'Weekly Review Boards',
    text: 'The current VAMP draft describes weekly multidisciplinary review boards where specialists review complex cases together and coordinate diagnostic and treatment planning.',
  },
  {
    icon: CalendarDays,
    label: 'August Education Series',
    text: 'Tentative August sessions cover cardiology, neurology, GI symptoms, CAR-T versus AutoSCT, dietician support, chronic-disease expectations, and depression strategies.',
  },
];

const PROGRAM_ABOUT_PARAGRAPHS = [
  `Established in 2011, the Vanderbilt Amyloidosis Multidisciplinary Program brings specialists together around patients with suspected or confirmed amyloidosis.`,
  `Over the past 15 years, the draft material describes VAMP as a coordinated program spanning hematology, cardiology, neurology, nephrology, gastroenterology, radiology, pathology, genetic counseling, rehabilitation, social work, and patient advocacy.`,
  `[VAMP to confirm: current research goals, final program strengths, accomplishments/publications, open trials, headshots, videos, roles, and appointment links.]`,
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
          An August spotlight series featuring Vanderbilt's multidisciplinary amyloidosis team, with placeholder content from the current VAMP draft until final API data is available.
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
