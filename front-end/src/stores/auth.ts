import { AuthExpiredError } from "@/errors/Errors";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

interface State {
  linkToAuth: string;
  token: string | null;
  expiration: number | null;
  authenticated: boolean;
  error: string | undefined;
  endpointForAuth: string;
  endpointForResources: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    linkToAuth: "",
    token: null,
    expiration: 0,
    authenticated: false,
    error: undefined,
    endpointForAuth: "https://api-alvarogfn-spotify-clone.onrender.com/login",
    endpointForResources: "https://api.spotify.com/v1",
  }),
  getters: {
    bearerToken(state) {
      return `Bearer ${state.token}`;
    },
  },
  actions: {
    async request(path: string, init?: RequestInit): Promise<any> {
      const url = new URL(path, this.endpointForResources).href;

      const response: Response = await fetch(url, {
        ...init,
        headers: { ...init?.headers, Authorization: this.bearerToken },
      });

      if (response.status === 401) {
        throw new AuthExpiredError("Token Expired");
      }

      if (response.status < 200 || response.status >= 300) {
        const error = await response.text();
        throw new Error(error);
      }

      if (response.status === 204) {
        return { status: response.status };
      }

      return response.json();
    },
    login(token: string, expiration: number): number {
      this.token = token;
      this.expiration = expiration;

      const timestamp = new Date().getTime() + expiration;
      localStorage.setItem("expiration_date", timestamp.toString());

      return expiration;
    },
    logout() {
      const router = useRouter();

      localStorage.clear();

      this.token = null;
      this.expiration = 0;
      this.authenticated = false;
      this.error = undefined;

      router.push("/login");
    },
  },
});
