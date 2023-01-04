export function handleAuthError(error: string) {
  switch (error) {
    case "access_denied":
      return "You need to authorize the app.";
    case "state_mismatch":
      return "The Connection cannot be completed";
    default:
      return error;
  }
}
