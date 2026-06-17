import { useEffect, useMemo, useState } from 'react';

const PROFILES_API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4&partner=12351';

interface ApiProfile {
  uid: number;
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
  specialty_line_1: string;
  specialty_line_2: string;
  spotlight_card_tag: string;
  title: string;
  bio: string;
  photo_url: string;
  employer: string;
  indication: string;
}

interface ApiProfileResponse {
  data?: ApiProfile[];
}

export interface NormalizedProfile {
  uid: number;
  lastNameKey: string;
  displayName: string;
  firstName: string;
  lastName: string;
  nameSuffix: string;
  specialtyLine1: string;
  specialtyLine2: string;
  spotlightCardTag: string;
  titlePrefix: string;
  bio: string;
  photoUrl: string;
  employer: string;
  indication: string;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeLastName(lastName: string, suffix: string): string {
  let normalized = lastName.trim();

  for (const part of suffix.split(',')) {
    const token = part.trim();
    if (!token) continue;
    normalized = normalized.replace(new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), '');
  }

  return normalized.replace(/[, ]+$/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeProfile(profile: ApiProfile): NormalizedProfile {
  const lastName = normalizeLastName(profile.last_name ?? '', profile.name_suffix ?? '');

  return {
    uid: profile.uid,
    lastNameKey: lastName.toLowerCase(),
    displayName: profile.display_name ?? '',
    firstName: profile.first_name ?? '',
    lastName,
    nameSuffix: profile.name_suffix ?? '',
    specialtyLine1: profile.specialty_line_1 ?? '',
    specialtyLine2: profile.specialty_line_2 ?? '',
    spotlightCardTag: profile.spotlight_card_tag ?? '',
    titlePrefix: profile.title ?? '',
    bio: stripHtml(profile.bio ?? ''),
    photoUrl: profile.photo_url ?? '',
    employer: profile.employer ?? '',
    indication: profile.indication ?? '',
  };
}

export function useSpotlightProfiles() {
  const [profiles, setProfiles] = useState<NormalizedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfiles() {
      try {
        const response = await fetch(PROFILES_API_URL);

        if (!response.ok) {
          throw new Error(`Profiles API returned ${response.status}`);
        }

        const payload = (await response.json()) as ApiProfileResponse;
        const normalizedProfiles = (payload.data ?? []).map(normalizeProfile);

        if (!cancelled) {
          setProfiles(normalizedProfiles);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Profiles API request failed');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfiles();

    return () => {
      cancelled = true;
    };
  }, []);

  const profileMap = useMemo(
    () => new Map(profiles.map((profile) => [profile.uid, profile])),
    [profiles],
  );

  return { profiles, profileMap, loading, error };
}
