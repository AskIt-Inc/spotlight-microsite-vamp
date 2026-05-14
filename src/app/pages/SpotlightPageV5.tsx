import React from 'react';
import { HeroSection }      from '../components/spotlight-v5/HeroSection';
import { OverviewSection }  from '../components/spotlight-v5/OverviewSection';
import { TeamSection }      from '../components/spotlight-v5/TeamSection';
import { TrialsSection }    from '../components/spotlight-v5/TrialsSection';
import { HighlightsSection } from '../components/spotlight-v2/HighlightsSection';
import { SessionsSidebar }  from '../components/spotlight/SessionsSidebar';

// ─── Spotlight Page — v5 (Tabbed team view: equal UChicago / Endeavor presentation) ───
// Changes from v4:
//   Team:    Tabbed interface (UChicago Medicine | Endeavor Health) instead of stacked sections
//            Dr. Sarswat appears in both tabs. Equal presentation, no hierarchy implied.

export const SpotlightPageV5: React.FC = () => {
  return (
    <div>
      <HeroSection />

      <div
        className="spotlight-content-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 64px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left — main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <OverviewSection />
          <TeamSection />
          <HighlightsSection />
          <TrialsSection />
        </div>

        {/* Right — sticky sessions sidebar */}
        <div
          className="spotlight-sidebar-wrapper"
          style={{
            width: '300px',
            flexShrink: 0,
            position: 'sticky' as const,
            top: '104px',
            alignSelf: 'flex-start',
          }}
        >
          <SessionsSidebar />
        </div>
      </div>
    </div>
  );
};
