import type { TrackResponse } from "./TrackResponse";
import type { Actions } from "./utils/Actions";
import type { Context } from "./utils/Context";
import type { Device } from "./utils/Device";

export interface PlaybackState {
  track: {
    name: string;
    id: string;
    image: string;
    artists: string[];
  };
  context: {
    id: string;
    type: "playlist" | "collection" | "user" | "album";
  };
  controls: {
    playing: boolean;
    repeat: "off" | "track" | "context";
    shuffle: boolean;
  };
  device: {
    volume: number;
  };
  position: {
    duration: number;
    progress: number;
  };
}
