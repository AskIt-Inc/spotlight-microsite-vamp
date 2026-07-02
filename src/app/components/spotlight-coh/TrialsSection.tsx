import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Edit3, AlertCircle } from 'lucide-react';
import { trials, type Trial } from './data';
import { useFormProtection } from '../../hooks/useFormProtection';

const FONT = 'gotham, sans-serif';
const ENDPOINT = 'https://somebodytotalkto.com/api/spotlight/research-interest';
const MICROSITE_URL = 'https://vanderbilt.oneamyloidosisvoice.com';
const PARTNER_TID = 12351;

interface TrialCardProps {
  trial: Trial;
}

type FormState = 'idle' | 'open' | 'submitting' | 'submitted' | 'error';

function canExpressInterest(status: string) {
  const normalizedStatus = status.trim().toLowerCase();
  return normalizedStatus === 'recruiting' || normalizedStatus === 'still recruiting';
}

const TrialCard: React.FC<TrialCardProps> = ({ trial }) => {
  const showInterestCta = canExpressInterest(trial.status);
  const [formState, setFormState] = useState<FormState>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { honeypotProps, getProtectionPayload, isSuspicious, resetTimer } = useFormProtection();

  const inputStyle = (fieldName: string) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${focusedField === fieldName ? '#1C1C1C' : '#E5E5E5'}`,
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
              fontWeight: 700,
              color: 'var(--oav-text-primary)',
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
              background: '#F8F5EE',
              color: '#1C1C1C',
              border: '1px solid #E0D5C0',
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
        {showInterestCta && (
          <div style={{ flexShrink: 0 }}>
            <button
              onClick={() => {
                if (formState === 'open') {
                  setFormState('idle');
                  return;
                }
                resetTimer();
                setFormState('open');
              }}
              style={{
                padding: '8px 16px',
                background: formState === 'open' ? '#F8F5EE' : 'transparent',
                border: '1px solid #1C1C1C',
                color: '#1C1C1C',
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
                  (e.currentTarget as HTMLButtonElement).style.background = '#F8F5EE';
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
        )}
      </div>

      {/* Inline interest form — expands below card */}
      {formState === 'open' && (
        <div
          style={{
            background: '#F8F5EE',
            border: '1px solid #E0D5C0',
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

          <form onSubmit={async (e) => {
            e.preventDefault();
            setFormState('submitting');

            try {
              if (isSuspicious()) {
                setFormState('submitted');
                return;
              }

              const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  submitter_email: email,
                  submitter_name: name,
                  submitter_phone: phone || undefined,
                  indication: 'Amyloidosis',
                  interest_type: 'clinical_trial',
                  trial_name: trial.title,
                  microsite_url: MICROSITE_URL,
                  partner_tid: PARTNER_TID,
                  ...getProtectionPayload(),
                }),
              });

              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              setFormState('submitted');
            } catch {
              setFormState('error');
            }
          }}>
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

            <div style={{ position: 'absolute', left: '-9999px', overflow: 'hidden', opacity: 0, height: 0 }} aria-hidden="true">
              <input {...honeypotProps} />
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
              disabled={formState === 'submitting'}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: formState === 'submitting' ? '#4B5563' : '#1C1C1C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 300,
                cursor: formState === 'submitting' ? 'not-allowed' : 'pointer',
                fontFamily: FONT,
                marginTop: '4px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => { if (formState !== 'submitting') (e.currentTarget as HTMLButtonElement).style.background = '#000000'; }}
              onMouseLeave={(e) => { if (formState !== 'submitting') (e.currentTarget as HTMLButtonElement).style.background = '#1C1C1C'; }}
            >
              {formState === 'submitting' ? 'Submitting...' : 'Submit Interest'}
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
            background: '#F8F5EE',
            border: '1px solid #E0D5C0',
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

      {formState === 'error' && (
        <div
          style={{
            background: '#F8F5EE',
            border: '1px solid #E0D5C0',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            marginTop: '-8px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <AlertCircle size={20} color="#1C1C1C" style={{ flexShrink: 0 }} />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: '#000000',
              fontFamily: FONT,
            }}
          >
            Something went wrong. Please try again or email{' '}
            <a href="mailto:info@somebodytotalkto.com" style={{ color: '#1C1C1C', fontWeight: 600 }}>info@somebodytotalkto.com</a>.
          </span>
          <button
            onClick={() => setFormState('open')}
            style={{
              marginLeft: 'auto',
              fontSize: '12px',
              color: '#1C1C1C',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: FONT,
              flexShrink: 0,
            }}
          >
            Try again
          </button>
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
        padding: '16px 0 56px',
      }}
    >
      <div className="trials-section-inner">
        {/* Section heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' as const, gap: '8px' }}>
          <div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--oav-text-primary)',
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
                fontWeight: 600,
                color: '#1C1C1C',
                textDecoration: 'none',
                marginTop: '8px',
                fontFamily: FONT,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#1C1C1C'; }}
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
                background: '#FFF9E8',
                border: '1px dashed var(--oav-accent)',
                borderRadius: '6px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
              }}
            >
              <Edit3 size={18} color="var(--oav-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1C1C1C', fontFamily: FONT, marginBottom: '8px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
                  Content needed from VAMP
                </div>
                <p style={{ fontSize: '14px', color: '#1C1C1C', margin: '0 0 12px 0', fontFamily: FONT, lineHeight: 1.6 }}>
                  Please provide the list of open clinical trials currently recruiting through the Vanderbilt Amyloidosis Multidisciplinary Program. For each trial include:
                </p>
                <ul style={{ fontSize: '14px', color: '#1C1C1C', margin: '0 0 12px 0', paddingLeft: '18px', fontFamily: FONT, lineHeight: 1.7 }}>
                  <li>ClinicalTrials.gov identifier (NCT number)</li>
                  <li>Trial name / short title</li>
                  <li>Current status (e.g. Recruiting, Active Not Recruiting)</li>
                  <li>Brief description (2–3 sentences)</li>
                  <li>Phase (Phase 2, Phase 3, etc.)</li>
                </ul>
                <p style={{ fontSize: '13px', color: '#1C1C1C', margin: 0, fontFamily: FONT }}>
                  For a full list of active trials, visit{' '}
                  <a href="https://clinicaltrials.gov" target="_blank" rel="noopener noreferrer" style={{ color: '#1C1C1C', fontWeight: 700 }}>
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
