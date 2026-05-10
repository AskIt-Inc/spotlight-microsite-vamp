import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const UOC_LOGO_URL =
  'https://edge.sitecorecloud.io/unichicagomc-81nbqnb3/media/images/ucmc/landing-pages/ucm-logo-horizontal.png';

// COH logo with white background pill for contrast on maroon
const COHLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '220px',
      }}
    >
      {!imgFailed ? (
        <img
          src={UOC_LOGO_URL}
          alt="City of Hope"
          style={{ height: '64px', width: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#8B1F2D',
            fontFamily: FONT,
            textAlign: 'center' as const,
          }}
        >
          City of Hope
        </span>
      )}
    </div>
  );
};

// ─── Series strip ─────────────────────────────────────────────────────────────
const SeriesStrip: React.FC = () => {
  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #E8E8E8',
        padding: '14px 24px',
      }}
    >
      <div
        className="series-strip-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Thick left accent bar — hidden on mobile */}
        <div
          className="series-strip-accent"
          style={{
            width: '4px',
            alignSelf: 'stretch',
            background: '#8B1F2D',
            borderRadius: '2px',
            flexShrink: 0,
            marginRight: '16px',
          }}
        />

        <div className="series-strip-text">
          {/* Brand owner — dominant */}
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#8B1F2D',
              fontFamily: FONT,
              lineHeight: 1,
              letterSpacing: '-0.3px',
            }}
          >
            SomeBodyToTalkTo
          </div>
          {/* Series label — secondary */}
          <div
            style={{
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '2px',
              color: '#9CA3AF',
              fontFamily: FONT,
              marginTop: '4px',
            }}
          >
            Spotlight Series <span style={{ fontWeight: 300 }}>· July 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hero section ─────────────────────────────────────────────────────────────
export const HeroSection: React.FC = () => {
  return (
    <>
      <SeriesStrip />

      {/* Maroon COH feature band */}
      <section
        style={{
          background: 'linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)',
          borderBottom: '3px solid #6E1A24',
          padding: '10px 24px',
        }}
      >
        <div
          className="hero-content-row"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '48px',
          }}
        >
          {/* Left column */}
          <div
            className="hero-left-col"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* "featuring" connector — flanking rule lines */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: FONT,
                  fontStyle: 'italic',
                  letterSpacing: '2px',
                  textTransform: 'uppercase' as const,
                }}
              >
                featuring
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }} />
            </div>

            {/* H1 — the featured institution */}
            <h1
              className="hero-h1"
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#ffffff',
                margin: 0,
                lineHeight: 1.2,
                fontFamily: FONT,
              }}
            >
              City of Hope Amyloidosis Program
            </h1>

          </div>

          {/* Right column — COH logo (hidden on mobile via .hero-logo-col CSS class) */}
          <div className="hero-logo-col" style={{ flexShrink: 0 }}>
            <COHLogo />
          </div>
        </div>
      </section>
    </>
  );
};
