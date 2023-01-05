import type { PlaybackState } from "@/models/PlaybackState";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

interface State {
  track: {
    name: string;
    artists: string[];
    image: string;
    id: string;
  };
  context: {
    type: "album" | "playlist" | "user" | "collection";
    id: string;
  } | null;
  controls: {
    repeat: "off" | "track" | "context";
    shuffle: boolean;
    playing: boolean;
  };
  device: {
    volume: number;
  };
  position: {
    duration: number;
    progress: number;
  };
}

export const usePlayerStore = defineStore("player", {
  state: (): State => ({
    track: {
      name: "",
      artists: [],
      image: "",
      id: "",
    },
    context: null,
    controls: {
      shuffle: false,
      repeat: "off",
      playing: false,
    },
    position: {
      duration: 0,
      progress: 0,
    },
    device: {
      volume: 0,
    },
  }),
  getters: {},
  actions: {
    async init() {
      try {
        const response: PlaybackState = await useAuthStore().request(
          "/me/player/currently-playing"
        );

        this.track = response.track;
        this.device = response.device;
        this.controls = response.controls;
        this.context = response.context;
        this.position = response.position;
      } catch (e) {
        this.controls.playing = false;
      }
    },
    async pause() {
      try {
        await useAuthStore().request("/me/player/pause", {
          method: "PUT",
        });
        this.controls.playing = false;
      } catch (e) {
        console.log(e);
      }
    },

    async play(uri?: string, offset?: { position?: number; uri?: string }) {
      try {
        await useAuthStore().request("/me/player/play", {
          method: "PUT",
          body: JSON.stringify({ uri, offset }),
          headers: { "content-type": "application/json" },
        });
        // this is a hack, because the endpoint /play updates more fast than endpoint /currently-playing
        await new Promise<void>((resolves) =>
          setTimeout(() => resolves(), 1000)
        ).then(() => this.init());
      } catch (e) {
        console.log(e);
      }
    },
    skipNext() {},
    skipPrev() {},
    async shuffle() {
      try {
        await useAuthStore().request("/me/player/shuffle", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ shuffle: !this.controls.shuffle }),
        });

        this.controls.shuffle;
      } catch (e) {
        console.log(e);
      }
    },
    async seekToPosition(newPosition: number) {
      const {
        position,
      }: {
        position: number;
      } = await useAuthStore().request("/me/player/seek", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ position: Math.ceil(newPosition) }),
      });
      this.position.progress = position;
    },
  },
});
