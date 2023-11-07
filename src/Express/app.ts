import express, { Application } from "express";
import userRouter from "./routes/userRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/authRouter";
import convoRouter from "./routes/convoRouter";

const ExpressConfig = (): Application => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/auth", authRouter);
  app.use("/convo", convoRouter);
  app.use("/users", userRouter);
  app.get("/", (_req, res) => res.send("Hello"));
  return app;
};
export default ExpressConfig;
