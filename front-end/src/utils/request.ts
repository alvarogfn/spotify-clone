export const ENDPOINT = "http://192.168.0.145:5000";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = new URL(path, ENDPOINT).href;
  const response: Response = await fetch(url, init);

  if (response.status < 200 || response.status >= 300) {
    const error = await response.text();
    throw new Error(error);
  }

  const json: T = await response.json();
  return json;
}
