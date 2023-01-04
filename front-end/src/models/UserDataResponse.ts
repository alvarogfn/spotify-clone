import type { TrackResponse } from "./TrackResponse";

export interface UserDataResponse {
  user: {
    name: string;
    image: string;
    type: "user";
    id: string;
  };
  playlists: {
    name: string;
    id: string;
    uri: string;
    type: "playlists";
  }[];
  favorites: TrackResponse[];
}
