import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FONT = 'gotham, sans-serif';

// ─── Overview — COH ───────────────────────────────────────────────────────────
// Layout:
//   1. Impactful hero quote
//   2. Three visual program pillars (scannable)
//   3. Collapsible "About the Program" — earmarked for COH to provide copy

const pillars = [
  {
    icon: '01',
    label: 'AL Amyloidosis Treatment',
    text: 'Second-line treatment options for relapsed/refractory disease, including City of Hope experience with venetoclax and bispecific antibodies.',
  },
  {
    icon: '02',
    label: 'Earlier Diagnosis',
    text: 'A dedicated July session on the SAVE trial and how new findings may support earlier diagnosis of AL amyloidosis.',
  },
  {
    icon: '03',
    label: 'Cardiac Amyloidosis + SCT',
    text: 'Current AI diagnostic tools for cardiac amyloidosis and the evolving role of upfront autologous SCT in primary AL amyloidosis.',
  },
];

// Placeholder copy — awaiting City of Hope to provide approved programme description.
const PROGRAM_ABOUT_PLACEHOLDER = `City of Hope's Amyloidosis Program brings together experts across hematology, cardiology, nephrology, and neurology to provide multidisciplinary care for patients with all forms of amyloidosis. The program spans multiple sites across Southern California and Arizona, making expert amyloidosis care accessible across the region.

[City of Hope to provide: programme history, team focus, goals, and what makes this programme unique — including the significance of operating across multiple sites.]`;

const AboutProgramAccordion: React.FC = () => {
  const [open, setOpen] = useState(false);

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
            color: '#006E8E',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.06em',
            fontFamily: FONT,
          }}
        >
          About the City of Hope Amyloidosis Program
        </span>
        <ChevronDown
          size={16}
          color="#006E8E"
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
          {PROGRAM_ABOUT_PLACEHOLDER.split('\n\n').map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: i === 1 ? '#9CA3AF' : '#000000',
                fontStyle: i === 1 ? 'italic' : 'normal',
                lineHeight: 1.7,
                margin: i === 0 ? '0 0 14px 0' : 0,
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
      {/* Hero quote */}
      <blockquote
        style={{
          margin: '0 0 32px 0',
          borderLeft: '4px solid #006E8E',
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
          "A July spotlight series featuring City of Hope presenters on AL amyloidosis treatment,
          earlier diagnosis, cardiac amyloidosis diagnostics, and upfront autologous SCT."
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
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#F58220',
                marginBottom: '10px',
                fontFamily: FONT,
              }}
            >
              {p.icon}
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                color: '#006E8E',
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
              }}
            >
              {p.text}
            </p>
          </div>
        ))}
      </div>

      {/* Collapsible programme description — earmarked for COH copy */}
      <AboutProgramAccordion />
    </div>
  </section>
);
