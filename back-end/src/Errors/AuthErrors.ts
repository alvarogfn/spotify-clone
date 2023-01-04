export class RequestTokenError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "RequestTokenError";
    this.status = status;
  }
}
