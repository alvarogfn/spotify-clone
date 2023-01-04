interface Params {
  path: string;
  protocol?: string;
  base?: string;
  port?: number;
}

export function generateURL({
  path,
  protocol = "http",
  base,
  port,
}: Params): string {
  return `${protocol}://${base}${port ? `:${port}`: ""}${path}`;
}
