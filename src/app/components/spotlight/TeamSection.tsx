import React, { useState } from 'react';
import { PlayCircle, Calendar, ExternalLink, Users } from 'lucide-react';
import { clinicians, type Clinician } from './data';

/** Returns up to 2 initials from a full name, e.g. "Dr. Edwin K. McDonald IV" → "EM" */
function getInitials(name: string): string {
  const words = name.replace(/^Dr\.?\s+/i, '').split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0][0].toUpperCase();
  // Use first and last meaningful word (skip suffixes like IV, Jr, MD)
  const suffixes = new Set(['iv', 'iii', 'ii', 'jr', 'sr', 'md', 'phd', 'ms', 'cgc']);
  const filtered = words.filter(w => !suffixes.has(w.toLowerCase().replace(/[.,]/g, '')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length - 1][0]).toUpperCase();
  return filtered[0][0].toUpperCase();
}

const FONT = 'gotham, sans-serif';

interface ClinicianCardProps {
  clinician: Clinician;
}

const ClinicianCard: React.FC<ClinicianCardProps> = ({ clinician }) => {
  const [bioExpanded, setBioExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        boxShadow: 'var(--oav-card-shadow)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
      }}
    >
      {/* Top row — identity */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {/* Headshot */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid #8B1F2D',
            background: 'var(--oav-icon-bg)',
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
              style={{ width: '100%', height: '100%', objectFit: 'cover' as const, objectPosition: 'center top', display: 'block' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#8B1F2D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.5px',
                fontFamily: FONT,
                userSelect: 'none',
              }}
            >
              {getInitials(clinician.name)}
            </div>
          )}
        </div>

        {/* Identity block */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2px', flex: 1 }}>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#000000',
              fontFamily: FONT,
            }}
          >
            {clinician.name}
          </div>

          <div
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
              lineHeight: 1.5,
            }}
          >
            {clinician.credentials} · {clinician.title}
          </div>

          <div
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: '#8B1F2D',
              fontFamily: FONT,
              marginTop: '2px',
            }}
          >
            {clinician.specialty}
          </div>

          {/* Clinician type badge */}
          <div style={{ marginTop: '4px' }}>
            <span
              style={{
                background: '#FBF0F1',
                color: '#8B1F2D',
                border: '1px solid #F0D0D3',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 300,
                fontFamily: FONT,
                display: 'inline-block',
              }}
            >
              {clinician.type}
            </span>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div>
        <div
          style={
            bioExpanded
              ? { fontSize: '14px', color: '#000000', lineHeight: 1.7, fontFamily: FONT, textAlign: 'justify' as const }
              : {
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: 1.7,
                  fontFamily: FONT,
                                    display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical' as const,
                  overflow: 'hidden',
                }
          }
        >
          {clinician.bio}
        </div>
        <button
          onClick={() => setBioExpanded(!bioExpanded)}
          style={{
            fontSize: '13px',
            color: '#005EB8',
            fontWeight: 300,
            marginTop: '4px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            fontFamily: FONT,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#004A93'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#005EB8'; }}
        >
          {bioExpanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* Three-CTA row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '8px',
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--oav-border)',
        }}
      >
        {/* CTA 1 — Watch video */}
        {clinician.hasVideo && (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 300,
              color: '#005EB8',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: FONT,
              textAlign: 'left' as const,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#004A93'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#005EB8'; }}
          >
            <PlayCircle size={16} color="#005EB8" style={{ flexShrink: 0 }} />
            <span>
              Watch: How {clinician.name.split(' ').slice(0, 2).join(' ')} became interested in amyloidosis
            </span>
          </button>
        )}

        {/* CTA 2 — Register for session (brand filled) */}
        {clinician.hasSession && (
          <button
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: registerHovered ? '#6E1A24' : '#8B1F2D',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 300,
              width: '100%',
              justifyContent: 'center',
              cursor: 'pointer',
              border: 'none',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
            }}
          >
            <Calendar size={14} color="#ffffff" style={{ flexShrink: 0 }} />
            <span>{clinician.sessionLabel}</span>
          </button>
        )}

        {/* CTA 3 — Book appointment (outlined) */}
        <a
          href={clinician.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid var(--oav-border)',
            color: '#000000',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 300,
            width: '100%',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: FONT,
            textDecoration: 'none',
            boxSizing: 'border-box' as const,
          }}
        >
          <span>Schedule an appointment</span>
          <ExternalLink size={13} color="#9CA3AF" style={{ flexShrink: 0 }} />
        </a>
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-page-bg)',
        padding: '56px 0',
      }}
    >
      <div>
        {/* Section heading */}
        <div style={{ marginBottom: '32px' }}>
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
              marginTop: '8px',
              marginBottom: 0,
              fontFamily: FONT,
              lineHeight: 1.5,
            }}
          >
            The multidisciplinary team behind the City of Hope Amyloidosis Program
          </p>
        </div>

        {/* Clinician card grid — 2 columns on desktop, 1 on mobile */}
        <div
          className="team-card-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {clinicians.map((clinician) => (
            <ClinicianCard key={clinician.id} clinician={clinician} />
          ))}
        </div>

        {/* Ancillary staff acknowledgement */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px 20px',
            background: 'var(--oav-card-bg)',
            border: '1px solid var(--oav-border)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Users size={18} color="#8B1F2D" style={{ flexShrink: 0, marginTop: '1px' }} />
          <div>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                fontFamily: FONT,
              }}
            >
              Our multidisciplinary team also includes:{' '}
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#000000',
                fontFamily: FONT,
              }}
            >
              Clinic Nursing · Medical Social Work · Physical and Occupational Therapy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
