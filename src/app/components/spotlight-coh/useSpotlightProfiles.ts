export interface NormalizedProfile {
  uid: number;
  lastNameKey: string;
  bio: string;
  photoUrl: string;
}

export function useSpotlightProfiles() {
  return { profileMap: new Map<number, NormalizedProfile>() };
}
