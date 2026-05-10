import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { Sun, Moon, Monitor, HelpCircle, LogOut, Menu, User } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Sessions', path: '/sessions' },
  { label: 'Marketing', path: '/marketing' },
  { label: 'Submissions', path: '/submissions' },
  { label: 'Reporting', path: '/reporting' },
  { label: 'Spotlight', path: '/spotlight' },
];

export const Layout: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const navigate = useNavigate();

  const cycleTheme = () => {
    const html = document.documentElement;
    if (theme === 'light') {
      setTheme('dark');
      html.classList.add('dark');
    } else if (theme === 'dark') {
      setTheme('system');
      html.classList.remove('dark');
    } else {
      setTheme('light');
      html.classList.remove('dark');
    }
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--sttt-page-bg)' }}>
      {/* Tier 1 — Utility bar */}
      <div
        style={{
          background: 'var(--sttt-utility-bg)',
          borderBottom: '1px solid var(--sttt-utility-border)',
        }}
        className="py-1.5 px-4"
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <span style={{ fontSize: '13px', fontWeight: 300, color: 'var(--sttt-text-secondary)' }}>
            City of Hope
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={cycleTheme}
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ fontSize: '13px', color: 'var(--sttt-text-secondary)' }}
            >
              <ThemeIcon size={14} />
              <span className="capitalize">{theme}</span>
            </button>
            <button
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ fontSize: '13px', color: 'var(--sttt-text-secondary)' }}
            >
              <HelpCircle size={14} />
              Help
            </button>
            <button
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ fontSize: '13px', color: 'var(--sttt-text-secondary)' }}
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2 — Main header */}
      <header
        style={{
          background: 'var(--sttt-header-bg)',
          boxShadow: 'var(--sttt-card-shadow)',
        }}
        className="sticky top-0 z-50"
      >
        <div className="h-[72px] px-4 flex items-center justify-between max-w-[1440px] mx-auto">
          <div className="flex items-center gap-3">
            <div
              style={{
                background: 'var(--sttt-brand)',
                color: 'white',
                fontWeight: 800,
                fontSize: '17px',
                letterSpacing: '-0.5px',
              }}
              className="h-[48px] w-[56px] flex items-center justify-center rounded"
            >
              STTT
            </div>
            <span style={{ fontSize: '14px', fontWeight: 300, color: 'var(--sttt-text-primary)' }}>
              Partner Marketing Portal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 lg:hidden">
              <Menu size={24} style={{ color: 'var(--sttt-text-primary)' }} />
            </button>
            {/* Avatar */}
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#006E8E',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 300,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              UC
            </div>
          </div>
        </div>

        {/* Navigation tab bar */}
        <div
          style={{ borderTop: '1px solid var(--sttt-border)' }}
          className="min-h-[48px] px-4"
        >
          <div className="max-w-[1440px] mx-auto flex gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                style={({ isActive }) => ({
                  fontSize: '14px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--sttt-brand)' : 'var(--sttt-text-primary)',
                  borderBottom: isActive ? '3px solid var(--sttt-brand)' : '3px solid transparent',
                  marginBottom: '-1px',
                  padding: '12px 0',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap' as const,
                  display: 'block',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: 'var(--sttt-footer-bg)',
          borderTop: '1px solid var(--sttt-border)',
        }}
        className="py-6 px-4 mt-auto"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', '501(c)(3)'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{ fontSize: '13px', color: 'var(--sttt-text-secondary)' }}
                  className="hover:opacity-70"
                >
                  {link}
                </a>
              ))}
            </div>
            <span style={{ fontSize: '13px', color: 'var(--sttt-text-secondary)' }}>
              © 2025 STTT Partner Portal
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              color: 'var(--sttt-text-muted)',
              fontWeight: 300,
              textAlign: 'center' as const,
              margin: 0,
            }}
          >
            The information presented is for educational purposes only and does not constitute medical advice.
            STTT is a registered 501(c)(3) non-profit organization.
          </p>
        </div>
      </footer>
    </div>
  );
};
