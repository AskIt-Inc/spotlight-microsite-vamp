import { sessions as staticSessions } from './data';

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
  status: 'upcoming' | 'completed';
  regUrl: string;
}

export function buildRegUrlMap(sessions: NormalizedSession[]): Map<string, string> {
  const map = new Map<string, string>();

  for (const session of sessions) {
    if (session.id && session.regUrl) {
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
  }));
}

export function useSpotlightSessions() {
  return {
    sessions: normalizeStaticSessions(),
    loading: false,
    error: null,
  };
}
