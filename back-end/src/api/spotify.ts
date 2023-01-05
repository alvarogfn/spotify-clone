import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../config";

export const spotify = axios.create({
  baseURL: "https://accounts.spotify.com/api/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    authorization:
      "Basic " +
      Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
  },
  responseType: "json",
});
