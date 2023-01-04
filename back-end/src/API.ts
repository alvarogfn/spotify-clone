import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./config";

const auth = axios.create({
  baseURL: "https://accounts.spotify.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    authorization:
      "Basic " +
      Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
  },
  responseType: "json",
});

const resources = axios.create({
  baseURL: "https://api.spotify.com/v1",
  responseType: "json",
});

export const API = {
  auth,
  resources,
};
