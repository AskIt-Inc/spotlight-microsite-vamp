import React, { useState } from 'react';
import { User, Calendar, Loader, AlertCircle } from 'lucide-react';
import { type NormalizedSession, useSpotlightSessions } from './useSpotlightSessions';

const FONT = 'gotham, sans-serif';

const SidebarSessionRow: React.FC<{ session: NormalizedSession }> = ({ session }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--oav-border)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      {/* Date chip */}
      <div
        style={{
          width: '44px',
          flexShrink: 0,
          textAlign: 'center' as const,
          background: 'var(--oav-page-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '6px',
          padding: '5px 4px',
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: '#006E8E',
            lineHeight: 1,
            fontFamily: FONT,
          }}
        >
          {session.month}
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.day}
        </div>
        <div
          style={{
            fontSize: '9px',
            color: '#4B5563',
            lineHeight: 1,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.dayOfWeek}
        </div>
      </div>

      {/* Session details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '11px',
            color: '#4B5563',
            marginBottom: '3px',
            fontFamily: FONT,
          }}
        >
          {session.time}
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.35,
            fontFamily: FONT,
          }}
        >
          {session.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            fontSize: '12px',
            color: '#000000',
            fontFamily: FONT,
          }}
        >
          <User size={11} color="#4B5563" style={{ flexShrink: 0 }} />
          {session.presenter}
        </div>

        {session.status === 'upcoming' && session.regUrl && (
          <a
            href={session.regUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              marginTop: '8px',
              padding: '5px 12px',
              background: hovered ? '#004F66' : '#006E8E',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
              textDecoration: 'none',
            }}
          >
            <Calendar size={11} color="#ffffff" style={{ flexShrink: 0 }} />
            Register
          </a>
        )}

        {session.status === 'completed' && (
          <span
            style={{
              display: 'inline-block',
              marginTop: '6px',
              padding: '2px 10px',
              background: '#F5F5F5',
              color: '#000000',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 300,
              fontFamily: FONT,
              border: '1px solid #E5E5E5',
            }}
          >
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

export const SessionsSidebar: React.FC = () => {
  const { sessions, loading, error } = useSpotlightSessions();

  // Secondary sort within status groups: ascending by month/day
  const MONTH_ORDER: Record<string, number> = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  };
  const sorted = [...sessions].sort((a, b) => {
    // Primary: status (completed before upcoming)
    if (a.status !== b.status) {
      return a.status === 'completed' ? -1 : 1;
    }
    // Secondary: chronological
    const mo = (MONTH_ORDER[a.month] ?? 99) - (MONTH_ORDER[b.month] ?? 99);
    if (mo !== 0) return mo;
    return parseInt(a.day) - parseInt(b.day);
  });

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        boxShadow: 'var(--oav-card-shadow)',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--oav-border)',
          background: '#006E8E',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: FONT,
          }}
        >
          Upcoming Sessions
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div
          style={{
            padding: '32px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#4B5563',
            fontFamily: FONT,
            fontSize: '13px',
          }}
        >
          <Loader size={16} color="#006E8E" style={{ animation: 'spin 1s linear infinite' }} />
          Loading sessions…
        </div>
      )}

      {/* Error banner — shown above sessions when using fallback data */}
      {!loading && error && (
        <div
          style={{
            padding: '8px 16px',
            background: '#FFF8E7',
            borderBottom: '1px solid #F0D060',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#7A5A00',
            fontFamily: FONT,
          }}
        >
          <AlertCircle size={13} color="#B58A00" style={{ flexShrink: 0 }} />
          {error}
        </div>
      )}

      {/* Session rows — scrollable on mobile only via CSS class */}
      {!loading && (
        <div className="sessions-list">
          {sorted.map((session) => (
            <SidebarSessionRow key={session.id} session={session} />
          ))}
        </div>
      )}

    </div>
  );
};
