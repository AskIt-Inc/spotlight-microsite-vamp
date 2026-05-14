import React, { useState } from 'react';
import { Calendar, X, Users } from 'lucide-react';
import {
  mainSiteProviders,
  endeavorProviders,
  supportStaff,
  type ClinicianV4,
} from './data';

const FONT = 'gotham, sans-serif';
const MAROON = '#8B1F2D';

function getInitials(name: string): string {
  const clean = name.replace(/^Dr\.?\s+/i, '').replace(/,.*$/, '');
  const words = clean.split(/\s+/).filter(Boolean);
  const suffixes = new Set(['iv','iii','ii','jr','sr','md','phd','ms','cgc']);
  const filtered = words.filter(w => !suffixes.has(w.toLowerCase().replace(/[.,]/g,'')));
  if (filtered.length >= 2) return (filtered[0][0] + filtered[filtered.length-1][0]).toUpperCase();
  return filtered[0]?.[0]?.toUpperCase() ?? '?';
}

// ─── Presenter Detail Modal ─────────────────────────────────────────────────
const PresenterModal: React.FC<{ c: ClinicianV4; onClose: () => void }> = ({ c, onClose }) => {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'24px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background:'#fff', borderRadius:'12px', maxWidth:'620px', width:'100%', maxHeight:'80vh', overflowY:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px', padding:'20px 24px', borderBottom:'1px solid #E8E8E8' }}>
          <div style={{ width:'72px', height:'72px', borderRadius:'50%', border:`3px solid ${MAROON}`, overflow:'hidden', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', background: (c.photo && !imgErr) ? '#F3F4F6' : MAROON }}>
            {c.photo && !imgErr ? (
              <img src={c.photo} alt={c.name} onError={() => setImgErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
            ) : (
              <span style={{ fontSize:'24px', fontWeight:600, color:'#fff', fontFamily:FONT }}>{getInitials(c.name)}</span>
            )}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:'17px', fontWeight:700, color:'#000', fontFamily:FONT }}>{c.name}</div>
            {c.credentials && <div style={{ fontSize:'13px', color:'#000', fontFamily:FONT, marginTop:'2px' }}>{c.credentials} · {c.title}</div>}
            <div style={{ fontSize:'13px', color:MAROON, fontFamily:FONT, marginTop:'2px' }}>{c.specialty}</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#4B5563' }} aria-label="Close"><X size={20}/></button>
        </div>
        <div style={{ padding:'24px' }}>
          {c.bio && <p style={{ fontSize:'15px', fontWeight:300, color:'#000', lineHeight:1.7, margin:'0 0 16px 0', fontFamily:FONT, whiteSpace:'pre-line' as const }}>{c.bio}</p>}
          {c.education && (
            <details style={{ marginBottom:'16px' }}>
              <summary style={{ fontSize:'13px', fontWeight:700, color:MAROON, fontFamily:FONT, cursor:'pointer', marginBottom:'6px' }}>
                Education & Training
              </summary>
              <div style={{ paddingLeft:'12px', marginTop:'8px', borderLeft:`2px solid ${MAROON}20` }}>
                {c.education.split(' | ').map((group, i) => {
                  const lines = group.split(', ');
                  return (
                    <div key={i} style={{ marginBottom:'8px' }}>
                      <div style={{ fontSize:'13px', fontWeight:600, color:'#1F2937', fontFamily:FONT, lineHeight:1.6 }}>{lines[0]}</div>
                      {lines.slice(1).map((sub, j) => (
                        <div key={j} style={{ fontSize:'12px', color:'#374151', fontFamily:FONT, lineHeight:1.6, paddingLeft:'12px' }}>— {sub}</div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </details>
          )}
          {c.hasSession && (
            <div style={{ background:'#FBF0F1', border:'1px solid #F0D0D3', borderRadius:'8px', padding:'16px', marginBottom:'16px' }}>
              <div style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', color:MAROON, fontFamily:FONT, marginBottom:'4px' }}>Session: {c.sessionDate}</div>
              <div style={{ fontSize:'15px', fontWeight:700, color:'#000', fontFamily:FONT, marginBottom:'6px' }}>{c.sessionTitle}</div>
              <p style={{ fontSize:'14px', color:'#000', lineHeight:1.6, margin:0, fontFamily:FONT }}>{c.sessionDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Compact Card ───────────────────────────────────────────────────────────
const CompactCard: React.FC<{ c: ClinicianV4 }> = ({ c }) => {
  const [imgErr, setImgErr] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{ background:'var(--oav-card-bg)', border:'1px solid var(--oav-border)', borderRadius:'8px', boxShadow:'var(--oav-card-shadow)', padding:'16px 20px', display:'flex', alignItems:'center', gap:'16px' }}>
        <div style={{ width:'60px', height:'60px', borderRadius:'50%', border:`2px solid ${MAROON}`, background: (c.photo && !imgErr) ? '#F3F4F6' : MAROON, flexShrink:0, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
          {c.photo && !imgErr ? (
            <img src={c.photo} alt={c.name} onError={() => setImgErr(true)} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center' }} />
          ) : (
            <span style={{ fontSize:'20px', fontWeight:600, color:'#fff', fontFamily:FONT }}>{getInitials(c.name)}</span>
          )}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'16px', fontWeight:700, color:'#000', fontFamily:FONT }}>{c.name}</div>
          <div style={{ fontSize:'14px', fontWeight:300, color:'#000', fontFamily:FONT, marginTop:'3px', whiteSpace:'nowrap' as const, overflow:'hidden', textOverflow:'ellipsis' }}>{c.specialty}</div>
          {c.hasSession && (
            <div style={{ fontSize:'12px', color:MAROON, fontFamily:FONT, marginTop:'4px', display:'flex', alignItems:'center', gap:'4px' }}>
              <Calendar size={11} color={MAROON} />
              <span>{c.sessionDate}</span>
            </div>
          )}
        </div>
        <div style={{ flexShrink:0, display:'flex', flexDirection:'column' as const, gap:'6px', alignItems:'flex-end' }}>
          <button onClick={() => setOpen(true)} style={{ fontSize:'12px', fontWeight:300, color:'#005EB8', background:'none', border:'none', padding:0, cursor:'pointer', fontFamily:FONT, textDecoration:'underline' }}>View more</button>
          {c.hasSession && (
            <button style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'5px 12px', background:MAROON, color:'#fff', border:'none', borderRadius:'4px', fontSize:'12px', fontWeight:300, cursor:'pointer', fontFamily:FONT }}>
              <Calendar size={11} color="#fff" /> Register
            </button>
          )}
        </div>
      </div>
      {open && <PresenterModal c={c} onClose={() => setOpen(false)} />}
    </>
  );
};

// ─── Placeholder Card ───────────────────────────────────────────────────────
const PlaceholderCard: React.FC<{ c: ClinicianV4 }> = ({ c }) => (
  <div style={{ background:'var(--oav-card-bg)', border:'1px dashed var(--oav-border)', borderRadius:'8px', padding:'14px 20px', display:'flex', alignItems:'center', gap:'16px', opacity:0.85 }}>
    <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'#F3F4F6', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'2px solid #E5E5E5' }}>
      <span style={{ fontSize:'16px', fontWeight:600, color:'#4B5563', fontFamily:FONT }}>{getInitials(c.name)}</span>
    </div>
    <div style={{ flex:1 }}>
      <div style={{ fontSize:'15px', fontWeight:700, color:'#000', fontFamily:FONT }}>{c.name}</div>
      <div style={{ fontSize:'13px', color:'#374151', fontFamily:FONT, marginTop:'2px' }}>{c.title} · {c.specialty}</div>
    </div>
    <span style={{ fontSize:'11px', color:'#4B5563', fontFamily:FONT, fontStyle:'italic' }}>Bio pending</span>
  </div>
);

// ─── Staff Chip ─────────────────────────────────────────────────────────────
const StaffList: React.FC<{ site: 'main' | 'endeavor' }> = ({ site }) => {
  const staff = supportStaff.filter(s => s.site === site);
  if (staff.length === 0) return null;
  return (
    <div style={{ marginTop:'16px', padding:'14px 18px', background:'var(--oav-card-bg)', border:'1px solid var(--oav-border)', borderRadius:'8px', display:'flex', alignItems:'flex-start', gap:'10px' }}>
      <Users size={16} color={MAROON} style={{ flexShrink:0, marginTop:'2px' }} />
      <div>
        <span style={{ fontSize:'13px', fontWeight:700, color:MAROON, fontFamily:FONT }}>Support Staff: </span>
        <span style={{ fontSize:'13px', color:'#000', fontFamily:FONT }}>
          {staff.map(s => `${s.name} — ${s.role}`).join(' · ')}
        </span>
      </div>
    </div>
  );
};

// ─── Team Section v5 — Tabbed Interface ─────────────────────────────────────
export const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uchicago' | 'endeavor'>('uchicago');

  return (
    <section style={{ background:'var(--oav-page-bg)', padding:'48px 0' }}>
      <div className="team-section-inner">

        {/* Section Header */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'24px' }}>
          <Users size={18} color={MAROON} />
          <h2 style={{ fontSize:'28px', fontWeight:300, color:'#000', margin:0, fontFamily:FONT }}>
            Meet the Team
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:0, marginBottom:'24px', borderBottom:'2px solid #E5E7EB' }}>
          <button
            onClick={() => setActiveTab('uchicago')}
            style={{
              padding:'12px 24px',
              fontSize:'15px',
              fontWeight: activeTab === 'uchicago' ? 700 : 400,
              fontFamily: FONT,
              color: activeTab === 'uchicago' ? MAROON : '#374151',
              background:'none',
              border:'none',
              borderBottom: activeTab === 'uchicago' ? `3px solid ${MAROON}` : '3px solid transparent',
              cursor:'pointer',
              marginBottom:'-2px',
              transition:'all 0.2s ease',
              display:'inline-flex',
              alignItems:'center',
            }}
          >
            <img src="data:image/png;base64,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" alt="" style={{ width:'18px', height:'18px', marginRight:'8px', borderRadius:'3px' }} />
            UChicago Medicine
          </button>
          <button
            onClick={() => setActiveTab('endeavor')}
            style={{
              padding:'12px 24px',
              fontSize:'15px',
              fontWeight: activeTab === 'endeavor' ? 700 : 400,
              fontFamily: FONT,
              color: activeTab === 'endeavor' ? MAROON : '#374151',
              background:'none',
              border:'none',
              borderBottom: activeTab === 'endeavor' ? `3px solid ${MAROON}` : '3px solid transparent',
              cursor:'pointer',
              marginBottom:'-2px',
              transition:'all 0.2s ease',
              display:'inline-flex',
              alignItems:'center',
            }}
          >
            <img src="data:image/png;base64,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" alt="" style={{ width:'18px', height:'18px', marginRight:'8px', borderRadius:'3px' }} />
            Endeavor Health
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'uchicago' && (
          <div>
            <p style={{ fontSize:'14px', color:'#374151', margin:'0 0 20px 0', fontFamily:FONT }}>
              University of Chicago Medicine — the multidisciplinary team behind the Amyloidosis Program
            </p>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'12px' }}>
              {mainSiteProviders.map(c => <CompactCard key={c.id} c={c} />)}
            </div>
            <StaffList site="main" />
          </div>
        )}

        {activeTab === 'endeavor' && (
          <div>
            <p style={{ fontSize:'14px', color:'#374151', margin:'0 0 20px 0', fontFamily:FONT }}>
              Endeavor Health — Amyloidosis Program team members
            </p>
            <div style={{ display:'flex', flexDirection:'column' as const, gap:'12px' }}>
              {endeavorProviders.map(c => c.bio ? <CompactCard key={c.id} c={c} /> : <PlaceholderCard key={c.id} c={c} />)}
            </div>
            <StaffList site="endeavor" />
          </div>
        )}

      </div>
    </section>
  );
};
