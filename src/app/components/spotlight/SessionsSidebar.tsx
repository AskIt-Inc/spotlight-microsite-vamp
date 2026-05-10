import React, { useState } from 'react';
import { User, Calendar, Download } from 'lucide-react';
import { sessions, type Session } from './data';

const FONT = 'gotham, sans-serif';

const SidebarSessionRow: React.FC<{ session: Session }> = ({ session }) => {
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
            color: '#9CA3AF',
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
            color: '#9CA3AF',
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
        {session.description && (
          <div
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: '#4B5563',
              lineHeight: 1.45,
              marginTop: '5px',
              fontFamily: FONT,
            }}
          >
            {session.description}
          </div>
        )}
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
          <User size={11} color="#9CA3AF" style={{ flexShrink: 0 }} />
          {session.presenter}
        </div>

        {session.status === 'upcoming' && (
          <button
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
            }}
          >
            <Calendar size={11} color="#ffffff" style={{ flexShrink: 0 }} />
            Register
          </button>
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
  const sorted = [...sessions].sort((a, b) => {
    const monthOrder: Record<string, number> = { MAY: 0, JUN: 1, JUL: 2, AUG: 3 };
    const mo = (monthOrder[a.month] ?? 99) - (monthOrder[b.month] ?? 99);
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

      {/* Session rows — scrollable on mobile only via CSS class */}
      <div className="sessions-list">
        {sorted.map((session) => (
          <SidebarSessionRow key={session.id} session={session} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid var(--oav-border)',
          background: 'var(--oav-page-bg)',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: '13px',
            color: '#005EB8',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: FONT,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#004A93'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#005EB8'; }}
        >
          <Download size={12} color="#005EB8" />
          Download full calendar (PDF)
        </a>
      </div>
    </div>
  );
};
