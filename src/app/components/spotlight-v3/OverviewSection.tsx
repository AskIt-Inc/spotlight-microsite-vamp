import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Overview v2 ──────────────────────────────────────────────────────────────
// Client feedback: "too much text at the top", "I don't think this is a good way to lead"
// Decision: one impactful hero quote + three visual program pillars → straight to team.
// No dense paragraphs. Content stays high-level and scannable.

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
    </div>
  </section>
);
