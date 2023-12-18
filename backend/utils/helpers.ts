export function normalizeString(unformatted: string): string {
  let formatted = unformatted.replace(/[^a-z0-9+]+/gi, "-").toLowerCase();
  return formatted;
}
