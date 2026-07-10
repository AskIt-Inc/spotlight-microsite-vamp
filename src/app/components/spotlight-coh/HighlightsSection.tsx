import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights — Program copy ────────────────────────────────────────────────

const highlights = [
  {
    eyebrow: 'Contribution',
    label: 'Defining Landmark ATTR Care',
    text: 'Vanderbilt has served as a pivotal global study site for foundational trials including ATTR-ACT, APOLLO-B, and CARDIO-TTRansform, and actively contributes to the international THAOS registry to help establish modern therapeutic standards for transthyretin amyloidosis.',
  },
  {
    eyebrow: 'Innovation',
    label: 'Establishing Global Standards of Care',
    text: 'VAMP leads practice-changing clinical research in light chain (AL) amyloidosis, serving as a key contributing site for the landmark ANDROMEDA trial published in the New England Journal of Medicine, which established DARA-CyBorD as the international front-line standard therapy.',
  },
  {
    eyebrow: 'Research Frontiers',
    label: 'Advanced Non-Invasive Diagnostics',
    text: 'VAMP faculty pioneer the development of advanced imaging methodologies, novel disease biomarkers, and digital tracking tools to precisely monitor organ responses and long-term disease states without requiring repetitive, invasive tissue biopsies.',
  },
  {
    eyebrow: 'Integrated Care',
    label: 'Comprehensive Specialty Pharmacy Support',
    text: 'Serving as a clinical "easy button," the Vanderbilt Specialty Pharmacy handles complex prior authorizations and financial assistance to achieve a median insurance approval of 2.5 days and a 12-month medication adherence rate of 99%.',
  },
  {
    eyebrow: 'Patient Continuity',
    label: 'Trial-to-Commercial Treatment Bridges',
    text: 'To eliminate dangerous gaps in care, the integrated pharmacy team transitions patients from clinical trial regimens to commercial, insurance-covered medications while providing a direct-line universal support hotline for medication barriers.',
  },
  {
    eyebrow: 'Holistic Care',
    label: 'Multi-Disciplinary Ancillary Services',
    text: 'VAMP embeds specialized supportive service lines directly into patient care plans, providing integrated genetic counseling, dedicated social work and patient advocacy, and tailored nutrition care to help manage complex, organ-specific symptoms.',
  },
  {
    eyebrow: 'Rehabilitation',
    label: 'Targeted Physical & Occupational Therapy',
    text: 'The program incorporates customized physical and occupational therapy regimens into the overarching care pathway, directly helping patients maintain mobility, manage peripheral nerve symptoms, and maximize daily independent functioning.',
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
          Key differentiators, research leadership, and support services highlighted in the latest VAMP content brief
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

    </div>
  </section>
);
