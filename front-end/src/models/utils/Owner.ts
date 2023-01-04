import type { Followers } from "./Followers";

export interface Owner {
  external_urls: {
    spotify: string;
  };
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
  display_name: string;
}
