export const SITE_NAME = "AstroKalki";
export const DEFAULT_SITE_URL = "https://astrokalki.example.com";

export function getSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

  try {
    const url = new URL(candidate);
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function absoluteUrl(path: string): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function truncateDescription(value: string | null | undefined, maxLength = 155): string {
  const normalized = (value ?? "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return "";
  if (normalized.length <= maxLength) return normalized;

  const slice = normalized.slice(0, maxLength - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const trimmed = slice.slice(0, lastSpace > 80 ? lastSpace : slice.length).trimEnd();
  return `${trimmed}…`;
}
