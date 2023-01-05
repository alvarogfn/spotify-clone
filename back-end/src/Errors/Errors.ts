export class HTTPError extends Error {
  protected code: number = 500;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
