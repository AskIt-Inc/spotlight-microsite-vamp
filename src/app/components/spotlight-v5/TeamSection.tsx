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
              color: activeTab === 'endeavor' ? MAROON : '#6B7280',
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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAWcElEQVR4nO2diVKbyZKFSyAZMDvYeAHjrfvemaeaZ5unuhHT48Y2a7MasSMkJspzMiK7roQF2n6pvi+iQiDJvVjKk3thAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACGgdKg/wOgPT7/1zV/VdB1xrr/jwSAYQEBAMiY8qD/A6BvYPcgch8cfClGw9OX3BjTsJ9LDwzIK/DrIYSGxk8hoAIYDe4V0OMhhIpGWb/bSH9HBPIL/loI4VaP8fd7BGA0iMEcP8uJEMJUCGEyhPBMo9LksSIRgNHGqryGgv4qhHCpx/h7AwEoPq1KdSv1yy74n4cQpvU4pedsPJMw2M9WBTT1hjD0lBIBuAkhVEMIpyGEc/1eRwCK5fG9hx9rUbqnZX1ZAY0AgMf3eurK+idKDqdWBSAAxfTyFVfOT7mMPumy+ERS2k+4132mt5Lf3vfMiYplCLL/6OGbwLECuAghHOq79FxWAAEoGGMK0BjsMyGE+RDCYghhQT/HMavXnj8Q6FYZNKseyq7CgNHFmsJWAZzre2WJIP5+SwVQDCzrT8rDzyjoX4QQXmosayxKCEwEJlzg+ynAdKTP2783QgUwevjPvKbgv1Ppf63PvIIA9Nfje29vw4LXSv2Y4ecU6L8SAGv0WbYnoPOm5H6+12i4auBeIhAbgPELfIMA9J+yMv2Usv2sC3o/FpIxp8Cfc53+iRalPIt8oKS/gpr8/o8QwkEIYTeEsKWG4DUCMJjgn3Ul/orL8IsuyGcU6NYINNEw328lP0ArrtTxPwohbIcQvoUQvugxPneFAPRPjW2aLgb3koL+bQhhLYSwKiFYco0+a9iMN7EN5u1s1gAgJc36Mej/1PgqAbhEAHrj+c1zlZPm3qyyfMz2rxT4axKCl3ptzpX3qacj2KEV1situ0U/Mfh3QgjfFfRbEoMDWQBWAvbwwyi7Un9R2d2Cf9mV/yv6eUHvfy7RSEH44VdEvx8z1Znm/GPAb2hEEdhU5r9Qc5DNQD1iXCX8ssvyr53XX3KNvVnn9WPWZ40+PIW6gr+q4N9V4P8h37+jzF/VTMBPsADdYywJ/gUF/cfoICQEryQACwr6Sbcwx/w9wFMqzhuX+XeV8TcU/NH37yvz1/y6DwSgM89vi2psPt9W8c0p2N+HED5oWKNv0c3hU9ZDNz2/D/5vKvl3FPzHzRZ8IQCdYcH/LFm9F4P/TQhhXSKw5pp8s8r8AL30/JsSgkNl/qarPRGAzpdaVtS4W1Sgf1DQW8n/Up5/7oEGH0AvPP+h1gFEoWgKAvB0/B78BVfy/zOE8Lum9qzc94t3KPthYJ4/BQF4/Dy/nb4z5ab5ord/p+z/UULwSq8/SxbvAAzM8xtf/vv/XSgC0JnnX1Gpv67xQTbghUr+KBIs14XCeP4UBKB9fLffPP+qSv7fVAG8VvDPSCQIfiiU509BANrHjt6y4F9R1o/B/58Sg3l3IGcMfpbvQqE8f0q2AvBEzz/jgv+9xrrr+D93WR+/D4Xz/CnZCsATPb9vw4LXSv2Y4ecU6L8SAGv0WbYnoPOm5H6+12i4auBeIhAbgPELfIMA9J+yMv2Usv2sC3o/FpIxp8Cfc53+iRalPIt8oKS/gpr8/o8QwkEIYTeEsKWG4DUCMJjgn3Ul/orL8IsuyGcU6NYINNEw328lP0ArrtTxPwohbIcQvoUQvugxPneFAPRPjW2aLgb3koL+bQhhLYSwKiFYco0+a9iMN7EN5u1s1gAgJc36Mej/1PgqAbhEAHrj+c1zlZPm3qyyfMz2rxT4axKCl3ptzpX3qacj2KEV1situ0U/Mfh3QgjfFfRbEoMDWQBWAvbwwyi7Un9R2d2Cf9mV/yv6eUHvfy7RSEH44VdEvx8z1Znm/GPAb2hEEdhU5r9Qc5DNQD1iXCX8ssvyr53XX3KNvVnn9WPWZ40+PIW6gr+q4N9V4P8h37+jzF/VTMBPsADdY+wJ/gUF/cfoICQEryQACwr6Sbcwx/w9wFMqzhuX+XeV8TcU/NH37yvz1/y6DwSgM89vi2psPt9W8c0p2N+HED5oWKNv0c3hU9ZDNz2/D/5vKvl3FPzHzRZ8IQCdYcH/LFm9F4P/TQhhXSKw5pp8s8r8AL30/JsSgkNl/qarPRGAzpdaVtS4W1Sgf1DQW8n/Up5/7oEGH0AvPP+h1gFEoWgKAvB0/B78BVfy/zOE8Lum9qzc94t3KPthYJ4/BQF4/Dy/nb4z5ab5ord/p+z/UULwSq8/SxbvAAzM8xtf/vv/XSgC0JnnX1Gpv67xQTbghUr+KBIs14XCeP4UBKB9fLffPP+qSv7fVAG8VvDPSCQIfiiU509BANrHjt6y4F9R1o/B/58Sg3l3IGcMfpbvQqE8f0q2AvBEzz/jgv+9xrrr+D93WR+/D4Xz/CnZCsATPb9vw4LXSv2Y4ecU6L8SAGv0WbYnoPOm5H6+12i4auBeIhAbgPELfIMA9J+yMv2Usv2sC3o/FpIxp8Cfc53+iRalPIt8oKS/gpr8/o8QwkEIYTeEsKWG4DUCMJjgn3Ul/orL8IsuyGcU6NYINNEw328lP0ArrtTxPwohbIcQvoUQvugxPneFAPRPjW2aLgb3koL+bQhhLYSwKiFYco0+a9iMN7EN5u1s1gAgJc36Mej/1PgqAbhEAHrj+c1zlZPm3qyyfMz2rxT4axKCl3ptzpX3qacj2KEV1situ0U/Mfh3QgjfFfRbEoMDWQBWAvbwwyi7Un9R2d2Cf9mV/yv6eUHvfy7RSEH44VdEvx8z1Znm/GPAb2hEEdhU5r9Qc5DNQD1iXCX8ssvyr53XX3KNvVnn9WPWZ40+PIW6gr+q4N9V4P8h37+jzF/VTMBPsADdYywJ/gUF/cfoICQEryQACwr6Sbcwx/w9wFMqzhuX+XeV8TcU/NH37yvz1/y6DwSgM89vi2psPt9W8c0p2N+HED5oWKNv0c3hU9ZDNz2/D/5vKvl3FPzHzRZ8IQCdYcH/LFm9F4P/TQhhXSKw5pp8s8r8AL30/JsSgkNl/qarPRGAzpdaVtS4W1Sgf1DQW8n/Up5/7oEGH0AvPP+h1gFEoWgKAvB0/B78BVfy/zOE8Lum9qzc94t3KPthYJ4/BQF4/Dy/nb4z5ab5ord/p+z/UULwSq8/SxbvAAzM8xtf/vv/XSgC0JnnX1Gpv67xQTbghUr+KBIs14XCeP4UBKB9fLffPP+qSv7fVAG8VvDPSCQIfiiU509BANrHjt6y4F9R1o/B/58Sg3l3IGcMfpbvQqE8f0q2AvBEzz/jgv+9xrrr+D93WR+/D4Xz/CnZCsATPb9vgobPjvF0nfv0P3JBn9z2KtdI6nyaFQZozIkcJX7oGA4zpJ72Dw8gY8k8BnAXtn/Iz8WuZyAGuSNJpTyiSzO/Ppry0fPHIMWwEH3wBwDzhn9Gz83UiSaeD9TyqCZo+aGJSoOQlhfr8VJc+uNuhLx+BnOEnQjcuWyk/I2dXFLIqzTmxE2Ptpw4+//CSmxFAxX0YwAujnQLeq41/5l/wn3vvgRXZxcOPfUznNj2CsMIYqBVxgRk37uYOw49K5v/k0eHLkHXiSiXNykN+ifGojzJ2LeUaCQoAm/EHoIPgd+myXlY/cavmGIpfeltnr7UNukByOU/7uYHgAWb1nNkKt75AMd//jLvGUOVl1WrEuKf+FFn6cGx6jQuA2JGkOv+FcD919cQP4KdkIlFv/4x8z8V7+zgRZ4oEqVBj/P/+QcYJ+XyAOuqrEbATQy0ENNCCEsK+TGFXrf1MfvZc+PRZ9wGxIyg30w8AuBxYs+vGRHhbYwQqs/lhCE7C3f+8imGzJ8+8BgC7uhee/1zL0ES7TKV6i2V0fDqoy3Hh/yM4C9mQMwI0mJ2zIi1sd9YXDWF1ZTLkDp3Bj9hoeVnyBeLYr8okw7ItZrXjJNzvtl4ctfNnyP9JQy4zhDiWuYC2Agwdhrym4bok/6rP/wICKLYJErSYUmleF+dZDq9uf7LofziX9uAQSmGhZTOA/AtAKtiLZdSjYaSTZDEU4CwX1TIjsZnZ9Y/fOngbXl8uPwvu0mRDq2M93MAAAAASUVORK5CYII=" alt="" style={{ width:'18px', height:'18px', marginRight:'8px', borderRadius:'3px' }} />
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
