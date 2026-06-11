import React, { useState, useMemo } from 'react';
import { PlayCircle, Calendar, ExternalLink, X } from 'lucide-react';
import { clinicians, supportStaff, type Clinician, type SupportStaff } from './data';
import { useSpotlightSessions, buildRegUrlMap } from './useSpotlightSessions';
import { useSpotlightProfiles } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';

function formatApiSessionDate(month?: string, day?: string): string | undefined {
  if (!month || !day) return undefined;
  const lower = month.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)} ${day}`;
}

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
  name: string;                   // resolved name — sessions API presenter preferred, data.ts as fallback
  photoUrl: string;              // resolved photo — API live URL preferred, data.ts as fallback
  bio: string;                   // resolved bio — API profile bio preferred, data.ts as fallback
  sessionDate: string;           // resolved session date — API sessions preferred, data.ts as fallback
  sessionTitle: string;          // resolved session title — API sessions preferred, data.ts as fallback
  apiSessionDescription?: string; // session description from Drupal API — overrides data.ts copy
  onClose: () => void;
}

const BioModal: React.FC<BioModalProps> = ({
  clinician,
  name,
  photoUrl,
  bio,
  sessionDate,
  sessionTitle,
  apiSessionDescription,
  onClose,
}) => {
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
              border: '3px solid #006E8E',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#006E8E',
            }}
          >
            {photoUrl && !imgError ? (
              <img
                src={photoUrl}
                alt={name}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <span style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
                {getInitials(name)}
              </span>
            )}
          </div>

          {/* Identity */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
              {name}
            </div>
            <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, marginTop: '2px' }}>
              {clinician.credentials} · {clinician.title}
            </div>
            <div style={{ fontSize: '13px', color: '#006E8E', fontFamily: FONT, marginTop: '2px' }}>
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
              color: '#4B5563',
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
            {bio}
          </p>

          {/* Session info box */}
          {clinician.hasSession && (
            <div
              style={{
                background: '#E7F5F8',
                border: '1px solid #B9DEE6',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: '#006E8E',
                  fontFamily: FONT,
                  marginBottom: '4px',
                }}
              >
                Session: {sessionDate}
              </div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#000000',
                  fontFamily: FONT,
                  marginBottom: '6px',
                }}
              >
                {sessionTitle}
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: '#000000',
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: FONT,
                }}
              >
                {apiSessionDescription ?? clinician.sessionDescription}
              </p>
            </div>
          )}

          {/* Appointment CTA */}
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
            <ExternalLink size={13} color="#4B5563" />
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Compact horizontal card ──────────────────────────────────────────────────
interface CompactCardProps {
  clinician: Clinician;
  regLink?: string;
  apiPhotoUrl?: string;           // live photo from profiles API — preferred over data.ts photo
  apiPresenterName?: string;      // live presenter name from sessions API
  apiBio?: string;                // live bio from profiles API — preferred over data.ts bio
  apiSessionDate?: string;        // live date from sessions API
  apiSessionTitle?: string;       // live title from sessions API
  apiSessionDescription?: string; // session description from Drupal API
}

const CompactCard: React.FC<CompactCardProps> = ({
  clinician,
  regLink,
  apiPhotoUrl,
  apiPresenterName,
  apiBio,
  apiSessionDate,
  apiSessionTitle,
  apiSessionDescription,
}) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  // API photo preferred; fall back to data.ts CDN photo
  const resolvedName = apiPresenterName?.trim() || clinician.name;
  const resolvedPhoto = apiPhotoUrl ?? clinician.photo;
  const resolvedBio = apiBio?.trim() || clinician.bio;
  const resolvedSessionDate = apiSessionDate || clinician.sessionDate;
  const resolvedSessionTitle = apiSessionTitle || clinician.sessionTitle;

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
        {/* Photo */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #006E8E',
            background: '#006E8E',
            flexShrink: 0,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {resolvedPhoto && !imgError ? (
            <img
              src={resolvedPhoto}
              alt={resolvedName}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(resolvedName)}
            </span>
          )}
        </div>

        {/* Identity */}
        <div className="compact-card-identity" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {resolvedName}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
              marginTop: '3px',
              lineHeight: 1.4,
            }}
          >
            {clinician.title}
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#006E8E',
              fontFamily: FONT,
              marginTop: '4px',
              lineHeight: 1.4,
            }}
          >
            {clinician.specialty}
          </div>
          {clinician.hasSession && (
            <div style={{ fontSize: '12px', color: '#006E8E', fontFamily: FONT, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={11} color="#006E8E" />
              <span>{resolvedSessionDate}</span>
            </div>
          )}
        </div>

        {/* CTAs */}
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

          {/* Register CTA — only if has session and regLink available */}
          {clinician.hasSession && regLink && (
            <a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#004F66' : '#006E8E',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
                transition: 'background 0.15s ease',
                textDecoration: 'none',
              }}
            >
              <Calendar size={11} color="#ffffff" />
              Register
            </a>
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
        <BioModal
          clinician={clinician}
          name={resolvedName}
          photoUrl={resolvedPhoto}
          bio={resolvedBio}
          sessionDate={resolvedSessionDate}
          sessionTitle={resolvedSessionTitle}
          apiSessionDescription={apiSessionDescription}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

// ─── Support Staff Card ───────────────────────────────────────────────────────
interface SupportStaffCardProps {
  staff: SupportStaff;
}

const SupportStaffCard: React.FC<SupportStaffCardProps> = ({ staff }) => (
  <div
    style={{
      background: 'var(--oav-card-bg)',
      border: '1px solid var(--oav-border)',
      borderRadius: '8px',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}
  >
    {/* Avatar */}
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#006E8E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
        {staff.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()}
      </span>
    </div>

    {/* Info */}
    <div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
        {staff.name}{staff.credentials ? `, ${staff.credentials}` : ''}
      </div>
      <div style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, marginTop: '2px' }}>
        {staff.role}
      </div>
    </div>
  </div>
);

// ─── TeamSection ──────────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => {
  const { sessions } = useSpotlightSessions();
  const { profileMap } = useSpotlightProfiles();

  // uuid → regUrl — memoised to avoid rebuilding on every render
  const regUrlMap  = useMemo(() => buildRegUrlMap(sessions), [sessions]);
  // uuid → full session data from Drupal API for team card/modal copy.
  const sessionMap = useMemo(
    () => new Map(sessions.map(s => [s.id, s])),
    [sessions],
  );
  // uuid → session description (Drupal API copy overrides data.ts)
  const descMap    = useMemo(
    () => new Map(sessions.map(s => [s.id, s.description])),
    [sessions],
  );

  return (
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
            color: '#4B5563',
            marginTop: '6px',
            marginBottom: 0,
            fontFamily: FONT,
          }}
        >
          Vanderbilt presenters featured in the August amyloidosis spotlight series
        </p>
      </div>

      {/* Compact card list */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {clinicians.map((clinician) => (
          <CompactCard
            key={clinician.id}
            clinician={clinician}
            regLink={clinician.sessionUuid ? regUrlMap.get(clinician.sessionUuid) : undefined}
            apiPhotoUrl={clinician.profileUid ? profileMap.get(clinician.profileUid)?.photoUrl : undefined}
            apiPresenterName={clinician.sessionUuid ? sessionMap.get(clinician.sessionUuid)?.presenter : undefined}
            apiBio={clinician.profileUid ? profileMap.get(clinician.profileUid)?.bio : undefined}
            apiSessionDate={
              clinician.sessionUuid
                ? formatApiSessionDate(
                    sessionMap.get(clinician.sessionUuid)?.month,
                    sessionMap.get(clinician.sessionUuid)?.day,
                  )
                : undefined
            }
            apiSessionTitle={clinician.sessionUuid ? sessionMap.get(clinician.sessionUuid)?.title : undefined}
            apiSessionDescription={clinician.sessionUuid ? descMap.get(clinician.sessionUuid) : undefined}
          />
        ))}
      </div>

      {/* ── Critical Supportive Staff ── */}
      <div style={{ marginTop: '48px' }}>
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
          Critical Supportive Staff
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#4B5563',
            margin: '0 0 20px 0',
            fontFamily: FONT,
          }}
        >
          The dedicated clinical and support team for the Vanderbilt Amyloidosis Multidisciplinary Program
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '10px',
          }}
        >
          {supportStaff.map((staff) => (
            <SupportStaffCard key={staff.id} staff={staff} />
          ))}
        </div>
      </div>

    </div>
  </section>
  );
};
