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
