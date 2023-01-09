import express from "express";
import session from "express-session";
import routes from "./routes";
import cors from "cors";
import { HOST, DEVELOPMENT, PORT, CALLBACK_APPLICATION_URL } from "./config";
import handleError from "./middlewares/handleError";
import { randomBytes } from "crypto";
import morgan from "morgan";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    credentials: !DEVELOPMENT,
    origin: !DEVELOPMENT ? new URL(CALLBACK_APPLICATION_URL).origin : undefined,
  })
);

app.use(morgan("tiny"));

app.use(
  session({
    secret: randomBytes(30).toString("hex"),
    saveUninitialized: false,
    resave: false,
  })
);

app.use(routes);

app.use(handleError);

(async function listen() {
  try {
    if (DEVELOPMENT) {
      app.listen(PORT, () => {
        console.log("Your app is running: http://localhost:" + PORT);
      });
    } else {
      app.listen(10000, () => {
        console.log("Your app is running: " + HOST);
      });
    }
  } catch (e) {
    console.log(e);
  }
})();
