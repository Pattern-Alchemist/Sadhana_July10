/**
 * Living Cosmology — approximate planetary longitudes.
 * Method: Paul Schlyter's simplified Keplerian elements (J2000 epoch).
 * Accuracy is contemplative / educational, NOT ephemeris-grade.
 * Sidereal (Vedic) values apply the Lahiri ayanamsa.
 */

const rev = (deg: number) => ((deg % 360) + 360) % 360;
const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/** Julian Day for a Date (UT). */
export function julianDay(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d =
    date.getUTCDate() +
    (date.getUTCHours() +
      date.getUTCMinutes() / 60 +
      date.getUTCSeconds() / 3600) /
      24;
  let Y = y;
  let M = m;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (Y + 4716)) +
    Math.floor(30.6001 * (M + 1)) +
    d +
    B -
    1524.5
  );
}

/** Days since 2000 Jan 0.0 UT (JD 2451543.5). */
function dayNumber(date: Date): number {
  return julianDay(date) - 2451543.5;
}

interface Elements {
  N: number;
  i: number;
  w: number;
  a: number;
  e: number;
  M: number;
}

function elements(planet: string, d: number): Elements {
  switch (planet) {
    case "Sun":
      return {
        N: 0,
        i: 0,
        w: 282.9404 + 4.70935e-5 * d,
        a: 1.0,
        e: 0.016709 - 1.151e-9 * d,
        M: 356.047 + 0.9856002585 * d,
      };
    case "Moon":
      return {
        N: 125.1228 - 0.0529538083 * d,
        i: 5.1454,
        w: 318.0634 + 0.1643573223 * d,
        a: 60.2666,
        e: 0.0549,
        M: 115.3654 + 13.0649929509 * d,
      };
    case "Mercury":
      return {
        N: 48.3313 + 3.24587e-5 * d,
        i: 7.0047 + 5.0e-8 * d,
        w: 29.1241 + 1.01444e-5 * d,
        a: 0.387098,
        e: 0.205635 + 5.59e-10 * d,
        M: 168.6562 + 4.0923344368 * d,
      };
    case "Venus":
      return {
        N: 76.6799 + 2.4659e-5 * d,
        i: 3.3946 + 2.75e-8 * d,
        w: 54.891 + 1.38374e-5 * d,
        a: 0.72333,
        e: 0.006773 - 1.302e-9 * d,
        M: 48.0052 + 1.6021302244 * d,
      };
    case "Mars":
      return {
        N: 49.5574 + 2.11081e-5 * d,
        i: 1.8497 - 1.78e-8 * d,
        w: 286.5016 + 2.92961e-5 * d,
        a: 1.523688,
        e: 0.093405 + 2.516e-9 * d,
        M: 18.6021 + 0.5240207766 * d,
      };
    case "Jupiter":
      return {
        N: 100.4542 + 2.76854e-5 * d,
        i: 1.303 - 1.557e-7 * d,
        w: 273.8777 + 1.64505e-5 * d,
        a: 5.20256,
        e: 0.048498 + 4.469e-9 * d,
        M: 19.895 + 0.0830853001 * d,
      };
    case "Saturn":
      return {
        N: 113.6634 + 2.3898e-5 * d,
        i: 2.4886 - 1.081e-7 * d,
        w: 339.3939 + 2.97661e-5 * d,
        a: 9.55475,
        e: 0.055546 - 9.499e-9 * d,
        M: 316.967 + 0.0334442282 * d,
      };
    default:
      throw new Error("unknown planet " + planet);
  }
}

function solveE(M: number, e: number): number {
  M = rev(M);
  let E = M + (e * DEG * Math.sin(M * RAD)) / (1 - e * Math.cos(M * RAD));
  for (let k = 0; k < 6; k++) {
    const dE =
      (E - e * DEG * Math.sin(E * RAD) - M) / (1 - e * Math.cos(E * RAD));
    E -= dE;
    if (Math.abs(dE) < 1e-6) break;
  }
  return E;
}

interface Rect {
  x: number;
  y: number;
  z: number;
}

function helioRect(el: Elements): Rect {
  const E = solveE(el.M, el.e);
  const xv = el.a * (Math.cos(E * RAD) - el.e);
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E * RAD);
  const v = Math.atan2(yv, xv) * DEG;
  const r = Math.sqrt(xv * xv + yv * yv);
  const vw = (v + el.w) * RAD;
  const N = el.N * RAD;
  const i = el.i * RAD;
  const x =
    r * (Math.cos(N) * Math.cos(vw) - Math.sin(N) * Math.sin(vw) * Math.cos(i));
  const y =
    r * (Math.sin(N) * Math.cos(vw) + Math.cos(N) * Math.sin(vw) * Math.cos(i));
  const z = r * Math.sin(vw) * Math.sin(i);
  return { x, y, z };
}

export interface PlanetPosition {
  name: string;
  symbol: string;
  sanskrit: string;
  longitude: number; // tropical 0..360
  sidereal: number; // Lahiri
  sign: ZodiacSign;
  retrograde: boolean;
}

export interface ZodiacSign {
  index: number;
  vedic: string;
  tropical: string;
  english: string;
  symbol: string;
  element: string;
}

