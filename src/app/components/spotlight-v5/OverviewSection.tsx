import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const MAROON = '#8B1F2D';

const DIRECTOR_PHOTO =
  'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png';

const highlights = [
  'Author, ASH Diagnostic & Treatment Guidelines for Amyloidosis',
  'Steering committees: ActEarly, Cleopattra, Triton-CM, ATTRibute-CM, HELIOS-B',
  '117+ peer-reviewed publications including N Engl J Med (APOLLO-B, HELIOS-B)',
  'Keynote speaker: AHA, ACC, HFSA, ESC, ISA international meetings',
  '10+ years with the Amyloidosis Support Group; Amyloidosis Research Consortium',
  'Chief Medical Advisor, Amyloidosis Connect — patient education app',
  'Featured with Morgan Freeman in USA Today / AARP ATTR-CM awareness campaign (2026)',
];

const expandedBio = [
  'Dr. Sarswat leads constant educational activities for patients, trainees, and physicians through HFSA, ACC, AHA, ESC, as well as third-party platforms including WebMD, PeerView, Reach MD, and MedScape.',
  'She directs both the Amyloidosis Clinical Fellowship and the Amyloidosis Research Fellowship at UChicago, and leads fellowship organization efforts nationally through the Amyloidosis Research Consortium (ARC).',
  'Dr. Sarswat serves on the ISA Education Committee and the Amyloidosis Forum Prognostic Factors Working Group. She delivers C-suite targeted educational talks on amyloidosis systems of care.',
  'She is the focal point and leader connecting two health systems — University of Chicago Medicine and Endeavor Health — making the Amyloid Center truly multi-institutional.',
  'Co-founder of Chicago Amyloidosis Rounds. Alliance for Patient Access Rare Disease Working Group member. Advisor to Mackenzie\'s Mission / Amyloidosis Speakers Bureau.',
  'Editor, "Cardiac Amyloidosis" — forthcoming book accepted by Springer Nature.',
];

const pillars = [
  {
    icon: '🫀',
    label: 'Multidisciplinary Care',
    text: 'Nine specialties across cardiology, hematology, neurology, nephrology, GI, orthopaedics & genetics — one coordinated care plan.',
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

// ─── Meet the Director ─────────────────────────────────────────────────────────
const DirectorSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: 'var(--oav-page-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}
    >
      {/* Section heading */}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.12em',
          color: MAROON,
          fontFamily: FONT,
          marginBottom: '16px',
        }}
      >
        Meet the Director
      </div>

      {/* Photo + title row */}
      <div
        className="director-profile-row"
        style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '16px' }}
      >
        <img
          src={DIRECTOR_PHOTO}
          alt="Dr. Nitasha Sarswat"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid ' + MAROON,
            flexShrink: 0,
          }}
        />
        <div style={{ fontFamily: FONT, minWidth: 0 }}>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#000', lineHeight: 1.2 }}>
            Nitasha Sarswat, MD
          </div>
          <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.5, marginTop: '4px' }}>
            Associate Professor of Medicine
            <br />
            Director, Multi-Institutional Amyloid Center of Excellence
            <br />
            Director, Infiltrative Cardiomyopathy Program
            <br />
            Director, Amyloidosis Clinical &amp; Research Fellowships
            <br />
            Advanced Heart Failure, MCS &amp; Transplantation
            <br />
            Division of Cardiology — University of Chicago Medicine
          </div>
        </div>
      </div>

      {/* Highlight bullets */}
      <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
        {highlights.map((h, i) => (
          <li
            key={i}
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#000',
              lineHeight: 1.7,
              fontFamily: FONT,
            }}
          >
            {h}
          </li>
        ))}
      </ul>

      {/* Expandable "Learn More" */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px 0',
          fontSize: '13px',
          fontWeight: 700,
          color: MAROON,
          fontFamily: FONT,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>{expanded ? '▾' : '▸'}</span>
        <span>{expanded ? 'Show less' : 'Learn more about Dr. Sarswat'}</span>
      </button>

      {expanded && (
        <div
          style={{
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid var(--oav-border)',
          }}
        >
          {expandedBio.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000',
                lineHeight: 1.7,
                margin: i === 0 ? '0 0 10px 0' : '0 0 10px 0',
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

// ─── Overview Section v4 ────────────────────────────────────────────────────────
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
      {/* Brief program overview */}
      <blockquote
        style={{
          margin: '0 0 24px 0',
          borderLeft: '4px solid ' + MAROON,
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
          "The University of Chicago Multi-Institutional Amyloid Center of Excellence brings together world-class specialists across cardiology, hematology, neurology, nephrology, gastroenterology, genetics, and orthopedics — providing seamless, coordinated care for patients with all forms of amyloidosis. With active involvement in landmark clinical trials, cutting-edge AI-based diagnostics, and deep community advocacy through the Amyloidosis Support Group and Research Consortium, our program represents one of the most comprehensive amyloidosis centers in the Midwest."
        </p>
      </blockquote>

      {/* Meet the Director */}
      <DirectorSection />

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
                color: MAROON,
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
