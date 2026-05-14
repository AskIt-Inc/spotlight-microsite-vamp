import React, { useState } from 'react';
import { Calendar, X, Users, MapPin } from 'lucide-react';
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

// ─── Placeholder Card (for Endeavor members without bios yet) ───────────────
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

// ─── Staff Cards ────────────────────────────────────────────────────────────
const StaffList: React.FC<{ site: 'main' | 'endeavor' }> = ({ site }) => {
  const staff = supportStaff.filter(s => s.site === site);
  if (staff.length === 0) return null;
  return (
    <div style={{ marginTop:'20px' }}>
      <div style={{ fontSize:'13px', fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'0.08em', color:MAROON, fontFamily:FONT, marginBottom:'12px', display:'flex', alignItems:'center', gap:'8px' }}>
        <Users size={15} color={MAROON} />
        Support Staff
      </div>
      <div style={{ display:'flex', flexDirection:'column' as const, gap:'10px' }}>
        {staff.map(s => (
          <div key={s.id} style={{ background:'var(--oav-card-bg)', border:'1px solid var(--oav-border)', borderRadius:'8px', padding:'14px 20px', display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:MAROON, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <span style={{ fontSize:'15px', fontWeight:600, color:'#fff', fontFamily:FONT }}>{s.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}</span>
            </div>
            <div>
              <div style={{ fontSize:'15px', fontWeight:700, color:'#000', fontFamily:FONT }}>{s.name}</div>
              <div style={{ fontSize:'13px', color:'#374151', fontFamily:FONT, marginTop:'2px' }}>{s.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Team Section v4 ────────────────────────────────────────────────────────
export const TeamSection: React.FC = () => (
  <section style={{ background:'var(--oav-page-bg)', padding:'48px 0' }}>
    <div className="team-section-inner">

      {/* ── Main Site ── */}
      <div style={{ marginBottom:'48px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
          <MapPin size={16} color={MAROON} />
          <h2 style={{ fontSize:'28px', fontWeight:300, color:'#000', margin:0, fontFamily:FONT }}>
            Meet the Team — Main Site
          </h2>
        </div>
        <p style={{ fontSize:'14px', color:'#4B5563', margin:'0 0 20px 0', fontFamily:FONT }}>
          University of Chicago Medicine — the multidisciplinary team behind the Amyloidosis Program
        </p>
        <div style={{ display:'flex', flexDirection:'column' as const, gap:'12px' }}>
          {mainSiteProviders.map(c => <CompactCard key={c.id} c={c} />)}
        </div>
        <StaffList site="main" />
      </div>

      {/* ── Endeavor Site ── */}
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
          <MapPin size={16} color={MAROON} />
          <h2 style={{ fontSize:'28px', fontWeight:300, color:'#000', margin:0, fontFamily:FONT }}>
            Meet the Team — Endeavor Site
          </h2>
        </div>
        <p style={{ fontSize:'14px', color:'#4B5563', margin:'0 0 20px 0', fontFamily:FONT }}>
          Endeavor Health — Amyloidosis Program team members
        </p>
        <div style={{ display:'flex', flexDirection:'column' as const, gap:'10px' }}>
          {endeavorProviders.map(c => c.bio ? <CompactCard key={c.id} c={c} /> : <PlaceholderCard key={c.id} c={c} />)}
        </div>
        <StaffList site="endeavor" />

        <div style={{ marginTop:'16px', border:'1px dashed #F0D0D3', borderRadius:'8px', padding:'16px 20px', background:'#FBF0F1', fontSize:'13px', color:'#374151', fontFamily:FONT, lineHeight:1.6 }}>
          <strong style={{ color:MAROON }}>Note:</strong> Some Endeavor Health provider photos and details are pending marketing committee approval.
        </div>
      </div>

    </div>
  </section>
);
