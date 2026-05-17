export type Affinity = 'road' | 'mtb' | 'gravel' | null;
export type VisitorType = 'new' | 'returning';
export type ABVariant = 'A' | 'B';

export interface UserSegment {
  visitorType: VisitorType;
  affinity: Affinity;
  abVariant: ABVariant;
}

const MAX_AGE = 604800; // 7 días
const COOKIE_OPTS = `path=/; max-age=${MAX_AGE}`;

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; ${COOKIE_OPTS}`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0`;
}

export function getSegmentFromCookies(): UserSegment {
  const visitorType: VisitorType =
    readCookie('dv_visitor') === 'returning' ? 'returning' : 'new';

  const affinityRaw = readCookie('dv_affinity');
  const affinity: Affinity =
    affinityRaw === 'road' || affinityRaw === 'mtb' || affinityRaw === 'gravel'
      ? affinityRaw
      : null;

  let abRaw = readCookie('dv_ab');
  if (abRaw !== 'A' && abRaw !== 'B') {
    abRaw = Math.random() > 0.5 ? 'A' : 'B';
    writeCookie('dv_ab', abRaw);
  }

  return { visitorType, affinity, abVariant: abRaw as ABVariant };
}

export function setAffinity(affinity: Affinity): void {
  if (affinity) {
    writeCookie('dv_affinity', affinity);
  } else {
    deleteCookie('dv_affinity');
  }
}

export function markAsReturning(): void {
  writeCookie('dv_visitor', 'returning');
}

export function resetSegment(): void {
  deleteCookie('dv_visitor');
  deleteCookie('dv_affinity');
  deleteCookie('dv_ab');
}

export function setSegment(partial: Partial<UserSegment>): void {
  if (partial.visitorType !== undefined) {
    writeCookie('dv_visitor', partial.visitorType);
  }
  if (partial.affinity !== undefined) {
    setAffinity(partial.affinity);
  }
  if (partial.abVariant !== undefined) {
    writeCookie('dv_ab', partial.abVariant);
  }
}
