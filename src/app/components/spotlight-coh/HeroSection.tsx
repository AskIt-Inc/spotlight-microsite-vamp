import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const STTT_LOGO_URL = 'https://somebodytotalkto.com/sites/default/files/STTT%20Logo%20Basic.png';
const VAMP_LOGO_URL = '/vamp-logo.png';

const VanderbiltIdentity = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '250px',
        minHeight: '76px',
        border: '1px solid #D9E8ED',
      }}
    >
      {!imgFailed ? (
        <img
          src={VAMP_LOGO_URL}
          alt="Vanderbilt Amyloidosis Multidisciplinary Program"
          style={{ width: '230px', maxWidth: '100%', height: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#004F66',
            fontFamily: FONT,
            lineHeight: 1,
          }}
        >
          VAMP
        </span>
      )}
    </div>
  );
};

// ─── Series strip (upper band — 40% of total hero height) ────────────────────
// Format: [STTT logo] | [Amyloidosis Program Spotlight Series] [August 2026]
// Disease-first naming enables: "Sickle Cell Disease Program Spotlight Series" etc.
const SeriesStrip: React.FC = () => (
  <div
    style={{
      background: '#ffffff',
      borderBottom: '1px solid #E8E8E8',
      padding: '10px 24px',
    }}
  >
    <div
      className="series-strip-row"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* STTT logo */}
      <img
        className="series-strip-logo-img"
        src={STTT_LOGO_URL}
        alt="SomeBodyToTalkTo"
        style={{ height: '42px', width: 'auto', display: 'block', flexShrink: 0 }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Vertical rule — hidden on mobile */}
      <div
        className="series-strip-divider"
        style={{ width: '1px', height: '42px', background: '#B9DEE6', flexShrink: 0 }}
      />

      {/* Program identity: disease-first name + date */}
      <div style={{ fontFamily: FONT, minWidth: 0 }}>
        <div
          className="series-strip-title"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#006E8E',
            letterSpacing: '-0.2px',
            lineHeight: 1.1,
          }}
        >
          <span>Amyloidosis Program Spotlight Series</span>
          <span style={{ color: '#000000' }}> · August 2026</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Hero section (lower brand band — 60% of total hero height) ───────────────
export const HeroSection: React.FC = () => (
  <>
    <SeriesStrip />

    <section
      style={{
        background: 'linear-gradient(135deg, #006E8E 0%, #004F66 74%, #F58220 160%)',
        borderBottom: '3px solid #F58220',
        padding: '28px 24px',
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
          gap: '24px',
        }}
      >
        {/* Left column */}
        <div
          className="hero-left-col"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* FEATURING label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFE8A3" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="10" r="3"/>
              <line x1="12" y1="1" x2="12" y2="4"/>
              <line x1="4.22" y1="3.22" x2="6.34" y2="5.34"/>
              <line x1="1" y1="10" x2="4" y2="10"/>
              <line x1="19.78" y1="3.22" x2="17.66" y2="5.34"/>
              <line x1="23" y1="10" x2="20" y2="10"/>
              <path d="M7 17l1.5-4h7L17 17"/>
              <line x1="5" y1="21" x2="19" y2="21"/>
              <line x1="8" y1="21" x2="8" y2="17"/>
              <line x1="16" y1="21" x2="16" y2="17"/>
            </svg>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#FFE8A3',
              fontFamily: FONT,
            }}>
              FEATURING
            </span>
          </div>

          {/* H1 */}
          <h1
            className="hero-h1"
            style={{
              fontSize: '34px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
              fontFamily: FONT,
            }}
          >
            Vanderbilt Amyloidosis Multidisciplinary Program
          </h1>
        </div>

        {/* Right column — partner identity */}
        <div className="hero-logo-col" style={{ flexShrink: 0 }}>
          <VanderbiltIdentity />
        </div>
      </div>
    </section>
  </>
);
