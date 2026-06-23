import { useEffect, useState } from 'react';
import { sessions as staticSessions } from './data';

const SESSIONS_API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/sessions?partner=12351&status=all';

interface ApiPresenter {
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
}

interface ApiSession {
  uuid: string;
  title: string;
  description: string;
  date: string;
  time: string;
  times_by_zone?: Record<string, string>;
  timestamp?: number;
  presenters?: ApiPresenter[];
  reg_link?: {
    url?: string;
    title?: string;
  };
  short_url?: string;
  moderation_state?: string;
  approval_status?: 'approved' | 'pending';
}

interface ApiSessionsResponse {
  data?: ApiSession[];
}

export interface NormalizedSession {
  id: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  description: string;
  presenter: string;
  presenterLastName: string;
  status: 'upcoming' | 'completed' | 'pending';
  regUrl: string;
  canRegister: boolean;
  hasPresenter: boolean;
  approvalStatus: 'approved' | 'pending';
  timestamp?: number;
}

export function buildRegUrlMap(sessions: NormalizedSession[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const session of sessions) {
    if (session.id && session.canRegister) {
      map.set(session.id, session.regUrl);
    }
  }

  return map;
}

function normalizeStaticSessions(): NormalizedSession[] {
  return staticSessions.map((session) => ({
    id: session.uuid ?? String(session.id),
    month: session.month,
    day: session.day,
    dayOfWeek: session.dayOfWeek,
    time: session.time,
    title: session.title,
    description: session.description,
    presenter: session.presenter,
    presenterLastName: '',
    status: session.status === 'cancelled' ? 'completed' : session.status,
    regUrl: session.regLink ?? '',
    canRegister: session.status !== 'pending' && Boolean(session.regLink),
    hasPresenter: Boolean(session.presenter.trim()),
    approvalStatus: session.status === 'pending' ? 'pending' : 'approved',
  }));
}

function parseApiDateParts(date: string, timestamp?: number) {
  const match = date.match(/^([A-Za-z]{3,})\s+(\d{1,2}),\s+(\d{4})$/);
  const month = match?.[1]?.slice(0, 3).toUpperCase() ?? '';
  const day = match?.[2] ?? '';
  const year = match?.[3] ?? '';

  let dayOfWeek = '';
  if (month && day && year) {
    const parsedDate = new Date(`${month} ${day}, ${year} 00:00:00`);
    if (!Number.isNaN(parsedDate.getTime())) {
      dayOfWeek = parsedDate.toLocaleDateString('en-US', { weekday: 'short' });
    }
  }

  return {
    month,
    day,
    dayOfWeek,
    status: timestamp && timestamp < Date.now() / 1000 ? 'completed' as const : 'upcoming' as const,
  };
}

function presenterName(presenter?: ApiPresenter): string {
  if (!presenter) return '';

  return [presenter.first_name, presenter.last_name, presenter.name_suffix]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ') || presenter.display_name;
}

function normalizeApiSessions(apiSessions: ApiSession[]): NormalizedSession[] {
  return apiSessions.map((session) => {
    const firstPresenter = session.presenters?.[0];
    const dateParts = parseApiDateParts(session.date ?? '', session.timestamp);
    const approvalStatus = session.approval_status === 'pending' ? 'pending' : 'approved';
    const regUrl = session.reg_link?.url || session.short_url || '';

    return {
      id: session.uuid,
      month: dateParts.month,
      day: dateParts.day,
      dayOfWeek: dateParts.dayOfWeek,
      time: session.times_by_zone?.CT ? `${session.times_by_zone.CT} CT` : session.time,
      title: session.title,
      description: session.description,
      presenter: presenterName(firstPresenter),
      presenterLastName: firstPresenter?.last_name ?? '',
      status: dateParts.status,
      regUrl,
      canRegister: approvalStatus === 'approved' && Boolean(regUrl),
      hasPresenter: Boolean(firstPresenter),
      approvalStatus,
      timestamp: session.timestamp,
    };
  });
}

export function useSpotlightSessions() {
  const [sessions, setSessions] = useState<NormalizedSession[]>(normalizeStaticSessions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSessions() {
      try {
        const response = await fetch(SESSIONS_API_URL);

        if (!response.ok) {
          throw new Error(`Sessions API returned ${response.status}`);
        }

        const payload = (await response.json()) as ApiSessionsResponse;
        const apiSessions = normalizeApiSessions(payload.data ?? []);

        if (!cancelled) {
          setSessions(apiSessions.length > 0 ? apiSessions : normalizeStaticSessions());
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Sessions API request failed');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSessions();

    return () => {
      cancelled = true;
    };
  }, []);

  return { sessions, loading, error };
}
