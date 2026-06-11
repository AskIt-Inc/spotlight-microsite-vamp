import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { Menu, X } from 'lucide-react';

const FONT = 'gotham, sans-serif';
const BRAND = 'var(--oav-brand)';

// ─── Nav config ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',                url: 'https://oneamyloidosisvoice.com/' },
  { label: 'Patient Care Center', url: 'https://pcc.oneamyloidosisvoice.com/' },
  { label: 'Clinical Trials',     url: 'https://oneamyloidosisvoice.com/clinical-trial-finder' },
  { label: 'Providers',           url: 'https://oneamyloidosisvoice.com/providers' },
  { label: 'Community Center',    url: 'https://oneamyloidosisvoice.com/community-center' },
  { label: 'News',                url: 'https://oneamyloidosisvoice.com/news' },
  { label: 'Trusted Resources',   url: 'https://oneamyloidosisvoice.com/trusted-resources' },
  { label: 'Event Calendar',      url: 'https://oneamyloidosisvoice.com/all-upcoming-sessions' },
];

const FOOTER_LINKS = [
  { label: 'Home',             url: 'https://oneamyloidosisvoice.com/' },
  { label: 'About us',         url: 'https://oneamyloidosisvoice.com/about-oneamyloidosisvoice' },
  { label: 'Video',            url: 'https://oneamyloidosisvoice.com/video' },
  { label: 'Galleries',        url: 'https://oneamyloidosisvoice.com/photo' },
  { label: 'Contact',          url: 'https://oneamyloidosisvoice.com/contact' },
  { label: 'Login',            url: 'https://oneamyloidosisvoice.com/user/login' },
  { label: 'Privacy Policy',   url: 'https://oneamyloidosisvoice.com/privacy-policy' },
  { label: 'Privacy Reminder', url: 'https://oneamyloidosisvoice.com/privacy-reminder' },
  { label: 'Terms of use',     url: 'https://oneamyloidosisvoice.com/terms-use' },
  { label: 'FAQ',              url: 'https://oneamyloidosisvoice.com/faq' },
  { label: 'Code of Conduct',  url: 'https://oneamyloidosisvoice.com/code-conduct' },
];

// ─── OAV Logo ─────────────────────────────────────────────────────────────────
const OAV_LOGO_URL = 'https://oneamyloidosisvoice.com/sites/default/files/files/oneamyloidosisvoice-logo-red.svg';

const OAVLogo: React.FC = () => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: '16px', color: '#000000' }}>
      one<span style={{ color: BRAND }}>AMYLOIDOSIS</span>voice
    </span>
  ) : (
    <img
      className="oav-logo-img"
      src={OAV_LOGO_URL}
      alt="oneAMYLOIDOSISvoice"
      style={{ display: 'block', height: '72px', width: 'auto' }}
      onError={() => setFailed(true)}
    />
  );
};

// ─── Main nav ──────────────────────────────────────────────────────────────────
const SiteHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #E5E5E5',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="site-header-inner"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '88px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          {/* Logo */}
          <a href="#" className="oav-logo-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <OAVLogo />
          </a>

          {/* Nav links — hidden on mobile via CSS */}
          <nav
            className="hidden-mobile-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flex: 1,
              justifyContent: 'flex-end',
              background: 'transparent',
              padding: 0,
              minHeight: '44px',
            }}
          >
            {NAV_LINKS.map(({ label, url }) => (
              <NavItem key={label} label={label} url={url} />
            ))}
          </nav>

          {/* Hamburger — mobile only, hidden on desktop via CSS */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              color: '#000000',
            }}
          >
            {mobileMenuOpen
              ? <X size={22} color="#000000" />
              : <Menu size={22} color="#000000" />
            }
          </button>
        </div>
      </header>

      {/* Mobile nav panel — full-width dropdown below header */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '88px',  /* header height */
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid #E5E5E5',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            zIndex: 99,
            padding: '8px 0',
          }}
        >
          {NAV_LINKS.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 300,
                color: '#000000',
                textDecoration: 'none',
                fontFamily: FONT,
                borderBottom: '1px solid #F5F5F5',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = BRAND; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

const NavItem: React.FC<{ label: string; url: string }> = ({ label, url }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 8px',
        minHeight: '42px',
        fontSize: '14px',
        fontWeight: 700,
        color: hovered ? BRAND : '#000000',
        textDecoration: 'none',
        whiteSpace: 'nowrap' as const,
        fontFamily: FONT,
        letterSpacing: 0,
        borderBottom: hovered ? `3px solid ${BRAND}` : '3px solid transparent',
        transition: 'color 0.15s ease, border-color 0.15s ease',
      }}
    >
      {label}
    </a>
  );
};

// ─── Footer ────────────────────────────────────────────────────────────────────

// ─── Sponsor logo with img fallback ───────────────────────────────────────────
const SponsorLogo: React.FC<{ name: string; img: string; height?: number }> = ({ name, img, height = 32 }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span style={{ fontSize: '13px', fontWeight: 700, color: '#444444', fontFamily: FONT }}>{name}</span>
  ) : (
    <img
      src={img}
      alt={name}
      style={{ height: `${height}px`, width: 'auto', maxWidth: '160px', display: 'block', objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
};

// Pharma sponsor logos
const SPONSORS = [
  { name: 'Alnylam',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/alnylam.jpg' },
  { name: 'BRIDGEBIO',           img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/bb-orange-logo.png' },
  { name: 'attralus',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/attralus_1.png' },
  { name: 'prothena',            img: 'https://oneamyloidosisvoice.com/sites/default/files/logos/prothena.png' },
];

const AMYLOIDOSIS_FOUNDATION_LOGO = 'https://oneamyloidosisvoice.com/sites/default/files/logos/amyloidosis-foundation.png';

const SiteFooter: React.FC = () => (
  <footer
    style={{
      background: '#ffffff',
      borderTop: '1px solid #E5E5E5',
      fontFamily: FONT,
    }}
  >
    {/* ── Nav links row ── */}
    <div
      style={{
        borderBottom: '1px solid #E5E5E5',
        padding: '14px 24px',
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: '4px 0',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {FOOTER_LINKS.map(({ label, url }, i) => (
        <React.Fragment key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '13px',
              color: '#000000',
              textDecoration: 'underline',
              textDecorationColor: '#AAAAAA',
              padding: '0 10px',
              fontFamily: FONT,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = BRAND;
              (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = BRAND;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
              (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = '#AAAAAA';
            }}
          >
            {label}
          </a>
          {i < FOOTER_LINKS.length - 1 && (
            <span style={{ color: '#E5E5E5', fontSize: '13px' }}>|</span>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* ── Copyright + Social ── */}
    <div
      style={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #E5E5E5',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '13px', color: '#000000', fontFamily: FONT }}>
        © 2025 Somebody To Talk To, Inc.
      </span>
    </div>

  </footer>
);

// ─── Layout shell ──────────────────────────────────────────────────────────────
export const SpotlightLayout: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--oav-page-bg)',
        fontFamily: FONT,
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
      }}
    >
      <SiteHeader />

      <main style={{ flex: 1, width: '100%', minWidth: 0 }}>
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
};
