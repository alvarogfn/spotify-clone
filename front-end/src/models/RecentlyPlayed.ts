import type { TrackResponse } from "./TrackResponse";
import type { Context } from "./utils/Context";

export interface RecentlyPlayed {
  next: string | null;
  cursos: {
    after: string;
    before: string;
  };
  items: {
    track: TrackResponse;
    context: Context | null;
    played_at: string;
  }[];
}
