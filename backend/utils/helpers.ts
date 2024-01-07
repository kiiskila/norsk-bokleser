/**
 * Normalizes a string for consistent formatting.
 * This function is typically used to create clean, URL-friendly strings from titles or names.
 *
 * @param {string} unformatted - The original string to be normalized.
 * @returns {string} The normalized string.
 *
 * @example
 * // returns "hello-world"
 * normalizeString("Hello World!");
 *
 * @example
 * // returns "123-test-string"
 * normalizeString("123 Test String!!!");
 */
export function normalizeString(unformatted: string): string {
  // Replace any sequence of non-alphanumeric characters with a single dash and convert to lower case.
  const formatted = unformatted.replace(/[^a-z0-9+]+/gi, "-").toLowerCase();
  return formatted;
}
