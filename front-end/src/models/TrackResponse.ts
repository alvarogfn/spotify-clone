export interface TrackResponse {
  name: string;
  explicit: boolean;
  id: string;
  type: "track";
  artists: string[];
  duration: number;
  track_number: number;
  image: string;
  uri: string;
}
