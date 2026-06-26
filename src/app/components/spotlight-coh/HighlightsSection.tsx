import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Program copy ────────────────────────────────────────────────

const accomplishments = [
  {
    value: '2011',
    label: 'Program founded',
    text: 'Vanderbilt describes its amyloidosis program as founded in 2011.',
  },
  {
    value: '1st',
    label: 'Dedicated center in Tennessee',
    text: 'Vanderbilt describes the program as Tennessee’s first dedicated amyloidosis treatment center.',
  },
  {
    value: '6+',
    label: 'Specialty areas coordinated',
    text: 'The team spans cardiology, hematology, neurology, nephrology, gastroenterology, and support services.',
  },
  {
    value: '4',
    label: 'Recruiting trial records',
    text: 'ClinicalTrials.gov records reviewed for this update include recruiting amyloidosis studies selected for the VAMP clinical trials section.',
  },
];

const highlights = [
  {
    label: 'Program History',
    text: 'Founded in 2011, Vanderbilt’s amyloidosis program is described by Vanderbilt as Tennessee’s first dedicated amyloidosis treatment center.',
  },
  {
    label: 'Multispecialty Amyloidosis Care',
    text: 'VAMP brings together cardiology, hematology, neurology, nephrology, gastroenterology, and support services to coordinate care across the organ systems amyloidosis can affect.',
  },
  {
    label: 'Cardiac Amyloidosis Leadership',
    text: 'The program includes dedicated cardiac amyloidosis leadership, with expertise in heart failure, transplantation, LVAD care, cardiac amyloidosis research, and clinical trials.',
  },
  {
    label: 'AL Amyloidosis and Plasma Cell Disorders',
    text: 'VAMP includes hematology expertise in AL amyloidosis, plasma cell disorders, stem cell transplantation, CAR-T, and bispecific antibody approaches.',
  },
  {
    label: 'Neurology, Renal, and GI Expertise',
    text: 'The team includes specialists focused on amyloidosis-related neuropathy, renal involvement, gastrointestinal symptoms, symptom management, and quality-of-life support.',
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

      <div style={{ marginBottom: '28px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 300,
            color: '#000000',
            margin: '0 0 16px 0',
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Team Accomplishments
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          {accomplishments.map((item) => (
            <div
              key={item.label}
              style={{
                background: 'var(--oav-page-bg)',
                border: '1px solid var(--oav-border)',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color: '#000000',
                  lineHeight: 1,
                  fontFamily: FONT,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#000000',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                  marginTop: '8px',
                  fontFamily: FONT,
                }}
              >
                {item.label}
              </div>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 300,
                  color: '#000000',
                  lineHeight: 1.5,
                  margin: '6px 0 0 0',
                  fontFamily: FONT,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
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
