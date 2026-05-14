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
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:'4px', color:'#9CA3AF' }} aria-label="Close"><X size={20}/></button>
        </div>
        <div style={{ padding:'24px' }}>
          {c.bio && <p style={{ fontSize:'15px', fontWeight:300, color:'#000', lineHeight:1.7, margin:'0 0 16px 0', fontFamily:FONT, whiteSpace:'pre-line' as const }}>{c.bio}</p>}
          {c.education && (
            <div style={{ marginBottom:'16px' }}>
              <div style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.1em', color:'#6B7280', fontFamily:FONT, marginBottom:'6px' }}>Education & Training</div>
              <ul style={{ margin:0, paddingLeft:'18px', listStyle:'disc' }}>
                {c.education.split(', ').map((item, i) => (
                  <li key={i} style={{ fontSize:'13px', color:'#374151', fontFamily:FONT, lineHeight:1.8 }}>{item}</li>
                ))}
              </ul>
            </div>
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
      <span style={{ fontSize:'16px', fontWeight:600, color:'#9CA3AF', fontFamily:FONT }}>{getInitials(c.name)}</span>
    </div>
    <div style={{ flex:1 }}>
      <div style={{ fontSize:'15px', fontWeight:700, color:'#000', fontFamily:FONT }}>{c.name}</div>
      <div style={{ fontSize:'13px', color:'#6B7280', fontFamily:FONT, marginTop:'2px' }}>{c.title} · {c.specialty}</div>
    </div>
    <span style={{ fontSize:'11px', color:'#9CA3AF', fontFamily:FONT, fontStyle:'italic' }}>Bio pending</span>
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
              color: activeTab === 'uchicago' ? MAROON : '#6B7280',
              background:'none',
              border:'none',
              borderBottom: activeTab === 'uchicago' ? `3px solid ${MAROON}` : '3px solid transparent',
              cursor:'pointer',
              marginBottom:'-2px',
              transition:'all 0.2s ease',
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAAEMklEQVQ4EW1UW28bRRg9u+v1+h7biZ2kJLQJobkSSrgEtRE3laICQpXoAwIJKvEAVaVU6kt54qFP3KS+QFX4B5SniraoQkGkJEJtU1FuJQSSxsGOkzhxfI29l9nlm0nthJax1rszO9+Z853vfCvhzvgEHU85wAEJ0i4Go43BitFzSILsARyZb6O5xWCXHdh5GcqKKnuStJyQ3e7xE9Xpcb7Hxf/4cCC9o4K9rsNAvHcAoc42hDt3ItrTicwv09DzRTQ91I1yahnFVFrcF6d+gkYQDM45ArhCJzp1QAbd3rVvH6SwF+0jw2h7ehjVbF4A9bz2CnyxKIrJJTiPMLhDQbCqjmsfnUXu1xnkV1btTVrbGPIFS9ehWBqYaaG8lIFtWHCYDaNUhrlRobkJi4CsqgFFdcHTGKYYAxCCbEJuewQUt0q5U/KKLIIklwzV7wWjID1XgM0sinJozkGrkF0uuAM+oM7vP9gci8BUBVo4hOjuDriDAcFQkiQomiokUDQN/pYYsYuivLyG6nqeULZ41TVU4Ebqx+uoQkcbtS98jOzOLyloOjd0PwLYZ8nP/QCVGjd1dQobExAQ89JN5ZnfGFjQtkEXoUuBriqL/rVfR+vgeaFSA3YdfxPDJo/BEw4gP9mJo9Ajan30SvnATCbAtX8KoA5IylEYEe0+O4tD5L9B9+CC8VFmX14PEtxOI7+lDqH0H/K1x7Ny/FyOnTuC50++L91z32qgD2nRStKsDHQefEawqq+uwqdpDx95EhLxoljYQH+pH86MDlMpmWPPQALpefh6MmTW8LWPLRFYLB6E1BMVLzm7/Z6dQSi2BkV34et8bhxAb7BHv+WG2aSLQGqNKB7hegma9KJKqCjGyf87BoQZzB/3wkJYczKpU4Yk0CPtwtMraOhYnbyDQ1gKJClIt5KhZCHJ7p5hmKWmWK0hNTBGrZcpKFqC+lobhwUJiEarPCy7F6q2/kJ9Piqo7dKDscifvYUi2ubo2Ow9LAVqfeFh4jpuXm5pVdNGCub/nsU5XOb0i2GV+/gPTX56H6vFeR0kosVVlP+zJXHpxtjCTwPKN3+DYNu4beQwuSsnXHENjXxd1jW8zbYnalA4pL6SRX15a0PwNP2zCUbfVHi6hWDmAqCIZ1gupqZvEIoPG3i7RKV7qWV4MbuCZr77B9LmvMXdhDBvUALYtfThauHm5hlO3DV9ogPG5bhgXZfoo8PRuX76C2Yvf0VcmDaNQAk+RGbooikM2KucLY+GO2Kc1MH6vM+STCyiaLyEyZkHuh1F9kBeAp52bW0D21iw2MlmsEWhxPkEfPnXMHQ4cOZqcWuWxtUFq3Ds+xqBfQvG4DXbMH4nsgKoKDVPj16gpWFp2qWcbws2n316dLN4d/b+AtU0foPN+CeZx6vF3aY0psnLG1Lxn3qv8vlDbc/f9X2fZ2nAu+iMDAAAAAElFTkSuQmCC" alt="" style={{ width:'18px', height:'18px', marginRight:'8px', verticalAlign:'middle', borderRadius:'3px' }} />
            UChicago Medicine
          </button>
          <button
            onClick={() => setActiveTab('endeavor')}
            style={{
              padding:'12px 24px',
              fontSize:'15px',
              fontWeight: activeTab === 'endeavor' ? 700 : 400,
              fontFamily: FONT,
              color: activeTab === 'endeavor' ? MAROON : '#6B7280',
              background:'none',
              border:'none',
              borderBottom: activeTab === 'endeavor' ? `3px solid ${MAROON}` : '3px solid transparent',
              cursor:'pointer',
              marginBottom:'-2px',
              transition:'all 0.2s ease',
            }}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAABwklEQVQ4Ee1Sy0ocQRS953ZXz4hJJIsgATURZyPZCIIb8x+BEHQEdekyEAgyhkA+QkJERdF/cCHJB2QTXJj4iIKKoCY6sR/VdVM90qPt9OBCl9am+t5z6tSp05foft02AdwkUBo5fWKk8JwpbiW4ksvXmgygINhvKtj1Wh4rL3xHhFck8pRInFwx24TjscThmhEuu3mk0qh0SBQssld4KbFl5PuqHYW1JHH0HYQ3m7Pej0bBijBt+mMEVTCB/zXvwrQH4oMYWAmd8+Xdz21HST9HEMaU/8yzcXYE/IzIpOcbdouHRHGxVR5FKdgg2FMOxwCeJIc7kLwnb9l2CplIv3/gkp/S6oL946JOAv8tu+pjAkqSW7PsjFjfZpd09OHXXMt0KpbsdcEzTUUBqkbrSRLtXSVlv5nseGwLn69uzLWtZ7ErglX8VR61+BAzaI21Xyde1oaEVZHF66SKTFEFmZBrDkvDwQuKMQ9H9SVPbZJcDYCdRhME30gVp6+LJZeieygcYJgZO5y9djgzt126qlFj+yf2bLBLUeh9+r2A4yx+Ubks8s+amkAURHDrkWa5ou27uMoItn5+eXiYBe+ru07gP+aZpKUZgW0NAAAAAElFTkSuQmCC" alt="" style={{ width:'18px', height:'18px', marginRight:'8px', verticalAlign:'middle', borderRadius:'3px' }} />
            Endeavor Health
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'uchicago' && (
          <div>
            <p style={{ fontSize:'14px', color:'#6B7280', margin:'0 0 20px 0', fontFamily:FONT }}>
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
            <p style={{ fontSize:'14px', color:'#6B7280', margin:'0 0 20px 0', fontFamily:FONT }}>
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
