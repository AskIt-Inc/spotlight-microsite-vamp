import React, { useState } from 'react';
import { PlayCircle, Calendar, ExternalLink, X, Users } from 'lucide-react';
import { clinicians, type Clinician } from '../spotlight/data';

const FONT = 'gotham, sans-serif';

function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const suffixes = new Set(['iv', 'iii', 'ii', 'jr', 'sr', 'md', 'phd', 'ms', 'cgc']);
  const filtered = words.filter((w) => !suffixes.has(w.toLowerCase().replace(/[.,]/g, '')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return filtered[0][0].toUpperCase();
}

// ─── Bio Modal ────────────────────────────────────────────────────────────────
interface BioModalProps {
  clinician: Clinician;
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({ clinician, onClose }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 24px',
            borderBottom: '1px solid #E8E8E8',
          }}
        >
          {/* Photo */}
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '3px solid #8B1F2D',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#8B1F2D',
            }}
          >
            {clinician.photo && !imgError ? (
              <img
                src={clinician.photo}
                alt={clinician.name}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
                {getInitials(clinician.name)}
              </span>
            )}
          </div>

          {/* Identity */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
              {clinician.name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.credentials} · {clinician.title}
            </div>
            <div style={{ fontSize: '13px', color: '#8B1F2D', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.specialty}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px' }}>
          <p
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: '#000000',
              lineHeight: 1.7,
              margin: '0 0 20px 0',
              fontFamily: FONT,
            }}
          >
            {clinician.bio}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {clinician.hasSession && (
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#8B1F2D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 300,
                  cursor: 'pointer',
                  fontFamily: FONT,
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Calendar size={14} />
                {clinician.sessionLabel}
              </button>
            )}

            <a
              href={clinician.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'transparent',
                border: '1px solid #E8E8E8',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                width: '100%',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#000000',
                boxSizing: 'border-box' as const,
              }}
            >
              Schedule an appointment
              <ExternalLink size={13} color="#9CA3AF" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Compact horizontal card ──────────────────────────────────────────────────
// Client feedback: cards too tall, too much text.
// v2: horizontal layout, photo + name + specialty left, CTAs right, modal for full bio.
interface CompactCardProps {
  clinician: Clinician;
}

const CompactCard: React.FC<CompactCardProps> = ({ clinician }) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  return (
    <>
      <div
        className="compact-card"
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          boxShadow: 'var(--oav-card-shadow)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Photo — smaller than v1 (60px vs 80px) */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #8B1F2D',
            background: '#8B1F2D',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {clinician.photo && !imgError ? (
            <img
              src={clinician.photo}
              alt={clinician.name}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(clinician.name)}
            </span>
          )}
        </div>

        {/* Identity — flex-grows to fill space */}
        <div className="compact-card-identity" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {clinician.name}
          </div>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
              marginTop: '1px',
              whiteSpace: 'nowrap' as const,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {clinician.specialty}
          </div>
        </div>

        {/* CTAs — stacked on the right */}
        <div
          className="compact-card-ctas"
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '6px',
            flexShrink: 0,
            alignItems: 'flex-end',
          }}
        >
          {/* View bio modal */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#005EB8',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: FONT,
              textDecoration: 'underline',
              whiteSpace: 'nowrap' as const,
            }}
          >
            View more
          </button>

          {/* Register CTA — only if has session */}
          {clinician.hasSession && (
            <button
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#6E1A24' : '#8B1F2D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
                transition: 'background 0.15s ease',
              }}
            >
              <Calendar size={11} color="#ffffff" />
              Register
            </button>
          )}

          {/* Watch video — if available */}
          {clinician.hasVideo && (
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 300,
                color: '#005EB8',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
              }}
            >
              <PlayCircle size={13} color="#005EB8" />
              Watch video
            </button>
          )}
        </div>
      </div>

      {/* Bio modal */}
      {modalOpen && (
        <BioModal clinician={clinician} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

// ─── TeamSection v2 ───────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '48px 0',
    }}
  >
    <div className="team-section-inner">
      {/* Section heading */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 300,
            color: '#000000',
            margin: 0,
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
            marginTop: '6px',
            marginBottom: 0,
            fontFamily: FONT,
          }}
        >
          The multidisciplinary team behind the University of Chicago Amyloidosis Program
        </p>
      </div>

      {/* Compact card list — single column for scannability */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {clinicians.map((clinician) => (
          <CompactCard key={clinician.id} clinician={clinician} />
        ))}
      </div>

      {/* Ancillary staff */}
      <div
        style={{
          marginTop: '24px',
          padding: '14px 18px',
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <Users size={16} color="#8B1F2D" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <span style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT }}>
            Our multidisciplinary team also includes:{' '}
          </span>
          <span style={{ fontSize: '13px', color: '#000000', fontFamily: FONT }}>
            Samantha De Santiago, RN, Heart Failure Clinic · Clinic Nursing · Medical Social Work · Physical and Occupational Therapy
          </span>
        </div>
      </div>

      {/* ── Affiliate Team Members ── */}
      {/* 11-hospital network across UChicago Medicine + Endeavor Health affiliate sites */}
      <div style={{ marginTop: '40px' }}>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 300,
            color: '#000000',
            margin: '0 0 4px 0',
            lineHeight: 1.3,
            fontFamily: FONT,
          }}
        >
          Affiliate Team Members
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#9CA3AF',
            margin: '0 0 16px 0',
            fontFamily: FONT,
          }}
        >
          Together with our affiliate and satellite sites, the University of Chicago
          Amyloidosis Program serves patients across{' '}
          <strong style={{ color: '#8B1F2D' }}>11 hospitals</strong> — including Endeavor Health.
        </p>

        {/* Placeholder cards — names to be provided by UChicago/Endeavor Health team */}
        <div
          style={{
            border: '1px dashed #F0D0D3',
            borderRadius: '8px',
            padding: '20px',
            background: '#FBF0F1',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Users size={18} color="#8B1F2D" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.6 }} />
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#8B1F2D',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                fontFamily: FONT,
                marginBottom: '6px',
              }}
            >
              Content needed — Endeavor Health affiliate team
            </div>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 300,
                color: '#6B7280',
                margin: 0,
                fontFamily: FONT,
                lineHeight: 1.6,
              }}
            >
              Awaiting names and roles from Dr. Sarswat / Endeavor Health team.
              Once received, each affiliate member will appear as a card here.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
);
