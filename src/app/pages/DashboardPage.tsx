import React from 'react';
import { useNavigate } from 'react-router';
import { Zap, Calendar, BarChart2, FileText, Megaphone } from 'lucide-react';

const FONT = 'gotham, sans-serif';

const tiles = [
  {
    icon: Zap,
    title: 'Spotlight Series',
    description: 'View the City of Hope Amyloidosis Program microsite for July 2026.',
    cta: 'View Microsite',
    path: '/spotlight/coh/v1',
    accent: '#006E8E',
    bg: '#E7F5F8',
  },
  {
    icon: Calendar,
    title: 'Sessions',
    description: 'Manage and track upcoming and past STTT sessions.',
    cta: 'Go to Sessions',
    path: '/sessions',
    accent: '#6d28d9',
    bg: '#ede9fe',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Access co-branded marketing assets and copy blocks.',
    cta: 'Go to Marketing',
    path: '/marketing',
    accent: '#005EB8',
    bg: '#e0f2fe',
  },
  {
    icon: FileText,
    title: 'Submissions',
    description: 'Review content submissions and workflow approvals.',
    cta: 'Go to Submissions',
    path: '/submissions',
    accent: '#9d174d',
    bg: '#fce7f3',
  },
  {
    icon: BarChart2,
    title: 'Reporting',
    description: 'Explore engagement and registration analytics.',
    cta: 'Go to Reporting',
    path: '/reporting',
    accent: '#065f46',
    bg: '#d1fae5',
  },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          fontSize: '40px',
          fontWeight: 700,
          color: '#000000',
          marginBottom: '8px',
          lineHeight: 1.2,
          fontFamily: FONT,
        }}
      >
        Welcome back
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: '#000000',
          marginBottom: '48px',
          fontFamily: FONT,
          lineHeight: 1.7,
        }}
      >
        City of Hope · STTT Partner Portal
      </p>

      <div
        className="dashboard-tile-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
      >
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.title}
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
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: tile.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} color={tile.accent} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#000000',
                    marginBottom: '8px',
                    fontFamily: FONT,
                  }}
                >
                  {tile.title}
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#000000',
                    lineHeight: 1.5,
                    margin: 0,
                    fontFamily: FONT,
                  }}
                >
                  {tile.description}
                </p>
              </div>
              <button
                onClick={() => navigate(tile.path)}
                style={{
                  marginTop: 'auto',
                  padding: '8px 16px',
                  background: tile.accent,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 300,
                  cursor: 'pointer',
                  fontFamily: FONT,
                  alignSelf: 'flex-start',
                }}
              >
                {tile.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
