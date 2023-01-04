import express from "express";
import authController from "./controllers/authController";
import playerController from "./controllers/playerController";
import playlistController from "./controllers/playlistController";
import tracksController from "./controllers/tracksController";
import userController from "./controllers/userController";

const routes = express.Router();

routes.get("/login", authController.auth);
routes.get("/callback", authController.callback);
routes.get("/refresh_token", authController.refresh);

routes.get("/me", userController.me);

routes.get("/me/player", playerController.playback);
routes.put("/me/player/play", playerController.start);
routes.put("/me/player/pause", playerController.pause);
routes.put("/me/player/seek", playerController.seekToPosition);
routes.put("/me/player/shuffle", playerController.shuffle);
routes.get("/me/player/currently-playing", playerController.currentlyPlaying);
routes.get("/me/player/recently-played", playerController.recentlyPlayed);

routes.get("/me/tracks", tracksController.saved);

routes.get("/playlists/:id", playlistController.getById);
routes.get("/me/playlists", playlistController.currentUser);

export default routes;
