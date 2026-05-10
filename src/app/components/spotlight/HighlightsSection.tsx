import React from 'react';

const FONT = 'gotham, sans-serif';

const highlights = [
  {
    label: 'One Program, Nine Specialists',
    text: 'The City of Hope Amyloidosis Program brings together nine dedicated specialists across cardiology, hematology and oncology, nephrology, neurology, gastroenterology, orthopedic surgery, and cardiovascular genetics — one of the most comprehensive amyloidosis teams in the Midwest. Each case is reviewed collaboratively, ensuring no organ system is managed in isolation.*',
  },
  {
    label: 'Advanced Cardiac Imaging for Precise Diagnosis',
    text: 'The program offers state-of-the-art cardiac MRI, CT, and echocardiography for accurate early detection and ongoing evaluation of cardiac amyloidosis, hypertrophic cardiomyopathy, and cardiac sarcoidosis. Advanced imaging is used not only to diagnose but to guide and monitor treatment response over time.*',
  },
  {
    label: 'CAR T-Cell Therapy & Stem Cell Transplantation for AL Amyloidosis',
    text: 'Patients with AL amyloidosis have access to innovative hematological treatments including CAR T-cell therapy and autologous stem cell transplantation. The program\'s research focus includes minimal residual disease (MRD) assessment, strategies to improve long-term outcomes, and addressing racial disparities in AL amyloidosis care.*',
  },
  {
    label: 'Hereditary ATTR: Genetic Counseling & Family Screening',
    text: 'A licensed cardiovascular genetic counselor works alongside the clinical team to provide hereditary ATTR testing, pedigree analysis, and personalized guidance for patients and at-risk family members. The program sees patients through the Cardiovascular Genetics Clinic and the dedicated Amyloidosis Clinic.*',
  },
  {
    label: 'Kidney Transplantation in Amyloidosis',
    text: 'For patients with amyloid-related kidney disease, the program offers specialist nephrology care including evaluation for kidney and pancreas transplantation, onco-nephrology, and management of complex glomerular diseases — helping patients navigate organ involvement beyond the heart.*',
  },
  {
    label: 'Active in Landmark Clinical Research',
    text: 'The program participates in the ACT-EARLY Phase 3 prevention trial (acoramidis in asymptomatic TTR carriers) and the MaesTTRo global observational study (real-world outcomes with eplontersen) — giving patients access to emerging therapies and contributing to the global evidence base for amyloidosis treatment.*',
  },
];

export const HighlightsSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-card-bg)',
        borderTop: '1px solid var(--oav-border)',
        borderBottom: '1px solid var(--oav-border)',
        padding: '48px 24px',
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
            color: '#8B1F2D',
            marginBottom: '24px',
            fontFamily: FONT,
          }}
        >
          Program Highlights
        </div>

        {/* Highlight cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {highlights.map((h) => (
            <div
              key={h.label}
              style={{
                borderLeft: '3px solid #8B1F2D',
                paddingLeft: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: FONT,
                  marginBottom: '4px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                }}
              >
                {h.label}
              </div>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#000000',
                  lineHeight: 1.7,
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
            marginTop: '24px',
            marginBottom: 0,
            fontFamily: FONT,
            fontStyle: 'italic',
          }}
        >
          * Content generated for review purposes. Requires authentication and approval from City of Hope before publication.
        </p>
      </div>
    </section>
  );
};
