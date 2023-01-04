import type { PlaylistDataResponse } from "@/models/PlaylistDataResponse";
import type { TrackResponse } from "@/models/TrackResponse";
import type { UserDataResponse } from "@/models/UserDataResponse";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

interface State {
  user: {
    name: string | null;
    image: string | null;
    type: "user";
    id: string | null;
  };
  playlists: {
    name: string;
    id: string;
    uri: string;
    type: "playlists";
  }[];
  favorites: TrackResponse[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: {
      name: null,
      image: null,
      type: "user",
      id: null,
    },
    favorites: [],
    playlists: [],
  }),
  actions: {
    async fetchUserData() {
      const response: UserDataResponse = await useAuthStore().request("/user");
      this.user = response.user;
      this.playlists = response.playlists;
      this.favorites = response.favorites;
    },
    async getRecentlyPlayed() {
      const response: {
        context: string;
        track: TrackResponse;
      }[] = await useAuthStore().request("/me/recently-played");

      if (!response) return [];

      return response;
    },
    async getPlaylistById(id: string): Promise<PlaylistDataResponse> {
      return await useAuthStore().request(`/playlist/${id}`);
    },
  },
});
