import React, { useState } from 'react';
import { ExternalLink, FlaskConical, CheckCircle, AlertCircle } from 'lucide-react';
import { trialsV4, type TrialV4 } from './data';

const FONT = 'gotham, sans-serif';
const MAROON = '#8B1F2D';

const statusColor: Record<string, { bg: string; border: string; text: string }> = {
  Completed: { bg: '#F0F9FF', border: '#BAE6FD', text: '#0369A1' },
  Recruiting: { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' },
  Pending: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
};

function getStatusStyle(status: string) {
  if (status.startsWith('Coming')) return statusColor.Recruiting;
  return statusColor[status] ?? statusColor.Pending;
}

type FormState = 'idle' | 'open' | 'submitted';

// ─── Trial Row with Express Interest ────────────────────────────────────────
const TrialRow: React.FC<{ t: TrialV4 }> = ({ t }) => {
  const sc = getStatusStyle(t.status);
  const canExpress = t.status === 'Recruiting' || t.status.startsWith('Coming');
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${focusedField === fieldName ? MAROON : '#E5E5E5'}`,
    borderRadius: '4px',
    fontSize: '14px',
    color: '#000000',
    background: '#ffffff',
    marginTop: '4px',
    outline: 'none',
    boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(139,31,45,0.12)' : 'none',
    fontFamily: FONT,
    boxSizing: 'border-box' as const,
    display: 'block',
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--oav-border)' }}>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: '14px', fontWeight: 400, color: '#000', fontFamily: FONT }}>{t.name}</span>
          {t.note && <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: FONT, marginLeft: '8px' }}>({t.note})</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`, borderRadius: '9999px', padding: '2px 10px', fontSize: '11px', fontWeight: 500, fontFamily: FONT, whiteSpace: 'nowrap' as const }}>{t.status}</span>
          {canExpress && formState === 'idle' && (
            <button
              onClick={() => setFormState('open')}
              style={{
                padding: '5px 12px',
                background: 'transparent',
                border: `1px solid ${MAROON}`,
                color: MAROON,
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 400,
                whiteSpace: 'nowrap' as const,
                cursor: 'pointer',
                fontFamily: FONT,
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#FBF0F1'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
            >
              Express Interest
            </button>
          )}
        </div>
      </div>

      {/* Inline interest form */}
      {formState === 'open' && (
        <div style={{ background: '#FBF0F1', border: '1px solid #F0D0D3', borderTop: 'none', padding: '20px 24px' }}>
          <div style={{ fontSize: '16px', fontWeight: 400, color: '#000000', fontFamily: FONT }}>
            Express your interest in this trial
          </div>
          <p style={{ fontSize: '14px', color: '#000000', marginBottom: '16px', marginTop: '4px', fontFamily: FONT, lineHeight: 1.5 }}>
            A member of the research team will be in touch.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); setFormState('submitted'); }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: 300, color: '#000000', fontFamily: FONT, display: 'block' }}>
                Full name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} placeholder="Your full name" style={inputStyle('name')} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: 300, color: '#000000', fontFamily: FONT, display: 'block' }}>
                Email address <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} placeholder="you@example.com" style={inputStyle('email')} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '14px', fontWeight: 300, color: '#000000', fontFamily: FONT, display: 'block' }}>
                Phone number (optional)
              </label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} placeholder="+1 (555) 000-0000" style={inputStyle('phone')} />
            </div>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 12px 0', fontFamily: FONT }}>
              Your details will only be shared with the University of Chicago research team.
            </p>
            <button
              type="submit"
              style={{ width: '100%', padding: '10px 16px', background: MAROON, color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 400, cursor: 'pointer', fontFamily: FONT, transition: 'background 0.15s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#6E1A24'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = MAROON; }}
            >
              Submit Interest
            </button>
            <div style={{ textAlign: 'center' as const, marginTop: '8px' }}>
              <button type="button" onClick={() => setFormState('idle')} style={{ fontSize: '12px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Submitted state */}
      {formState === 'submitted' && (
        <div style={{ background: '#FBF0F1', border: '1px solid #F0D0D3', borderTop: 'none', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CheckCircle size={20} color="#7CC242" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '14px', fontWeight: 300, color: '#000000', fontFamily: FONT }}>
            Thank you. The research team will be in touch soon.
          </span>
        </div>
      )}
    </div>
  );
};

// ─── Trial Group ────────────────────────────────────────────────────────────
const TrialGroup: React.FC<{ title: string; subtitle?: string; trials: TrialV4[] }> = ({ title, subtitle, trials }) => {
  if (trials.length === 0) return null;
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ fontSize: '15px', fontWeight: 700, color: MAROON, fontFamily: FONT, marginBottom: '4px' }}>{title}</div>
      {subtitle && <div style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: FONT, marginBottom: '8px' }}>{subtitle}</div>}
      <div style={{ background: 'var(--oav-card-bg)', border: '1px solid var(--oav-border)', borderRadius: '8px', overflow: 'hidden' }}>
        {trials.map(t => <TrialRow key={t.id} t={t} />)}
      </div>
    </div>
  );
};

// ─── Trials Section v4 ──────────────────────────────────────────────────────
export const TrialsSection: React.FC = () => {
  const past = trialsV4.filter(t => t.category === 'past-uchicago');
  const enrollUC = trialsV4.filter(t => t.category === 'enrolling-uchicago');
  const upcomingUC = trialsV4.filter(t => t.category === 'upcoming-uchicago');
  const enrollEnd = trialsV4.filter(t => t.category === 'enrolling-endeavor');
  const alPlaceholder = trialsV4.filter(t => t.category === 'al-placeholder');

  return (
    <section style={{ background: 'var(--oav-page-bg)', padding: '56px 0' }}>
      <div className="trials-section-inner">

        {/* Section heading */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 300, color: '#000', margin: 0, fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FlaskConical size={24} color={MAROON} />
            Clinical Trials
          </h2>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '8px', marginBottom: 0, fontFamily: FONT }}>
            TTR perspective — past, current, and upcoming trials across both sites
          </p>
          <a
            href="https://clinicaltrials.gov"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#005EB8', textDecoration: 'none', marginTop: '8px', fontFamily: FONT }}
          >
            <ExternalLink size={13} /> View all on ClinicalTrials.gov
          </a>
        </div>

        <TrialGroup title="Past Trials at UChicago (TTR)" subtitle="Trials we've been part of" trials={past} />
        <TrialGroup title="Currently Enrolling at UChicago" trials={enrollUC} />
        <TrialGroup title="Upcoming Trials at UChicago" trials={upcomingUC} />
        <TrialGroup title="Currently Enrolling at Endeavor Health" trials={enrollEnd} />

        {/* AL placeholder */}
        {alPlaceholder.length > 0 && (
          <div style={{ border: '1px dashed #FDE68A', borderRadius: '8px', padding: '16px 20px', background: '#FFFBEB', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '28px' }}>
            <AlertCircle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400E', fontFamily: FONT, marginBottom: '4px' }}>AL Amyloidosis Trials — Pending</div>
              <p style={{ fontSize: '13px', color: '#92400E', margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
                Awaiting input from Dr. Derman and Dr. Cooperrider on AL trials to feature.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
