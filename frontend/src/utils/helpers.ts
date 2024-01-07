/**
 * Checks if the provided string is empty.
 *
 * @param {string | null | undefined} value - The string to be checked. Can be a string, null, or undefined.
 * @returns {boolean} - Returns true if the string is null, undefined, or only contains whitespace; otherwise, false.
 *
 * This utility function is useful for validating string inputs where
 * you need to consider trimmed empty strings, null, or undefined as empty values.
 */
export function isStringEmpty(value: string | null | undefined): boolean {
  // Check if value is strictly equal to null or undefined, or if it's a string that, when trimmed, is empty
  return value === null || value === undefined || value.trim() === "";
}
