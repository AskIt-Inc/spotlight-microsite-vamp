import React from 'react';

const FONT = 'gotham, sans-serif';

export const OverviewSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-card-bg)',
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
            marginBottom: '8px',
            fontFamily: FONT,
          }}
        >
          About the Program
        </div>

        {/* Body text */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.7,
            margin: 0,
            fontFamily: FONT,
          }}
        >
          The City of Hope Amyloidosis Program is a multidisciplinary team of experts with the dedication
          and experience to diagnose and manage this complex condition. Our mission is to provide our patients the
          best quality of life during and after treatment, and to continually pursue groundbreaking research into
          the disease and its causes — helping identify high-risk patients and develop effective, long-term
          treatments. We also offer genetic testing and counseling for patients and their families. While several
          types of amyloidosis affect the heart, our cardiologists primarily treat AL amyloidosis (also called
          primary amyloidosis), the most commonly diagnosed form with more than 4,000 new cases every year, and
          TTR amyloidosis, which can be hereditary or occur without a genetic link, causing proteins to build up
          in the heart and leading to fluid retention and, if untreated, congestive heart failure.
          African-Americans have a higher risk for hereditary TTR amyloidosis.
        </p>

        <p
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.7,
            marginTop: '20px',
            marginBottom: 0,
            fontFamily: FONT,
          }}
        >
          What sets the City of Hope Amyloidosis Program apart is its integrated, whole-patient approach. Rather than treating each organ system in isolation, our multidisciplinary team — spanning cardiology, hematology, nephrology, neurology, gastroenterology, and orthopedic surgery — collaborates closely to ensure every patient receives a coordinated care plan tailored to their specific type and stage of amyloidosis. We are also committed to advancing the science: our clinicians actively participate in clinical trials and translational research, giving patients access to emerging therapies not yet widely available.*
        </p>

        {/* Asterisk disclaimer */}
        <p
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            marginTop: '16px',
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
