export default function clamp(
  string: string,
  length: number,
  overflow: string = "..."
): string {
  if (string.length <= length) return string;
  return string.substring(0, length) + overflow;
}
