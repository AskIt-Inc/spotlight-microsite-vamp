import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Edit3 } from 'lucide-react';
import { trials, type Trial } from './data';

const FONT = 'gotham, sans-serif';

interface TrialCardProps {
  trial: Trial;
}

type FormState = 'idle' | 'open' | 'submitted';

const TrialCard: React.FC<TrialCardProps> = ({ trial }) => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${focusedField === fieldName ? '#006E8E' : '#E5E5E5'}`,
    borderRadius: '4px',
    fontSize: '14px',
    color: '#000000',
    background: '#ffffff',
    marginTop: '4px',
    outline: 'none',
    boxShadow: focusedField === fieldName ? '0 0 0 3px rgba(0,110,142,0.14)' : 'none',
    fontFamily: FONT,
    boxSizing: 'border-box' as const,
    display: 'block',
  });

  return (
    <div>
      {/* Trial card */}
      <div
        className="trial-card"
        style={{
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: formState !== 'idle' ? '8px 8px 0 0' : '8px',
          boxShadow: 'var(--oav-card-shadow)',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '24px',
        }}
      >
        {/* Left — trial info */}
        <div style={{ flex: 1 }}>
          {/* Trial ID */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#4B5563',
              marginBottom: '4px',
              letterSpacing: '0.05em',
            }}
          >
            {trial.id}
          </div>

          {/* Trial title */}
          <div
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: '#000000',
              marginBottom: '8px',
              fontFamily: FONT,
              lineHeight: 1.4,
            }}
          >
            {trial.title}
          </div>

          {/* Status badge */}
          <span
            style={{
              background: '#E7F5F8',
              color: '#006E8E',
              border: '1px solid #B9DEE6',
              borderRadius: '9999px',
              padding: '2px 10px',
              fontSize: '11px',
              fontWeight: 300,
              fontFamily: FONT,
              display: 'inline-block',
            }}
          >
            {trial.status}
          </span>

          {/* Brief description */}
          <p
            style={{
              fontSize: '14px',
              color: '#000000',
              lineHeight: 1.7,
              marginTop: '8px',
              marginBottom: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical' as const,
              overflow: 'hidden',
              fontFamily: FONT,
            }}
          >
            {trial.description}
          </p>

          {/* Phase */}
          <div
            style={{
              fontSize: '12px',
              color: '#4B5563',
              marginTop: '6px',
              fontFamily: FONT,
            }}
          >
            {trial.phase}
          </div>
        </div>

        {/* Right — Express Interest CTA */}
        <div style={{ flexShrink: 0 }}>
          <button
            onClick={() => setFormState(formState === 'open' ? 'idle' : 'open')}
            style={{
              padding: '8px 16px',
              background: formState === 'open' ? '#E7F5F8' : 'transparent',
              border: '1px solid #006E8E',
              color: '#006E8E',
              borderRadius: '4px',
              fontSize: '13px',
              fontWeight: 300,
              whiteSpace: 'nowrap' as const,
              cursor: 'pointer',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (formState !== 'open') {
                (e.currentTarget as HTMLButtonElement).style.background = '#E7F5F8';
              }
            }}
            onMouseLeave={(e) => {
              if (formState !== 'open') {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }
            }}
          >
            Express Interest
          </button>
        </div>
      </div>

      {/* Inline interest form — expands below card */}
      {formState === 'open' && (
        <div
          style={{
            background: '#E7F5F8',
            border: '1px solid #B9DEE6',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            marginTop: '-8px',
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
            }}
          >
            Express your interest in this trial
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#000000',
              marginBottom: '16px',
              marginTop: '4px',
              fontFamily: FONT,
              lineHeight: 1.5,
            }}
          >
            A member of the research team will be in touch.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setFormState('submitted'); }}>
            {/* Name field */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#000000',
                  fontFamily: FONT,
                  display: 'block',
                }}
              >
                Full name <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                placeholder="Your full name"
                style={inputStyle('name')}
              />
            </div>

            {/* Email field */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#000000',
                  fontFamily: FONT,
                  display: 'block',
                }}
              >
                Email address <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                style={inputStyle('email')}
              />
            </div>

            {/* Phone field */}
            <div style={{ marginBottom: '12px' }}>
              <label
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: '#000000',
                  fontFamily: FONT,
                  display: 'block',
                }}
              >
                Phone number (optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                placeholder="+1 (555) 000-0000"
                style={inputStyle('phone')}
              />
            </div>

            <p
              style={{
                fontSize: '12px',
                color: '#4B5563',
                margin: '0 0 12px 0',
                fontFamily: FONT,
              }}
            >
              Your details will only be shared with the Vanderbilt amyloidosis research team.
            </p>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px 16px',
                background: '#006E8E',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 300,
                cursor: 'pointer',
                fontFamily: FONT,
                marginTop: '4px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#004F66'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#006E8E'; }}
            >
              Submit Interest
            </button>

            <div style={{ textAlign: 'center' as const, marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => setFormState('idle')}
                style={{
                  fontSize: '12px',
                  color: '#4B5563',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Submitted state */}
      {formState === 'submitted' && (
        <div
          style={{
            background: '#E7F5F8',
            border: '1px solid #B9DEE6',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            marginTop: '-8px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <CheckCircle size={20} color="#7CC242" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
            }}
          >
            Thank you. The research team will be in touch soon.
          </span>
        </div>
      )}
    </div>
  );
};

export const TrialsSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-page-bg)',
        padding: '56px 0',
      }}
    >
      <div className="trials-section-inner">
        {/* Section heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' as const, gap: '8px' }}>
          <div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 300,
                color: '#000000',
                margin: 0,
                lineHeight: 1.3,
                fontFamily: FONT,
              }}
            >
              Clinical Trials
            </h2>
            <a
              href="https://clinicaltrials.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '14px',
                color: '#005EB8',
                textDecoration: 'none',
                marginTop: '8px',
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#004A93'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#005EB8'; }}
            >
              <ExternalLink size={13} />
              View all on ClinicalTrials.gov
            </a>
          </div>
        </div>

        {/* Trial card list — or content-needed callout if empty */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '16px',
            marginTop: '32px',
          }}
        >
          {trials.length > 0 ? (
            <>
              {trials.map((trial) => (
                <TrialCard key={trial.id} trial={trial} />
              ))}
            </>
          ) : (
            <div
              style={{
                background: '#FFFBEB',
                border: '1px dashed #D97706',
                borderRadius: '6px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
              }}
            >
              <Edit3 size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400E', fontFamily: FONT, marginBottom: '8px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                  Content needed from VAMP
                </div>
                <p style={{ fontSize: '14px', color: '#92400E', margin: '0 0 12px 0', fontFamily: FONT, lineHeight: 1.6 }}>
                  Please provide the list of open clinical trials currently recruiting through the Vanderbilt Amyloidosis Multidisciplinary Program. For each trial include:
                </p>
                <ul style={{ fontSize: '14px', color: '#92400E', margin: '0 0 12px 0', paddingLeft: '18px', fontFamily: FONT, lineHeight: 1.7 }}>
                  <li>ClinicalTrials.gov identifier (NCT number)</li>
                  <li>Trial name / short title</li>
                  <li>Current status (e.g. Recruiting, Active Not Recruiting)</li>
                  <li>Brief description (2–3 sentences)</li>
                  <li>Phase (Phase 2, Phase 3, etc.)</li>
                </ul>
                <p style={{ fontSize: '13px', color: '#B45309', margin: 0, fontFamily: FONT }}>
                  For a full list of active trials, visit{' '}
                  <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" style={{ color: '#92400E', fontWeight: 700 }}>
                    clinicaltrials.gov
                  </a>{' '}
                  and search "Vanderbilt" + "amyloidosis".
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
