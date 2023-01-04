export class AuthExpiredError extends Error {
  constructor(message: string) {
    super(message);
  }
}
