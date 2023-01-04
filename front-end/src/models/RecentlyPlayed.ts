import type { Track } from "./Track";
import type { Context } from "./utils/Context";

export interface RecentlyPlayed {
  next: string | null;
  cursos: {
    after: string;
    before: string;
  };
  items: {
    track: Track;
    context: Context | null;
    played_at: string;
  }[];
}
