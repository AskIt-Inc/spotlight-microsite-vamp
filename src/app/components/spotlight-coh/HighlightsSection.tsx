import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Placeholder program copy ───────────────────────────────────

const highlights = [
  {
    label: 'Program History',
    text: 'The current draft describes VAMP as an amyloidosis program established in 2011 and built around coordinated multidisciplinary care.',
  },
  {
    label: 'Multidisciplinary Team',
    text: 'Draft content highlights hematology, cardiology, neurology, nephrology, gastroenterology, diagnostics, genetic counseling, rehabilitation, social work, and patient advocacy.',
  },
  {
    label: 'August Wednesday Sessions',
    text: 'Tentative Wednesday education sessions include cardiology, neurology, GI symptoms, and CAR-T versus AutoSCT topics.',
  },
  {
    label: 'Support and Quality of Life',
    text: 'Draft Monday and Thursday sessions include dietician support, managing expectations in rare and chronic disease, and depression treatment strategies.',
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
        * Placeholder copy is based on the current VAMP draft and email thread. Presenter intros, final session titles, and publication copy still require VAMP approval.
      </p>
    </div>
  </section>
);
