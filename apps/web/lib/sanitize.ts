/** Strip control chars and trim; enforce max length. */
export function sanitizeText(value: string, maxLength = 5000): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(value: string): string {
  return sanitizeText(value, 254).toLowerCase();
}

export function sanitizeOptional(value: string | undefined, maxLength = 500): string | undefined {
  if (value === undefined || value === null) return undefined;
  const cleaned = sanitizeText(String(value), maxLength);
  return cleaned.length > 0 ? cleaned : undefined;
}
