import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights v2 ────────────────────────────────────────────────────────────
// Client feedback: "reduce by 75%" — AI-generated text is too verbose.
// Each entry is trimmed to 1–2 tight sentences.

const highlights = [
  {
    label: 'Second-Line AL Amyloidosis Treatment',
    text: 'Two sessions focus on relapsed/refractory AL amyloidosis, including the City of Hope experience with venetoclax and bispecific antibodies.',
  },
  {
    label: 'SAVE Trial and Earlier Diagnosis',
    text: 'Dr. Lisa Lee reviews the SAVE trial and how results may point toward earlier AL amyloidosis diagnosis.',
  },
  {
    label: 'AI Tools for Cardiac Amyloidosis',
    text: 'Dr. Faizi Jamal covers current and evolving AI tools for cardiac amyloidosis diagnosis.',
  },
  {
    label: 'Upfront Autologous SCT',
    text: 'Dr. Tibor Kovacsovics discusses the past, present, and future role of upfront autologous SCT for primary AL amyloidosis.',
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
          color: '#006E8E',
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
              borderLeft: '3px solid #006E8E',
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

      {/* Asterisk disclaimer */}
      <p
        style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        * Session summaries are based on the supplied City of Hope July session document. Presenter intros and final publication copy still require client approval.
      </p>
    </div>
  </section>
);
