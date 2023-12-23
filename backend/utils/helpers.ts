export function normalizeString(unformatted: string): string {
  const formatted = unformatted.replace(/[^a-z0-9+]+/gi, "-").toLowerCase();
  return formatted;
}
