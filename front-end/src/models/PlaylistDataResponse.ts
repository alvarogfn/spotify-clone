export interface PlaylistDataResponse {
  name: string;
  description: string;
  id: string;
  image: string;
  type: "playlist";
  uri: string;
  tracks: any[];
  total_tracks: number;
  owner: string;
}
