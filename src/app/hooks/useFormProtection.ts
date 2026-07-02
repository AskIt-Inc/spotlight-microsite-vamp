import { useRef, useState, type ChangeEvent } from 'react';

export function useFormProtection() {
  const [honeypot, setHoneypot] = useState('');
  const openedAt = useRef<number>(Date.now());

  const resetTimer = () => {
    openedAt.current = Date.now();
  };

  const isSuspicious = (): boolean => {
    if (honeypot.length > 0) return true;
    if (Date.now() - openedAt.current < 3000) return true;
    return false;
  };

  const getProtectionPayload = () => ({
    _hp: honeypot,
    _t: openedAt.current,
  });

  const honeypotProps = {
    type: 'text' as const,
    name: 'website',
    value: honeypot,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value),
    tabIndex: -1 as const,
    autoComplete: 'off' as const,
    'aria-hidden': true as const,
    style: {
      position: 'absolute' as const,
      left: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      opacity: 0,
    },
  };

  return { honeypotProps, getProtectionPayload, isSuspicious, resetTimer };
}
