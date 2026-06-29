import React, { useState, useMemo } from 'react';
import { PlayCircle, Calendar, ExternalLink, X } from 'lucide-react';
import type { Clinician, SupportStaff } from './data';
import { useSpotlightSessions, buildRegUrlMap, type NormalizedSession } from './useSpotlightSessions';
import { useSpotlightProfiles, type NormalizedProfile } from './useSpotlightProfiles';

const FONT = 'gotham, sans-serif';
const API_SUPPORT_STAFF_NAMES = [
  'Tracy Allen',
  'Natalie Castillo',
  'Brian Miller',
  'Julia Carlson',
  'Khrystal Dupre',
  'Kelly Fields',
];
const FEATURED_GUEST_NAMES = ['Missy Maxwell'];
const EXCLUDED_PROFILE_NAMES = ['Missy Maxwell'];

function profileSearchText(profile: NormalizedProfile): string {
  return [
    profile.displayName,
    profile.specialtyLine1,
    profile.specialtyLine2,
    profile.spotlightCardTag,
    profile.titlePrefix,
    profile.indication,
  ].join(' ').toLowerCase();
}

function teamSpecialtyRank(profile: NormalizedProfile): number {
  const primaryText = [
    profile.specialtyLine1,
    profile.spotlightCardTag,
    profile.titlePrefix,
  ].join(' ').toLowerCase();
  const fallbackText = profileSearchText(profile);

  if (/(hematology|hematologist|oncology|plasma cell)/i.test(primaryText)) return 0;
  if (/(cardiology|cardiologist|cardiac|heart failure|transplantation|lvad)/i.test(primaryText)) return 1;
  if (/(neurology|neurologist|neuromuscular|neuropathy)/i.test(primaryText)) return 2;
  if (/(nephrology|nephrologist|renal|kidney)/i.test(primaryText)) return 3;
  if (/(gastroenterology|gastroenterologist|gastrointestinal|hepatology|\bgi\b)/i.test(primaryText)) return 4;

  if (/(hematology|hematologist|oncology|plasma cell|myeloma|al amyloidosis|stem cell|car-t)/i.test(fallbackText)) return 0;
  if (/(cardiology|cardiologist|cardiac|heart failure|transplantation|lvad)/i.test(fallbackText)) return 1;
  if (/(neurology|neurologist|neuromuscular|neuropathy)/i.test(fallbackText)) return 2;
  if (/(nephrology|nephrologist|renal|kidney)/i.test(fallbackText)) return 3;
  if (/(gastroenterology|gastroenterologist|gastrointestinal|hepatology|\bgi\b)/i.test(fallbackText)) return 4;

  return 5;
}

function supportStaffRank(profile: NormalizedProfile): number {
  const text = profileSearchText(profile);

  if (/(aprn|advanced practice|nurse practitioner|\bnp\b|\bpa\b|physician assistant)/i.test(text)) return 0;
  if (/(registered nurse|\brn\b|nursing)/i.test(text)) return 1;
  if (/(social worker|social work|\blmsw\b|\bsw\b)/i.test(text)) return 3;
  if (/(pharmacy|physical therapy|\bpt\b|occupational therapy|\bot\b|dietitian|nutrition)/i.test(text)) return 4;
  if (/(amyloidosis|hematology|cardiology|oncology|renal|kidney|neurology|gastroenterology|\bgi\b)/i.test(text)) return 2;

  return 5;
}

function profileNameForSort(profile: NormalizedProfile): string {
  return `${profile.lastName} ${profile.firstName}`.trim().toLowerCase();
}

function sortProfilesByPriority(
  profiles: NormalizedProfile[],
  rankProfile: (profile: NormalizedProfile) => number,
): NormalizedProfile[] {
  return profiles
    .map((profile, index) => ({ profile, index }))
    .sort((a, b) => (
      rankProfile(a.profile) - rankProfile(b.profile)
      || profileNameForSort(a.profile).localeCompare(profileNameForSort(b.profile))
      || a.index - b.index
    ))
    .map(({ profile }) => profile);
}

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

