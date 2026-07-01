import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Program copy ────────────────────────────────────────────────

const highlights = [
  {
    eyebrow: 'Milestone',
    label: 'Dedicated Amyloidosis Program',
    text: 'Founded in 2011, Vanderbilt describes VAMP as Tennessee’s first dedicated amyloidosis treatment center, built around coordinated care for AL and ATTR amyloidosis.',
  },
  {
    eyebrow: 'Care Model',
    label: 'Multispecialty Organ-System Expertise',
    text: 'The program brings hematology, cardiology, neurology, nephrology, gastroenterology, and supportive care together around complex organ involvement.',
  },
  {
    eyebrow: 'Contribution',
    label: 'Clinical Research and Trial Access',
    text: 'Vanderbilt contributes to amyloidosis research through active recruiting studies and disease monitoring work spanning AL therapy, ATTR care, biomarkers, and diagnostics.',
  },
  {
    eyebrow: 'Publications',
    label: 'Peer-Reviewed Amyloidosis Work',
    text: 'VAMP faculty have contributed to peer-reviewed work on plasma cell disorders, AL amyloidosis treatment approaches, cardiac amyloidosis, and multidisciplinary disease management.',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '32px 0 24px',
    }}
  >
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#000000',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Program Highlights
        </h2>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1C1C1C',
            marginTop: '8px',
            marginBottom: 0,
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          Select milestones and contributions from Vanderbilt’s amyloidosis program
        </p>
      </div>

      {/* Highlight rows — selective and compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {highlights.map((h) => (
          <div
            key={h.label}
            style={{
              background: 'var(--oav-card-bg)',
              border: '1px solid var(--oav-border)',
              borderLeft: '3px solid #1C1C1C',
              borderRadius: '8px',
              padding: '14px 16px 14px 14px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#4B5563',
                fontFamily: FONT,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                marginBottom: '4px',
              }}
            >
              {h.eyebrow}
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                marginBottom: '4px',
              }}
            >
              {h.label}
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
              {h.text}
            </p>
          </div>
        ))}
      </div>

      {/* Source note */}
      <p
        style={{
          fontSize: '12px',
          color: '#4B5563',
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        * Program background and publication summary are for review and should be confirmed by VAMP before publication.
      </p>
    </div>
  </section>
);
