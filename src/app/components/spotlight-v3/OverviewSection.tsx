import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Overview v2 ──────────────────────────────────────────────────────────────
// Client feedback: "too much text at the top", "I don't think this is a good way to lead"
// Decision: one impactful hero quote + three visual program pillars → straight to team.
// No dense paragraphs. Content stays high-level and scannable.

const pillars = [
  {
    icon: '🫀',
    label: 'Multidisciplinary Care',
    text: 'Nine specialists across cardiology, hematology, neurology, nephrology, GI, orthopaedics & genetics — one coordinated care plan.',
  },
  {
    icon: '🧬',
    label: 'Genetics & Prevention',
    text: 'Hereditary ATTR counselling, family screening, and access to prevention trials before symptoms develop.',
  },
  {
    icon: '🔬',
    label: 'Active Research',
    text: 'Landmark Phase 3 and global observational trials — giving patients access to emerging therapies.',
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
          borderLeft: '4px solid #8B1F2D',
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
          "One of the Midwest's most comprehensive amyloidosis programs — integrating cardiology,
          hematology, neurology, and genetics under one roof to diagnose, treat, and prevent this
          complex disease."
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
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{p.icon}</div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                color: '#8B1F2D',
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
