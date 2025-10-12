
/**
 * Sanitizes input to a valid decimal number format.
 * - Allows only digits and a single dot.
 */
export const sanitizeDecimalInput = (text: string): string => {
  const sanitized = text.replace(/[^0-9.]/g, "");
  const parts = sanitized.split(".");
  return parts.length > 2
    ? parts[0] + "." + parts.slice(1).join("")
    : sanitized;
};