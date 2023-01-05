import express from "express";
import { auth, callback, refresh } from "./controllers/authController";

const routes = express.Router();

routes.get("/login", auth);
routes.get("/callback", callback);
routes.get("/refresh_token", refresh);

export default routes;
