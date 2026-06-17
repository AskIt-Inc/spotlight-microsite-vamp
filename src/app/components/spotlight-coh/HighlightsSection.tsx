import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Program copy ────────────────────────────────────────────────

const highlights = [
  {
    label: 'Program History',
    text: 'Vanderbilt describes the program as launching in 2011 and becoming Tennessee’s first dedicated amyloidosis treatment center.',
  },
  {
    label: 'Multidisciplinary Team',
    text: 'The program has grown into a major southeastern referral center with more than a dozen collaborating specialists providing structured care.',
  },
  {
    label: 'Diagnosis and Monitoring',
    text: 'The program emphasizes accurate diagnosis, access to current standards of care and research treatments, and close disease monitoring.',
  },
  {
    label: 'Research and Trials',
    text: 'Vanderbilt has participated in amyloidosis clinical trials and describes ongoing research into biomarkers and advanced non-invasive diagnostic tools.',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    className="v2-section"
    style={{
      background: 'var(--oav-card-bg)',
      borderTop: '1px solid var(--oav-border)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
    }}
  >
    <div>
      {/* Section label */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '1px',
          color: '#1C1C1C',
          marginBottom: '20px',
          fontFamily: FONT,
        }}
      >
        Program Highlights
      </div>

      {/* Highlight rows — compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {highlights.map((h) => (
          <div
            key={h.label}
            style={{
              borderLeft: '3px solid #1C1C1C',
              paddingLeft: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
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
        * Program background is based on Vanderbilt Discoveries in Medicine and should still be reviewed by VAMP for final public wording.
      </p>
    </div>
  </section>
);
