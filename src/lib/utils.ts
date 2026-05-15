export function normalize(value: unknown): string {
  if (value == null) {
    return "";
  }

  return String(value).trim();
}