const TROPICAL_SIGNS = [
  ["Aries", "Fire", "♈"],
  ["Taurus", "Earth", "♉"],
  ["Gemini", "Air", "♊"],
  ["Cancer", "Water", "♋"],
  ["Leo", "Fire", "♌"],
  ["Virgo", "Earth", "♍"],
  ["Libra", "Air", "♎"],
  ["Scorpio", "Water", "♏"],
  ["Sagittarius", "Fire", "♐"],
  ["Capricorn", "Earth", "♑"],
  ["Aquarius", "Air", "♒"],
  ["Pisces", "Water", "♓"],
];

const VEDIC_SIGNS = [
  ["Mesha", "Fire", "मेष"],
  ["Vrishabha", "Earth", "वृषभ"],
  ["Mithuna", "Air", "मिथुन"],
  ["Karka", "Water", "कर्क"],
  ["Simha", "Fire", "सिंह"],
  ["Kanya", "Earth", "कन्या"],
  ["Tula", "Air", "तुला"],
  ["Vrishchika", "Water", "वृश्चिक"],
  ["Dhanu", "Fire", "धनु"],
  ["Makara", "Earth", "मकर"],
  ["Kumbha", "Air", "कुम्भ"],
  ["Meena", "Water", "मीन"],
];

export function signFor(longitude: number): ZodiacSign {
  const idx = Math.floor(rev(longitude) / 30);
  const t = TROPICAL_SIGNS[idx];
  const v = VEDIC_SIGNS[idx];
  return {
    index: idx,
    vedic: v[0],
    tropical: t[0],
    english: t[0],
    symbol: t[2],
    element: t[1],
  };
}

/** Lahiri ayanamsa approximation (degrees). */
export function lahiriAyanamsa(date: Date): number {
  const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const years = (date.getTime() - j2000) / (365.25 * 86400000);
  return 23.85 + years * 0.013971;
}

const PLANETS: { name: string; symbol: string; sanskrit: string }[] = [
  { name: "Sun", symbol: "☉", sanskrit: "Sūrya" },
  { name: "Moon", symbol: "☾", sanskrit: "Chandra" },
  { name: "Mercury", symbol: "☿", sanskrit: "Budha" },
  { name: "Mars", symbol: "♂", sanskrit: "Mangala" },
  { name: "Jupiter", symbol: "♃", sanskrit: "Guru" },
  { name: "Venus", symbol: "♀", sanskrit: "Shukra" },
  { name: "Saturn", symbol: "♄", sanskrit: "Shani" },
];

/** Compute geocentric tropical longitude for a planet. */
function geocentricLongitude(planet: string, date: Date): number {
  const d = dayNumber(date);
  const el = elements(planet, d);
  const h = helioRect(el);

  if (planet === "Sun") {
    const E = solveE(el.M, el.e);
    const v =
      Math.atan2(
        Math.sqrt(1 - el.e * el.e) * Math.sin(E * RAD),
        Math.cos(E * RAD) - el.e
      ) * DEG;
    return rev(v + el.w);
  }
  if (planet === "Moon") {
    return rev(Math.atan2(h.y, h.x) * DEG);
  }

  // Sun's geocentric rectangular coords = Earth's helio negated
  const sunEl = elements("Sun", d);
  const E = solveE(sunEl.M, sunEl.e);
  const sunX = Math.cos(E * RAD) - sunEl.e;
  const sunY = Math.sqrt(1 - sunEl.e * sunEl.e) * Math.sin(E * RAD);
  const lonsun = rev(Math.atan2(sunY, sunX) * DEG + sunEl.w);
  const rsun = Math.sqrt(sunX * sunX + sunY * sunY);
  const xs = rsun * Math.cos(lonsun * RAD);
  const ys = rsun * Math.sin(lonsun * RAD);

  const xg = h.x + xs;
  const yg = h.y + ys;
  return rev(Math.atan2(yg, xg) * DEG);
}

export function computeCosmos(date: Date = new Date()): {
  ayanamsa: number;
  planets: PlanetPosition[];
  moonNode: PlanetPosition;
} {
  const ayanamsa = lahiriAyanamsa(date);
  const yesterday = new Date(date.getTime() - 86400000);

  const planets: PlanetPosition[] = PLANETS.map((p) => {
    const lon = geocentricLongitude(p.name, date);
    const prev = geocentricLongitude(p.name, yesterday);
    let drift = lon - prev;
    if (drift > 180) drift -= 360;
    if (drift < -180) drift += 360;
    return {
      name: p.name,
      symbol: p.symbol,
      sanskrit: p.sanskrit,
      longitude: lon,
      sidereal: rev(lon - ayanamsa),
      sign: signFor(lon - ayanamsa),
      retrograde: drift < 0,
    };
  });

  // Mean lunar node (Rahu) — Ketu is opposite.
  const d = dayNumber(date);
  const rahuLon = rev(125.0445 - 0.0529539 * d);
  const moonNode: PlanetPosition = {
    name: "Rahu",
    symbol: "☊",
    sanskrit: "Rāhu",
    longitude: rahuLon,
    sidereal: rev(rahuLon - ayanamsa),
    sign: signFor(rahuLon - ayanamsa),
    retrograde: true,
  };

  return { ayanamsa, planets, moonNode };
}

export function degMin(lon: number): string {
  const inSign = rev(lon) % 30;
  const deg = Math.floor(inSign);
  const min = Math.floor((inSign - deg) * 60);
  return `${deg.toString().padStart(2, "0")}° ${min
    .toString()
    .padStart(2, "0")}′`;
}
