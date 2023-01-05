import express from "express";
import session from "express-session";
import routes from "./routes";
import cors from "cors";
import { PORT, SESSION_SECRET } from "./config";
import logError from "./middlewares/logError";
import handleError from "./middlewares/handleError";
import morgan from "morgan";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(morgan("tiny"));

declare module "express-session" {
  // eslint-disable-next-line no-unused-vars
  interface SessionData {
    data: {
      state: string;
      authURL?: string;
      refreshToken?: string;
    };
  }
}

app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);

app.use(routes);

app.use(logError);
app.use(handleError);

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log("Your app is running: " + url);
});
