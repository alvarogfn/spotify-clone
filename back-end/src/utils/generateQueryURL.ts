export function generateQueryURL(
  url: string,
  query: { [key: string]: string }
): string {
  return new URL(url + "?" + new URLSearchParams(query)).href;
}
