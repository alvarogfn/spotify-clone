export function minutify(ms: number) {
  return new Date(ms).toLocaleTimeString("en-US", {
    minute: "2-digit",
    second: "2-digit",
  });
}