function buildProfileName(profile: NormalizedProfile): string {
  const baseName = [profile.firstName, profile.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');

  const name = [baseName, profile.nameSuffix]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');

  return name || profile.displayName.trim();
}

function buildProfileBaseName(profile: NormalizedProfile): string {
  return [profile.firstName, profile.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ') || profile.displayName.replace(profile.nameSuffix, '').trim();
}

function profilePersonKey(profile: NormalizedProfile): string {
  return personNameKey(buildProfileBaseName(profile));
}

function personNameKey(name: string): string {
  const credentialsAndSuffixes = new Set([
    'agaf',
    'aprn',
    'bsn',
    'ccrn',
    'dbh',
    'facg',
    'facc',
    'facp',
    'ii',
    'iii',
    'iv',
    'ldn',
    'lmsw',
    'md',
    'mph',
    'ms',
    'mscr',
    'msn',
    'ocn',
    'phd',
    'rd',
    'rn',
    'sw',
  ]);

  return name
    .replace(/^Dr\.?\s+/i, '')
    .replace(/[^a-z\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((part) => {
      const key = part.toLowerCase();
      return part.length > 1 && !credentialsAndSuffixes.has(key);
    })
    .join(' ')
    .toLowerCase();
}

function clinicianFromProfile(profile: NormalizedProfile): Clinician {
  return {
    id: profile.uid,
    name: buildProfileName(profile),
    credentials: profile.nameSuffix,
    title: profile.specialtyLine1 || profile.spotlightCardTag,
    specialty: profile.specialtyLine2 || profile.spotlightCardTag,
    type: profile.spotlightCardTag || 'Team Member',
    photo: profile.photoUrl,
    bio: profile.bio,
    hasVideo: false,
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    appointmentUrl: 'https://www.vanderbilthealth.com/',
    profileUid: profile.uid,
  };
}

function supportStaffFromProfile(profile: NormalizedProfile): SupportStaff {
  return {
    id: profile.uid,
    name: buildProfileBaseName(profile),
    credentials: profile.nameSuffix,
    role: profile.specialtyLine1 || profile.spotlightCardTag || 'Support Staff',
    note: profile.bio,
    photo: profile.photoUrl,
  };
}

function featuredGuestFromProfile(profile: NormalizedProfile): SupportStaff {
  return {
    id: profile.uid,
    name: buildProfileBaseName(profile),
    credentials: profile.nameSuffix,
    role: profile.specialtyLine1 || profile.spotlightCardTag || 'Featured Guest',
    note: profile.bio,
    photo: profile.photoUrl,
  };
}

// ─── Bio Modal ────────────────────────────────────────────────────────────────
interface BioModalProps {
  clinician: Clinician;
  name: string;                   // resolved name from profiles API
  photoUrl: string;              // resolved photo from profiles API
  bio: string;                   // resolved bio from profiles API
  sessionDate: string;           // resolved session date from sessions API
  sessionTitle: string;          // resolved session title from sessions API
  apiSessionDescription?: string; // session description from Drupal API
  regLink?: string;
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
  regLink,
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
              border: '3px solid #1C1C1C',
              overflow: 'hidden',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1C1C1C',
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
            {clinician.title && (
              <div style={{ fontSize: '13px', fontWeight: 300, color: '#000000', fontFamily: FONT, marginTop: '2px' }}>
                {clinician.title}
              </div>
            )}
            {clinician.specialty && (
              <div style={{ fontSize: '13px', color: '#1C1C1C', fontFamily: FONT, marginTop: '2px' }}>
                {clinician.specialty}
              </div>
            )}
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
                background: '#F8F5EE',
                border: '1px solid #E0D5C0',
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
                  color: '#1C1C1C',
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
              {regLink && (
                <a
                  href={regLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '12px',
                    padding: '7px 13px',
                    background: '#1C1C1C',
                    color: '#ffffff',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 300,
                    fontFamily: FONT,
                    textDecoration: 'none',
                  }}
                >
                  <Calendar size={12} color="#ffffff" />
                  Register
                </a>
              )}
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
  apiBio?: string;                // live bio from profiles API — preferred over data.ts bio
  apiSessionDate?: string;        // live date from sessions API
  apiSessionTitle?: string;       // live title from sessions API
  apiSessionDescription?: string; // session description from Drupal API
}

const CompactCard: React.FC<CompactCardProps> = ({
  clinician,
  regLink,
  apiPhotoUrl,
  apiBio,
  apiSessionDate,
  apiSessionTitle,
  apiSessionDescription,
}) => {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  // API photo preferred; fall back to data.ts CDN photo
  const resolvedName = clinician.name;
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
            border: '2px solid #1C1C1C',
            background: '#1C1C1C',
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
          {clinician.title && (
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
          )}
          {clinician.specialty && (
            <div
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#1C1C1C',
                fontFamily: FONT,
                marginTop: '4px',
                lineHeight: 1.4,
              }}
            >
              {clinician.specialty}
            </div>
          )}
          {clinician.hasSession && (
            <div style={{ fontSize: '12px', color: '#1C1C1C', fontFamily: FONT, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={11} color="#1C1C1C" />
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
              color: '#1C1C1C',
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

          {/* Register CTA */}
          {regLink && (
            <a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Register"
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#000000' : '#1C1C1C',
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
                color: '#1C1C1C',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontFamily: FONT,
                whiteSpace: 'nowrap' as const,
              }}
            >
              <PlayCircle size={13} color="#1C1C1C" />
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
          regLink={regLink}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

// ─── Support Staff Card ───────────────────────────────────────────────────────
interface SupportStaffCardProps {
  staff: SupportStaff;
  session?: NormalizedSession;
  regLink?: string;
}

const StaffDetailModal: React.FC<{
  staff: SupportStaff;
  session?: NormalizedSession;
  regLink?: string;
  onClose: () => void;
}> = ({ staff, session, regLink, onClose }) => (
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
    onClick={e => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: '12px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', borderBottom: '1px solid #E8E8E8' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: '3px solid #1C1C1C',
            background: '#1C1C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {staff.photo ? (
            <img
              src={staff.photo}
              alt={staff.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '24px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(staff.name)}
            </span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '17px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {staff.name}{staff.credentials ? `, ${staff.credentials}` : ''}
          </div>
          <div style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, marginTop: '2px' }}>
            {staff.role}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#4B5563' }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        {staff.note && (
          <p style={{ fontSize: '15px', fontWeight: 300, color: '#000000', lineHeight: 1.7, margin: session ? '0 0 20px 0' : 0, fontFamily: FONT }}>
            {staff.note}
          </p>
        )}
        {session && (
          <div
            style={{
              background: '#F8F5EE',
              border: '1px solid #E0D5C0',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: '#1C1C1C',
                fontFamily: FONT,
                marginBottom: '4px',
              }}
            >
              Session: {formatApiSessionDate(session.month, session.day)}
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
              {session.title}
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
              {session.description}
            </p>
            {regLink && (
              <a
                href={regLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '12px',
                  padding: '7px 13px',
                  background: '#1C1C1C',
                  color: '#ffffff',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 300,
                  fontFamily: FONT,
                  textDecoration: 'none',
                }}
              >
                <Calendar size={12} color="#ffffff" />
                Register
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

const SupportStaffCard: React.FC<SupportStaffCardProps> = ({ staff, session, regLink }) => {
  const [open, setOpen] = useState(false);
  const [registerHovered, setRegisterHovered] = useState(false);

  return (
    <>
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
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #1C1C1C',
            background: '#1C1C1C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {staff.photo ? (
            <img
              src={staff.photo}
              alt={staff.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          ) : (
            <span style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff', fontFamily: FONT }}>
              {getInitials(staff.name)}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: '#000000', fontFamily: FONT }}>
            {staff.name}{staff.credentials ? `, ${staff.credentials}` : ''}
          </div>
          <div style={{ fontSize: '13px', color: '#374151', fontFamily: FONT, marginTop: '2px' }}>
            {staff.role}
          </div>
          {session && (
            <div style={{ fontSize: '12px', color: '#1C1C1C', fontFamily: FONT, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={11} color="#1C1C1C" />
              <span>{formatApiSessionDate(session.month, session.day)}</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
          {staff.note && (
            <button
              onClick={() => setOpen(true)}
              aria-label={`View more about ${staff.name}`}
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
              }}
            >
              View more
            </button>
          )}
          {regLink && (
            <a
              href={regLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Register"
              onMouseEnter={() => setRegisterHovered(true)}
              onMouseLeave={() => setRegisterHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                background: registerHovered ? '#000000' : '#1C1C1C',
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
        </div>
      </div>
      {open && <StaffDetailModal staff={staff} session={session} regLink={regLink} onClose={() => setOpen(false)} />}
    </>
  );
};

// ─── TeamSection ──────────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => {
  const { sessions } = useSpotlightSessions();
  const { profiles } = useSpotlightProfiles();
  const excludedProfileNameKeys = useMemo(
    () => new Set(EXCLUDED_PROFILE_NAMES.map(personNameKey)),
    [],
  );
  const displayProfiles = useMemo(
    () => profiles.filter((profile) => !excludedProfileNameKeys.has(profilePersonKey(profile))),
    [profiles, excludedProfileNameKeys],
  );
  const displayProfileMap = useMemo(
    () => new Map(displayProfiles.map((profile) => [profile.uid, profile])),
    [displayProfiles],
  );

  // uuid → regUrl — memoised to avoid rebuilding on every render
  const regUrlMap  = useMemo(() => buildRegUrlMap(sessions), [sessions]);
  // uuid → full session data from Drupal API for team card/modal copy.
  const sessionMap = useMemo(
    () => new Map(sessions.map(s => [s.id, s])),
    [sessions],
  );
  const sessionByPresenterName = useMemo(
    () => new Map(sessions.map((session) => [personNameKey(session.presenter), session])),
    [sessions],
  );
  // uuid → session description (Drupal API copy overrides data.ts)
  const descMap    = useMemo(
    () => new Map(sessions.map(s => [s.id, s.description])),
    [sessions],
  );
  const supportStaffNameKeys = useMemo(
    () => new Set([
      ...API_SUPPORT_STAFF_NAMES.map(personNameKey),
    ]),
    [],
  );
  const featuredGuestNameKeys = useMemo(
    () => new Set(FEATURED_GUEST_NAMES.map(personNameKey)),
    [],
  );
  const featuredGuests = useMemo(
    () => {
      return profiles
        .filter((profile) => featuredGuestNameKeys.has(profilePersonKey(profile)))
        .map(featuredGuestFromProfile);
    },
    [profiles, featuredGuestNameKeys],
  );
  const resolvedSupportStaff = useMemo(
    () => {
      return sortProfilesByPriority(
        displayProfiles.filter((profile) => supportStaffNameKeys.has(profilePersonKey(profile))),
        supportStaffRank,
      ).map(supportStaffFromProfile);
    },
    [displayProfiles, supportStaffNameKeys],
  );
  const teamClinicians = useMemo(
    () => (
      sortProfilesByPriority(
        displayProfiles.filter((profile) => {
          const key = profilePersonKey(profile);
          return !supportStaffNameKeys.has(key) && !featuredGuestNameKeys.has(key);
        }),
        teamSpecialtyRank,
      )
        .map((profile) => {
          const clinician = clinicianFromProfile(profile);
          const session = sessionByPresenterName.get(personNameKey(buildProfileName(profile)));

          if (!session) {
            return clinician;
          }

          return {
            ...clinician,
            hasSession: true,
            sessionUuid: session.id,
          };
        })
    ),
    [displayProfiles, featuredGuestNameKeys, sessionByPresenterName, supportStaffNameKeys],
  );

  return (
  <section
    style={{
      background: 'var(--oav-page-bg)',
      padding: '32px 0 24px',
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
            marginTop: '8px',
            marginBottom: 0,
            fontFamily: FONT,
            lineHeight: 1.5,
          }}
        >
          Vanderbilt University Medical Center — the multidisciplinary team behind the Amyloidosis Program
        </p>
      </div>

      {/* Compact card list */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {teamClinicians.map((clinician) => (
          <CompactCard
            key={clinician.id}
            clinician={clinician}
            regLink={clinician.sessionUuid ? regUrlMap.get(clinician.sessionUuid) : undefined}
            apiPhotoUrl={clinician.profileUid ? displayProfileMap.get(clinician.profileUid)?.photoUrl : undefined}
            apiBio={clinician.profileUid ? displayProfileMap.get(clinician.profileUid)?.bio : undefined}
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

      {/* ── Support Staff ── */}
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
          Support Staff
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
          {resolvedSupportStaff.map((staff) => {
            const session = sessionByPresenterName.get(personNameKey(`${staff.name} ${staff.credentials ?? ''}`));

            return (
              <SupportStaffCard
                key={staff.id}
                staff={staff}
                session={session}
                regLink={session ? regUrlMap.get(session.id) : undefined}
              />
            );
          })}
        </div>
      </div>

      {featuredGuests.length > 0 && (
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
            Featured Guest
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: '#4B5563',
              margin: '0 0 20px 0',
              fontFamily: FONT,
            }}
          >
            Patient and special presenters featured in the Vanderbilt Amyloidosis Multidisciplinary Program
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '10px',
            }}
          >
            {featuredGuests.map((guest) => {
              const session = sessionByPresenterName.get(personNameKey(`${guest.name} ${guest.credentials ?? ''}`));

              return (
                <SupportStaffCard
                  key={guest.id}
                  staff={guest}
                  session={session}
                  regLink={session ? regUrlMap.get(session.id) : undefined}
                />
              );
            })}
          </div>
        </div>
      )}

    </div>
  </section>
  );
};
