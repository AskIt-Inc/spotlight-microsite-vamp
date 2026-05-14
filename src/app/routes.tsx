import { createHashRouter } from 'react-router';
import { Layout } from './components/Layout';
import { SpotlightLayout } from './components/SpotlightLayout';
import { DashboardPage } from './pages/DashboardPage';
import { SpotlightPage } from './pages/SpotlightPage';
import { SpotlightPageV2 } from './pages/SpotlightPageV2';
import { SpotlightPageV3 } from './pages/SpotlightPageV3';
import { SpotlightPageV4 } from './pages/SpotlightPageV4';
import { SpotlightPageV5 } from './pages/SpotlightPageV5';
import { SpotlightPageCOH } from './pages/SpotlightPageCOH';

// Placeholder for routes not yet built
const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
    <div
      style={{
        background: 'var(--sttt-card-bg)',
        border: '1px solid var(--sttt-border)',
        borderRadius: '8px',
        padding: '48px',
        textAlign: 'center' as const,
      }}
    >
      <div style={{ fontSize: '22px', fontWeight: 700, color: '#000000', marginBottom: '8px' }}>
        {title}
      </div>
      <p style={{ fontSize: '14px', color: '#9ca3af' }}>This section is coming soon.</p>
    </div>
  </div>
);

export const router = createHashRouter([
  // ── Portal shell (tab nav) — index renders Dashboard ──
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'sessions', element: <PlaceholderPage title="Sessions" /> },
      { path: 'marketing', element: <PlaceholderPage title="Marketing" /> },
      { path: 'submissions', element: <PlaceholderPage title="Submissions" /> },
      { path: 'reporting', element: <PlaceholderPage title="Reporting" /> },
    ],
  },
  // ── Public microsite shell — v1 (original, untouched) ──
  {
    path: '/spotlight',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPage }],
  },
  // ── Public microsite shell — v2 (client feedback applied) ──
  {
    path: '/spotlight-v2',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageV2 }],
  },
  // ── Public microsite shell — v3 (Stacey: COMING SOON hero + subscribe CTA) ──
  {
    path: '/spotlight-v3',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageV3 }],
  },
  // ── Public microsite shell — v4 (June 2026: Director profile, dual-site teams) ──
  {
    path: '/spotlight-v4',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageV4 }],
  },
  // ── Public microsite shell — v5 (Tabbed team view: equal UChicago / Endeavor) ──
  {
    path: '/spotlight-v5',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageV5 }],
  },
  // ── City of Hope microsite — versioned clean URL ──
  {
    path: '/spotlight/coh/v1',
    Component: SpotlightLayout,
    children: [{ index: true, Component: SpotlightPageCOH }],
  },
]);
